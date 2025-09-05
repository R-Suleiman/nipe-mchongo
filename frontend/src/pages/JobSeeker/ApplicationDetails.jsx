export default function ApplicationDetails({ application }) {
    return (
        <div className="container mx-auto p-6 space-y-6">
            <h2 className="text-2xl font-bold text-white border-b pb-2">
                {application?.gig?.title} (Summary)
            </h2>

            {/* Gig Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard label="Gig Title" value={application?.gig?.title} />
                <InfoCard label="Category" value={application?.gig?.category?.name || "N/A"} />
                <InfoCard label="Location" value={application?.gig?.location} />
                <InfoCard label="Payment" value={`Tsh ${application?.gig?.payment}`} />
            </div>

            {/* Poster Info */}
            <div className="bg-white rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Gig Poster</h3>
                <p className="text-sm text-gray-700">
                    {application?.gig?.poster?.firstname} {application?.gig?.poster?.lastname}
                </p>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-sm text-gray-700 whitespace-pre-line">
                    {application?.gig?.description}
                </p>
            </div>

            {/* Status + Date */}
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-inner">
                <div>
                    <h3 className="text-sm text-gray-500">Application Status</h3>
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${application?.status?.name === "Accepted"
                            ? "bg-green-100 text-green-700"
                            : application?.status?.name === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                    >
                        {application?.status?.name}
                    </span>
                </div>
                <div>
                    <h3 className="text-sm text-gray-500">Applied On</h3>
                    <p className="text-sm text-gray-700">
                        {application?.created_at ? new Date(application.created_at).toLocaleString() : "N/A"}
                    </p>
                </div>
            </div>
        </div>
    );
}

function InfoCard({ label, value }) {
    return (
        <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-blue-900 mb-1">{label}</h3>
            <p className="text-sm text-gray-700">{value}</p>
        </div>
    );
}
