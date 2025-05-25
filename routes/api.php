<?php

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
    Route::get('/get-user', [DashboardController::class, 'getUser']);
    Route::post('/jobposter/profile/update-photo', [UserController::class, 'updatePhoto']);
    Route::post('/jobposter/update-profile/{userId}', [UserController::class, 'updateProfile']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);

    // Job Poster Dashboard
    Route::get('/jobposter/dashboard', [DashboardController::class, 'getStats']);
    Route::get('/jobposter/jobs-per-month', [DashboardController::class, 'jobsPerMonthsChart']);
    Route::get('/jobposter/applications-per-month', [DashboardController::class, 'applicationsPerMonthsChart']);

    // Jobs
    Route::get('/job-categories', [GigController::class, 'getJobCategories']);
    Route::post('/jobposter/jobs/create', [GigController::class, 'createJob']);
    Route::post('/jobposter/jobs', [PosterGigController::class, 'getJobs']);
    Route::get('/jobposter/jobs/{jobId}', [GigController::class, 'getJob']);
    Route::put('/jobposter/jobs/{jobId}/edit', [GigController::class, 'editJob']);
    Route::post('/jobposter/jobs/close/{jobId}', [GigController::class, 'closeJob']);

    //Applications
    Route::post('/job-applications', [GigApplicationController::class, 'getApplications']);
    Route::get('/job-applications/{id}', [GigApplicationController::class, 'getApplication']);
    Route::post('/job-appplication/accept/{applicationId}', [GigApplicationController::class, 'acceptApplication']);
    Route::post('/job-appplication/deny/{applicationId}', [GigApplicationController::class, 'denyApplication']);

    // Notifications
    Route::post('/notification-preference', [NotificationController::class, 'updateNotificationPreference']);
    Route::get('/notification-preference', [NotificationController::class, 'getNotificationPreference']);
});

Route::get('/gig-seeker/gig/applications/{id}', [GigSeekerController::class, 'gigSeekerApplications']);
Route::get('/gig-seeker/gig/recent-applications', [GigSeekerController::class, 'recentGigApplications']);

// getting popular gigs
Route::get('/popular-gigs', [GigSeekerController::class, 'popularGigs']);
Route::get('/gigs', [GigController::class, 'getGigs']);

// Payment test routes
Route::post('/buy-points', [PaymentController::class, 'buyMchongoPoints']);
Route::post('/azampay/callback', [PaymentController::class, 'azampayCallback'])->name('azampay.callback');


