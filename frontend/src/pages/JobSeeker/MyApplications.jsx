import { useModal } from "../../context/ModalContext";
import ApplicationDetails from "./ApplicationDetails";
import { useEffect, useState } from "react";
import axiosClient from "../../assets/js/axios-client";
import { useAuth } from "../../context/AuthProvider";
import { Check, Eye, FileText, User, XCircle } from "lucide-react";

export default function MyApplications() {
    const { openModal } = useModal();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const userId = user?.id;
    console.log(userId);

    const [totalApplications, setTotalApplications] = useState(0);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await axiosClient.get('/gig-seeker/applications', {
                    params: { gig_seeker_id: userId },
                });

                // 👇 Extract correctly
                setApplications(res.data.applications || []);
                console.log(res.data.applications);
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
        <div className="space-y-6">
            <div className="mb-4 sm:mb-6 md:mb-8">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 leading-snug">
                    My Gig Applications
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 mt-1 sm:mt-2">
                    Track all your applied gigs across Tanzania.
                </p>
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
                        <div className="py-8 text-center px-4 sm:px-6">
                            <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                                <FileText className="h-8 w-8 sm:h-10 sm:w-10 text-blue-300" />
                            </div>
                            <p className="text-blue-400 font-medium text-sm sm:text-base">No applications found</p>
                            <p className="text-xs sm:text-sm text-blue-300 mt-1">
                                Your applications will appear here
                            </p>
                        </div>
                    ) : (
                        <table className="w-full text-xs sm:text-sm md:text-base">
                            <thead className="bg-blue-50">
                                <tr className="text-left text-blue-600 font-semibold">
                                    <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3">Title</th>
                                    <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3">Location</th>
                                    <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3">Status</th>
                                    <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3">Applied On</th>
                                    <th className="px-3 sm:px-4 md:px-6 py-2 sm:py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-blue-100">
                                {applications.map((app) => (
                                    <tr
                                        key={app.id}
                                        className="hover:bg-blue-50 transition-colors"
                                    >
                                        <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 font-medium text-blue-900">
                                            {app.gig?.title || "—"}
                                        </td>
                                        <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-blue-700">
                                            <div className="flex items-center gap-1">
                                                <User className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
                                                <span>{app.gig?.location || "—"}</span>
                                            </div>
                                        </td>
                                        <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                                            <span
                                                className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${app.status?.name === "Accepted"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : app.status?.name === "Pending"
                                                        ? "bg-amber-100 text-amber-700"
                                                        : app.status?.name === "Denied"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                {app.status?.name || "—"}
                                            </span>
                                        </td>
                                        <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-blue-600">
                                            {new Date(app.created_at).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </td>
                                        <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 text-right space-x-1 sm:space-x-2">
                                            <button
                                                onClick={() =>
                                                    openModal({
                                                        content: <ApplicationDetails application={app} />,
                                                        size: "xl7",
                                                        title: "Application Details",
                                                        variant: "info",
                                                    })
                                                }
                                                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white text-[11px] sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                            >
                                                <Check className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                                                Details
                                            </button>

                                            {(app.status?.name === "Pending" || app.status?.name === "Denied") && (
                                                <button
                                                    onClick={() => handleCancelApplication(app.id)}
                                                    className="inline-flex items-center gap-1 sm:gap-2 rounded-xl sm:rounded-2xl border border-red-300 bg-white px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-sm font-semibold text-red-600 shadow-sm transition-all hover:border-red-400 hover:bg-red-50 hover:text-red-700 hover:shadow-md"
                                                >
                                                    <XCircle className="h-3 w-3 sm:h-4 sm:w-4" />
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
    );
}
