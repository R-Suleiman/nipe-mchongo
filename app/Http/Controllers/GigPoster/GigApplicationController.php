<?php

namespace App\Http\Controllers\GigPoster;

use App\Http\Controllers\Controller;
use App\Mail\JobAcceptedMail;
use App\Mail\JobDeniedMail;
use App\Models\GigApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class GigApplicationController extends Controller
{
    public function getApplications(Request $request)
    {
        $search = $request->search;
        $page = $request->input('page');

        // select my applications only
        $query = GigApplication::with('poster', 'seeker', 'job', 'status')
            ->where('gig_poster_id', Auth::user()->id);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->whereHas('seeker', function ($subQ) use ($search) {
                    $subQ->where('firstname', 'LIKE', "%{$search}%")
                        ->orWhere('lastname', 'LIKE', "%{$search}%");
                })
                    ->orWhereHas('job', function ($subQ) use ($search) {
                        $subQ->where('title', 'LIKE', "%{$search}%");
                    })
                    ->orWhereHas('status', function ($subQ) use ($search) {
                        $subQ->where('name', 'LIKE', "%{$search}%");
                    });
            });
        }

        $applications = $query->orderBy('created_at', 'desc')->paginate(12);


        return response()->json(['success' => true, 'applications' => $applications]);
    }

    public function getApplication($id)
    {
        $application = GigApplication::where('id', $id)->with('poster', 'seeker', 'job', 'status')->first();

        if (!$application) {
            return response()->json(['success' => false, 'message' => 'Application not found!'], 404);
        }

        return response()->json(['success' => true, 'application' => $application]);
    }

    public function acceptApplication(Request $request, $applicationId)
    {
        $application = GigApplication::where('id', $applicationId)->first();

        $application->update(['status_id' => 2]);

        // Send Notification to the applicant
        $user = $application->seeker;
        $job = $application->job;
        if ($user) {
            Mail::to($user->email)->send(new JobAcceptedMail($job, $user));
        }

        return response()->json(['success' => true, 'message' => 'Application Accepted Successfully']);
    }

    public function denyApplication(Request $request, $applicationId)
    {
        $application = GigApplication::where('id', $applicationId)->first();

        $application->update(['status_id' => 3]);

        // Send Notification to the applicant
        $user = $application->seeker;
        $job = $application->job;
        if ($user) {
            Mail::to($user->email)->send(new JobDeniedMail($job, $user));
        }

        return response()->json(['success' => true, 'message' => 'Application Denied']);
    }
}
