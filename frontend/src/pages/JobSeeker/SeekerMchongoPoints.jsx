import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../assets/js/axios-client";
import Loading from "../../components/Loading";
import { Rocket, Zap, CreditCard, BadgeCheck, ArrowRight, Coins } from "lucide-react";

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
            `/jobposter/purchase-points?quantity=${quantity}&total=${totalPrice}`
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
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
            <div className="max-w-6xl mx-auto">
                {/* Title Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center bg-blue-100 p-4 rounded-full mb-4">
                        <Coins className="h-8 w-8 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-blue-900">
                        Mchongo Points
                    </h1>
                    <p className="text-blue-500 mt-3 text-lg max-w-2xl mx-auto">
                        Power your gigs with points and unlock premium opportunities
                    </p>
                </div>

                {/* Points Overview Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-all">
                        <div className="flex items-center mb-6">
                            <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                <Zap className="h-6 w-6 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-blue-800">
                                Your Available Points
                            </h2>
                        </div>
                        <div className="text-6xl font-bold text-blue-900 mb-2">
                            {user?.mchongo_points}
                        </div>
                        <p className="text-blue-500 flex items-center">
                            <BadgeCheck className="h-4 w-4 mr-2" />
                            Total Posting Points
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100 hover:shadow-md transition-all">
                        <div className="flex items-center mb-6">
                            <div className="bg-blue-100 p-3 rounded-lg mr-4">
                                <Rocket className="h-6 w-6 text-blue-600" />
                            </div>
                            <h2 className="text-2xl font-semibold text-blue-800">
                                Gigs You Can Post
                            </h2>
                        </div>
                        <div className="text-6xl font-bold text-blue-900 mb-2">
                            {user?.mchongo_points}
                        </div>
                        <p className="text-blue-500 flex items-center">
                            <BadgeCheck className="h-4 w-4 mr-2" />
                            Post new gigs anytime
                        </p>
                    </div>
                </div>

                {/* Purchase Points Section */}
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-blue-100 mb-12">
                    <div className="flex items-center mb-8">
                        <div className="bg-blue-100 p-3 rounded-lg mr-4">
                            <CreditCard className="h-6 w-6 text-blue-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-blue-900">
                            Purchase More Points
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="text-blue-700 text-lg">
                            Purchase more posting points at <span className="font-semibold">TZS 700 per point</span>
                        </div>

                        <div>
                            <label
                                htmlFor="quantity"
                                className="block text-blue-700 font-medium mb-3 text-lg"
                            >
                                Quantity
                            </label>
                            <div className="relative">
                                <input
                                    id="quantity"
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(Number(e.target.value))
                                    }
                                    placeholder="Enter number of points"
                                    className="w-full border-2 border-blue-200 rounded-xl p-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-lg"
                                />
                                <div className="absolute right-4 top-4 text-blue-400">
                                    points
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-5 rounded-xl">
                            <div className="flex justify-between items-center">
                                <span className="text-blue-700 font-medium">Total Amount:</span>
                                <span className="text-2xl font-bold text-blue-900">
                                    TZS {totalPrice.toLocaleString()}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-4 px-10 rounded-xl shadow-md transition-all duration-300 flex items-center group"
                            >
                                Buy Points
                                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </form>
                </div>

                {/* Info Section */}
                <div className="text-center">
                    <div className="inline-flex items-center bg-blue-50 px-6 py-3 rounded-full">
                        <Zap className="h-5 w-5 text-blue-500 mr-2" />
                        <p className="text-blue-600 font-medium">
                            Grow your opportunities with Mchongo Points!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
