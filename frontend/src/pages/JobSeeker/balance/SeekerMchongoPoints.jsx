import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rocket, Zap, CreditCard, BadgeCheck, ArrowRight, Coins } from "lucide-react";
import axiosClient from "../../../assets/js/axios-client";
import Loading from "../../../components/Loading";

export default function SeekerMchongoPoints() {
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const pricePerPoint = 700;
    const totalPrice = quantity * pricePerPoint;

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(
            `/job/seeker/purchase-points?quantity=${quantity}&total=${totalPrice}`
        );
    };

    useEffect(() => {
        setLoading(true);
        axiosClient.get("/get-user").then(({ data }) => {
            setUser(data.user);
            setLoading(false);
        });
    }, []);

    return loading ? (
        <Loading />
    ) : (
        <>
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6 sm:p-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <header className="text-center mb-12">
                        <div className="inline-flex items-center justify-center bg-white p-3 rounded-full shadow-sm mb-5 border border-blue-100">
                            <Coins className="h-6 w-6 text-blue-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">
                            Mchongo <span className="text-blue-600">Points</span>
                        </h1>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
                            Power your gigs with points and unlock premium opportunities
                        </p>
                    </header>

                    {/* Stats Dashboard */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
                        <div className="bg-white p-6 rounded-xl shadow-xs border border-gray-100 hover:shadow-sm transition-all">
                            <div className="flex items-center mb-5">
                                <div className="bg-blue-50 p-2.5 rounded-lg mr-4">
                                    <Zap className="h-5 w-5 text-blue-600" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Available Points
                                </h2>
                            </div>
                            <div className="flex items-end space-x-2 mb-3">
                                <span className="text-4xl font-bold text-gray-900">
                                    {user?.mchongo_points}
                                </span>
                                <span className="text-blue-500 mb-2 text-lg font-medium">pts</span>
                            </div>
                            <p className="text-gray-500 flex items-center text-sm">
                                <BadgeCheck className="h-4 w-4 mr-2 text-blue-400" />
                                Total posting points available
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-xs border border-gray-100 hover:shadow-sm transition-all">
                            <div className="flex items-center mb-5">
                                <div className="bg-indigo-50 p-2.5 rounded-lg mr-4">
                                    <Rocket className="h-5 w-5 text-indigo-600" />
                                </div>
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Available Gigs
                                </h2>
                            </div>
                            <div className="flex items-end space-x-2 mb-3">
                                <span className="text-4xl font-bold text-gray-900">
                                    {Number.isFinite(user?.mchongo_points) ? Math.floor(user.mchongo_points / 10) : 0}
                                </span>
                                <span className="text-indigo-500 mb-2 text-lg font-medium">gigs</span>
                            </div>
                            <p className="text-gray-500 flex items-center text-sm">
                                <BadgeCheck className="h-4 w-4 mr-2 text-indigo-400" />
                                Ready to post immediately
                            </p>
                        </div>
                    </div>

                    {/* Purchase Section */}
                    <div className="bg-white p-8 rounded-2xl shadow-xs border border-gray-100 mb-12">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                            <div className="flex items-center mb-4 md:mb-0">
                                <div className="bg-blue-50 p-2.5 rounded-lg mr-4">
                                    <CreditCard className="h-5 w-5 text-blue-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Purchase Points
                                </h2>
                            </div>
                            <div className="bg-blue-50 px-4 py-2 rounded-lg">
                                <span className="text-blue-600 font-medium">TZS 700 per point</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        htmlFor="quantity"
                                        className="block text-gray-700 font-medium mb-2"
                                    >
                                        Points Quantity
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="quantity"
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Number(e.target.value))}
                                            placeholder="Enter points amount"
                                            className="w-full border border-gray-200 rounded-lg p-3.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                        <div className="absolute right-4 top-3.5 text-gray-400">
                                            points
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Total Amount
                                    </label>
                                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                        <p className="text-xl font-semibold text-gray-900">
                                            TZS {totalPrice.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium py-3.5 px-8 rounded-lg shadow-xs transition-all duration-200 flex items-center justify-center space-x-2"
                                >
                                    <span>Purchase Points</span>
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Footer CTA */}
                    <div className="text-center">
                        <div className="inline-flex items-center bg-white px-5 py-2.5 rounded-full shadow-xs border border-gray-100">
                            <Zap className="h-4 w-4 text-blue-500 mr-2" />
                            <p className="text-gray-600 font-medium text-sm">
                                Grow your opportunities with Mchongo Points!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
