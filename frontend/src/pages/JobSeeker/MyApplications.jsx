import React from "react";
import JobSeekerLayout from "../../layouts/JobSeekerLayout";
import axios from "axios";

export default function MyApplications() {
    const [loading, setLoading] = React.useState(false);
    const [applications, setApplications] = React.useState([]);

    const fetchApplications = () => {
        setLoading(true);
        const gigSeekerId = 10;

        axios.get(`/api/applications/${gigSeekerId}`)
            .then(response => {
                setApplications(response.data);
            })
            .catch(error => {
                console.error("Error fetching applications:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    React.useEffect(() => {
        fetchApplications();
    }, []);

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
                                ${app.application_status === "Accepted"
                                                        ? "bg-green-100 text-green-700"
                                                        : app.application_status === "Pending"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}>
                                                    {app.application_status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 space-x-2">
                                                <button className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-md text-white text-xs font-medium">
                                                    Preview
                                                </button>
                                                {app.application_status === "Pending" && (
                                                    <button className="py-2 px-4 bg-red-600 hover:bg-red-500 text-white rounded-md text-xs font-medium">
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
