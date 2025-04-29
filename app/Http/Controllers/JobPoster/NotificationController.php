<?php

namespace App\Http\Controllers\JobPoster;

use App\Http\Controllers\Controller;
use App\Models\NotificationPreference;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function getNotificationPreference() {
        $userId = auth()->user()->id;
        $preference = NotificationPreference::where('user_id', $userId)->first();

        return response()->json(['success' => true, 'preferences' => $preference]);
    }

    public function updateNotificationPreference(Request $request)
    {
        $attributes = $request->validate([
            'email' => 'required|boolean',
        ]);


        $userId = auth()->user()->id;

        $userNotf = NotificationPreference::where('user_id', $userId)->first();

        if ($userNotf) {
            $userNotf->update(['email' => $attributes['email']]);
        } else {
            NotificationPreference::create(['user_id' => $userId, 'email' => $attributes['email']]);
        }

        return response()->json(['success' => true, 'message' => 'Notification Preference Updated!']);
    }
}
