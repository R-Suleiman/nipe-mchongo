import React from "react";
import JobSeekerLayout from "../../layouts/JobSeekerLayout";

export default function MyAccount() {
    // Hardcoded data
    const totalDeposited = 10000; // TSh
    const costPerApplication = 500; // TSh
    const appliedGigs = [
        {
            id: 1,
            title: "Mobile Money Agent Assistant",
            location: "Dodoma",
            dateApplied: "2025-04-03",
        },
        {
            id: 2,
            title: "Tailoring Gig for School Uniforms",
            location: "Mbeya",
            dateApplied: "2025-04-04",
        },
        {
            id: 3,
            title: "House Painting Gig - 2 Rooms",
            location: "Dar es Salaam",
            dateApplied: "2025-04-05",
        },
    ];

    const totalApplied = appliedGigs.length;
    const totalDeducted = totalApplied * costPerApplication;
    const availableBalance = totalDeposited - totalDeducted;

    return (
        <JobSeekerLayout>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:space-x-6 gap-6">
                    <div className="flex-1 bg-white rounded-2xl p-6 shadow hover:shadow-md transition">
                        <p className="text-sm text-gray-500">Total Deposited</p>
                        <p className="text-2xl font-bold text-green-700">TSh {totalDeposited.toLocaleString()}</p>
                    </div>
                    <div className="flex-1 bg-white rounded-2xl p-6 shadow hover:shadow-md transition">
                        <p className="text-sm text-gray-500">Available Balance</p>
                        <p className="text-2xl font-bold text-blue-600">TSh {availableBalance.toLocaleString()}</p>
                    </div>
                    <div className="flex-1 bg-white rounded-2xl p-6 shadow hover:shadow-md transition">
                        <p className="text-sm text-gray-500">Jobs Applied</p>
                        <p className="text-2xl font-bold text-gray-800">{totalApplied}</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Applied Gigs</h2>
                        <button className="bg-green-600 text-white px-4 py-2 text-sm rounded hover:bg-green-700">
                            Deposit More Balance
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto text-sm text-left text-gray-600">
                            <thead className="bg-gray-50 text-gray-700 font-medium">
                                <tr>
                                    <th className="px-4 py-3">Gig Title</th>
                                    <th className="px-4 py-3">Location</th>
                                    <th className="px-4 py-3">Date Applied</th>
                                    <th className="px-4 py-3">Amount Deducted</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appliedGigs.map((gig) => (
                                    <tr key={gig.id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-3">{gig.title}</td>
                                        <td className="px-4 py-3">{gig.location}</td>
                                        <td className="px-4 py-3">{gig.dateApplied}</td>
                                        <td className="px-4 py-3 text-red-600 font-semibold">
                                            TSh {costPerApplication.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                                {appliedGigs.length === 0 && (
                                    <tr>
                                        <td className="px-4 py-4 text-center text-gray-500" colSpan="4">
                                            No gigs applied yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </JobSeekerLayout>
    );
}
