import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { showSuccessAlert } from "../utils/sweetAlert";
import { FaSignOutAlt } from "react-icons/fa";
import axiosClient from "../assets/js/axios-client";

const JobSeekerLayout = ({ children }) => {
    const navigate = useNavigate();
    const { token, user, setUser, setToken } = useAuth();

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, []);

    const logout = () => {
        axiosClient.post("/logout").then(() => {
            setUser(null);
            setToken(null);
            navigate("/login");
            showSuccessAlert("Successfully Logged out!");
        });
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md hidden md:block">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800">
                        JobSeeker
                    </h2>
                </div>
                <nav className="p-4 space-y-2">
                    <Link
                        to={"/job/seeker/dashboard"}
                        className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700"
                    >
                        My Account
                    </Link>
                    <Link
                        to={"/job/seeker/my-applications"}
                        className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700"
                    >
                        My Applications
                    </Link>
                    <Link
                        to={"/job/seeker/search-jobs"}
                        className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700"
                    >
                        Search Jobs
                    </Link>
                    <Link
                        to={"/job/seeker/my-balance"}
                        className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700"
                    >
                        My Balance
                    </Link>
                    <Link
                        to={"/job/seeker/settings"}
                        className="block px-4 py-2 rounded hover:bg-gray-100 text-gray-700"
                    >
                        Settings
                    </Link>
                    <button
                        className="w-full flex items-center px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 text-white font-semibold"
                        onClick={logout}
                    >
                        <FaSignOutAlt className="mr-3" /> <span>Sign out</span>
                    </button>
                </nav>
            </aside>

            {/* Mobile sidebar toggle */}
            <div className="md:hidden w-full bg-white shadow p-4">
                <select
                    className="w-full px-4 py-2 border rounded-md text-gray-700"
                    onChange={(e) => {
                        const url = e.target.value;
                        if (url) window.location.href = url;
                    }}
                >
                    <option value="">Menu</option>
                    <option value="#">My Account</option>
                    <option value="#">My Applications</option>
                    <option value="#">Search Jobs</option>
                </select>
            </div>

            {/* Main Content */}
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
};

export default JobSeekerLayout;
