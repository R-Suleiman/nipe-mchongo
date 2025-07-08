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
                                className="bg-blue-50 border border-orange-100 rounded-3xl shadow-md hover:shadow-xl p-6 transition-all"
                            >
                                <h2 className="text-lg font-bold text-gray-800 mb-1">{gig.title}</h2>
                                <p className="text-sm text-orange-500 font-medium mb-2">{gig.gig_category_name}</p>
                                <p className="text-sm text-orange-500 font-medium mb-2">{gig.location}</p>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-3">{gig.description}</p>
                                <p className="text-sm text-orange-700 font-semibold mb-4">TSh {gig.payment.toLocaleString()}</p>

                                {gig.has_applied ? (
                                    <button
                                        disabled
                                        className="inline-block bg-blue-100 text-orange-500 text-sm px-4 py-2 rounded-lg font-semibold cursor-not-allowed"
                                    >
                                        ✓ Applied
                                    </button>
                                ) : (
                                    <button
                                        onClick={() =>
                                            openModal(<ConfirmApplication gig={gig} />, "xl4", `${gig.title} - Confirm Application`)
                                        }
                                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg font-semibold transition"
                                    >
                                        Apply Now
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </JobSeekerLayout>
    );
}
