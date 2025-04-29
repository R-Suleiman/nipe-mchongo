<?php

namespace App\Http\Controllers\JobPoster;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Storage;

class ProfileController extends Controller
{
    public function updateProfile(Request $request, $userId) {
        $updatedProfile = $request->validate([
            'firstname' => ['required', 'min:3', 'max:25'],
            'lastname' => ['required', 'min:3', 'max:25'],
            'email' => ['required', 'email'],
            'dob' => 'required',
            'address' => ['required', 'string'],
            'phone' => ['required', 'string'],
            'gender' => ['required', 'string'],
        ]);

        $user = User::where('id', $userId)->first();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'User not Found'], 404);
        }

        $user->update($updatedProfile);

        return response()->json(['success' => true, 'message' => 'Profile Updated Successfully!', 'user' => $user]);
    }

    public function updatePhoto(Request $request) {
        $request->validate([
            'photo' => 'required|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $userId = Auth::user()->id;
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'User not found!'], 404);
        }

        $photo = $request->file('photo');
        $path = $photo->store('profile_photos', 'public');

        if (!empty($user->profile_photo) && Storage::disk('public')->exists($user->profile_photo)) {
            Storage::disk('public')->delete($user->profile_photo);
        }

        $user->update(['profile_photo' => $path]);

        return response()->json(['success' => true, 'message' => 'Photo Updated successfully!'], 200);
    }
}
