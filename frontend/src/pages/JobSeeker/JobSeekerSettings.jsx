import { useModal } from "../../context/ModalContext";
import ChangePassword from "./ChangePassword";
import NotificationSettings from "./NotificationSettings";
import { useAuth } from "../../context/AuthProvider";
import { Bell, Edit2, Lock, User } from "lucide-react";
import UpdateProfile from "./UpdateProfile";

export default function JobSeekerSettings() {
    const { user } = useAuth();
    const { openModal } = useModal();

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-blue-900">Account Settings</h2>
                    <p className="text-blue-500 mt-1">Manage your profile and preferences</p>
                </div>
            </div>

            <div className="bg-white border border-blue-100 rounded-2xl shadow-sm divide-y divide-blue-50 overflow-hidden">
                {/* Profile Information Card */}
                <div className="flex items-start p-6 hover:bg-blue-50 transition-colors duration-200 group">
                    <div className="flex-shrink-0 mr-4 mt-0.5 p-2 bg-blue-100 rounded-lg text-blue-600 group-hover:bg-blue-200 transition-colors">
                        <User className="text-orange-500 w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-blue-800 group-hover:text-blue-700 transition-colors">
                            Profile Information
                        </h4>
                        <p className="text-sm text-blue-500 mt-1">
                            Update your name, email, and other personal details.
                        </p>
                    </div>
                    <button
                        onClick={() =>
                            openModal({
                                title: `${user?.firstname} ${user?.lastname} Profile`,
                                content: <UpdateProfile />,
                                size: "xl5",
                                variant: "info",
                            })
                        }

                        className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-sm px-4 py-2.5 rounded-xl font-medium transition-all shadow-sm hover:shadow-md ml-4"
                    >
                        <Edit2 className="mr-2 w-4 h-4" />
                        Edit
                    </button>
                </div>

                {/* Change Password Card */}
                <div className="flex items-start p-6 hover:bg-blue-50 transition-colors duration-200 group">
                    <div className="flex-shrink-0 mr-4 mt-0.5 p-2 bg-blue-100 rounded-lg text-blue-600 group-hover:bg-blue-200 transition-colors">
                        <Lock className="text-orange-500 w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-blue-800 group-hover:text-blue-700 transition-colors">
                            Change Password
                        </h4>
                        <p className="text-sm text-blue-500 mt-1">
                            Secure your account by changing your password regularly.
                        </p>
                    </div>
                    <button
                        onClick={() =>
                            openModal(<ChangePassword />, {
                                size: "sm",
                                title: "Change Password",
                            })
                        }
                        className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-sm px-4 py-2.5 rounded-xl font-medium transition-all shadow-sm hover:shadow-md ml-4"
                    >
                        <Edit2 className="mr-2 w-4 h-4" />
                        Edit
                    </button>
                </div>

                {/* Notification Settings Card */}
                <div className="flex items-start p-6 hover:bg-blue-50 transition-colors duration-200 group">
                    <div className="flex-shrink-0 mr-4 mt-0.5 p-2 bg-blue-100 rounded-lg text-blue-600 group-hover:bg-blue-200 transition-colors">
                        <Bell className="text-orange-500 w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-blue-800 group-hover:text-blue-700 transition-colors">
                            Notification Settings
                        </h4>
                        <p className="text-sm text-blue-500 mt-1">
                            Manage how and when you receive job alerts.
                        </p>
                    </div>
                    <button
                        onClick={() =>
                            openModal({
                                title: `${user?.firstname} ${user?.lastname}`,
                                content: <NotificationSettings />,
                                size: "xl5",
                                variant: "default",
                            })
                        }
                        className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-sm px-4 py-2.5 rounded-xl font-medium transition-all shadow-sm hover:shadow-md ml-4"
                    >
                        <Edit2 className="mr-2 w-4 h-4" />
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}
