import React, { useEffect, useState } from "react";
import { FaCalendar, FaPlus, FaSearch, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import axiosClient from "../../../assets/js/axios-client";
import Loading from "../../../components/Loading";
import { showTopErrorAlert } from "../../../utils/sweetAlert";
import Pagination from "../../../components/Pagination";

function Applications() {
    const [applications, setApplications] = useState();
    const [loading, setLoading] = useState(true);
    const status = {
        Accepted: "text-green-600",
        Denied: "text-red-600",
        Received: "text-gray-700",
    };
    const [search, setSearch] = useState("");
    const [meta, setMeta] = useState({});
    const [page, setPage] = useState(1);

    const getApplications = () => {
        setLoading(true);
        axiosClient
            .post("/job-applications", { search, page })
            .then(({ data }) => {
                setApplications(data.applications.data);
                setMeta({
                    currentPage: data.applications.current_page,
                    lastPage: data.applications.last_page,
                });
                setLoading(false);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status == 422) {
                    showTopErrorAlert(response.data.errors);
                }
                setLoading(false);
            });
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            getApplications();
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [search, page]);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };

    {
        return loading ? (
            <Loading />
        ) : (
            <div className="w-full p-2">
                <h2 className="border-l-4 border-blue-900 text-blue-900 font-semibold text-lg p-2 italic bg-blue-50">
                    My Job Applications
                </h2>
                <div className="w-full my-2">
                    <form className="w-full">
                        <div className="w-full flex">
                            <input
                                type="text"
                                name="search"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }}
                                className="w-full rounded-md p-2 bg-blue-50 border border-blue-200 outline-none"
                                placeholder="Type here to search"
                            />
                        </div>
                    </form>
                </div>

                <div className="w-full my-4 overflow-x-auto">
                    <table className="w-full border border-gray-300">
                        <thead>
                            <tr>
                                <th className="p-2 text-left border border-gray-300">
                                    Sn
                                </th>
                                <th className="p-2 text-left border border-gray-300">
                                    Job Title
                                </th>
                                <th className="p-2 text-left border border-gray-300">
                                    Applicant
                                </th>
                                <th className="p-2 text-left border border-gray-300">
                                    Date Applied
                                </th>
                                <th className="p-2 text-left border border-gray-300">
                                    Status
                                </th>
                                <th className="p-2 text-left border border-gray-300">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications?.length > 0 ? (
                                applications?.map((application, index) => {
                                    return (
                                        <tr key={application.id}>
                                            <td className="p-2 text-left border border-gray-300">
                                                {index + 1}
                                            </td>
                                            <td className="p-2 text-left border border-gray-300">
                                                {application.job.title}
                                            </td>
                                            <td className="p-2 text-left border border-gray-300">
                                                {application.seeker.firstname}{" "}
                                                {application.seeker.lastname}
                                            </td>
                                            <td className="p-2 text-left border border-gray-300">
                                                {formatDate(
                                                    application.created_at
                                                )}
                                            </td>
                                            <td
                                                className={`p-2 text-left border border-gray-300 font-semibold ${
                                                    status[
                                                        application.status.name
                                                    ]
                                                }`}
                                            >
                                                {application.status.name}
                                            </td>
                                            <td className="p-2 text-left border border-gray-300">
                                                <Link
                                                    to={`/jobposter/applications/${application.id}`}
                                                >
                                                    <button className="w-full bg-blue-500 py-1 px-2 rounded-sm hover:bg-blue-600 text-white cursor-pointer">
                                                        view
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="text-center font-semibold text-gray-600 p-2"
                                    >
                                        No Applications Found!
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
            </div>
        );
    }
}

export default Applications;
