// import React from "react";
import React, { react, useEffect, useState } from 'react';
import { Briefcase, Rocket, UserCheck, ShieldCheck } from 'lucide-react';
import JobSeekerLayout from "../../layouts/JobSeekerLayout";
import axios from 'axios';

export default function JobSeekerDashboard() {
    // Hardcoded data
    const totalApplications = 12;
    const totalOpportunities = 45;
    const profileCompletion = 85;
    const hasPremium = true;
    const costPerApplication = 500; // TSh

    const appliedGigs = [
        { id: 1, title: "Frontend Developer", location: "Moshi-Kilimanjaro", dateApplied: "2025-04-03", status: "Pending" },
        { id: 2, title: "Backend Engineer", location: "Mpwapwa-Dodoma", dateApplied: "2025-04-04", status: "Interviewing" },
        { id: 3, title: "UI/UX Designer", location: "Ilala-Dar es Salaam", dateApplied: "2025-04-05", status: "Rejected" },
    ];

    const [loading, setLoading] = useState(true);
    const [popularGigs, setPopularGigs] = useState([]);
    const [recentApplications, setRecentApplications] = useState([]);
    const userId = 30; // Hardcoded user ID for demonstration

    useEffect(() => {
        const fetchPopularGigs = async () => {
            try {
                const response = await axios.get('/api/popular-gigs');
                // Correctly set the popularGigs state
                setPopularGigs(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Error fetching popular gigs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPopularGigs();
    }, []);

    useEffect(() => {
        const recentApplication = async () => {
            try {
                const response = await axios.get(`/api/gig-seeker/gig/recent-applications?seeker_id=${userId}`);
                // Correctly set the recentApplications state
                setRecentApplications(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Error fetching recent applications:", error);
            } finally {
                setLoading(false);
            }
        };
        recentApplication();
    }, [userId]);

    return (
        <JobSeekerLayout>
            <div className="space-y-6">
                <div className="bg-orange-50 p-6 rounded-2xl shadow-md">
                    <h1 className="text-3xl font-extrabold text-orange-600 mb-2">
                        Hi Erick, welcome to your Dashboard!
                    </h1>
                    <p className="text-orange-800 text-lg">
                        Manage your account, track applications, and explore job opportunities.
                    </p>
                </div>


                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow border border-orange-100 flex items-center gap-4">
                        <Briefcase className="text-orange-500 w-6 h-6" />
                        <div>
                            <h2 className="text-sm font-medium text-orange-500">Total Applications</h2>
                            <p className="text-3xl font-extrabold text-gray-800 mt-1">{totalApplications}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow border border-orange-100 flex items-center gap-4">
                        <Rocket className="text-orange-500 w-6 h-6" />
                        <div>
                            <h2 className="text-sm font-medium text-orange-500">Opportunities Available</h2>
                            <p className="text-3xl font-extrabold text-gray-800 mt-1">{totalOpportunities}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow border border-orange-100">
                        <h2 className="text-sm font-medium text-orange-500 mb-1 flex items-center gap-2">
                            <UserCheck className="w-5 h-5 text-orange-500" />
                            Profile Completion
                        </h2>
                        <p className="text-3xl font-extrabold text-gray-800">{profileCompletion}%</p>
                        <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-orange-500 h-2.5 rounded-full transition-all duration-500"
                                style={{ width: `${profileCompletion}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className={`p-6 rounded-2xl shadow border flex items-center gap-4
    ${hasPremium ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                        <ShieldCheck className={`w-6 h-6 ${hasPremium ? 'text-green-600' : 'text-red-500'}`} />
                        <div>
                            <h2 className="text-sm font-medium text-gray-600">Premium Access</h2>
                            <p className={`text-3xl font-extrabold mt-1 ${hasPremium ? 'text-green-600' : 'text-red-500'}`}>
                                {hasPremium ? "Active" : "Inactive"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Popular Gigs */}
                <div className="w-full bg-white p-6 rounded-2xl shadow border border-orange-100">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                            Popular Gigs
                        </h2>
                        <span className="text-sm text-gray-500">{popularGigs.length} Total</span>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-32">
                            <Rocket className="animate-spin h-10 w-10 text-orange-500" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {popularGigs.map((gig) => (
                                <div
                                    key={gig.id}
                                    className="flex justify-between items-center p-4 rounded-lg shadow bg-gradient-to-r from-orange-600 via-orange-500 to-orange-300 text-white hover:shadow-md transition"
                                >
                                    <h3 className="font-semibold text-base truncate">{gig.title}</h3>
                                    <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                                        {gig.application_count}
                                    </span>
                                </div>
                            ))}

                            {popularGigs.length === 0 && (
                                <div className="col-span-full text-center text-gray-500 py-4">
                                    No popular gigs available.
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Premium Features */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Premium Features</h2>
                    <ul className="space-y-3 text-gray-700 list-disc pl-5">
                        <li>Priority application visibility to recruiters</li>
                        <li>Personalized job recommendations</li>
                        <li>Resume review & tips</li>
                        <li>Early access to exclusive job posts</li>
                    </ul>
                </div>

                {/* Recent Applications */}
                <div className="bg-white p-6 rounded-2xl shadow">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Applications</h2>
                    {loading ? (
                        <div className="flex justify-center items-center h-32">
                            <Rocket className="animate-spin h-10 w-10 text-orange-500" />
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto text-sm text-left text-gray-600">
                                <thead className="bg-orange-100 text-orange-600 text-xs uppercase font-semibold">
                                    <tr>
                                        <th className="px-4 py-3">Gig Title</th>
                                        <th className="px-4 py-3">Location</th>
                                        <th className="px-4 py-3">Date Applied</th>
                                        <th className="px-4 py-3">Amount Deducted</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentApplications.map((application) => (
                                        <tr key={application.id} className="border-b border-gray-300 hover:border-transparent hover:bg-orange-50 transition transform ease-out duration-700">
                                            <td className="px-4 py-3">{application.gig_title}</td>
                                            <td className="px-4 py-3">{application.location}</td>
                                            <td className="px-4 py-3">{new Date(application.created_at).toLocaleDateString()}</td>
                                            <td className="px-4 py-3 text-red-600 font-semibold">
                                                TSh {application.gig_payment.toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                    {recentApplications.length === 0 && (
                                        <tr>
                                            <td className="px-4 py-4 text-center text-gray-500" colSpan="4">
                                                No gigs applied yet.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>


            </div>
        </JobSeekerLayout>
    );
}
