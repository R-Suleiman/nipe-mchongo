import { useModal } from "../../context/ModalContext";
import JobSeekerLayout from "../../layouts/JobSeekerLayout";
import ApplicationDetails from "./ApplicationDetails";
import { useEffect, useState } from "react";
import axiosClient from "../../assets/js/axios-client";
import { useAuth } from "../../context/AuthProvider";
import { Clipboard, Eye, FileText, User, UserCheck } from "lucide-react";

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
                            <Eye className="h-5 w-5 text-blue-400" />
                            <span className="text-sm text-blue-500">{applications.length} applications</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-blue-100">
                        {applications.length === 0 ? (
                            <div className="py-8 text-center">
                                <div className="mx-auto w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                                    <FileText className="h-10 w-10 text-blue-300" />
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
                                                    <User className="h-4 w-4 mr-1 text-blue-400" />
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
                                                    <UserCheck className="h-4 w-4 mr-1" />
                                                    Details
                                                </button>

                                                {(app.application_status === "pending" || app.application_status === "denied") && (
                                                    <button
                                                        onClick={() => handleCancelApplication(app.id)}
                                                        className="inline-flex items-center bg-white border border-red-200 hover:bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg font-medium transition shadow-sm hover:shadow-md"
                                                    >
                                                        <Clipboard className="h-4 w-4 mr-1" />
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
