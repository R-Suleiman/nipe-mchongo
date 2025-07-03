<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminGigController;
use App\Http\Controllers\Admin\AdminUsersController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GigSeeker\GigSeekerController;
use App\Http\Controllers\GigPoster\PosterGigController;
use App\Http\Controllers\GigPoster\GigApplicationController;
use App\Http\Controllers\Gig\GigController;
use App\Http\Controllers\GigPoster\DashboardController;
use App\Http\Controllers\GigPoster\NotificationController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Profile
    Route::get('/get-user', [UserController::class, 'getUser']);
    Route::post('/user/profile/update-photo', [UserController::class, 'updatePhoto']);
    Route::post('/user/update-profile/{userId}', [UserController::class, 'updateProfile']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);

    // Admin
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'getStats']);
    Route::post('/admin/jobs', [AdminGigController::class, 'getJobs']);
    Route::get('/admin/jobs/{jobId}', [AdminGigController::class, 'getJob']);
    Route::post('/admin/job-applications', [AdminGigController::class, 'getApplications']);
    Route::get('/admin/job-applications/{id}', [AdminGigController::class, 'getApplication']);
    Route::post('/admin/users/gig-posters', [AdminUsersController::class, 'getGigPosters']);
    Route::post('/admin/users/gig-posters/{id}', [AdminUsersController::class, 'getGigPoster']);
    Route::post('/admin/users/gig-seekers', [AdminUsersController::class, 'getGigSeekers']);
    Route::post('/admin/users/gig-seeker/{id}', [AdminUsersController::class, 'getGigSeeker']);
    Route::get('/admin/mchongo-points-stats', [AdminDashboardController::class, 'mchongoPoints']);
    Route::get('/admin/transactions', [AdminDashboardController::class, 'getTransactions']);
    Route::post('/user/blocked-users', [AdminUsersController::class, 'getBlockedUsers']);
    Route::post('/user/block-user/{userId}', [AdminUsersController::class, 'blockUser']);
    Route::post('/user/unblock-user/{userId}', [AdminUsersController::class, 'unblockUser']);
    Route::post('/user/create-user', [AdminUsersController::class, 'createUser']);
    Route::post('/user/update-user/{userId}', [AdminUsersController::class, 'updateUser']);

    // Job Poster Dashboard
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
});

Route::get('/gig-seeker/dashboard', [GigSeekerController::class, 'gigSeekerDashboard']);
Route::get('/gig-seeker/applications', [GigSeekerController::class, 'getAllApplications']);
Route::get('/gig-seeker/recent-applications', [GigSeekerController::class, 'getRecentApplications']);

// getting popular gigs
Route::get('/popular-gigs', [GigController::class, 'popularGigs']);
Route::get('/gig-categories', [GigController::class, 'getGigCategories']);
Route::get('/gig-seeker-gigs', [GigSeekerController::class, 'getGigs']);
Route::post('/gig-seeker/gig/apply', [GigSeekerController::class, 'storeGigApplication']);
Route::delete('/gig-seeker/cancel/gig/application/{id}', [GigSeekerController::class, 'cancelGigApplication']);


// Payment test routes
Route::post('/buy-points', [PaymentController::class, 'buyMchongoPoints']);
Route::post('/azampay/callback', [PaymentController::class, 'azampayCallback'])->name('azampay.callback');
