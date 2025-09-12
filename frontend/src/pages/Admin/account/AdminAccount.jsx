import React, { useEffect, useState } from "react";
import userImg from "../../../assets/images/user.avif";
import { Link, useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { useModal } from "../../../context/ModalContext";
import UpdateProfilePhoto from "./UpdateProfilePhoto";
import {
    showTopErrorAlert,
    showTopSuccessAlert,
} from "../../../utils/sweetAlert";
import Loading from "../../../components/Loading";
import axiosClient from "../../../assets/js/axios-client";

function AdminAccount() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const { openModal } = useModal();
    const [loading, setLoading] = useState(false);

    const [passwordAttributes, setPaaswordAttributes] = useState({
        old_password: "",
        new_password: "",
        new_password_confirmation: "",
    });

    const handleInputChange = (e) => {
        setPaaswordAttributes({
            ...passwordAttributes,
            [e.target.name]: e.target.value,
        });
    };

    const getUser = () => {
        setLoading(true);
        axiosClient.get("/get-user").then(({ data }) => {
            setUser(data.user);
            setLoading(false);
        });
    };

    useEffect(() => {
        getUser();
    }, []);

    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        axiosClient
            .post("/change-password", passwordAttributes)
            .then(({ data }) => {
                showTopSuccessAlert(data.message);
                navigate(".jobposter/account");
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    showTopErrorAlert(
                        response.data.errors || {
                            email: [response.data.message],
                        }
                    );
                }
            });
    };

    {
        return loading ? (
            <Loading />
        ) : (
            <div className="w-full p-2">
                <h2 className="border-l-4 border-blue-900 text-blue-900 font-semibold text-lg p-2 italic bg-blue-50">
                    Account
                </h2>

                <div className="w-full p-4 my-4 bg-blue-50">
                    <h4 className="text-lg text-blue-900 mb-4 font-semibold">
                        Profile Information
                    </h4>
                    <div className="w-full flex flex-col md:flex-row md:space-x-4">
                        <div className="w-32 h-32 relative overflow-hidden">
                            <img
                                src={user?.profile_photo || userImg}
                                alt=""
                                className="w-full h-full rounded-full border-2 border-blue-200"
                            />
                            <div
                                className="w-full absolute top-0 h-full rounded-full opacity-0 hover:opacity-95 bg-gray-600 items-center justify-center z-50 flex cursor-pointer"
                                onClick={() =>
                                    openModal({
                                        title: `Update Profile Photo`,
                                        content: (
                                            <UpdateProfilePhoto
                                                getUser={getUser}
                                            />
                                        ),
                                        size: "xl4",
                                        variant: "info",
                                    })
                                }
                            >
                                <FaPen className="text-black text-3xl" />
                            </div>
                        </div>
                        <div className="w-full md:w-4/6 my-4 md:my-0">
                            <table className="w-full border border-gray-300">
                                <tbody>
                                    <tr>
                                        <th className="p-2 border border-gray-300 text-left w-2/6">
                                            Username:
                                        </th>
                                        <td className="p-2 border border-gray-300 w-4/6">
                                            {user?.username}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="p-2 border border-gray-300 text-left w-2/6">
                                            Full Name:
                                        </th>
                                        <td className="p-2 border border-gray-300 w-4/6">
                                            {user?.firstname} {user?.lastname}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="p-2 border border-gray-300 text-left w-2/6">
                                            Email:
                                        </th>
                                        <td className="p-2 border border-gray-300 w-4/6">
                                            {user?.email}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="p-2 border border-gray-300 text-left w-2/6">
                                            Date of Birth:
                                        </th>
                                        <td className="p-2 border border-gray-300 w-4/6">
                                            {user?.dob}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="p-2 border border-gray-300 text-left w-2/6">
                                            Phone Number:
                                        </th>
                                        <td className="p-2 border border-gray-300 w-4/6">
                                            {user?.phone}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="p-2 border border-gray-300 text-left w-2/6">
                                            Address:
                                        </th>
                                        <td className="p-2 border border-gray-300 w-4/6">
                                            {user?.address}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="p-2 border border-gray-300 text-left w-2/6">
                                            Gender:
                                        </th>
                                        <td className="p-2 border border-gray-300 w-4/6">
                                            {user?.gender}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="my-4">
                        <Link to="/admin/account/edit">
                            <button className="bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 text-white cursor-pointer">
                                Update Profile
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="w-full p-2">
                    <h4 className="text-lg text-blue-900 mb-4 font-semibold">
                        Change Password
                    </h4>
                    <form onChange={handlePasswordUpdate}>
                        <div className="w-full md:w-2/6 flex flex-col space-y-2 my-2">
                            <label
                                htmlFor="old_password"
                                className="text-gray-600 text-lg font-semibold"
                            >
                                Current Password:
                            </label>
                            <input
                                type="password"
                                name="old_password"
                                value={passwordAttributes.old_password}
                                onChange={handleInputChange}
                                className="p-2 outline-0 border border-blue-300 rounded-sm"
                            />
                        </div>
                        <div className="w-full md:w-2/6 flex flex-col space-y-2 my-2">
                            <label
                                htmlFor="new_password"
                                className="text-gray-600 text-lg font-semibold"
                            >
                                New Password:
                            </label>
                            <input
                                type="password"
                                name="new_password"
                                value={passwordAttributes.new_password}
                                onChange={handleInputChange}
                                className="p-2 outline-0 border border-blue-300 rounded-sm"
                            />
                        </div>
                        <div className="w-full md:w-2/6 flex flex-col space-y-2 my-2">
                            <label
                                htmlFor="new_password_confirmation"
                                className="text-gray-600 text-lg font-semibold"
                            >
                                Confirm New Password:
                            </label>
                            <input
                                type="password"
                                value={passwordAttributes.new_password_confirm}
                                onChange={handleInputChange}
                                name="new_password_confirmation"
                                className="p-2 outline-0 border border-blue-300 rounded-sm"
                            />
                        </div>
                        <div className="my-4">
                            <button className="bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 text-white cursor-pointer">
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AdminAccount;
