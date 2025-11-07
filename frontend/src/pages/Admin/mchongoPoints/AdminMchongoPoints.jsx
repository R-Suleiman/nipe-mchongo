import { useEffect, useState } from "react";
import axiosClient from "../../../assets/js/axios-client";
import { showTopErrorAlert } from "../../../utils/sweetAlert";
import Loading from "../../../components/Loading";
import PointsSummary from "../../../components/PointsSummary";

function AdminMchongoPoints() {
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState();

    const getStats = () => {
        setLoading(true);

        axiosClient
            .get("/admin/mchongo-points-stats")
            .then(({ data }) => {
                setStats(data);
                setLoading(false);
            })
            .catch((err) => {
                showTopErrorAlert(err.response.data.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        getStats();
    }, []);

    {
        return loading ? (
            <Loading />
        ) : (
            <div className="w-full p-2">
                <div className="border-l-4 border-blue-900 text-blue-900 font-semibold text-lg p-2 italic bg-blue-50 flex items-center justify-between">
                    <h2>Mchongo Points Dashboard</h2>{" "}
                </div>

                <div className="w-full flex flex-col md:flex-row">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-5">
                        <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100">
                            <h2 className="text-xl font-semibold text-blue-600 mb-4">
                                Total Points
                            </h2>
                            <div className="text-5xl font-bold text-blue-700">
                                {Number(stats?.totalPostingPoints) +
                                    Number(stats?.totalApplicationPoints)}
                            </div>
                            <p className="text-gray-500 mt-2">
                                Total points purchased
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100">
                            <h2 className="text-xl font-semibold text-blue-600 mb-4">
                                Posting points
                            </h2>
                            <div className="text-5xl font-bold text-blue-700">
                                {Number(stats?.totalPostingPoints)}
                            </div>
                            <p className="text-gray-500 mt-2">
                                Total posting points purchased
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100">
                            <h2 className="text-xl font-semibold text-blue-600 mb-4">
                                Application points
                            </h2>
                            <div className="text-5xl font-bold text-blue-700">
                                {Number(stats?.totalApplicationPoints)}
                            </div>
                            <p className="text-gray-500 mt-2">
                                Total application points purchased
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100">
                            <h2 className="text-xl font-semibold text-blue-600 mb-4">
                                Today's points
                            </h2>
                            <div className="text-5xl font-bold text-blue-700">
                                {Number(stats?.todaysPostingPoints) +
                                    Number(stats?.todaysApplicationPoints)}
                            </div>
                            <p className="text-gray-500 mt-2">
                                {Number(stats?.todaysPostingPoints)} - post,{" "}
                                {Number(stats?.todaysApplicationPoints)} - app
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full my-2 p-4">
                    <h3 className="text-lg text-blue-900 font-semibold">
                        Graph Analytics Summary
                    </h3>
                    <div className="w-full lg:gap-4">
                     <PointsSummary data={stats?.graphData} />
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminMchongoPoints;
