<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gig;
use App\Models\GigApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminGigController extends Controller
{
    public function getJobs(Request $request)
    {
        $search = $request->search;
        $page = $request->input('page');

        $query = Gig::with('applications', 'status');
        if ($search) {
            $query->where('title', 'LIKE', "%{$search}%")
                ->orWhereHas('status', function ($query) use ($search) {
                    $query->where('name', 'LIKE', "%{$search}%");
                });
        }
        $jobs = $query->orderBy('created_at', 'desc')->paginate(12);

        return response()->json(['success' => true, 'jobs' => $jobs]);
    }

    public function getJob(Request $request, $jobId)
    {
        $page = $request->input('page');

        $job = Gig::where('id', $jobId)->with('poster', 'applications', 'applications.seeker', 'applications.status', 'status')->first();

        if($job['poster']['profile_photo']) {
            $job['poster']['profile_photo'] = asset('storage/' . $job['poster']['profile_photo']);
        }

        return response()->json(['success' => true, 'job' => $job]);
    }

    public function getApplications(Request $request)
    {
        $search = $request->search;
        $page = $request->input('page');

        // select my applications only
        $query = GigApplication::with('poster', 'seeker', 'job', 'status');
        if ($search) {
            $query->whereHas('seeker', function ($query) use ($search) {
                $query->where('firstname', 'LIKE', "%{$search}%")
                    ->orWhere('lastname', 'LIKE', "%{$search}%");
            })->orWhereHas('poster', function ($query) use ($search) {
                $query->where('firstname', 'LIKE', "%{$search}%")
                    ->orWhere('lastname', 'LIKE', "%{$search}%");
            })
                ->orWhereHas('job', function ($query) use ($search) {
                    $query->where('title', 'LIKE', "%{$search}%");
                })
                ->orWhereHas('status', function ($query) use ($search) {
                    $query->where('name', 'LIKE', "%{$search}%");
                });
        }
        $applications = $query->orderBy('created_at', 'desc')->paginate(12);

        return response()->json(['success' => true, 'applications' => $applications]);
    }

     public function getApplication($id)
    {
        $application = GigApplication::where('id', $id)->with('poster', 'seeker', 'job', 'job.status','status')->first();

        if (!$application) {
            return response()->json(['success' => false, 'message' => 'Application not found!'], 404);
        }

        $application['poster']['profile_photo'] = asset('storage/' . $application['poster']['profile_photo']);
        $application['seeker']['profile_photo'] = asset('storage/' . $application['seeker']['profile_photo']);

        return response()->json(['success' => true, 'application' => $application]);
    }
}
