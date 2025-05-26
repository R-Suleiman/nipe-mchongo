import React from "react";
import JobSeekerLayout from "../../layouts/JobSeekerLayout";
import { useModal } from "../../context/ModalContext";

export default function ConfirmApplication({ gig }) {
    const [loading, setLoading] = React.useState(false);
    const { openModal, closeModal } = useModal();
    const user_id = 10;

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
                        onClick={() => {
                            setLoading(true);
                            // Simulate application submission
                            setTimeout(() => {
                                setLoading(false);
                                closeModal();
                                alert("Application submitted successfully!");
                            }, 2000);
                        }}
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
