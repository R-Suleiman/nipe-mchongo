import React from "react";
import JobSeekerLayout from "../../layouts/JobSeekerLayout";

export default function SearchJobs() {
    const [loading, setLoading] = React.useState(false);
    const [gigs, setGigs] = React.useState([]);
    const [categoryName, setCategoryName] = React.useState('');
    const fetchGigs = (categoryName = '', seekerId = null) => {
        setLoading(true);

        let url = '/api/gigs';
        const params = [];

        if (categoryName) params.push(`category=${categoryName}`);
        if (seekerId) params.push(`seeker_id=${seekerId}`);

        if (params.length > 0) url += `?${params.join('&')}`;

        axios.get(url)
            .then(response => {
                setGigs(response.data);
            })
            .catch(error => {
                console.error("Error fetching gigs:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <JobSeekerLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Search Gigs</h1>
                    <p className="text-gray-600">Explore latest gigs around Tanzania and apply instantly.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {gigs.map((gig) => (
                        <div
                            key={gig.id}
                            className="bg-orange-50 border border-orange-100 rounded-3xl shadow-md hover:shadow-xl p-6 transition-all"
                        >
                            <h2 className="text-lg font-bold text-gray-800 mb-1">{gig.title}</h2>
                            <p className="text-sm text-orange-500 font-medium mb-2">{gig.location}</p>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-3">{gig.description}</p>
                            <p className="text-sm text-orange-700 font-semibold mb-4">{gig.payment}</p>

                            {gig.is_applied ? (
                                <button
                                    disabled
                                    className="inline-block bg-orange-100 text-orange-500 text-sm px-4 py-2 rounded-lg font-semibold cursor-not-allowed"
                                >
                                    ✓ Applied
                                </button>
                            ) : (
                                <button
                                    className="inline-block bg-orange-600 hover:bg-orange-700 text-white text-sm px-4 py-2 rounded-lg font-semibold transition"
                                >
                                    Apply Now
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </JobSeekerLayout>
    );
}
