import React, { useState } from "react";
import axiosClient from "../../../assets/js/axios-client";
import { showTopSuccessAlert } from "../../../utils/sweetAlert";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
    const user_id = localStorage.getItem("user_id");
    const otp = localStorage.getItem("resetOtp");
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
    const [errors, setErrors] = useState("");
    const [loading, setLoading] = useState(false);

    const resetPassword = (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors("");

        if (newPassword !== newPasswordConfirm) {
            setErrors("New passwords do not match");
            setLoading(false);
            return;
        }

        axiosClient
            .post("/password/reset", { user_id, otp, password: newPassword })
            .then((response) => {
                showTopSuccessAlert(response.data.message);
                setLoading(false);
                setNewPassword("");
                setNewPasswordConfirm("");
                localStorage.removeItem("user_id");
                localStorage.removeItem("resetOtp");
                navigate("/login");
            })
            .catch((error) => {
                setErrors(
                    error.response?.data?.message || "Something went wrong"
                );
                setLoading(false);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
                    Create New Password
                </h2>
                <form onSubmit={resetPassword} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            New Password
                        </label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            value={newPasswordConfirm}
                            onChange={(e) =>
                                setNewPasswordConfirm(e.target.value)
                            }
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition-all duration-300 cursor-pointer"
                    >
                        {loading ? "Saving..." : "Create Password"}
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

export default ResetPassword;
