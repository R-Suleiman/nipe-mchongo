import axios from "axios";
import React, { useState } from "react";
import { showTopSuccessAlert } from "../../../utils/sweetAlert";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../assets/js/axios-client";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosClient.post("/password/forgot", {
                email
            });
            if (response.data.success) {
                showTopSuccessAlert(response.data.message);
            }
            const user_id = response.data.user_id;
            localStorage.setItem("user_id", user_id);
            navigate("/verify-password-reset-otp");
        } catch (error) {
            setErrors(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
                    Forgot Password
                </h2>
                <p className="my-2 text-gray-600">
                    Please enter you email to receive a password reset
                    code.
                </p>
                <form onSubmit={handlePasswordReset} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition-all duration-300"
                    >
                        Send reset code
                    </button>

                    {errors && (
                        <p className="text-sm text-red-600 text-center">
                            {errors}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
