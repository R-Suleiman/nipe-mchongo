import React from "react";
import { useModal } from "../../context/ModalContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosClient from "../../assets/js/axios-client";
import { useAuth } from "../../context/AuthProvider";


export default function ConfirmApplication({ gig, gigDetails }) {
    const { user } = useAuth();
    const [loading, setLoading] = React.useState(false);
    const { closeModal } = useModal();
    const user_id = user?.id;

    const handleConfirm = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.post('/gig-seeker/gig/apply', {
                gig_id: gig.id,
                gig_poster_id: gig?.gig_poster_id,
                gig_seeker_id: user_id
            });

            toast.success('Application submitted successfully!');
            closeModal();
            gigDetails();
        } catch (error) {
            toast.error('Error submitting application!');
            console.error(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <div className="bg-white shadow-lg rounded-3xl p-6">
                <p className="text-gray-600 mb-4">Are you sure you want to apply for this gig?</p>
                {/* gigId = {gig.id} <br />
                poster_id = {gig.gig_poster_id} <br />
                seeker_id = {user_id} <br /> */}

                <div className="flex justify-end gap-4 px-4 py-3 sm:px-6">
                    {/* Cancel Button */}
                    <button
                        onClick={closeModal}
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-gray-300 rounded-md hover:bg-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                    >
                        Cancel
                    </button>

                    {/* Confirm Button */}
                    <button
                        onClick={handleConfirm}
                        disabled={loading}
                        className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${loading
                            ? "bg-green-300 text-white cursor-not-allowed"
                            : "bg-green-600 text-white hover:bg-green-700"
                            }`}
                    >
                        {loading ? "Submitting..." : "Confirm Application"}
                    </button>
                </div>

            </div>
        </div>
    );
}
