import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { showSuccessAlert } from "../utils/sweetAlert";
import { FaBriefcase, FaChevronDown, FaCog, FaFileAlt, FaSearch, FaSignOutAlt, FaUserCircle, FaWallet } from "react-icons/fa";
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
        <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            {/* Sidebar */}
            <aside className="w-64 bg-gradient-to-b from-blue-900 to-indigo-900 shadow-xl hidden md:block transition-all duration-300">
                <div className="p-6 border-b border-indigo-700">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-200">
                        <FaBriefcase className="inline mr-2" />
                        JobSeeker Pro
                    </h2>
                </div>
                <nav className="p-4 space-y-1">
                    <Link
                        to={"/job/seeker/dashboard"}
                        className="flex items-center px-4 py-3 rounded-lg hover:bg-indigo-800 text-blue-100 hover:text-white transition-all group"
                    >
                        <FaUserCircle className="mr-3 text-blue-200 group-hover:text-white" />
                        <span>My Account</span>
                    </Link>
                    <Link
                        to={"/job/seeker/my-applications"}
                        className="flex items-center px-4 py-3 rounded-lg hover:bg-indigo-800 text-blue-100 hover:text-white transition-all group"
                    >
                        <FaFileAlt className="mr-3 text-blue-200 group-hover:text-white" />
                        <span>My Applications</span>
                    </Link>
                    <Link
                        to={"/job/seeker/search-jobs"}
                        className="flex items-center px-4 py-3 rounded-lg hover:bg-indigo-800 text-blue-100 hover:text-white transition-all group"
                    >
                        <FaSearch className="mr-3 text-blue-200 group-hover:text-white" />
                        <span>Search Jobs</span>
                    </Link>
                    <Link
                        to={"/job/seeker/my-balance"}
                        className="flex items-center px-4 py-3 rounded-lg hover:bg-indigo-800 text-blue-100 hover:text-white transition-all group"
                    >
                        <FaWallet className="mr-3 text-blue-200 group-hover:text-white" />
                        <span>My Balance</span>
                    </Link>
                    <Link
                        to={"/job/seeker/settings"}
                        className="flex items-center px-4 py-3 rounded-lg hover:bg-indigo-800 text-blue-100 hover:text-white transition-all group"
                    >
                        <FaCog className="mr-3 text-blue-200 group-hover:text-white" />
                        <span>Settings</span>
                    </Link>
                    <button
                        className="w-full flex items-center px-4 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold shadow-md mt-6 transition-all"
                        onClick={logout}
                    >
                        <FaSignOutAlt className="mr-3" />
                        <span>Sign out</span>
                    </button>
                </nav>
            </aside>

            {/* Mobile sidebar toggle */}
            <div className="md:hidden w-full bg-gradient-to-r from-blue-800 to-indigo-800 shadow-lg p-4">
                <div className="relative">
                    <select
                        className="w-full px-4 py-3 rounded-lg bg-indigo-700 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                        onChange={(e) => {
                            const url = e.target.value;
                            if (url) window.location.href = url;
                        }}
                    >
                        <option value="">Menu</option>
                        <option value="/job/seeker/dashboard">My Account</option>
                        <option value="/job/seeker/my-applications">My Applications</option>
                        <option value="/job/seeker/search-jobs">Search Jobs</option>
                    </select>
                    <FaChevronDown className="absolute right-3 top-3.5 text-blue-200 pointer-events-none" />
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 p-6 md:p-8 bg-white md:bg-transparent md:rounded-tl-3xl md:rounded-bl-3xl shadow-lg md:shadow-none">
                {children}
            </main>
        </div>
    );
};

export default JobSeekerLayout;
