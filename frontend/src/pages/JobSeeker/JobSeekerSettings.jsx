import React from "react";
import { useModal } from "../../context/ModalContext";
import { FiUser, FiLock, FiBell, FiLogOut, FiMail, FiMapPin } from "react-icons/fi";
import JobSeekerLayout from "../../layouts/JobSeekerLayout";
import MyProfile from "./MyProfile";

export default function JobSeekerSettings() {
    const { openModal, closeModal } = useModal();
    const settings = [
        {
            title: "Profile Information",
            description: "Update your name, email, and other personal details.",
            icon: <FiUser className="text-orange-500 w-5 h-5" />,
        },
        {
            title: "Change Password",
            description: "Secure your account by changing your password regularly.",
            icon: <FiLock className="text-orange-500 w-5 h-5" />,
        },
        {
            title: "Notification Settings",
            description: "Manage how and when you receive job alerts.",
            icon: <FiBell className="text-orange-500 w-5 h-5" />,
        },
        {
            title: "Email Preferences",
            description: "Control the types of emails you receive from us.",
            icon: <FiMail className="text-orange-500 w-5 h-5" />,
        },
        {
            title: "Location Preferences",
            description: "Update your preferred job location.",
            icon: <FiMapPin className="text-orange-500 w-5 h-5" />,
        },
    ];

    return (
        <JobSeekerLayout>
            <div className="max-w-8xl mx-auto px-4 py-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Settings</h2>

                <div className="bg-white shadow-lg rounded-3xl divide-y divide-gray-200 overflow-hidden">
                    {settings.map((setting, index) => (
                        <div key={index} className="flex items-start p-6 hover:bg-orange-50 transition">
                            <div className="flex-shrink-0 mr-4 mt-1">{setting.icon}</div>
                            <div className="flex-1">
                                <h4 className="text-lg font-semibold text-gray-800">{setting.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
                            </div>
                            <button
                                onClick={() =>
                                    openModal(<MyProfile />, "xl7")
                                }
                                className="text-sm text-orange-600 hover:text-orange-700 font-medium ml-4">Edit</button>
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-right">
                    <button className="inline-flex items-center px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition text-sm font-semibold">
                        <FiLogOut className="mr-2" />
                        Logout
                    </button>
                </div>
            </div>
        </JobSeekerLayout>
    );
}
