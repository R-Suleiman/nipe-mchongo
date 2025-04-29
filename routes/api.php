<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\JobPoster\DashboardController;
use App\Http\Controllers\JobPoster\NotificationController;
use App\Http\Controllers\JobPoster\ProfileController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;


Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Profile
    Route::get('/get-user', [DashboardController::class, 'getUser']);
    Route::post('/jobposter/profile/update-photo', [ProfileController::class, 'updatePhoto']);
    Route::post('/jobposter/update-profile/{userId}', [ProfileController::class, 'updateProfile']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);

    // Job Poster Dashboard
    Route::get('/jobposter/dashboard', [DashboardController::class, 'getStats']);
    Route::get('/jobposter/jobs-per-month', [DashboardController::class, 'jobsPerMonthsChart']);
    Route::get('/jobposter/applications-per-month', [DashboardController::class, 'applicationsPerMonthsChart']);

    // Jobs
    Route::get('/job-categories', [JobController::class, 'getJobCategories']);
    Route::post('/jobposter/jobs/create', [JobController::class, 'createJob']);
    Route::post('/jobposter/jobs', [JobController::class, 'getJobs']);
    Route::get('/jobposter/jobs/{jobId}', [JobController::class, 'getJob']);
    Route::put('/jobposter/jobs/{jobId}/edit', [JobController::class, 'editJob']);
    Route::post('/jobposter/jobs/close/{jobId}', [JobController::class, 'closeJob']);

    //Applications
    Route::post('/job-applications', [JobApplicationController::class, 'getApplications']);
    Route::get('/job-applications/{id}', [JobApplicationController::class, 'getApplication']);
    Route::post('/job-appplication/accept/{applicationId}', [JobApplicationController::class, 'acceptApplication']);
    Route::post('/job-appplication/deny/{applicationId}', [JobApplicationController::class, 'denyApplication']);

    // Notifications
    Route::post('/notification-preference', [NotificationController::class, 'updateNotificationPreference']);
    Route::get('/notification-preference', [NotificationController::class, 'getNotificationPreference']);
});

// Payment test routes
Route::post('/buy-points', [PaymentController::class, 'buyMchongoPoints']);
Route::post('/azampay/callback', [PaymentController::class, 'azampayCallback'])->name('azampay.callback');


