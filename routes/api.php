<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminGigController;
use App\Http\Controllers\Admin\AdminTransactionsController;
use App\Http\Controllers\Admin\AdminUsersController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GigSeeker\GigSeekerController;
use App\Http\Controllers\GigPoster\PosterGigController;
use App\Http\Controllers\GigPoster\GigApplicationController;
use App\Http\Controllers\Gig\GigController;
use App\Http\Controllers\GigPoster\DashboardController;
use App\Http\Controllers\GigPoster\NotificationController;
use App\Http\Controllers\GigPoster\TransactionsController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\WebhookController;
use Illuminate\Support\Facades\Route;

// authentications
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
Route::post('/resend-otp', [AuthController::class, 'resendOtp']);
// email verification via link
Route::post('/send-verification-link/{$userId}', [AuthController::class, 'resendVerificationLink']);
Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyLink'])
    ->middleware(['signed'])
    ->name('verification.verify');

// Password Resets
Route::post('/password/forgot', [AuthController::class, 'requestPasswordReset']);
Route::post('/password/forgot/verify-reset-otp', [AuthController::class, 'verifyResetOtp']);
Route::post('/password/reset', [AuthController::class, 'resetPassword']);

Route::middleware(['auth:sanctum', 'checkToken'])->group(function () {
    // Profile
    Route::get('/get-user', [UserController::class, 'getUser']);
    Route::post('/user/profile/update-photo', [UserController::class, 'updatePhoto']);
    Route::post('/user/update-profile/{userId}', [UserController::class, 'updateProfile']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);

    // Admin
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'getStats']);
        Route::post('/jobs', [AdminGigController::class, 'getJobs']);
        Route::get('/jobs/{jobId}', [AdminGigController::class, 'getJob']);
        Route::post('/job-applications', [AdminGigController::class, 'getApplications']);
        Route::get('/job-applications/{id}', [AdminGigController::class, 'getApplication']);
        Route::post('/users/gig-posters', [AdminUsersController::class, 'getGigPosters']);
        Route::post('/users/gig-posters/{id}', [AdminUsersController::class, 'getGigPoster']);
        Route::post('/users/gig-seekers', [AdminUsersController::class, 'getGigSeekers']);
        Route::post('/users/gig-seeker/{id}', [AdminUsersController::class, 'getGigSeeker']);
        Route::get('/mchongo-points-stats', [AdminTransactionsController::class, 'mchongoPoints']);
        Route::post('/user/blocked-users', [AdminUsersController::class, 'getBlockedUsers']);
        Route::post('/user/block-user/{userId}', [AdminUsersController::class, 'blockUser']);
        Route::post('/user/unblock-user/{userId}', [AdminUsersController::class, 'unblockUser']);
        Route::post('/user/create-user', [AdminUsersController::class, 'createUser']);
        Route::post('/user/update-user/{userId}', [AdminUsersController::class, 'updateUser']);
        Route::get('/transactions', [AdminTransactionsController::class, 'getTransactions']);
    });

    Route::middleware('role:poster')->group(function () {
        Route::get('/jobposter/dashboard', [DashboardController::class, 'getStats']);
        // Jobs
        Route::get('/job-categories', [GigController::class, 'getGigCategories']);
        Route::post('/jobs/create', [GigController::class, 'createJob']);
        Route::post('/jobposter/jobs', [PosterGigController::class, 'getJobs']);
        Route::get('/jobposter/jobs/{jobId}', [GigController::class, 'getJob']);
        Route::put('/jobs/{jobId}/edit', [GigController::class, 'editJob']);
        Route::post('/jobs/close/{jobId}', [GigController::class, 'closeJob']);
        //Applications
        Route::post('/job-applications', [GigApplicationController::class, 'getApplications']);
        Route::get('/job-applications/{id}', [GigApplicationController::class, 'getApplication']);
        Route::post('/job-appplication/accept/{applicationId}', [GigApplicationController::class, 'acceptApplication']);
        Route::post('/job-appplication/deny/{applicationId}', [GigApplicationController::class, 'denyApplication']);
        // Notifications
        Route::post('/notification-preference', [NotificationController::class, 'updateNotificationPreference']);
        Route::get('/notification-preference', [NotificationController::class, 'getNotificationPreference']);
        // Transactions
        Route::get('/jobposter/transactions', [TransactionsController::class, 'getTransactions']);
    });

    Route::middleware('role:seeker')->group(function () {
        // Route::get('/gig-seeker/dashboard', [GigSeekerController::class, 'gigSeekerDashboard']);
        Route::get('/gig-seeker/applications', [GigSeekerController::class, 'getAllApplications']);
        Route::get('/gig-seeker/recent-applications', [GigSeekerController::class, 'getRecentApplications']);
        // getting popular gigs
        Route::get('/popular-gigs', [GigController::class, 'popularGigs']);
        Route::get('/gig-categories', [GigController::class, 'getGigCategories']);
        Route::get('/gig-seeker-gigs', [GigSeekerController::class, 'getGigs']);
        Route::post('/gig-seeker/gig/apply', [GigSeekerController::class, 'storeGigApplication']);
        Route::delete('/gig-seeker/cancel/gig/application/{id}', [GigSeekerController::class, 'cancelGigApplication']);
        Route::get('/about-gig/{gigId}/gig-seeker/{seekerId}', [GigSeekerController::class, 'AboutGig']);
        Route::post('/gig-seeker/subscribe', [GigSeekerController::class, 'subscribeNotification']);
        Route::post('/profile/update', [GigSeekerController::class, 'updateSeekerProfile']);
        Route::get('/notification-subscriptions/{userId}', [GigSeekerController::class, 'getUserSubscriptions']);
        Route::post('/notification-subscribe', [GigSeekerController::class, 'subscribeNotification']);
        Route::post('/notification-unsubscribe', [GigSeekerController::class, 'unsubscribeNotification']);
    });

    Route::post('/logout', [AuthController::class, 'logout']);

    // Payment test routes
    Route::post('/payments/preview-ussd', [PaymentController::class, 'previewUssdPush']);
    Route::post('/payments/initiate-ussd', [PaymentController::class, 'initiateUssdPayment']);
    Route::get('/payments/status/{reference}', [PaymentController::class, 'checkTransactionStatus']);
});

Route::post('/webhooks/clickpesa/payment-status', [WebhookController::class, 'handleClickPesaPaymentStatus']);
// Route::post('/webhooks/clickpesa/payment-status', [WebhookController::class, 'handleClickPesaPaymentStatus'])
//     ->middleware('throttle:60,1');  // 60 requests per 1 minute
