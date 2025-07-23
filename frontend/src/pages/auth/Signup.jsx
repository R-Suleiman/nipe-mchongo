import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { showTopSuccessAlert } from "../../utils/sweetAlert";
import axiosClient from "../../assets/js/axios-client";

function Signup() {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        phone_number: "",
        usertype: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);

        if (formValues.password !== formValues.confirmPassword) {
            return setError("Passwords do not match");
        }

        try {
            const response = await axiosClient.post("/register", formValues);
            setUser(response.data.user);
            showTopSuccessAlert(response.data.message);
            navigate("/verify-otp");
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[url('/assets/images/register.png')] bg-cover bg-no-repeat bg-center">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">
                    Register
                </h2>
                <form onSubmit={handleRegister} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            value={formValues.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            value={formValues.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            value={formValues.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            value={formValues.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                            value={formValues.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex gap-3 items-center">
                        <input
                            type="radio"
                            name="usertype"
                            className="border border-gray-300"
                            value="poster"
                            checked={formValues.usertype === "poster"}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="poster">
                            I want to post jobs and create opportunities
                        </label>
                    </div>

                    <div className="flex gap-3 items-center">
                        <input
                            type="radio"
                            name="usertype"
                            className="border border-gray-300"
                            value="seeker"
                            checked={formValues.usertype === "seeker"}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="seeker">
                            I'm here to explore job opportunities
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-xl transition-all duration-300 cursor-pointer"
                    >
                        Create Account
                    </button>

                    {error && (
                        <p className="text-sm text-red-600 text-center">
                            {error}
                        </p>
                    )}
                </form>
                <p className="mt-4 text-sm text-center">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-orange-600 font-medium hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
