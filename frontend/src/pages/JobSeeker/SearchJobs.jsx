import React from "react";
import JobSeekerLayout from "../../layouts/JobSeekerLayout";
import { useModal } from "../../context/ModalContext";
import ConfirmApplication from "./ConfirmApplication";
import { Rocket } from 'lucide-react';
import axiosClient from "../../assets/js/axios-client";

export default function SearchJobs() {
    const { openModal } = useModal();

    const [loading, setLoading] = React.useState(false);
    const [gigs, setGigs] = React.useState([]);
    const [categories, setCategories] = React.useState([]);

    const [filters, setFilters] = React.useState({
        user_id: 10, // Replace with actual authenticated user ID
        title: '',
        category: '',
    });

    const fetchGigs = () => {
        setLoading(true);
        let url = `/gig-seeker-gigs`;
        const params = [];

        if (filters.user_id) params.push(`seeker_id=${filters.user_id}`);
        if (filters.title) params.push(`title=${encodeURIComponent(filters.title)}`);
        if (filters.category) params.push(`category=${encodeURIComponent(filters.category)}`);

        if (params.length) url += '?' + params.join('&');

        axiosClient.get(url)
            .then(response => setGigs(response.data))
            .catch(err => console.error("Error fetching gigs:", err))
            .finally(() => setLoading(false));
    };

    const fetchCategories = () => {
        axiosClient.get('/gig-categories')
            .then(res => setCategories(res.data))
            .catch(err => console.error("Error fetching categories:", err));
    };

    React.useEffect(() => {
        fetchCategories();
        fetchGigs();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = () => {
        fetchGigs();
    };

    return (
        <JobSeekerLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Search Gigs</h1>
                    <p className="text-gray-600">Explore latest gigs around Tanzania and apply instantly.</p>
                </div>

                {/* Search Bar and Category Filter */}
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <input
                        type="text"
                        name="title"
                        value={filters.title}
                        onChange={handleFilterChange}
                        placeholder="Search by title..."
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/2"
                    />
                    <select
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                        className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3"
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                    >
                        Search
                    </button>
                </div>

                {/* Gigs Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <Rocket className="animate-spin h-10 w-10 text-orange-500" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {gigs.map((gig) => (
                            <div
                                key={gig.id}
                                className="bg-white border border-blue-100 rounded-2xl shadow-sm hover:shadow-lg p-6 transition-all duration-300 hover:border-blue-200 group"
                            >
                                <div className="flex flex-col h-full">
                                    <div className="flex-grow">
                                        <h2 className="text-lg font-bold text-blue-900 mb-2 group-hover:text-blue-700 transition-colors">
                                            {gig.title}
                                        </h2>

                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="bg-blue-50 text-blue-600 text-xs px-2.5 py-1 rounded-full font-medium">
                                                {gig.gig_category_name}
                                            </span>
                                            <span className="flex items-center text-blue-500 text-xs">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {gig.location}
                                            </span>
                                        </div>

                                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{gig.description}</p>

                                        <div className="mb-4">
                                            <p className="text-blue-700 font-bold">
                                                TSh {gig.payment.toLocaleString()}
                                            </p>
                                            {gig.payment_type && (
                                                <p className="text-blue-500 text-xs mt-0.5">{gig.payment_type}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        {gig.has_applied ? (
                                            <button
                                                disabled
                                                className="w-full bg-blue-50 text-blue-600 text-sm px-4 py-2.5 rounded-lg font-semibold cursor-not-allowed flex items-center justify-center"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Application Submitted
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => openModal(<ConfirmApplication gig={gig} />, "xl4", `${gig.title} - Confirm Application`)}
                                                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-sm px-4 py-2.5 rounded-lg font-semibold transition-all shadow-sm hover:shadow-md flex items-center justify-center"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                Apply Now
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </JobSeekerLayout>
    );
}
