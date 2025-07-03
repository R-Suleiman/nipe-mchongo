<?php

namespace App\Http\Controllers\GigSeeker;

use App\Helpers\ErrorHandler;
use App\Http\Controllers\Controller;
use App\Models\Gig;
use App\Models\GigApplication;
use App\Models\User;
use DB;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Log;

class GigSeekerController extends Controller
{

    public function getGigs(Request $request)
    {
        $seekerId = $request->query('seeker_id');
        $category = $request->query('category');
        $title = $request->query('title');

        $gigs = Gig::with(['poster:id,firstname,lastname', 'category'])
            ->when($category, function ($query) use ($category) {
                $query->whereHas('category', function ($q) use ($category) {
                    $q->where('name', $category);
                });
            })
            ->when($title, function ($query) use ($title) {
                $query->where('title', 'like', '%' . $title . '%');
            })
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($gig) use ($seekerId) {
                return [
                    'id' => $gig->id,
                    'poster_id' => $gig->gig_poster_id,
                    'title' => $gig->title,
                    'description' => $gig->description,
                    'payment' => $gig->payment,
                    'location' => $gig->location,
                    'gig_poster_first_name' => $gig->poster->firstname ?? null,
                    'gig_poster_last_name' => $gig->poster->lastname ?? null,
                    'gig_category_name' => $gig->category->name ?? null,
                    'has_applied' => $gig->applications->contains('gig_seeker_id', $seekerId),
                ];
            });

        return response()->json($gigs);
    }

    public function gigSeekerDashboard(Request $request)
    {
        $request->validate([
            'gig_seeker_id' => 'required|exists:users,id',
        ]);

        $gigSeekerId = $request->input('gig_seeker_id');

        $user = User::with([
            'seekerApplications.gig.category',
            'seekerApplications.gig.poster',
            'seekerApplications.status'
        ])->findOrFail($gigSeekerId);

        $allApplications = $user->seekerApplications
            ->sortByDesc('created_at')
            ->values();

        $recentApplications = $allApplications->take(5);

        return response()->json([
            'applications' => $allApplications,
            'recent_applications' => $recentApplications
        ]);
    }

    public function storeGigApplication(Request $request)
    {
        // Validate the request
        // dd($request->all());
        $validator = Validator::make($request->all(), [
            'gig_id' => 'required|exists:gigs,id',
            'seeker_id' => 'required|exists:users,id',
            'poster_id' => 'required|exists:users,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()], 422);
        }
        if (
            GigApplication::where('gig_seeker_id', $request->seeker_id)
            ->where('gig_id', $request->gig_id)
            ->exists()
        ) {
            return response()->json(['errors' => ['You have already applied for this gig.']], 422);
        }
        $validated = $validator->validated();
        try {
            $application = GigApplication::create([
                'gig_id' => $validated['gig_id'],
                'gig_seeker_id' => $validated['seeker_id'],
                'gig_poster_id' => $validated['poster_id'],
                'status_id' => 3,
            ]);
            return response()->json([
                'message' => 'Application submitted successfully',
                'data' => $application,
            ], 201);
        } catch (Exception $e) {
            return ErrorHandler::handleException($e);
        }
    }
    public function cancelGigApplication($id)
    {
        $application = GigApplication::find($id);

        if (!$application) {
            return response()->json(['error' => 'Application not found'], 404);
        }

        $application->delete();

        return response()->json(['message' => 'Controller says, Application cancelled successfully'], 200);
    }

    public function gigSeekerApplications($id)
    {
        $gigApplications = DB::table('gig_applications')
            ->where('gig_seeker_id', '=', $id)
            ->leftJoin('gigs', 'gig_applications.gig_id', '=', 'gigs.id')
            ->leftJoin('users', 'gigs.gig_poster_id', '=', 'users.id')
            ->leftJoin('gig_categories', 'gigs.gig_category_id', '=', 'gig_categories.id')
            ->leftJoin('statuses', 'gig_applications.status_id', '=', 'statuses.id')
            ->select(
                'users.id as user_id',
                'gig_applications.id',
                'gig_applications.gig_id',
                'gig_applications.gig_seeker_id',
                'gig_applications.gig_poster_id',
                'gig_applications.created_at',
                'statuses.name as application_status',
                'gig_categories.name as gig_category_name',
                'gigs.title as gig_title',
                'gigs.description as gig_description',
                'gigs.payment as gig_payment',
                'gigs.location as location',
                'users.firstname as gig_poster_first_name',
                'users.lastname as gig_poster_last_name'
            )
            ->orderBy('gig_applications.created_at', 'desc')
            ->get();

        return response()->json($gigApplications);
    }

    // public function recentGigApplications(Request $request)
    // {
    //     $seekerId = $request->query('seeker_id'); // Ensure seeker_id is passed correctly
    //     $applications = DB::table('gig_applications')
    //         ->where('gig_seeker_id', '=', $seekerId)
    //         ->leftJoin('gigs', 'gig_applications.gig_id', '=', 'gigs.id')
    //         ->leftJoin('users', 'gigs.gig_poster_id', '=', 'users.id')
    //         ->leftJoin('gig_categories', 'gigs.gig_category_id', '=', 'gig_categories.id')
    //         ->leftJoin('statuses', 'gig_applications.status_id', '=', 'statuses.id')
    //         ->select(
    //             'gig_applications.id',
    //             'gig_applications.gig_id',
    //             'gig_applications.gig_seeker_id',
    //             'gig_applications.gig_poster_id',
    //             'gig_applications.created_at',
    //             'statuses.name as application_status',
    //             'gig_categories.name as gig_category_name',
    //             'gigs.title as gig_title',
    //             'gigs.description as gig_description',
    //             'gigs.payment as gig_payment',
    //             'gigs.location as location',
    //             'users.firstname as gig_poster_first_name',
    //             'users.lastname as gig_poster_last_name'
    //         )
    //         ->orderBy('gig_applications.created_at', 'desc')
    //         ->get();

    //     return response()->json($applications);
    // }

    // gig categories
    public function searchGigs(Request $request)
    {
        $query = DB::table('gigs')
            ->select('gigs.id', 'gigs.title');
        if ($request->has('title') && $request->title !== '') {
            $query->where('gigs.title', 'LIKE', '%' . $request->title . '%');
        }
        return response()->json($query->orderBy('gigs.created_at', 'desc')->get());
    }
}
