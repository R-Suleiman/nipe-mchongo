import React, { useEffect, useState } from "react";
import userImg from "../../../assets/images/user.avif";
import { FaBell, FaLightbulb } from "react-icons/fa";
import Spinner from "../../../components/Spinner";
import axiosClient from "../../../assets/js/axios-client";
import {
    showTopErrorAlert,
    showTopSuccessAlert,
} from "../../../utils/sweetAlert";
import Loading from "../../../components/Loading";
import { useAuth } from "../../../context/AuthProvider";

function Settings() {
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const [notificationType, setNotificationType] = useState({
        email: false,
    });

    const handleNotificationInput = (e) => {
        setNotificationType({
            ...notificationType,
            [e.target.name]: e.target.checked,
        });
    };

    const getNotificationPreferences = () => {
        setLoading(true);
        axiosClient
            .get("/notification-preference")
            .then(({ data }) => {
                if (data.preferences) {
                    setNotificationType(data.preferences);
                }
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
                setLoading(false)
            })
    };

    useEffect(() => {
        getNotificationPreferences();
    }, []);

    const updateNotificationPreference = (e) => {
        e.preventDefault();
        setLoading(true);

        axiosClient
            .post("/notification-preference", notificationType)
            .then(({ data }) => {
                showTopSuccessAlert(data.message);
                getNotificationPreferences();
                setLoading(false)
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status == 422) {
                    showTopErrorAlert("An error has occured!");
                }
                setLoading(false)
            })
    };

    {
        return loading ? (
            <Loading />
        ) : (
            <div className="w-full p-2">
                <h2 className="border-l-4 border-blue-900 text-blue-900 font-semibold text-lg p-2 italic bg-blue-50">
                    Settings
                </h2>

                {/* Notifications Form */}
                <div className="border border-gray-300 rounded-sm p-4 my-4">
                    <form onSubmit={updateNotificationPreference}>
                        <div className="flex items-center space-x-2 m-2">
                            <FaBell className="text-blue-600" />
                            <h4 className="text-lg text-blue-900 font-semibold">
                                Notification Preferences
                            </h4>
                        </div>
                        <h3 className="text-gray-600 italic">
                            Check the following box to allow Notifications on Job
                            Applications
                        </h3>
                        <div className="flex items-center space-x-4 my-2">
                            <label htmlFor="" className="text-gray-600">
                                Email Notifications:{" "}
                            </label>

                            {
                                user?.email ? (
                                    <input
                                    type="checkbox"
                                    name="email"
                                    value={notificationType?.email}
                                    onChange={handleNotificationInput}
                                    checked={notificationType?.email}
                                />
                                ) : (
                                    <span className="text-gray-600">Please set up your email in profile to enable email notification.</span>
                                )
                            }

                        </div>
                        <div className="my-4">
                            <button
                                className="bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 text-white cursor-pointer flex items-center space-x-2 font-semibold"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <Spinner />
                                        <span>Updating...</span>{" "}
                                    </div>
                                ) : (
                                    "Update Preference"
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* theme */}
                <div className="w-full my-4 bg-blue-50 p-4">
                    <h4 className="text-lg text-blue-900 mb-2 font-semibold">
                        App Theme
                    </h4>
                    <div className="w-fit my-2 p-2">
                        <p className="flex space-x-4 text-gray-600">
                            <span>Current Theme:</span>{" "}
                            <span className="font-semibold">Light Mode</span>
                        </p>
                    </div>

                    <div>
                        <button className="bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 text-white cursor-pointer flex items-center space-x-2 font-semibold">
                            <span>Change Theme</span>
                        </button>
                    </div>
                </div>

                {/* Theme Form */}
                <div className="border border-gray-300 rounded-sm p-4 hidden">
                    <form>
                        <FaLightbulb className="text-blue-600 my-2" />
                        <h3 className="text-gray-600 italic">
                            Set how you want the App theme to appear
                        </h3>
                        <div className="flex space-x-4 my-2 flex-col">
                            <label htmlFor="theme" className="text-gray-600">
                                Select Theme:{" "}
                            </label>
                            <div>
                                Dark Theme <input type="radio" name="theme" />
                            </div>
                            <div>
                                {" "}
                                Light Theme <input type="radio" name="theme" />
                            </div>
                        </div>
                        <div className="my-4">
                            <button className="bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 text-white cursor-pointer flex items-center space-x-2 font-semibold">
                                <span>Save Theme</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Settings;
