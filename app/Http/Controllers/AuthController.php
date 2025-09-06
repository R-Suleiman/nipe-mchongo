<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Mail\SendOtpMail;
use App\Models\BlockedUser;
use App\Models\Otp;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6',
            'usertype' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        $user = User::create([
            'firstname' => $request->firstName,
            'lastname' => $request->lastName,
            'email' => $request->email,
            'usertype' => $request->usertype,
            'password' => Hash::make($request->password),
        ]);

        $code = rand(100000, 999999);

        Otp::create([
            'user_id' => $user->id,
            'code' => $code,
            'expires_at' => Carbon::now()->addMinutes(5),
        ]);

        // Dispatch email with an OPT to the user
        Mail::to($user->email)->send(new SendOtpMail($code, $user->firstname));

        return response()->json([
            'message' => 'User registered successfully. OTP sent to your email.',
            'user' => $user,
        ], 201);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required|string|size:6',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $otp = Otp::where('user_id', $user->id)
            ->where('code', $request->code)
            ->where('expires_at', '>=', Carbon::now())
            ->latest()
            ->first();

        if (!$otp) {
            return response()->json(['message' => 'Invalid or expired OTP'], 422);
        }

        $user->is_verified = true;
        $user->email_verified_at = Carbon::now();
        $user->save();

        // OTPs cleanup
        Otp::where('user_id', $user->id)->delete();

        return response()->json(['message' => 'Phone number verified successfully.']);
    }

    public function resendOtp(Request $request)
    {
        $user = User::find($request->user_id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // OTPs cleanup
        Otp::where('user_id', $user->id)->delete();

        $otpCode = rand(100000, 999999);

        Otp::create([
            'user_id' => $user->id,
            'code' => $otpCode,
            'expires_at' => now()->addMinutes(5),
        ]);

        Mail::to($user->email)->send(new SendOtpMail($otpCode, $user->firstname));

        return response()->json([
            'success' => true,
            'message' => 'OTP resent to your email',
        ]);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => 'required'
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json(['success' => false, 'message' => 'Invalid Credentials'], 422);
        }

        $user = Auth::user();

        if (!$user->is_verified) {
            $code = rand(100000, 999999);

            Otp::create([
                'user_id' => $user->id,
                'code' => $code,
                'expires_at' => Carbon::now()->addMinutes(5),
            ]);

            // Dispatch email with an OPT to the user
            Mail::to($user->email)->send(new SendOtpMail($code, $user->firstname));

            return response()->json([
                'success' => false,
                'isVerified' => false,
                'message' => 'Your account is not verified. Please verify your account. A verification code has been sent to your email',
                'user' => $user
            ], 403);
        }

        // Check if the user is blocked
        $isBlocked = BlockedUser::where('user_id', $user->id)->exists();
        if ($isBlocked) {
            Auth::logout();
            return response()->json([
                'success' => false,
                'message' => 'Your account has been restricted. Please contact support.'
            ], 403);
        }

        $token = $user->createToken('main')->plainTextToken;
        $user['profile_photo'] = asset('storage/' . $user['profile_photo']);

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

    public function changePassword(Request $request)
    {
        $attributes = request()->validate([
            'old_password' => 'required',
            'new_password' => ['required', Password::min(8)->letters()->symbols(), 'confirmed']
        ]);

        $user = Auth::user();

        if (!Hash::check($attributes['old_password'], $user['password'])) {
            return response()->json(['success' => false, 'message' => 'Invalid old password'], 422);
        }

        $user->update(['password' => bcrypt($attributes['new_password'])]);

        return response()->json(['success' => true, 'message' => 'Password changed successfully!'], 200);
    }

    public function requestPasswordReset(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|string',
        ]);

        $user = User::where('email', $data['email'])->first();

        if (!$user) {
            return response()->json(['message' => 'The email address is not found'], 404);
        }

        Otp::where('user_id', $user->id)->delete();

        $otpCode = rand(100000, 999999);
        Otp::create([
            'user_id' => $user->id,
            'code' => $otpCode,
            'expires_at' => now()->addMinutes(5),
        ]);

        // Send via email
        Mail::to($user->email)->send(new SendOtpMail($otpCode, $user->firstname));

        return response()->json([
            'success' => true,
            'message' => 'A verification code has been sent to your email.',
            'user_id' => $user->id,
        ]);
    }

    public function verifyResetOtp(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'otp' => 'required|string',
        ]);

        $otp = Otp::where('user_id', $data['user_id'])
            ->where('expires_at', '>', now())
            ->orderByDesc('created_at')
            ->first();

        if (!$otp || $otp->code !== $data['otp']) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid or expired OTP',
            ], 422);
        }

        return response()->json([
            'success' => true,
            'message' => 'OTP verified. You may now reset your password.',
        ]);
    }

    public function resetPassword(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'otp' => 'required|string',
            'password' => 'required|min:6',
        ]);

        $otp = Otp::where('user_id', $data['user_id'])
            ->where('expires_at', '>', now())
            ->orderByDesc('created_at')
            ->first();

        if (!$otp || $otp->code !== $data['otp']) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid or expired OTP',
            ], 422);
        }

        $user = User::find($data['user_id']);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->password = Hash::make($data['password']);
        $user->save();

        // Clean up OTP
        Otp::where('user_id', $user->id)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Password reset successfully.',
        ]);
    }
}
