import React from "react";
import { useModal } from "../../context/ModalContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosClient from "../../assets/js/axios-client";
import { useAuth } from "../../context/AuthProvider";


export default function ConfirmApplication({ gig }) {
    const { user } = useAuth();
    const [loading, setLoading] = React.useState(false);
    const { closeModal } = useModal();
    const user_id = user?.id;

    const handleConfirm = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.post('/gig-seeker/gig/apply', {
                gig_id: gig.id,
                poster_id: gig.poster_id,
                seeker_id: user_id
            });

            toast.success('Application submitted successfully!');
            closeModal();
        } catch (error) {
            toast.error('Error submitting application!');
            console.error("Error submitting application:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <div className="bg-white shadow-lg rounded-3xl p-6">
                <p className="text-gray-600 mb-4">Are you sure you want to apply for this gig?</p>
                gigId = {gig.id} <br />
                poster_id = {gig.poster_id} <br />
                seeker_id = {user_id} <br />

                <div className="flex justify-end space-x-4">
                    <button
                        onClick={() => closeModal()}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={loading}
                        className={`px-4 py-2 ${loading ? "bg-orange-300" : "bg-orange-500"} text-white rounded-lg hover:bg-orange-600 transition`}
                    >
                        {loading ? "Submitting..." : "Confirm Application"}
                    </button>
                </div>
            </div>
        </div>
    );
}
