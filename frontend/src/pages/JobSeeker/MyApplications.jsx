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

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-50">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-blue-800">Applications Overview</h2>
                        <div className="flex items-center space-x-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm text-blue-500">{applications.length} applications</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-blue-100">
                        {applications.length === 0 ? (
                            <div className="py-8 text-center">
                                <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <p className="text-blue-400 font-medium">No applications found</p>
                                <p className="text-sm text-blue-300 mt-1">Your applications will appear here</p>
                            </div>
                        ) : (
                            <table className="w-full">
                                <thead className="bg-blue-50">
                                    <tr className="text-left text-blue-600 text-sm font-semibold">
                                        <th className="px-6 py-3">Title</th>
                                        <th className="px-6 py-3">Location</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3">Applied On</th>
                                        <th className="px-6 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-blue-100">
                                    {applications.map((app) => (
                                        <tr key={app.id} className="hover:bg-blue-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-blue-900">
                                                {app.gig?.title || '—'}
                                            </td>
                                            <td className="px-6 py-4 text-blue-700">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    {app.gig?.location || '—'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${app.status?.name === 'Approved' ? 'bg-blue-100 text-blue-700' :
                                                        app.status?.name === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                            app.status?.name === 'Denied' ? 'bg-red-100 text-red-700' :
                                                                'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {app.status?.name || '—'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-blue-600">
                                                {new Date(app.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                <button
                                                    onClick={() => openModal(<ApplicationDetails application={app} />, "xl7")}
                                                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg font-medium transition shadow-sm hover:shadow-md"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    Details
                                                </button>

                                                {(app.application_status === "pending" || app.application_status === "denied") && (
                                                    <button
                                                        onClick={() => handleCancelApplication(app.id)}
                                                        className="inline-flex items-center bg-white border border-red-200 hover:bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg font-medium transition shadow-sm hover:shadow-md"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
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
