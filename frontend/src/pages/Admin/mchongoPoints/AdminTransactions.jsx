import { useEffect, useState } from "react";
import axiosClient from "../../../assets/js/axios-client";

// datatable
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function AdminTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
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
            .get("/admin/transactions")
            .then(({ data }) => {
                setTransactions(data.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        getTransactions();
    }, []);

    console.log(transactions);

    const formatDate = (rowData) => {
        return new Date(rowData.created_at).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });
    };

    const formatAmount = (rowData) => {
        return rowData.amount.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
        });
    };

    const formatStatus = (rowData) => {
        const status = rowData.status;
        const severity =
            status === "SUCCESS"
                ? "success"
                : status === "PREVIEWED"
                ? "info"
                : status === "FAILED"
                ? "danger"
                : "warning";

        return <span className={`p-tag p-tag-${severity}`}>{status}</span>;
    };

    const indexTemplate = (rowData, { rowIndex }) => rowIndex + 1;

    const formatName = (rowData) => {
        return `${rowData.user.firstname} ${rowData.user.lastname}`;
    };

    const customStatusSort = (event) => {
        return [...transactions].sort((data1, data2) => {
            const value1 = data1.status;
            const value2 = data2.status;
            if (value1 == null && value2 == null) return 0;
            if (value2 == null) return -1;
            if (value1 == null) return 1;
            return value1.localeCompare(value2) * event.order; // Ascending/descending via event.order (1 or -1)
        });
    };

    const columns = [
        {
            header: "#",
            body: indexTemplate,
            style: { width: "3rem", minWidth: "3rem" },
            sortable: false,
        },
        {
            field: "created_at",
            header: "Date",
            body: formatDate,
            bodyStyle: {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            },
            headerStyle: { whiteSpace: "nowrap" },
            style: { width: "10rem", minWidth: "10rem" },
            sortable: true
        },
        {
            header: "User",
            body: formatName,
            bodyStyle: {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            },
            headerStyle: { whiteSpace: "nowrap" },
            style: { width: "12rem", minWidth: "12rem" },
            sortable: false
        },
        {
            field: "user.usertype",
            header: "User Type",
            bodyStyle: {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            },
            headerStyle: { whiteSpace: "nowrap" },
            style: { width: "8rem", minWidth: "8rem" },
            sortable: true,
        },
        {
            field: "points_purchased",
            header: "Points Purchased",
            bodyStyle: {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            },
            headerStyle: { whiteSpace: "nowrap" },
            style: { width: "10rem", minWidth: "10rem" },
            sortable: true,
        },
        {
            field: "phone_number",
            header: "Phone number",
            bodyStyle: {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            },
            headerStyle: { whiteSpace: "nowrap" },
            style: { width: "12rem", minWidth: "12rem" },
            sortable: true,
        },
        {
            field: "channel",
            header: "Payment method",
            bodyStyle: {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            },
            headerStyle: { whiteSpace: "nowrap" },
            style: { width: "12rem", minWidth: "12rem" },
            sortable: true,
        },
        {
            field: "amount",
            header: "Amount",
            body: formatAmount,
            bodyStyle: {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            },
            headerStyle: { whiteSpace: "nowrap" },
            style: { width: "10rem", minWidth: "10rem" },
            sortable: true,
        },
        {
            field: "collected_amount",
            header: "Collected Amount",
            bodyStyle: {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            },
            headerStyle: { whiteSpace: "nowrap" },
            style: { width: "12rem", minWidth: "12rem" },
            sortable: true,
        },
        {
            header: "Status",
            body: formatStatus,
            bodyStyle: {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            },
            headerStyle: { whiteSpace: "nowrap" },
            style: { width: "8rem", minWidth: "8rem" },
            sortable: true,
            sortFunction: customStatusSort,
        },
        {
            field: "reference",
            header: "Reference",
            bodyStyle: {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            },
            headerStyle: { whiteSpace: "nowrap" },
            style: { width: "12rem", minWidth: "12rem" },
            sortable: true,
        },
        {
            field: "customer_details",
            header: "Transac Customer",
            bodyStyle: {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            },
            headerStyle: { whiteSpace: "nowrap" },
            style: { width: "12rem", minWidth: "12rem" },
        },
        {
            field: "failure_reason",
            header: "Failure Reason",
            bodyStyle: {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
            },
            headerStyle: { whiteSpace: "nowrap" },
            style: { width: "12rem", minWidth: "12rem" },
        },
    ];

    return (
        <section className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-blue-900 mb-6">
                Transaction History
            </h1>

            {/* Filter Section */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row md:items-end gap-4">
                <div>
                    <label className="block text-sm text-gray-600">From</label>
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
                    <label className="block text-sm text-gray-600">To</label>
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

            <div className="card" style={{ width: "100%", overflowX: "auto" }}>
                <DataTable
                    value={transactions}
                    tableStyle={{ minWidth: "120rem" }} // Set a large minWidth to force horizontal scroll if columns exceed viewport
                    scrollable
                    stripedRows
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    sortMode="multiple"
                    removableSort
                    loading={loading}
                >
                    {columns.map((col, i) => (
                        <Column
                            key={col.field || col.header || i} // Use i as fallback for columns without field
                            field={col.field}
                            header={col.header}
                            body={col.body}
                            bodyStyle={col.bodyStyle}
                            headerStyle={col.headerStyle}
                            sortable={col.sortable}
                            sortFunction={col.sortFunction}
                            style={col.style}
                        />
                    ))}
                </DataTable>
            </div>
        </section>
    );
}
