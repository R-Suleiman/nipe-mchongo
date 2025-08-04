import React, { useState } from "react";
import Spinner from "../../../components/Spinner";
import { useModal } from "../../../context/ModalContext";
import axiosClient from "../../../assets/js/axios-client";
import {
    showTopErrorAlert,
    showTopSuccessAlert,
} from "../../../utils/sweetAlert";

function UpdateProfilePhoto(props) {
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const { closeModal } = useModal();
    const { getUser } = props;

    const updateProfile = (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("photo", photo);

        axiosClient
            .post(`/user/profile/update-photo`, formData)
            .then(({ data }) => {
                showTopSuccessAlert(data.message);
                setLoading(false);
                closeModal();
                getUser();
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status == 422) {
                    showTopErrorAlert(response.data.errors);
                }
                setLoading(false);
            });
    };

    return (
        <div className="w-full p-4">
            <form className="w-11/12 mx-auto" onSubmit={updateProfile}>
                <p className="text-lg text-gray-600 my-2">
                    Allowed formats: png, jpg, jpeg. Max size: 2MB
                </p>
                <div className="w-full md:w-11/12 flex flex-col space-y-2">
                    <label htmlFor="photo" className="text-gray-600 text-lg">
                        Profile Photo
                    </label>
                    <input
                        type="file"
                        name="photo"
                        onChange={(e) => {
                            setPhoto(e.target.files[0]);
                        }}
                        accept="image/*"
                        className="w-full p-2 border border-blue-600 rounded-md"
                    />
                </div>
                <div className="w-fit mx-auto my-4">
                    <button
                        className="bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 text-white cursor-pointer"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center">
                                <Spinner />
                                <span>Saving...</span>{" "}
                            </div>
                        ) : (
                            "Save Photo"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateProfilePhoto;
