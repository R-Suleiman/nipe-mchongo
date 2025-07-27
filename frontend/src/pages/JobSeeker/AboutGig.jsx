import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../assets/js/axios-client";
import {
    Briefcase, MapPin, Clock, DollarSign, Users, Tag,
    UserCircle, Calendar, ArrowRight, CheckCircle
} from "lucide-react";
import ConfirmApplication from "./ConfirmApplication";
import { useModal } from "../../context/ModalContext";

export default function AboutGig() {
    const { id } = useParams();
    const { openModal } = useModal();

    const [gig, setGig] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClient.get(`about-gig/${id}`)
            .then(({ data }) => {
                setGig(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) return (
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-10 border border-gray-100 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-100 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {[...Array(4)].map((_, i) => (
                    <div key={i}>
                        <div className="h-4 bg-gray-100 rounded w-1/3 mb-2"></div>
                        <div className="h-4 bg-gray-50 rounded w-2/3"></div>
                    </div>
                ))}
            </div>
            <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
        </div>
    );

    if (!gig) return (
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-10 border border-gray-100 text-center py-12">
            <div className="text-gray-400 mb-4">
                <Briefcase className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-600">Gig not found</h3>
            <p className="text-gray-400 mt-2">The gig you're looking for doesn't exist or may have been removed</p>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-10 border border-gray-100 transition-all hover:shadow-2xl">
            {/* Header */}
            <div className="mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">
                            {gig.title}
                        </h1>
                        <div className="flex items-center text-gray-500 text-sm space-x-2">
                            <UserCircle className="w-4 h-4" />
                            <span>
                                Posted by <span className="text-blue-600 font-medium">{gig.poster?.firstname} {gig.poster?.lastname}</span>
                            </span>
                        </div>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" /> Active
                    </span>
                </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-4">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Location</h3>
                        <p className="text-gray-900 font-medium">{gig.location || "Remote"}</p>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Payment</h3>
                        <p className="text-gray-900 font-medium">
                            TSh {gig.payment?.toLocaleString()} ({gig.payment_frequency})
                        </p>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <Clock className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Duration</h3>
                        <p className="text-gray-900 font-medium">{gig.duration}</p>
                    </div>
                </div>

                <div className="flex items-start space-x-4">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <Users className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Available Slots</h3>
                        <p className="text-gray-900 font-medium">{gig.slots} remaining</p>
                    </div>
                </div>

                {gig.category && (
                    <div className="flex items-start space-x-4">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <Tag className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Category</h3>
                            <p className="text-gray-900 font-medium">{gig.category.name}</p>
                        </div>
                    </div>
                )}

                <div className="flex items-start space-x-4">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500">Posted</h3>
                        <p className="text-gray-900 font-medium">
                            {new Date(gig.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                    Job Description
                </h2>
                <div className="prose prose-blue max-w-none text-gray-700">
                    {gig.description.split('\n').map((paragraph, i) => (
                        <p key={i} className="mb-4 last:mb-0">{paragraph}</p>
                    ))}
                </div>
            </div>

            <button
                onClick={() => openModal(<ConfirmApplication gig={gig} />, "xl4", `${gig.title} - Confirm Application`)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-sm px-4 py-2.5 rounded-lg font-semibold transition-all shadow-sm hover:shadow-md flex items-center justify-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Apply Now
            </button>

            {/* CTA Button */}
            <div className="mt-8 flex justify-end">
                <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-0.5">
                    Apply Now <ArrowRight className="ml-2 w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
