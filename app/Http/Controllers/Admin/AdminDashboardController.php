<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gig;
use App\Models\GigApplication;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminDashboardController extends Controller
{
    public function getStats()
    {
        $userId = Auth::user()->id;

        // count stats
        $jobs = Gig::with('status')->orderBy('created_at', 'desc')->get();
        $applications = GigApplication::with('job', 'seeker', 'status')->orderBy('created_at', 'desc')->get();
        $employments = GigApplication::where('status_id', 2)->get();
        $posters = User::where('usertype', 'poster')->get();
        $seekers = User::where('usertype', 'seeker')->get();

     // Prepare months (last 12 months)
        $start = now()->subMonths(11)->startOfMonth();
        $end = now()->endOfMonth();
        $period = \Carbon\CarbonPeriod::create($start, '1 month', $end);

        $months = collect();
        foreach ($period as $date) {
            $months->put($date->format('Y-m'), [
                'month' => $date->format('Y-m'),
                'jobs' => 0,
                'applications' => 0,
            ]);
        }

        // Jobs per month
        $jobsGraph = Gig::selectRaw("DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as jobs")
            ->groupByRaw("DATE_FORMAT(created_at, '%Y-%m')")
            ->pluck('jobs', 'month');

        // Applications per month
        $applicationsGraph = GigApplication::selectRaw("DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as applications")
            ->groupByRaw("DATE_FORMAT(created_at, '%Y-%m')")
            ->pluck('applications', 'month');

        // Merge into one dataset
        $graphData = $months->map(function ($data, $month) use ($jobsGraph, $applicationsGraph) {
            return [
                'month' => $month,
                'jobs' => $jobsGraph[$month] ?? 0,
                'applications' => $applicationsGraph[$month] ?? 0,
            ];
        })->values();

        return response()->json(['success' => true, 'jobs' => $jobs->take(5), 'jobs_count' => $jobs->count(), 'applications' => $applications->take(5), 'applications_count' => $applications->count(), 'employments' => $employments->count(), 'posters' => $posters->count(), 'seekers' => $seekers->count(), 'graphData' => $graphData]);
    }
}
