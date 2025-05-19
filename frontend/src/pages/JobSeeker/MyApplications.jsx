import React from "react";
import JobSeekerLayout from "../../layouts/JobSeekerLayout";

export default function MyApplications() {
    const applications = [
        {
            id: 1,
            gig: "Event Photographer for Wedding",
            client: "Salma Mohamed",
            date: "2025-03-12",
            location: "Arusha",
            budget: "150,000",
            status: "Pending",
        },
        {
            id: 2,
            gig: "Private Maths Tutor - Form 4",
            client: "Mr. Kessy",
            date: "2025-03-08",
            location: "Mwanza",
            budget: "100,000",
            status: "Accepted",
        },
        {
            id: 3,
            gig: "Delivery Service - Local Parcels",
            client: "Mama Msofe",
            date: "2025-02-27",
            location: "Dar es Salaam",
            budget: "50,000",
            status: "Rejected",
        },
    ];

    userId = 10; // Example user ID
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
                        <table className="w-full text-sm text-left text-gray-700">
                            <thead className="bg-orange-100 text-orange-600 text-xs uppercase font-semibold">
                                <tr>
                                    <th className="px-4 py-3">Gig</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app) => (
                                    <tr
                                        key={app.id}
                                        className="border-b border-gray-300 hover:border-transparent hover:bg-orange-50 transition transform ease-out duration-700"
                                    >
                                        <td className="px-4 py-3 font-medium text-gray-800">
                                            {app.gig}
                                        </td>

                                        <td className="px-4 py-3">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold
                                ${app.status === "Accepted"
                                                        ? "bg-green-100 text-green-700"
                                                        : app.status === "Pending"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {app.status}
                                            </span>
                                        </td>

                                        <td className="px-4 py-3 space-x-2">
                                            <button className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-md text-white text-xs font-medium">
                                                Preview
                                            </button>

                                            {app.status === "Pending" && (
                                                <button className="py-2 px-4 text-white bg-red-600 hover:bg-red-500 rounded-md text-xs font-medium transition transform ease-out duration-700">
                                                    Cancel
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </JobSeekerLayout>
    );
}
