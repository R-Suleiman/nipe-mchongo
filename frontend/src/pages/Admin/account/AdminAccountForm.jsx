import React, { useState } from "react";
import axiosClient from "../../../assets/js/axios-client";
import { useNavigate } from "react-router-dom";
import {
    showTopErrorAlert,
    showTopSuccessAlert,
} from "../../../utils/sweetAlert";
import { useAuth } from "../../../context/AuthProvider";

function AdminAccountForm() {
    const { user: userData } = useAuth();
    const navigate = useNavigate();
    const [updateData, setupdateData] = useState({
        username: userData?.username || "",
        firstname: userData?.firstname || "",
        lastname: userData?.lastname || "",
        email: userData?.email || "",
        phone: userData?.phone || "",
        address: userData?.address || "",
        dob: userData?.dob || "",
        gender: userData?.gender || "",
    });

    const handleInputChange = (e) => {
        setupdateData({ ...updateData, [e.target.name]: e.target.value });
    };

    const updateProfile = (e) => {
        e.preventDefault();
        axiosClient
            .post(`/user/update-profile/${userData.id}`, updateData)
            .then(({ data }) => {
                localStorage.setItem("user", JSON.stringify(data.user));
                showTopSuccessAlert(data.message);
                navigate("/admin/account");
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status == 422) {
                    showTopErrorAlert(response.data.errors);
                }
            });
    };

    return (
        <div className="w-full p-2">
            <h2 className="border-l-4 border-blue-900 text-blue-900 font-semibold text-lg p-2 italic bg-blue-50">
                Edit Account Information
            </h2>

            <div className="w-full p-4 my-4">
                <form onSubmit={updateProfile}>
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
                                value={updateData.firstname}
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
                                value={updateData.lastname}
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
                                value={updateData.username}
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
                                value={updateData.email}
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
                                value={updateData.phone}
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
                                value={updateData.dob}
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
                                value={updateData.gender}
                                onChange={handleInputChange}
                                className="w-10/12 p-2 outline-0 border border-blue-300 rounded-sm"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
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
                                value={updateData.address}
                                onChange={handleInputChange}
                                className="w-10/12 p-2 outline-0 border border-blue-300 rounded-sm"
                            />
                        </div>
                    </div>
                    <div className="my-4">
                        <button className="bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 text-white cursor-pointer">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminAccountForm;
