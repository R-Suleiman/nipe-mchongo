<?php

namespace App\Http\Controllers\GigPoster;

use App\Http\Controllers\Controller;
use App\Models\Gig;
use App\Models\GigApplication;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function getStats()
    {
        $userId = Auth::user()->id;

        // count stats
        $jobs = Gig::with('status')->where('gig_poster_id', $userId)->orderBy('created_at', 'desc')->get();
        $applications = GigApplication::with('job', 'seeker', 'status')->where('gig_poster_id', $userId)->orderBy('created_at', 'desc')->get();
        $employments = GigApplication::where('gig_poster_id', $userId)->where('status_id', 2)->get();

        return response()->json(['success' => true, 'jobs' => $jobs->take(5), 'jobs_count' => $jobs->count(), 'applications' => $applications->take(5), 'applications_count' => $applications->count(), 'employments' => $employments->count()]);
    }

    public function jobsPerMonthsChart()
    {
        // Graph stats (Jobs per month)
        $jobsGraph = Gig::selectRaw("DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as count")
            ->groupByRaw("DATE_FORMAT(created_at, '%Y-%m')")
            ->orderBy('month')
            ->get();

        return response()->json(['success' => true, 'jobsGraph' => $jobsGraph]);
    }

    public function applicationsPerMonthsChart()
    {
        // Graph stats (Jobs per month)
        $applicationsGraph = GigApplication::selectRaw("DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as count")->where('gig_poster_id', Auth::user()->id)
            ->groupByRaw("DATE_FORMAT(created_at, '%Y-%m')")
            ->orderBy('month')
            ->get();

        return response()->json(['success' => true, 'applicationsGraph' => $applicationsGraph]);
    }
}
