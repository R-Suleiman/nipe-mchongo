import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { showTopSuccessAlert } from "../../utils/sweetAlert";
import axiosClient from "../../assets/js/axios-client";

export default function OtpVerification() {
    const { user } = useAuth();
    const [otp, setOtp] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleVerification = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axiosClient.post("/verify-otp", {
                code: otp,
                email: user.email,
            });
            showTopSuccessAlert('verification successfull. Login to proceed')
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    const resendOtp = async () => {
         try {
            const response = await axiosClient.post("/resend-otp", {
                user_id: user.id,
            });
            showTopSuccessAlert(response.data.message)
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
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
                        className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700"
                    >
                        Verify OTP
                    </button>

                    <p className="text-center text-blue-900 my-4 cursor-pointer" onClick={resendOtp}>Resend OTP</p>

                    {error && (
                        <p className="text-sm text-center mt-2 text-gray-600">
                            {error}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
