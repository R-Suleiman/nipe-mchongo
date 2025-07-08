import {
    FiUser, FiLock, FiBell, FiLogOut
} from "react-icons/fi";
import { useModal } from "../../context/ModalContext";
import JobSeekerLayout from "../../layouts/JobSeekerLayout";
import MyProfile from "./MyProfile";
import ChangePassword from "./ChangePassword";
import NotificationSettings from "./NotificationSettings";
// import EmailPreferences from "./EmailPreferences";
// import LocationPreferences from "./LocationPreferences";

export default function JobSeekerSettings() {
    const { openModal } = useModal();

    const settings = [
        {
            title: "Profile Information",
            description: "Update your name, email, and other personal details.",
            icon: <FiUser className="text-orange-500 w-5 h-5" />,
            component: <MyProfile />
        },
        {
            title: "Change Password",
            description: "Secure your account by changing your password regularly.",
            icon: <FiLock className="text-orange-500 w-5 h-5" />,
            component: <ChangePassword />
        },
        {
            title: "Notification Settings",
            description: "Manage how and when you receive job alerts.",
            icon: <FiBell className="text-orange-500 w-5 h-5" />,
            component: <NotificationSettings />
        },
        // {
        //     title: "Email Preferences",
        //     description: "Control the types of emails you receive from us.",
        //     icon: <FiMail className="text-orange-500 w-5 h-5" />,
        //     component: <EmailPreferences />
        // },
        // {
        //     title: "Location Preferences",
        //     description: "Update your preferred job location.",
        //     icon: <FiMapPin className="text-orange-500 w-5 h-5" />,
        //     component: <LocationPreferences />
        // },
    ];

    return (
        <JobSeekerLayout>
            <div className="max-w-8xl mx-auto px-4 py-10">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-blue-900">Account Settings</h2>
                        <p className="text-blue-500 mt-1">Manage your profile and preferences</p>
                    </div>
                    <button className="inline-flex items-center px-4 py-2.5 bg-white text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-50 transition-all text-sm font-semibold shadow-sm hover:shadow-md">
                        <FiLogOut className="mr-2" />
                        Logout
                    </button>
                </div>

                <div className="bg-white border border-blue-100 rounded-2xl shadow-sm divide-y divide-blue-50 overflow-hidden">
                    {settings.map((setting, index) => (
                        <div
                            key={index}
                            className="flex items-start p-6 hover:bg-blue-50 transition-colors duration-200 group"
                        >
                            <div className="flex-shrink-0 mr-4 mt-0.5 p-2 bg-blue-100 rounded-lg text-blue-600 group-hover:bg-blue-200 transition-colors">
                                {setting.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-lg font-semibold text-blue-800 group-hover:text-blue-700 transition-colors">
                                    {setting.title}
                                </h4>
                                <p className="text-sm text-blue-500 mt-1">{setting.description}</p>
                            </div>

                            <button
                                onClick={() =>
                                    openModal(setting.component, {
                                        size: "xl2",
                                        title: setting.title,
                                    })
                                }
                                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-sm px-4 py-2.5 rounded-xl font-medium transition-all shadow-sm hover:shadow-md ml-4"
                            >
                                <FiEdit2 className="mr-2" />
                                Edit
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-12 border-t border-blue-100 pt-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-medium text-blue-800">Account Actions</h3>
                            <p className="text-sm text-blue-500 mt-1">Advanced settings and options</p>
                        </div>
                        <button className="inline-flex items-center px-4 py-2.5 bg-white text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-all text-sm font-semibold shadow-sm hover:shadow-md">
                            <FiTrash2 className="mr-2" />
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </JobSeekerLayout>
    );
}
