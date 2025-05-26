import { useModal } from "../../context/ModalContext";
import JobSeekerLayout from "../../layouts/JobSeekerLayout";
import axios from "axios";
import ApplicationDetails from "./ApplicationDetails";
import { useEffect, useState } from "react";


export default function MyApplications() {
    const { openModal } = useModal();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const userId = 10;

    useEffect(() => {
        setLoading(true);

        axios.get(`/api/gig-seeker/gig/applications/${userId}`)
            .then(response => {
                const applications = Array.isArray(response.data)
                    ? response.data
                    : response.data.data || [];

                setApplications(applications);
            })
            .catch(error => {
                console.error("Error fetching gig applications:", error.response || error.message);
                setApplications([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleCancelApplication = async (applicationId) => {
        if (!window.confirm("Are you sure you want to cancel this application?")) return;
        try {
            setLoading(true);
            const response = await axios.delete(`/api/gig-seeker/cancel/gig/application/${applicationId}`);
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
                        {loading ? (
                            <p className="text-center py-4">Loading...</p>
                        ) : (
                            <table className="w-full text-sm text-left text-gray-700 divide-y divide-gray-200">
                                <thead className="bg-orange-100 text-orange-600 text-xs uppercase font-semibold">
                                    <tr>
                                        <th className="px-4 py-3">Gig</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {Array.isArray(applications) && applications.map(app => (
                                        <tr
                                            key={app.id}
                                            className="hover:bg-orange-50 transition transform ease-out duration-700"
                                        >
                                            <td className="px-4 py-3 font-medium text-gray-800">
                                                {app.gig_title}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold
                                ${app.application_status === "approved"
                                                        ? "bg-green-100 text-green-700"
                                                        : app.application_status === "pending"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}>
                                                    {app.application_status}
                                                </span>
                                            </td>
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
