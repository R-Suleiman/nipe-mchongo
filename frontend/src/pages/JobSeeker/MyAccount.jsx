import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../assets/js/axios-client";
import Loading from "../../components/Loading";

export default function MchongoPoints() {
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

    {
        return loading ? (
            <Loading />
        ) : (
            <div className="min-h-screen bg-blue-50 p-8">
                <div className="max-w-4xl mx-auto">
                    {/* Title Section */}
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-blue-700">
                            Mchongo Points
                        </h1>
                        <p className="text-blue-500 mt-2">
                            Manage your points and unlock more opportunities!
                        </p>
                    </div>

                    {/* Points Overview Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100">
                            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                                Your Available Points
                            </h2>
                            <div className="text-5xl font-bold text-blue-700">
                                {user?.mchongo_points}
                            </div>
                            <p className="text-gray-500 mt-2">
                                Total Posting Points
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100">
                            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                                Gigs You Can Post
                            </h2>
                            <div className="text-5xl font-bold text-blue-700">
                                {user?.mchongo_points}
                            </div>
                            <p className="text-gray-500 mt-2">
                                Post new gigs anytime
                            </p>
                        </div>
                    </div>

                    {/* Purchase Points Section */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100">
                        <h2 className="text-3xl font-bold text-blue-700 mb-6">
                            Purchase More Points
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                Purchase more posting points. TZS 700 per point.
                            </div>

                            <div>
                                <label
                                    htmlFor="quantity"
                                    className="block text-blue-600 font-medium mb-2"
                                >
                                    Quantity
                                </label>
                                <input
                                    id="quantity"
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(Number(e.target.value))
                                    }
                                    placeholder="Enter number of points"
                                    className="w-full border border-blue-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
                                />
                            </div>

                            <div className="text-right">
                                <p className="text-lg font-semibold text-blue-600">
                                    Total: TZS {totalPrice.toLocaleString()}
                                </p>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300"
                                >
                                    Buy Points
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Info Section */}
                    <div className="text-center text-blue-600 mt-12">
                        <p className="text-sm mt-2 text-blue-400">
                            Grow your opportunities with Mchongo Points!
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
