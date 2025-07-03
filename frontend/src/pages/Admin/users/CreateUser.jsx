import React, { useState } from "react";
import axiosClient from "../../../assets/js/axios-client";
import { useNavigate } from "react-router-dom";
import {
    showTopErrorAlert,
    showTopSuccessAlert,
} from "../../../utils/sweetAlert";
import { useModal } from "../../../context/ModalContext";

function CreateUser({ userData = null, type, reload }) {
    const { closeModal } = useModal();
    const [profileData, setProfileData] = useState({
        username: userData?.username || "",
        firstname: userData?.firstname || "",
        lastname: userData?.lastname || "",
        email: userData?.email || "",
        phone: userData?.phone || "",
        address: userData?.address || "",
        dob: userData?.dob || "",
        gender: userData?.gender || "",
        usertype: type,
        mchongo_points: userData?.mchongo_points || "",
        password: userData?.password || "",
    });

    const handleInputChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const createUser = (e) => {
        e.preventDefault();
        if (userData?.id) {
            axiosClient
                .post(`/user/update-user/${userData.id}`, profileData)
                .then(({ data }) => {
                    showTopSuccessAlert(data.message);
                    closeModal();
                    reload()
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status == 422) {
                        showTopErrorAlert(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post(`/user/create-user`, profileData)
                .then(({ data }) => {
                    showTopSuccessAlert(data.message);
                    closeModal();
                    reload()
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status == 422) {
                        showTopErrorAlert(response.data.errors);
                    }
                });
        }
    };

    return (
        <div className="w-full p-2">
            <div className="w-full p-4 my-4">
                <form onSubmit={createUser}>
                    <div className="flex flex-col md:flex-row my-2">
                        <div className="w-full md:w-1/2 flex flex-col space-y-2 my-2">
                            <label
                                htmlFor="firstname"
                                className="text-gray-600 text-lg font-semibold"
                            >
                                First Name:
                            </label>
                            <input
                                type="text"
                                name="firstname"
                                value={profileData.firstname}
                                onChange={handleInputChange}
                                className="w-10/12 p-2 outline-0 border border-blue-300 rounded-sm"
                            />
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col space-y-2 my-2">
                            <label
                                htmlFor="lastname"
                                className="text-gray-600 text-lg font-semibold"
                            >
                                Last Name:
                            </label>
                            <input
                                type="text"
                                name="lastname"
                                value={profileData.lastname}
                                onChange={handleInputChange}
                                className="w-10/12 p-2 outline-0 border border-blue-300 rounded-sm"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row my-2">
                        <div className="w-full md:w-1/2 flex flex-col space-y-2 my-2">
                            <label
                                htmlFor="username"
                                className="text-gray-600 text-lg font-semibold"
                            >
                                Username:
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={profileData.username}
                                onChange={handleInputChange}
                                className="w-10/12 p-2 outline-0 border border-blue-300 rounded-sm"
                            />
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col space-y-2 my-2">
                            <label
                                htmlFor="email"
                                className="text-gray-600 text-lg font-semibold"
                            >
                                Email:
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={profileData.email}
                                onChange={handleInputChange}
                                className="w-10/12 p-2 outline-0 border border-blue-300 rounded-sm"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row my-2">
                        <div className="w-full md:w-1/2 flex flex-col space-y-2 my-2">
                            <label
                                htmlFor="phone"
                                className="text-gray-600 text-lg font-semibold"
                            >
                                Phone Number:
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={profileData.phone}
                                onChange={handleInputChange}
                                className="w-10/12 p-2 outline-0 border border-blue-300 rounded-sm"
                            />
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col space-y-2 my-2">
                            <label
                                htmlFor="dob"
                                className="text-gray-600 text-lg font-semibold"
                            >
                                Date of Birth:
                            </label>
                            <input
                                type="date"
                                name="dob"
                                value={profileData.dob}
                                onChange={handleInputChange}
                                className="w-10/12 p-2 outline-0 border border-blue-300 rounded-sm"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row my-2">
                        <div className="w-full md:w-1/2 flex flex-col space-y-2 my-2">
                            <label
                                htmlFor="gender"
                                className="text-gray-600 text-lg font-semibold"
                            >
                                Gender:
                            </label>
                            <select
                                name="gender"
                                value={profileData.gender}
                                onChange={handleInputChange}
                                className="w-10/12 p-2 outline-0 border border-blue-300 rounded-sm"
                            >
                                <option value="">-- select --</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col space-y-2 my-2">
                            <label
                                htmlFor="address"
                                className="text-gray-600 text-lg font-semibold"
                            >
                                Address:
                            </label>
                            <input
                                name="address"
                                value={profileData.address}
                                onChange={handleInputChange}
                                className="w-10/12 p-2 outline-0 border border-blue-300 rounded-sm"
                            />
                        </div>

                        {!userData?.id && (
                            <div className="w-full md:w-1/2 flex flex-col space-y-2 my-2">
                                <label
                                    htmlFor="password"
                                    className="text-gray-600 text-lg font-semibold"
                                >
                                    Password:
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={profileData.password}
                                    onChange={handleInputChange}
                                    className="w-10/12 p-2 outline-0 border border-blue-300 rounded-sm"
                                />
                            </div>
                        )}

                        {userData?.id && (
                            <div className="w-full md:w-1/2 flex flex-col space-y-2 my-2">
                                <label
                                    htmlFor="mchongo_points"
                                    className="text-gray-600 text-lg font-semibold"
                                >
                                    Mchongo Points:
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    name="mchongo_points"
                                    value={profileData.mchongo_points}
                                    onChange={handleInputChange}
                                    className="w-10/12 p-2 outline-0 border border-blue-300 rounded-sm"
                                />
                            </div>
                        )}
                    </div>
                    <div className="my-4">
                        <button className="bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 text-white cursor-pointer">
                            {userData?.id ? "update user" : "create user"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;
