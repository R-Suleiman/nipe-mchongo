<?php

namespace App\Http\Controllers\GigSeeker;

use App\Helpers\ErrorHandler;
use App\Http\Controllers\Controller;
use App\Models\Gig;
use App\Models\GigApplication;
use App\Models\NotificationPreference;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
                'status_id' => 1, //pending -- initially set to 3
            ]);

            return response()->json([
                'message' => 'Application submitted successfully',
                'data' => $application,
            ], 201);
        } catch (Exception $e) {
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

    public function updateSeekerProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'seeker_id'      => 'required|exists:users,id',
            'firstname'      => 'required|string|max:255',
            'lastname'       => 'required|string|max:255',
            'email'          => 'required|email|unique:users,email,' . $request->seeker_id,
            'phone'          => 'required|string|max:20',
            'address'        => 'nullable|string|max:255',
            'profile_photo'  => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::find($request->seeker_id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Handle image
        if ($request->hasFile('profile_photo')) {
            $path = $request->file('profile_photo')->store('profile_photos', 'public');
            $user->profile_photo = $path;
        }

        $user->firstname = $request->firstname;
        $user->lastname = $request->lastname;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->address = $request->address;
        $user->save();

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user,
        ]);
    }
    //
    public function getUserSubscriptions($userId)
    {
        $subscribed = NotificationPreference::where('user_id', $userId)
            ->pluck('gig_category_id');

        return response()->json($subscribed);
    }

    //subscribe to notification
    public function subscribeNotification(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'gig_category_id' => 'required|exists:gig_categories,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()], 422);
        }

        $subscription = NotificationPreference::where('user_id', $request->user_id)
            ->where('gig_category_id', $request->gig_category_id)
            ->first();

        if (!$subscription) {
            $subscription = NotificationPreference::create([
                'user_id' => $request->user_id,
                'gig_category_id' => $request->gig_category_id,
                'email' => 1,
            ]);
        } else {
            $subscription->email = 1;
            $subscription->save();
        }

        return response()->json([
            'message' => 'Subscription created successfully',
            'subscription' => $subscription,
        ]);
    }
    public function unsubscribeNotification(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'gig_category_id' => 'required|exists:gig_categories,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()], 422);
        }

        $subscription = NotificationPreference::where('user_id', $request->user_id)
            ->where('gig_category_id', $request->gig_category_id)
            ->first();

        if ($subscription) {
            $subscription->delete();

            return response()->json([
                'message' => 'Unsubscribed successfully',
            ]);
        } else {
            return response()->json([
                'message' => 'No existing subscription found',
            ], 404);
        }
    }
}
