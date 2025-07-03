<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlockedUser;
use App\Models\User;
use Illuminate\Http\Request;

class AdminUsersController extends Controller
{
     public function createUser(Request $request)
    {
        $user = $request->validate([
            'firstname' => 'required|string',
            'lastname' => 'required|string',
            'username' => 'required|string|unique:users,username',
            'dob' => 'required',
            'gender' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'address' => 'required|string',
            'phone' => 'required|string',
            'usertype' => 'required|string',
            'password' => 'required'
        ]);
        $user['password'] = bcrypt($request->password);

        User::create($user);

        return response()->json(['success' => true, 'message' => 'User created successfully']);
    }

     public function updateUser(Request $request, $userId)
    {
        $updatedProfile = $request->validate([
            'username' => ['required', 'min:3', 'max:25'],
            'firstname' => ['required', 'min:3', 'max:25'],
            'lastname' => ['required', 'min:3', 'max:25'],
            'email' => ['required', 'email'],
            'dob' => 'required',
            'address' => ['required', 'string'],
            'phone' => ['required', 'string'],
            'gender' => ['required', 'string'],
            'mchongo_points' => ['required'],
        ]);

        $user = User::where('id', $userId)->first();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'User not Found'], 404);
        }

        $user->update($updatedProfile);

        return response()->json(['success' => true, 'message' => 'Profile Updated Successfully!', 'user' => $user]);
    }

    public function getGigPosters(Request $request)
    {
        $search = $request->search;
        $page = $request->input('page');

        $blockedUsers = BlockedUser::pluck('user_id');

        $query = User::where('usertype', 'poster')->whereNotIn('id', $blockedUsers)->with('gigs');
        if ($search) {
            $query->where('firstname', 'LIKE', "%{$search}%")
                ->orWhere('lastname', 'LIKE', "%{$search}%")
                ->orWhere('gender', 'LIKE', "%{$search}%")
                ->orWhere('phone', 'LIKE', "%{$search}%");
        }
        $users = $query->orderBy('firstname', 'asc')->paginate(12);

        return response()->json(['success' => true, 'users' => $users]);
    }

    public function getGigPoster(Request $request, $id)
    {
        $gigPoster = User::with('posterApplications', 'blocked')->find($id);

        $gigs = $gigPoster->gigs()->with('applications', 'status')->paginate(10);

        $gigPoster['profile_photo'] = asset('storage/' . $gigPoster['profile_photo']);

        return response()->json(['success' => true, 'gigPoster' => $gigPoster, 'gigs' => $gigs]);
    }

    public function getGigSeekers(Request $request)
    {
        $search = $request->search;
        $page = $request->input('page');

        $blockedUsers = BlockedUser::pluck('user_id');

        $query = User::where('usertype', 'seeker')->whereNotIn('id', $blockedUsers)->with('seekerApplications');
        if ($search) {
            $query->where('firstname', 'LIKE', "%{$search}%")
                ->orWhere('lastname', 'LIKE', "%{$search}%")
                ->orWhere('gender', 'LIKE', "%{$search}%")
                ->orWhere('phone', 'LIKE', "%{$search}%");
        }
        $users = $query->orderBy('firstname', 'asc')->paginate(12);

        return response()->json(['success' => true, 'users' => $users]);
    }

     public function getGigSeeker(Request $request, $id)
    {
        $gigSeeker = User::with('blocked')->find($id);

        $applications = $gigSeeker->seekerApplications()->with('poster', 'job', 'job.status', 'status')->paginate(10);

        $gigSeeker['profile_photo'] = asset('storage/' . $gigSeeker['profile_photo']);

        return response()->json(['success' => true, 'gigSeeker' => $gigSeeker, 'applications' => $applications]);
    }

    public function blockUser(Request $request, $id) {
        $request->validate([
            'reason' => 'required'
        ]);

        $user = User::find($id);
        if(!$user) {
            return response()->json(['success'=> true,'message'=> 'user not found'], 404);
        }

        $user->blocked()->create(['reason' => $request->reason]);

        return response()->json(['success' => true, 'message' => 'user blocked successfully']);
    }

      public function unblockUser(Request $request, $id) {
        $user = User::find($id);

         if(!$user) {
            return response()->json(['success'=> true,'message'=> 'user not found'], 404);
        }

        $user->blocked()->delete();

        return response()->json(['success' => true, 'message' => 'user unblocked successfully']);
    }

     public function getBlockedUsers(Request $request)
    {
        $search = $request->search;
        $page = $request->input('page');

        $query = BlockedUser::with('user');
         if ($search) {
            $query->whereHas('seeker', function ($query) use ($search) {
                $query->where('firstname', 'LIKE', "%{$search}%")
                    ->orWhere('lastname', 'LIKE', "%{$search}%")
                    ->orWhere('gender', 'LIKE', "%{$search}%")
                    ->orWhere('type', 'LIKE', "%{$search}%")
                    ->orWhere('phone', 'LIKE', "%{$search}%");
            });
        }
        $users = $query->orderBy('created_at', 'asc')->paginate(10);

        return response()->json(['success' => true, 'users' => $users]);
    }
}
