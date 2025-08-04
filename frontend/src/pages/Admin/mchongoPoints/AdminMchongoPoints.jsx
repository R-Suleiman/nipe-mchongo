import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../assets/js/axios-client";
import { showTopErrorAlert } from "../../../utils/sweetAlert";
import Loading from "../../../components/Loading";
import { useModal } from "../../../context/ModalContext";
import Pagination from "../../../components/Pagination";
import PointsSummary from "../../../components/PointsSummary";

function AdminMchongoPoints() {
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [stats, setStats] = useState();
    const [user, setUser] = useState(null);
    const [jobsGraph, setJobsGraph] = useState([]);
    const [applicationsGraph, setApplicationsGraph] = useState([]);
    const { openModal } = useModal();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [meta, setMeta] = useState({});
    const [page, setPage] = useState(1);
    const [transactions, setTransactions] = useState([]);
    const [filters, setFilters] = useState({
        date_from: "",
        date_to: "",
    });

    const handleFilters = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const fetchTransactions = async () => {
        setLoading2(true);
        try {
            const response = await axiosClient.get("/admin/transactions", {
                params: {
                    search,
                    date_from: filters.date_from,
                    date_to: filters.date_to,
                },
            });
            setTransactions(response.data.data);
            setMeta({
                    currentPage: response?.data.current_page,
                    lastPage: response?.data.last_page,
                });
        } catch (error) {
            console.error("Failed to fetch transactions", error);
        } finally {
            setLoading2(false);
        }
    };

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

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchTransactions();
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [search, filters]);

    useEffect(() => {
        setLoading(true);
        axiosClient.get("/get-user").then(({ data }) => {
            setUser(data.user);
            setLoading(false);
        });
    }, []);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };
    const formatDate2 = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

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
                                {stats?.totalPostingPoints}
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
                                {stats?.totalApplicationPoints}
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
                                {stats?.todaysPostingPoints} - post,{" "}
                                {stats?.todaysApplicationPoints} - app
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

                <div className="w-full my-4">
                    <div className="w-full py-2 px-4 my-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg text-blue-900 font-semibold">
                                Transaction History
                            </h3>
                        </div>
                        <div className="w-full my-2 flex items-center flex-col md:flex-row gap-3">
                            <form className="w-full md:w-2/6">
                                <div className="w-full flex">
                                    <input
                                        type="text"
                                        name="search"
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                        }}
                                        className="w-full rounded-md p-2 bg-blue-50 border border-blue-200 outline-none"
                                        placeholder="search"
                                    />
                                </div>
                            </form>

                            <div className="w-full md:w-2/6 flex space-x-2 items-center">
                                <label
                                    htmlFor="date_from"
                                    className="text-gray-600"
                                >
                                    date from:{" "}
                                </label>
                                <input
                                    type="date"
                                    name="date_from"
                                    value={filters.date}
                                    onChange={handleFilters}
                                    className="rounded-md p-2 bg-blue-50 border border-blue-200 outline-none"
                                />
                            </div>
                            <div className="w-full md:w-2/6 flex space-x-2 items-center">
                                <label
                                    htmlFor="date_to"
                                    className="text-gray-600"
                                >
                                    date to:{" "}
                                </label>
                                <input
                                    type="date"
                                    name="date_to"
                                    value={filters.date_to}
                                    onChange={handleFilters}
                                    className="rounded-md p-2 bg-blue-50 border border-blue-200 outline-none"
                                />
                            </div>
                        </div>

                        <div className="w-full my-4 overflow-x-auto">
                            <table className="w-full border border-gray-300">
                                <thead>
                                    <tr>
                                        <th className="p-2 text-left border border-gray-300">
                                            Sn
                                        </th>
                                        <th className="p-2 text-left border border-gray-300">
                                            User
                                        </th>
                                        <th className="p-2 text-left border border-gray-300">
                                            Amount
                                        </th>
                                        <th className="p-2 text-left border border-gray-300">
                                            Points purchased
                                        </th>
                                        <th className="p-2 text-left border border-gray-300">
                                            Points type
                                        </th>
                                        <th className="p-2 text-left border border-gray-300">
                                            Date purchased
                                        </th>
                                        <th className="p-2 text-left border border-gray-300">
                                            status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading2 ? (
                                        <p className="p-4 text-center font-semibold w-full">
                                            Loading...
                                        </p>
                                    ) : (
                                        transactions?.map(
                                            (transaction, index) => (
                                                <tr key={transaction.id}>
                                                    <td className="p-2 text-left border border-gray-300">
                                                        {index + 1}
                                                    </td>
                                                    <td className="p-2 text-left border border-gray-300">
                                                        {
                                                            transaction.user
                                                                .firstname
                                                        }{" "}
                                                        {
                                                            transaction.user
                                                                .lastname
                                                        }
                                                    </td>
                                                    <td className="p-2 text-left border border-gray-300">
                                                        {transaction.amount}
                                                    </td>
                                                    <td className="p-2 text-left border border-gray-300">
                                                        {
                                                            transaction.points_purchased
                                                        }
                                                    </td>
                                                    <td className="p-2 text-left border border-gray-300">
                                                        {transaction.type}
                                                    </td>
                                                    <td className="p-2 text-left border border-gray-300">
                                                        {formatDate(
                                                            transaction.created_at
                                                        )}
                                                    </td>
                                                    <td className="p-2 text-left border border-gray-300">
                                                        {transaction.status}
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <Pagination
                        currentPage={meta.currentPage}
                        lastPage={meta.lastPage}
                        onPageChange={setPage}
                    />
                </div>
            </div>
        );
    }
}

export default AdminMchongoPoints;
