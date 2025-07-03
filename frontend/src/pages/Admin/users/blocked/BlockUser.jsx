import React, { useState } from "react";
import { FaBan } from "react-icons/fa";
import axiosClient from "../../../../assets/js/axios-client";
import {
    showTopErrorAlert,
    showTopSuccessAlert,
} from "../../../../utils/sweetAlert";
import { useModal } from "../../../../context/ModalContext";

function BlockUser({ userId, reload }) {
    const [reason, setReason] = useState();
    const { closeModal } = useModal();

    const blockUser = () => {
        axiosClient
            .post(`/user/block-user/${userId}`, { reason })
            .then(({ data }) => {
                showTopSuccessAlert(data.message);
                closeModal();
                reload();
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status == 422) {
                    showTopErrorAlert(response.data.errors);
                }
            });
    };

    return (
        <div className="w-full md:w-11/12 mx-auto flex flex-col items-center">
            <h2 className="text-center my-3 text-xl text-gray-600 font-semibold">
                Are you sure you want to block this user?
            </h2>
            <FaBan className="text-5xl text-white bg-red-600 p-2 rounded-full my-6" />

            <div className="w-full flex flex-col space-y-2">
                <label htmlFor="reason" className="text-lg text-gray-900">
                    Please provide a reason for user blocking
                </label>
                <textarea
                    name="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={5}
                    className="w-10/12 p-2 outline-0 border border-blue-300 rounded-sm"
                ></textarea>
            </div>

            <div className="my-4">
                <button
                    onClick={blockUser}
                    className="bg-red-500 py-2 px-4 rounded-md hover:bg-red-600 text-white cursor-pointer"
                >
                    Block user
                </button>
            </div>
        </div>
    );
}

export default BlockUser;
