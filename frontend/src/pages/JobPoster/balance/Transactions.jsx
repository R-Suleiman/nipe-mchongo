import { useEffect, useState } from "react";
import axiosClient from "../../../assets/js/axios-client";
import Pagination from "../../../components/Pagination";

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [meta, setMeta] = useState({});
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({
        start_date: "",
        end_date: "",
        status: "",
    });
    const status = {
        SUCCESS: "bg-green-100 text-green-700",
        PROCESSING: "bg-yellow-100 text-yellow-700",
        FAILED: "bg-red-100 text-red-700",
        PREVIEWED: "bg-gray-100 text-gray-700",
    };

    const getTransactions = () => {
        setLoading(true);
        axiosClient
            .get("/jobposter/transactions", { params: { ...filters, page } })
            .then(({ data }) => {
                setTransactions(data.transactions.data);
                setMeta({
                    currentPage: data.transactions.current_page,
                    lastPage: data.transactions.last_page,
                });
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        getTransactions();
    }, [filters, page]);

    return (
        <section className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-blue-900 mb-6">
                Transaction History
            </h1>

            {/* Filter Section */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row md:items-end gap-4">
                <div>
                    <label className="block text-sm text-gray-600">
                        From
                    </label>
                    <input
                        type="date"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        value={filters.start_date}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                start_date: e.target.value,
                            })
                        }
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-600">
                        To
                    </label>
                    <input
                        type="date"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        value={filters.end_date}
                        onChange={(e) =>
                            setFilters({ ...filters, end_date: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-600">
                        Status
                    </label>
                    <select
                        className="border border-gray-300 rounded-md p-2 w-full"
                        value={filters.status}
                        onChange={(e) =>
                            setFilters({ ...filters, status: e.target.value })
                        }
                    >
                        <option value="">All</option>
                        <option value="SUCCESS">Success</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="FAILED">Failed</option>
                        <option value="PREVIEWED">Previewed</option>
                    </select>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="p-3 text-left">#</th>
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-left">Points Purchased</th>
                            <th className="p-3 text-left">Phone Number</th>
                            <th className="p-3 text-left">Payment Method</th>
                            <th className="p-3 text-left">Amount</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Reference</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="p-6 text-center text-gray-500"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : transactions?.length > 0 ? (
                            transactions.map((tx, index) => (
                                <tr
                                    key={tx.id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3 text-nowrap">
                                        {new Date(tx.created_at).toLocaleString(
                                            "en-US",
                                            {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                                hour: "numeric",
                                                minute: "numeric",
                                                hour12: true,
                                            }
                                        )}
                                    </td>
                                    <td className="p-3">
                                        {tx.points_purchased}
                                    </td>
                                    <td className="p-3">
                                        {tx.phone_number ?? 'N/A'}
                                    </td>
                                    <td className="p-3 text-nowrap">
                                        {tx.channel ?? "N/A"}
                                    </td>
                                    <td className="p-3">{tx.amount}</td>
                                    <td className="p-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                status[tx.status]
                                            }`}
                                        >
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className="p-3">{tx.reference}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="p-6 text-center text-gray-500"
                                >
                                    No transactions found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={meta.currentPage}
                lastPage={meta.lastPage}
                onPageChange={setPage}
            />
        </section>
    );
}
