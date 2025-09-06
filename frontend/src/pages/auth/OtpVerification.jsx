import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { showTopSuccessAlert } from "../../utils/sweetAlert";
import axiosClient from "../../assets/js/axios-client";
import logo from "../../assets/images/logo-2.png";

export default function OtpVerification() {
    const { user } = useAuth();
    const [otp, setOtp] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const tempUser = JSON.parse(localStorage.getItem("USER"));

    // Timers
    const [expiryTime, setExpiryTime] = useState(300); // 5 min = 300s
    const [resendCooldown, setResendCooldown] = useState(30); // 30s

    const navigate = useNavigate();

    // If user is not logged in or already rerified, redirect to login
    useEffect(() => {
        const newUser = user || tempUser;
        if (newUser) {
            if (newUser?.is_verified === 1) {
                localStorage.removeItem("USER");
                localStorage.removeItem("ACCESS_TOKEN");
                navigate("/login");
            }
        } else {
            navigate("/login");
        }
    }, [user, tempUser, navigate]);

    // Handle OTP verification
    const handleVerification = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axiosClient.post("/verify-otp", {
                code: otp,
                email: user?.email || tempUser.email,
            });
            showTopSuccessAlert("Verification successful. Login to proceed");
            localStorage.removeItem("USER");
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const resendOtp = async () => {
        console.log(user);
        if (resendCooldown > 0) return; // block until cooldown is done
        setLoading2(true);
        setError(null);
        try {
            const response = await axiosClient.post("/resend-otp", {
                user_id: user?.id || tempUser.id,
            });
            showTopSuccessAlert(response.data.message);

            // Reset timers
            setExpiryTime(300); // new OTP valid for 5 minutes
            setResendCooldown(30); // cooldown again
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading2(false);
        }
    };

    // Countdown effect
    useEffect(() => {
        const interval = setInterval(() => {
            setExpiryTime((prev) => (prev > 0 ? prev - 1 : 0));
            setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Helper to format time (mm:ss)
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md px-8 py-4 bg-white rounded-xl shadow-md m-3">
                <div className="w-fit mx-auto">
                    <img src={logo} alt="logo" className="w-40 h-32" />
                </div>
                <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">
                    Verify Your Email
                </h2>
                <p className="text-sm text-gray-600 text-center mb-6">
                    Enter the 6-digit code sent to your email.
                </p>

                <form onSubmit={handleVerification} className="space-y-4">
                    <input
                        type="text"
                        maxLength="6"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full border border-gray-300 rounded-xl px-4 py-2 text-center tracking-widest text-lg"
                        placeholder="______"
                    />
                    <button
                        type="submit"
                        disabled={expiryTime === 0}
                        className={`w-full py-2 rounded-xl text-white ${
                            expiryTime === 0
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>

                    {/* Timers */}
                    <p className="text-gray-600 text-sm text-center mt-2">
                        OTP expires in:{" "}
                        <span className="font-bold">
                            {formatTime(expiryTime)}
                        </span>
                    </p>
                    <p className="text-gray-600 text-sm text-center">
                        {resendCooldown > 0 ? (
                            <>You can resend OTP in {resendCooldown}s</>
                        ) : (
                            "You can request a new OTP now."
                        )}
                    </p>

                    {/* Resend button */}
                    <p
                        className={`text-center my-4 cursor-pointer ${
                            resendCooldown > 0
                                ? "text-gray-400"
                                : "text-blue-900"
                        }`}
                        onClick={resendOtp}
                    >
                        {loading2 ? "Resending OTP..." : "Resend OTP"}
                    </p>

                    {error && (
                        <p className="text-sm text-center mt-2 text-red-600">
                            {error}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
