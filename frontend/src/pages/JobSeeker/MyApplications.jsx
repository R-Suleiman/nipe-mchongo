import { useModal } from "../../context/ModalContext";
import JobSeekerLayout from "../../layouts/JobSeekerLayout";
import ApplicationDetails from "./ApplicationDetails";
import { useEffect, useState } from "react";
import axiosClient from "../../assets/js/axios-client";
import { useAuth } from "../../context/AuthProvider";

export default function MyApplications() {
    const { openModal } = useModal();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const userId = user?.id;

    const [totalApplications, setTotalApplications] = useState(0);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await axiosClient.get('/gig-seeker/applications', {
                    params: { gig_seeker_id: userId },
                });

                // 👇 Extract correctly
                setApplications(res.data.applications || []);
                setTotalApplications(res.data.total || 0);

                console.log("Applications fetched:", res.data);
            } catch (err) {
                console.error("Error fetching applications:", err);
            }
        };

        if (userId) fetchApplications();
    }, [userId]);

    const handleCancelApplication = async (applicationId) => {
        if (!window.confirm("Are you sure you want to cancel this application?")) return;
        try {
            setLoading(true);
            const response = await axiosClient.delete(`/gig-seeker/cancel/gig/application/${applicationId}`);
            if (response.status === 200) {
                setApplications(prev => prev.filter(app => app.id !== applicationId));
                alert("Application cancelled successfully.");
            }
        } catch (error) {
            console.error("Error cancelling application:", error.response || error.message);
            alert("Failed to cancel application. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <JobSeekerLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">My Gig Applications</h1>
                    <p className="text-gray-600">Track all your applied gigs across Tanzania.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Applications Overview</h2>
                    <div className="overflow-x-auto">
                        {applications.length === 0 ? (
                            <p className="text-center py-4 text-gray-500">No applications found.</p>
                        ) : (
                            <table className="w-full table-auto text-sm text-left text-gray-600">
                                <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
                                    <tr>
                                        <th className="px-4 py-2">Title</th>
                                        <th className="px-4 py-2">Location</th>
                                        <th className="px-4 py-2">Status</th>
                                        <th className="px-4 py-2">Applied On</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {applications.map((app) => (
                                        <tr key={app.id} className="border-b">
                                            <td className="px-4 py-2">{app.gig?.title || '—'}</td>
                                            <td className="px-4 py-2">{app.gig?.location || '—'}</td>
                                            <td className="px-4 py-2">{app.status?.name || '—'}</td>
                                            <td className="px-4 py-2">{new Date(app.created_at).toLocaleDateString()}</td>

                                            <td className="px-4 py-3 space-x-2">

                                                <button
                                                    onClick={() =>
                                                        openModal(<ApplicationDetails application={app} />, "xl7")
                                                    }
                                                    className="inline-block bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg font-semibold transition"
                                                >
                                                    Preview
                                                </button>



                                                {(app.application_status === "pending" || app.application_status === "denied") && (
                                                    <button
                                                        onClick={() => handleCancelApplication(app.id)}
                                                        className="py-2 px-4 bg-red-600 hover:bg-red-500 text-white rounded-md text-xs font-medium"
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </JobSeekerLayout>
    );
}
