<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AdminUsersController extends Controller
{
    public function getGigPosters(Request $request)
    {
        $search = $request->search;
        $page = $request->input('page');

        $query = User::where('usertype', 'poster')->with('gigs');
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
        $gigPoster = User::with('posterApplications')->find($id);

        $gigs = $gigPoster->gigs()->with('applications', 'status')->paginate(10);

        $gigPoster['profile_photo'] = asset('storage/' . $gigPoster['profile_photo']);

        return response()->json(['success' => true, 'gigPoster' => $gigPoster, 'gigs' => $gigs]);
    }

    public function getGigSeekers(Request $request)
    {
        $search = $request->search;
        $page = $request->input('page');

        $query = User::where('usertype', 'seeker')->with('seekerApplications');
        if ($search) {
            $query->where('firstname', 'LIKE', "%{$search}%")
                ->orWhere('lastname', 'LIKE', "%{$search}%")
                ->orWhere('gender', 'LIKE', "%{$search}%")
                ->orWhere('phone', 'LIKE', "%{$search}%");
        }
        $users = $query->orderBy('firstname', 'asc')->paginate(12);

        return response()->json(['success' => true, 'users' => $users]);
    }
}
