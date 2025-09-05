import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { showSuccessAlert } from "../utils/sweetAlert";
import {
    FaBars,
    FaBriefcase,
    FaCog,
    FaFileAlt,
    FaSearch,
    FaSignOutAlt,
    FaUserCircle,
    FaWallet,
} from "react-icons/fa";
import axiosClient from "../assets/js/axios-client";
import { useEffect, useState } from "react";

const JobSeekerLayout = () => {
    const navigate = useNavigate();
    const { setUser, setToken, isAuthenticated } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    const logout = () => {
        axiosClient.post("/logout").then(() => {
            setUser(null);
            setToken(null);
            navigate("/login");
            showSuccessAlert("Successfully Logged out!");
        });
    };

    const SidebarLinks = () => (
        <>
            <Link
                to="/job/seeker/dashboard"
                className="flex items-center px-4 py-3 rounded-lg hover:bg-indigo-800 focus:ring-2 focus:ring-blue-500 text-blue-100 hover:text-white transition-all group"
            >
                <FaUserCircle className="mr-3 text-blue-200 group-hover:text-white" />
                <span>My Account</span>
            </Link>
            <Link
                to="/job/seeker/my-applications"
                className="flex items-center px-4 py-3 rounded-lg hover:bg-indigo-800 focus:ring-2 focus:ring-blue-500 text-blue-100 hover:text-white transition-all group"
            >
                <FaFileAlt className="mr-3 text-blue-200 group-hover:text-white" />
                <span>My Applications</span>
            </Link>
            <Link
                to="/job/seeker/search-jobs"
                className="flex items-center px-4 py-3 rounded-lg hover:bg-indigo-800 focus:ring-2 focus:ring-blue-500 text-blue-100 hover:text-white transition-all group"
            >
                <FaSearch className="mr-3 text-blue-200 group-hover:text-white" />
                <span>Search Jobs</span>
            </Link>
            <Link
                to="/job/seeker/my-balance"
                className="flex items-center px-4 py-3 rounded-lg hover:bg-indigo-800 focus:ring-2 focus:ring-blue-500 text-blue-100 hover:text-white transition-all group"
            >
                <FaWallet className="mr-3 text-blue-200 group-hover:text-white" />
                <span>My Balance</span>
            </Link>
            <Link
                to="/job/seeker/settings"
                className="flex items-center px-4 py-3 rounded-lg hover:bg-indigo-800 focus:ring-2 focus:ring-blue-500 text-blue-100 hover:text-white transition-all group"
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
        </>
    );

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            {/* Mobile Topbar */}
            <div className="md:hidden flex items-center justify-between bg-blue-800 text-white p-4 w-full fixed top-0 left-0 z-50 shadow-md">
                <h2 className="text-2xl font-semibold flex items-center">
                    <FaBriefcase className="mr-2" />
                    JobSeeker
                </h2>
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <FaBars />
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed md:static inset-y-0 left-0 w-64 z-40 transform md:translate-x-0
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 bg-gradient-to-tr from-blue-800 to-indigo-900 shadow-xl`}
            >
                <div className="p-6 border-b border-indigo-700 hidden md:block">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-200">
                        <FaBriefcase className="inline mr-2" />
                        JobSeeker
                    </h2>
                </div>
                <nav className="p-4 space-y-1">
                    <SidebarLinks />
                </nav>
            </aside>

            {/* Overlay for mobile when sidebar is open */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-transparent bg-opacity-90 z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 mt-16 md:mt-0 bg-white md:bg-transparent md:rounded-tl-3xl md:rounded-bl-3xl shadow-sm md:shadow-none">
                <Outlet />
            </main>
        </div>
    );
};

export default JobSeekerLayout;
