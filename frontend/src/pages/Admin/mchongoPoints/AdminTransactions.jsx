import { useEffect, useState, useMemo } from "react";
import axiosClient from "../../../assets/js/axios-client";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { MultiSelect } from "primereact/multiselect";
import { Calendar } from "primereact/calendar";

export default function AdminTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [lazyParams, setLazyParams] = useState({
        first: 0,
        rows: 10,
        page: 0,
        sortField: "created_at",
        sortOrder: -1, // Descending
        filters: {
            created_at: { value: null, matchMode: FilterMatchMode.DATE_IS },
            "user.usertype": { value: null, matchMode: FilterMatchMode.EQUALS },
            points_purchased: {
                value: null,
                matchMode: FilterMatchMode.CONTAINS,
            },
            phone_number: { value: null, matchMode: FilterMatchMode.CONTAINS },
            user: { value: null, matchMode: FilterMatchMode.CONTAINS },
            channel: { value: null, matchMode: FilterMatchMode.EQUALS },
            amount: { value: null, matchMode: FilterMatchMode.CUSTOM },
            collected_amount: {
                value: null,
                matchMode: FilterMatchMode.CUSTOM,
            },
            status: { value: null, matchMode: FilterMatchMode.IN },
            reference: { value: null, matchMode: FilterMatchMode.CONTAINS },
            customer_details: {
                value: null,
                matchMode: FilterMatchMode.CONTAINS,
            },
            failure_reason: {
                value: null,
                matchMode: FilterMatchMode.CONTAINS,
            },
        },
    });

    const statuses = useMemo(
        () => [...new Set(transactions.map((t) => t.status).filter(Boolean))],
        [transactions]
    );
    const channels = useMemo(
        () => [...new Set(transactions.map((t) => t.channel).filter(Boolean))],
        [transactions]
    );
    const usertypes = useMemo(
        () => [
            ...new Set(
                transactions.map((t) => t.user?.usertype).filter(Boolean)
            ),
        ],
        [transactions]
    );

    const loadData = () => {
        setLoading(true);
        const params = {
            first: lazyParams.first,
            rows: lazyParams.rows,
            sortField: lazyParams.sortField,
            sortOrder: lazyParams.sortOrder,
            filters: JSON.stringify(lazyParams.filters),
        };
        axiosClient
            .get("/admin/transactions", { params })
            .then(({ data }) => {
                setTransactions(data.data.data);
                setTotalRecords(data.data.total);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    useEffect(() => {
        loadData();
    }, [lazyParams]);

    const onPage = (event) => {
        setLazyParams({
            ...lazyParams,
            first: event.first,
            rows: event.rows,
            page: event.page,
        });
    };

    const onSort = (event) => {
        setLazyParams({
            ...lazyParams,
            sortField: event.sortField,
            sortOrder: event.sortOrder,
        });
    };

    const onFilter = (event) => {
        setLazyParams({ ...lazyParams, filters: event.filters });
    };

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

    const getSeverity = (status) => {
        switch (status) {
            case "SUCCESS":
                return "success";
            case "PREVIEWED":
                return "info";
            case "FAILED":
                return "danger";
            default:
                return "warning";
        }
    };

    const formatStatus = (rowData) => {
        return (
            <span className={`p-tag p-tag-${getSeverity(rowData.status)}`}>
                {rowData.status}
            </span>
        );
    };

    const statusItemTemplate = (option) => {
        return (
            <span className={`p-tag p-tag-${getSeverity(option)}`}>
                {option}
            </span>
        );
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
            return (
                value1.toString().localeCompare(value2.toString(), undefined, {
                    sensitivity: "base",
                }) * event.order
            );
        });
    };

    const numericFilterFunction = (value, filter) => {
        if (!filter) return true;
        const cleanFilter = filter.replace(/[$,]/g, "");
        return value.toString().includes(cleanFilter);
    };

    const textFilterTemplate = (options) => {
        return (
            <InputText
                value={options.value || ""}
                onChange={(e) => options.filterApplyCallback(e.target.value)}
                placeholder={options.filterPlaceholder || "Search"}
                style={{ minWidth: "12rem" }}
            />
        );
    };

    const dateFilterTemplate = (options) => {
        return (
            <Calendar
                value={options.value ? new Date(options.value) : ''}
                onChange={(e) => {
                    if (e.value instanceof Date) {
                        // Build a UTC date at midnight
                        const utcDate = new Date(
                            Date.UTC(
                                e.value.getFullYear(),
                                e.value.getMonth(),
                                e.value.getDate()
                            )
                        );

                        // Force UTC YYYY-MM-DD
                        const value = utcDate.toISOString().split("T")[0];

                        options.filterApplyCallback(value);
                    } else {
                        options.filterApplyCallback(null);
                    }
                }}
                dateFormat="yy-mm-dd"
                placeholder="Select date"
                className="p-column-filter"
                style={{ minWidth: "12rem" }}
            />
        );
    };

    const numericFilterTemplate = (options) => {
        return (
            <InputText
                value={options.value || ''}
                onChange={(e) => options.filterApplyCallback(e.target.value)}
                placeholder="Search (e.g., 100)"
                style={{ minWidth: "12rem" }}
            />
        );
    };

    const statusFilterTemplate = (options) => {
        return (
            <MultiSelect
                value={options.value || ''}
                options={statuses}
                itemTemplate={statusItemTemplate}
                onChange={(e) => options.filterApplyCallback(e.value)}
                placeholder="Select Status"
                className="p-column-filter"
                showClear
                style={{ minWidth: "12rem" }}
            />
        );
    };

    const channelFilterTemplate = (options) => {
        return (
            <Dropdown
                value={options.value || ''}
                options={channels}
                onChange={(e) => options.filterApplyCallback(e.value)}
                placeholder="Select Method"
                className="p-column-filter"
                showClear
                style={{ minWidth: "12rem" }}
            />
        );
    };

    const usertypeFilterTemplate = (options) => {
        return (
            <Dropdown
                value={options.value || ''}
                options={usertypes}
                onChange={(e) => options.filterApplyCallback(e.value)}
                placeholder="Select Type"
                className="p-column-filter"
                showClear
                style={{ minWidth: "10rem" }}
            />
        );
    };

    const columns = useMemo(
        () => [
            {
                header: "#",
                body: indexTemplate,
                style: { width: "3rem", minWidth: "3rem" },
                sortable: false,
                filter: false,
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
                sortable: true,
                filter: true,
                filterElement: dateFilterTemplate,
                filterPlaceholder: "Select date",
                filterMatchMode: FilterMatchMode.DATE_IS,
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
                sortable: false,
                filter: true,
                filterField: "user",
                filterElement: textFilterTemplate,
                filterPlaceholder: "Search user",
                filterMatchMode: FilterMatchMode.CONTAINS,
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
                sortable: false, // Disabled sort for nested field (backend complexity)
                filter: true,
                filterField: "user.usertype",
                filterElement: usertypeFilterTemplate,
                filterPlaceholder: "Select Type",
                filterMatchMode: FilterMatchMode.EQUALS,
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
                filter: true,
                filterPlaceholder: "Search points",
                filterMatchMode: FilterMatchMode.CONTAINS,
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
                style: { width: "20rem", minWidth: "12rem" },
                sortable: true,
                filter: true,
                filterPlaceholder: "Search phone",
                filterMatchMode: FilterMatchMode.CONTAINS,
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
                filter: true,
                filterElement: channelFilterTemplate,
                showFilterMenu: false,
                filterPlaceholder: "Select Method",
                filterMatchMode: FilterMatchMode.EQUALS,
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
                filter: true,
                filterElement: numericFilterTemplate,
                filterPlaceholder: "Search amount",
                filterMatchMode: FilterMatchMode.CUSTOM,
                filterFunction: numericFilterFunction,
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
                filter: true,
                filterElement: numericFilterTemplate,
                filterPlaceholder: "Search collected",
                filterMatchMode: FilterMatchMode.CUSTOM,
                filterFunction: numericFilterFunction,
            },
            {
                field: "status",
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
                filter: true,
                filterField: "status",
                filterElement: statusFilterTemplate,
                showFilterMenu: false,
                filterMatchMode: FilterMatchMode.IN,
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
                filter: true,
                filterPlaceholder: "Search reference",
                filterMatchMode: FilterMatchMode.CONTAINS,
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
                sortable: false,
                filter: true,
                filterPlaceholder: "Search customer",
                filterMatchMode: FilterMatchMode.CONTAINS,
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
                sortable: true,
                filter: true,
                filterPlaceholder: "Search failure reason",
                filterMatchMode: FilterMatchMode.CONTAINS,
            },
        ],
        []
    );

    return (
        <section className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold text-blue-900 mb-6">
                Transaction History
            </h1>
            <div className="card" style={{ width: "100%", overflowX: "auto" }}>
                <DataTable
                    value={transactions}
                    tableStyle={{ minWidth: "120rem" }}
                    scrollable
                    stripedRows
                    paginator
                    rows={lazyParams.rows}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    sortMode="single"
                    removableSort
                    loading={loading}
                    filters={lazyParams.filters}
                    filterDisplay="row"
                    lazy
                    totalRecords={totalRecords}
                    first={lazyParams.first}
                    sortField={lazyParams.sortField}
                    sortOrder={lazyParams.sortOrder}
                    onPage={onPage}
                    onSort={onSort}
                    onFilter={onFilter}
                >
                    {columns.map((col, i) => (
                        <Column
                            key={col.field || col.header || i}
                            field={col.field}
                            header={col.header}
                            body={col.body}
                            bodyStyle={col.bodyStyle || {}}
                            headerStyle={col.headerStyle || {}}
                            sortable={col.sortable || false}
                            sortFunction={col.sortFunction}
                            style={
                                col.style || {
                                    width: "10rem",
                                    minWidth: "10rem",
                                }
                            }
                            filter={col.filter || false}
                            filterElement={col.filterElement}
                            filterPlaceholder={col.filterPlaceholder}
                            filterField={col.filterField}
                            showFilterMenu={
                                col.showFilterMenu !== undefined
                                    ? col.showFilterMenu
                                    : true
                            }
                            filterMatchMode={col.filterMatchMode}
                            filterFunction={col.filterFunction}
                        />
                    ))}
                </DataTable>
            </div>
        </section>
    );
}
