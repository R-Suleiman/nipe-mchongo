// import React from "react";
import { useEffect, useState } from 'react';
import { Briefcase, Rocket, Search } from 'lucide-react';
import axiosClient from '../../assets/js/axios-client';
import { useAuth } from '../../context/AuthProvider';
import { Link } from 'react-router-dom';

export default function JobSeekerDashboard() {
    const [loading, setLoading] = useState(true);
    const [popularGigs, setPopularGigs] = useState([]);
    const [recentApplications, setRecentApplications] = useState([]);
    const [applications, setApplications] = useState([]);
    const [totalApplicationsCount, setTotalApplicationsCount] = useState(0);
    const [totalPopularGigs, setTotalPopularGigs] = useState(0);
    const [recentApplicationsCount, setRecentApplicationsCount] = useState(0);
    const [newOpportunitiesCount, setNewOpportunitiesCount] = useState(0)
    const { user } = useAuth();
    const userId = user?.id;

    useEffect(() => {
        const fetchGigs = async () => {
            try {
                // Fetch all applications
                const applicationsResponse = await axiosClient.get(`/gig-seeker/applications`, {
                    params: { gig_seeker_id: userId }
                });
                setApplications(applicationsResponse.data);
                setTotalApplicationsCount(applicationsResponse.data.total || 0);

                // Fetch popular gigs
                const popularGigsResponse = await axiosClient.get('/popular-gigs');
                setPopularGigs(popularGigsResponse.data);
                setTotalPopularGigs(popularGigsResponse.data.total || 0);

                // Calculate new opportunities (example: gigs posted in last 24 hours)
                const newGigs = popularGigsResponse.data.items?.filter(gig =>
                    new Date(gig.posted_date) > new Date(Date.now() - 24 * 60 * 60 * 1000)
                ) || [];
                setNewOpportunitiesCount(newGigs.length);

                // Fetch recent applications
                const recentApplicationsResponse = await axiosClient.get(`/gig-seeker/recent-applications`, {
                    params: { gig_seeker_id: userId }
                });
                setRecentApplications(recentApplicationsResponse.data);
                setRecentApplicationsCount(recentApplicationsResponse.data.items?.length || 0);

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGigs();
    }, [userId]);  // Add userId as dependency

    return (
        <>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg p-8 mb-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-3">
                        Hi {user.firstname}, <span className="text-blue-600">welcome back!</span>
                    </h1>
                    <p className="text-blue-700 text-lg max-w-2xl">
                        Here's what's happening with your job search today. Manage applications, track progress, and discover new opportunities.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Application Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-blue-500 flex items-start gap-5">
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <Briefcase className="text-blue-600 w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Total Applications</h2>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{totalApplicationsCount}</p>
                            <p className="text-sm text-blue-500 mt-2">
                                {totalApplicationsCount > 0 ?
                                    `${recentApplicationsCount} this week` :
                                    'Start applying to jobs!'}
                            </p>
                        </div>
                    </div>

                    {/* Opportunities Card */}
                    <Link to={'/job/seeker/search-jobs'}>
                        <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-blue-500 flex items-start gap-5">
                            <div className="bg-blue-100 p-3 rounded-lg">
                                <Rocket className="text-blue-600 w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Opportunities Available</h2>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{totalPopularGigs}</p>
                                <p className="text-sm text-blue-500 mt-2">
                                    {totalPopularGigs > 0 ?
                                        `${newOpportunitiesCount} new today` :
                                        'Check back soon!'}
                                </p>
                            </div>
                        </div>
                    </Link>

                </div>

                {/* Optional CTA */}
                <Link to={'/job/seeker/search-jobs'}>
                    <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-sm">
                        Explore New Jobs
                    </button>
                </Link>

            </div>
            <div className="space-y-6">
                {/* Popular Gigs Card */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-50 transition-all hover:shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                                Popular Opportunities
                            </h2>
                            <p className="text-sm text-blue-500 mt-1">High-demand gigs you might like</p>
                        </div>
                        <span className="text-sm font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                            {popularGigs.length} Available
                        </span>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="animate-pulse flex space-x-4">
                                <div className="rounded-full bg-blue-100 h-10 w-10"></div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-3">
                            {popularGigs?.gigs.map((gig) => (
                                <div
                                    key={gig.id}
                                    className="group flex justify-between items-center p-4 rounded-xl bg-white border border-blue-100 hover:border-blue-300 transition-all duration-300"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="bg-blue-100 p-2 rounded-lg">
                                            <Briefcase className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <Link to={`/job/seeker/about-gig/${gig.id}`}>
                                            <h3 className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                                                {gig.title}
                                                {gig.id}

                                            </h3>
                                            <p className="text-sm text-gray-500">{gig.category}</p>
                                        </Link>
                                    </div>
                                    <span className="text-sm font-medium bg-blue-600 text-white px-3 py-1 rounded-full">
                                        {gig.application_count}+ applicants
                                    </span>
                                </div>
                            ))}

                            {popularGigs.length === 0 && (
                                <div className="text-center py-8">
                                    <div className="mx-auto h-16 w-16 text-blue-400 mb-3">
                                        <Search className="w-full h-full" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-600">No popular gigs available</h3>
                                    <p className="text-sm text-gray-400 mt-1">Check back later for new opportunities</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Recent Applications Card */}
                <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm sm:shadow-md">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800">Recent Applications</h2>
                        {!loading && recentApplications?.length > 0 && (
                            <span className="bg-blue-50 text-blue-600 text-xs sm:text-sm font-medium px-2.5 py-1 rounded-full mt-2 sm:mt-0">
                                {recentApplications.length} Applied
                            </span>
                        )}
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-28 sm:h-32">
                            <Rocket className="animate-spin h-8 w-8 sm:h-10 sm:w-10 text-blue-500" />
                        </div>
                    ) : (
                        <div className="overflow-x-auto -mx-2 sm:mx-0">
                            <table className="min-w-full table-auto text-xs sm:text-sm text-left text-gray-600">
                                <thead className="bg-blue-50 text-blue-700 text-[11px] sm:text-xs uppercase font-semibold">
                                    <tr>
                                        <th className="px-3 sm:px-4 py-2.5 sm:py-3">Gig</th>
                                        <th className="px-3 sm:px-4 py-2.5 sm:py-3">Location</th>
                                        <th className="px-3 sm:px-4 py-2.5 sm:py-3">Applied</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {recentApplications?.map((application) => {
                                        const gig = application.gig || {};
                                        return (
                                            <tr
                                                key={application.id}
                                                className="hover:bg-blue-50 transition-colors duration-200"
                                            >
                                                <Link to={`/job/seeker/about-gig/${gig.id}`}>

                                                    <td className="px-3 sm:px-4 py-2.5 sm:py-3 font-medium text-gray-800 truncate max-w-[180px] sm:max-w-[240px]">
                                                        {gig.name || gig.title || "—"}
                                                    </td>
                                                </Link>
                                                <td className="px-3 sm:px-4 py-2.5 sm:py-3 whitespace-nowrap">
                                                    {gig.location || "—"}
                                                </td>
                                                <td className="px-3 sm:px-4 py-2.5 sm:py-3 whitespace-nowrap">
                                                    {application.created_at ? (
                                                        <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium">
                                                            {new Date(application.created_at).toLocaleDateString("en-GB", {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric",
                                                            })}
                                                        </span>
                                                    ) : (
                                                        "—"
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}

                                    {(!recentApplications || recentApplications.length === 0) && (
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="px-4 py-6 text-center text-gray-500 text-sm"
                                            >
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
        </>
    );
}
