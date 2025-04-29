<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => 'required'
        ]);

        if(!Auth::attempt($credentials)) {
            return response()->json(['success' => false, 'message' => 'Invalid Credentials'], 422);
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response()->json(['success' => true, 'message' => 'Login successfully!', 'user' => $user, 'token' => $token], 200);
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        if ($user && $user->currentAccessToken()) {
            $user->currentAccessToken()->delete();
        }

        return response()->json(['success' => true, 'message' => 'Successfully logged out'], 200);
    }

    public function changePassword(Request $request) {
        $attributes = request()->validate([
            'old_password' => 'required',
            'new_password' => ['required', Password::min(8)->letters()->symbols(), 'confirmed']
        ]);

        $user = Auth::user();

        if (!Hash::check($attributes['old_password'], $user->password)) {
            return response()->json(['success' => false, 'message' => 'Invalid old password'], 422);
        }

        $user->update(['password' => bcrypt($attributes['new_password'])]);

        return response()->json(['success' => true, 'message' => 'Password changed successfully!'], 200);
    }
}
