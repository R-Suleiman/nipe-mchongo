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

        $gigs = Gig::with([
            'poster:id,firstname,lastname',
            'category',
            'applications' // 👈 required for has_applied to work
        ])
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
                    'payment_type' => $gig->payment_frequency, // 👈 include this so it's not undefined
                    'gig_poster_first_name' => $gig->poster->firstname ?? null,
                    'gig_poster_last_name' => $gig->poster->lastname ?? null,
                    'gig_category_name' => $gig->category->name ?? null,
                    'has_applied' => $seekerId
                        ? $gig->applications->contains('gig_seeker_id', (int) $seekerId)
                        : false,
                ];
            });

        return response()->json($gigs);
    }


    public function AboutGig($gigId, $seekerId)
    {
        $gig = Gig::with(['poster:id,firstname,lastname', 'category', 'applications'])
            ->select([
                'id',
                'title',
                'gig_poster_id',
                'gig_category_id',
                'description',
                'location',
                'payment',
                'payment_frequency',
                'duration',
                'slots'
            ])
            ->findOrFail($gigId);

        // Add has_applied flag
        $gig->has_applied = $gig->applications->contains('gig_seeker_id', $seekerId);

        return response()->json($gig);
    }


    public function getAllApplications(Request $request)
    {
        $request->validate([
            'gig_seeker_id' => 'required|exists:users,id',
        ]);

        $user = User::with([
            'seekerApplications.gig.category',
            'seekerApplications.gig.poster',
            'seekerApplications.status'
        ])->findOrFail($request->gig_seeker_id);

        // dd($user);

        $applications = $user->seekerApplications->sortByDesc('created_at')->values();
        // dd($applications);

        $total = $applications->count();

        return response()->json([
            'total' => $total,
            'applications' => $applications
        ]);
    }

    public function getRecentApplications(Request $request)
    {
        $request->validate([
            'gig_seeker_id' => 'required|exists:users,id',
        ]);

        $user = User::with([
            'seekerApplications.gig.category',
            'seekerApplications.gig.poster',
            'seekerApplications.status'
        ])->findOrFail($request->gig_seeker_id);

        $recent = $user->seekerApplications->sortByDesc('created_at')->take(5)->values();

        return response()->json($recent);
    }

    public function storeGigApplication(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'gig_id' => 'required|exists:gigs,id',
            'gig_seeker_id' => 'required|exists:users,id',
            'gig_poster_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()], 422);
        }

        if (
            GigApplication::where('gig_seeker_id', $request->gig_seeker_id)
            ->where('gig_id', $request->gig_id)
            ->exists()
        ) {
            return response()->json(['errors' => ['You have already applied for this gig.']], 422);
        }

        try {
            $application = GigApplication::create([
                'gig_id' => $request->gig_id,
                'gig_seeker_id' => $request->gig_seeker_id,
                'gig_poster_id' => $request->gig_poster_id,
                'status_id' => 3,
            ]);

            return response()->json([
                'message' => 'Application submitted successfully',
                'data' => $application,
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => ['Something went wrong. Please try again.']], 500);
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
}
