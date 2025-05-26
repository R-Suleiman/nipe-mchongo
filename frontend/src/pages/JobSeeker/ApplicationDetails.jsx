import PropTypes from 'prop-types';

export default function ApplicationDetails({ application }) {
    // shape of props


    if (!application) return <p>No application data provided.</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">Gig Application Summary</h2>

            {/* Gig Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-blue-900 mb-1">Gig Title</h3>
                    <p className="text-sm text-gray-700">{application.gig_title}</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-blue-900 mb-1">Category</h3>
                    <p className="text-sm text-gray-700">{application.gig_category_name}</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-blue-900 mb-1">Location</h3>
                    <p className="text-sm text-gray-700">{application.location}</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-blue-900 mb-1">Payment</h3>
                    <p className="text-sm text-gray-700">Tsh {application.gig_payment}</p>
                </div>
            </div>

            {/* Poster Info */}
            <div className="bg-white rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Gig Poster</h3>
                <p className="text-sm text-gray-700">
                    {application.gig_poster_first_name} {application.gig_poster_last_name}
                </p>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-sm text-gray-700 whitespace-pre-line">{application.gig_description}</p>
            </div>

            {/* Status + Date */}
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
                <div>
                    <h3 className="text-sm text-gray-500">Application Status</h3>

                    <span className={`px-3 py-1 rounded-full text-xs font-semibold
                                ${application.application_status === "approved"
                            ? "bg-green-100 text-green-700"
                            : application.application_status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                        }`}>
                        {application.application_status}
                    </span>
                </div>
                <div>
                    <h3 className="text-sm text-gray-500">Applied On</h3>
                    <p className="text-sm text-gray-700">{new Date(application.created_at).toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
}
