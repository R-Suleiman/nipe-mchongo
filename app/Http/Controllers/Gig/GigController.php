<?php

namespace App\Http\Controllers\Gig;

use App\Http\Controllers\Controller;
use App\Mail\JobPostMail;
use App\Models\Gig;
use App\Models\GigCategory;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class GigController extends Controller
{
    public function getJob($jobId)
    {
        $job = Gig::where('id', $jobId)->with('applications', 'applications.seeker', 'applications.status', 'status')->first();

        return response()->json(['success' => true, 'job' => $job]);
    }

    public function createJob(Request $request)
    {
        $gig = $request->validate([
            'gig_poster_id' => 'required|integer|exists:users,id',
            'gig_category_id' => 'required|integer|exists:gig_categories,id',
            'title' => 'required|string',
            'description' => 'required|string',
            'location' => 'required|string',
            'payment' => 'required|string',
            'payment_frequency' => 'required|string',
            'duration' => 'required|string',
            'slots' => 'required|string',
        ]);

        $gig['status_id'] = 4; // The gig is open by default
        $newGig = Gig::create($gig);

        $user = $newGig->poster;

        $user->decrement('mchongo_points', 1);

        // sending email notofications
        // $gigCategory = $gig['gig_category_id'];
        // if ($newGig) {
        //     $subscribedUsers = User::whereHas('subscriptions', function ($q) use ($gigCategory) {
        //         $q->where('gig_category_id', $gigCategory)->where('email', 1);
        //     })->get();

        //     foreach ($subscribedUsers as $user) {
        //         Mail::to($user->email)->send(new JobPostMail($newGig, $user));
        //     }
        // }

        return response()->json(['success' => true, 'message' => 'Job Posted Successfully!']);
    }

    public function editJob(Request $request, $jobId)
    {
        $newGig = $request->validate([
            'gig_poster_id' => 'required|integer|exists:users,id',
            'gig_category_id' => 'required|integer|exists:gig_categories,id',
            'title' => 'required|string',
            'description' => 'required|string',
            'location' => 'required|string',
            'payment' => 'required|string',
            'payment_frequency' => 'required|string',
            'duration' => 'required|string',
            'slots' => 'required|string',
        ]);

        $gig = Gig::where('id', $jobId)->first();

        if (!$gig) {
            return response()->json(['success' => false, 'message' => 'Job not found!'], 404);
        }

        $gig->update($newGig);

        return response()->json(['success' => true, 'message' => 'Job Updated Successfully!']);
    }

    public function getGigCategories()
    {
        // $gigCategories = DB::table('gig_categories')
        //     ->select(
        //         DB::raw('MIN(id) as id'),
        //         'name',
        //     )
        //     ->groupBy('name')
        //     ->orderBy('name', 'desc')
        //     ->get();

        $gigCategories = GigCategory::select(['id', 'name'])->orderBy('name', 'asc')->get();

        return response()->json($gigCategories);
    }

    public function popularGigs()
    {
        $gigs = DB::table('gigs')
            ->select(
                'gigs.id',
                'gigs.title',
                DB::raw('COUNT(gig_applications.id) as application_count')
            )
            ->leftJoin('gig_applications', 'gigs.id', '=', 'gig_applications.gig_id')
            ->groupBy('gigs.id', 'gigs.title')
            ->orderByDesc('application_count')
            ->limit(6)
            ->get();

        $total = $gigs->count();

        return response()->json([
            'gigs' => $gigs,
            'total' => $total
        ]);
    }

    public function closeJob($jobId)
    {
        $gig = Gig::where('id', $jobId)->first();

        if (!$gig) {
            return response()->json(['success' => false, 'message' => 'Job not found!'], 404);
        }

        $gig->update(['status_id' => 5]);

        return response()->json(['success' => true, 'message' => 'Job Closed Successfully!']);
    }
}
