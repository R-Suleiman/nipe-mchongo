import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaBan, FaPen } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../../assets/js/axios-client";
import Loading from "../../../components/Loading";
import Spinner from "../../../components/Spinner";
import {
    showConfirmAlert,
    showTopErrorAlert,
    showTopSuccessAlert,
} from "../../../utils/sweetAlert";

function Job() {
    const { id } = useParams();
    const [job, setJob] = useState();
    const [loading, setLoading] = useState(true);
    const status = {
        Accepted: "text-green-600",
        Denied: "text-red-600",
        Received: "text-gray-700",
    };

    const getJob = () => {
        axiosClient
            .get(`/jobposter/jobs/${id}`)
            .then(({ data }) => {
                setJob(data.job);
                setLoading(false);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status == 422) {
                    console.error(response.data.errors);
                }
                setLoading(false);
            });
    };

    useEffect(() => {
        getJob();
    }, []);

    const closeJob = () => {
        showConfirmAlert(
            "Close Job",
            "This will make the job invisible to the applicants",
            () => closeJobCallback()
        );
    };

    const closeJobCallback = () => {
        setLoading(true);

        axiosClient
            .post(`/jobs/close/${job.id}`)
            .then(({ data }) => {
                if (data) {
                    showTopSuccessAlert(data.message);
                    getJob();
                    setLoading(false);
                }
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status == 422) {
                    showTopErrorAlert(
                        response.data.errors || response.data.message
                    );
                } else {
                    showTopErrorAlert(response.data.message);
                }
                setLoading(false);
            });
    };

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
                    Job Details
                </h2>
                <div className="w-full my-3 flex items-center justify-between">
                    <Link to="/jobposter/jobs">
                        <FaArrowLeft className="text-lg text-blue-900" />
                    </Link>

                    {job?.status.name !== "Closed" && (
                        <div className="flex items-center space-x-2">
                            <Link to={`/jobposter/jobs/${job?.id}/edit`}>
                                <button className="bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 text-white cursor-pointer flex items-center space-x-2 font-semibold text-sm">
                                    <FaPen /> <span>Edit Job</span>
                                </button>
                            </Link>

                            <button
                                className="bg-red-500 py-2 px-4 rounded-md hover:bg-red-600 text-white cursor-pointer flex items-center space-x-2 font-semibold text-sm"
                                onClick={closeJob}
                                disabled={loading}
                            >
                                <FaBan />{" "}
                                <span>
                                    {" "}
                                    {loading ? (
                                        <div className="flex items-center">
                                            <Spinner />
                                            <span>closing...</span>{" "}
                                        </div>
                                    ) : (
                                        "Close Job"
                                    )}
                                </span>
                            </button>
                        </div>
                    )}
                </div>

                <div className="w-full my-2 overflow-x-auto">
                    <table className="w-full border border-gray-300">
                        <tbody>
                            <tr>
                                <th className="p-2 border border-gray-300 text-left w-1/6">
                                    Job Title:
                                </th>
                                <td className="p-2 border border-gray-300 w-5/6">
                                    {job?.title}
                                </td>
                            </tr>
                            <tr>
                                <th className="p-2 border border-gray-300 text-left w-1/6">
                                    Description:
                                </th>
                                <td className="p-2 border border-gray-300 w-5/6">
                                    {job?.description}
                                </td>
                            </tr>
                            <tr>
                                <th className="p-2 border border-gray-300 text-left w-1/6">
                                    Location:
                                </th>
                                <td className="p-2 border border-gray-300 w-5/6">
                                    {job?.location}
                                </td>
                            </tr>
                            <tr>
                                <th className="p-2 border border-gray-300 text-left w-1/6">
                                    Salary:
                                </th>
                                <td className="p-2 border border-gray-300 w-5/6">
                                    {job?.payment ?? "Not Specified"}
                                </td>
                            </tr>
                            <tr>
                                <th className="p-2 border border-gray-300 text-left w-1/6">
                                    Payment Frequency:
                                </th>
                                <td className="p-2 border border-gray-300 w-5/6">
                                    {job?.payment_frequency ?? "Not Specified"}
                                </td>
                            </tr>
                            <tr>
                                <th className="p-2 border border-gray-300 text-left w-1/6">
                                    Job Duration:
                                </th>
                                <td className="p-2 border border-gray-300 w-5/6">
                                    {job?.duration ?? "Not Specified"}
                                </td>
                            </tr>
                            <tr>
                                <th className="p-2 border border-gray-300 text-left w-1/6">
                                    People required:
                                </th>
                                <td className="p-2 border border-gray-300 w-5/6">
                                    {job?.slots}
                                </td>
                            </tr>
                            <tr>
                                <th className="p-2 border border-gray-300 text-left w-1/6">
                                    Date Advertised:
                                </th>
                                <td className="p-2 border border-gray-300 w-5/6">
                                    {formatDate(job?.created_at)}
                                </td>
                            </tr>
                            <tr>
                                <th className="p-2 border border-gray-300 text-left w-1/6">
                                    Job Status:
                                </th>
                                <td
                                    className={`p-2 border border-gray-300 w-5/6 font-semibold ${
                                        job?.status?.name === "Closed"
                                            ? "text-red-500"
                                            : "text-green-500"
                                    }`}
                                >
                                    {job?.status?.name}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="my-4">
                    <h2 className="text-blue-900 font-semibold text-lg">
                        Job Applications
                    </h2>

                    <div className="w-full my-4 overflow-x-auto">
                        <table className="w-full border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="p-2 text-left border border-gray-300">
                                        Sn
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
                                {job?.applications?.length > 0 ? (
                                    job.applications.map(
                                        (application, index) => {
                                            return (
                                                <tr key={application.id}>
                                                    <td className="p-2 text-left border border-gray-300">
                                                        {index + 1}
                                                    </td>
                                                    <td className="p-2 text-left border border-gray-300">
                                                        {
                                                            application.seeker
                                                                .firstname
                                                        }{" "}
                                                        {
                                                            application.seeker
                                                                .lastname
                                                        }
                                                    </td>
                                                    <td className="p-2 text-left border border-gray-300">
                                                        {formatDate(
                                                            application.created_at
                                                        )}
                                                    </td>
                                                    <td
                                                        className={`p-2 text-left border border-gray-300 font-semibold ${
                                                            status[
                                                                application
                                                                    .status.name
                                                            ]
                                                        }`}
                                                    >
                                                        {
                                                            application.status
                                                                .name
                                                        }
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
                                        }
                                    )
                                ) : (
                                    <tr>
                                        <td
                                            className="p-2 border border-gray-300 text-center"
                                            colSpan={5}
                                        >
                                            No Applications
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Job;
