import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../assets/js/axios-client";
import { showTopErrorAlert } from "../../utils/sweetAlert";
import Loading from "../../components/Loading";
import { useModal } from "../../context/ModalContext";
import NoPointsModal from "./jobs/NoPointsModal";
import JobsAndApplicationsChart from "../../components/JobsAndApplicationsChart";

function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState();
    const [user, setUser] = useState(null);
    const [graphData, setGraphData] = useState([]);
    const [isProfileComplete, setIsProfileComplete] = useState(true);
    const { openModal } = useModal();
    const navigate = useNavigate();
    const status = {
        Accepted: "text-green-600",
        Denied: "text-red-600",
        Received: "text-gray-700",
    };

    const getStats = () => {
        setLoading(true);

        axiosClient
            .get("/jobposter/dashboard")
            .then(({ data }) => {
                setStats(data);

                setGraphData(data.graphData)

                setLoading(false);
            })
            .catch((err) => {
                showTopErrorAlert(err.response.data.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        setLoading(true);
        axiosClient.get("/get-user").then(({ data }) => {
            setUser(data.user);

            // check for complete profile
            const user = data.user;
            if (
                !user.username ||
                !user.gender ||
                !user.dob ||
                !user.phone ||
                !user.address
            )
                setIsProfileComplete(false);

            setLoading(false);
        });
    }, []);

    useEffect(() => {
        getStats();
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

    const newJob = () => {
        if (user.mchongo_points < 1) {
            openModal({
                title: "Insufficient Mchongo Points",
                content: <NoPointsModal />,
                size: "xl4",
                variant: "danger",
            });
        }
        if (user.mchongo_points > 0) {
            navigate("/jobposter/jobs/create");
        }
    };

    {
        return loading ? (
            <Loading />
        ) : (
            <div className="w-full p-2">
                <div className="border-l-4 border-blue-900 text-blue-900 font-semibold text-lg p-2 italic bg-blue-50 flex items-center justify-between">
                    <h2>Hello {user?.firstname}, Welcome Back!</h2>{" "}
                    <span className="hidden md:block">
                        {formatDate2(new Date())}
                    </span>
                </div>

                {!isProfileComplete && (
                    <div className="w-full my-2 border-3 border-red-200 rounded-lg p-6 flex flex-col items-center space-y-3">
                        <p className="text-center text-gray-600 font-semibold">
                            Please complete your profile information to provide
                            more details about yourself
                        </p>
                        <Link to="/jobposter/account">
                            <button className="bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 text-white cursor-pointer font-semibold text-sm">
                                <span>view profile</span>
                            </button>
                        </Link>
                    </div>
                )}

                <div className="w-full flex flex-col md:flex-row">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-5">
                        <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100">
                            <h2 className="text-xl font-semibold text-blue-600 mb-4">
                                Jobs Posted
                            </h2>
                            <div className="text-5xl font-bold text-blue-700">
                                {stats?.jobs_count}
                            </div>
                            <Link to="/jobposter/jobs">
                                <p className="text-gray-500 mt-2 text-lg hover:text-blue-900">
                                    view
                                </p>
                            </Link>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100">
                            <h2 className="text-xl font-semibold text-blue-600 mb-4">
                                Job Applications
                            </h2>
                            <div className="text-5xl font-bold text-blue-700">
                                {stats?.applications_count}
                            </div>
                            <Link to="/jobposter/applications">
                                <p className="text-gray-500 mt-2 text-lg hover:text-blue-900">
                                    view
                                </p>
                            </Link>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100">
                            <h2 className="text-xl font-semibold text-blue-600 mb-4">
                                Employments Created
                            </h2>
                            <div className="text-5xl font-bold text-blue-700">
                                {stats?.employments}
                            </div>
                            <p className="text-gray-500 mt-2">
                                Keep creating more opportunities
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100">
                            <h2 className="text-xl font-semibold text-blue-600 mb-4">
                                Mchongo Points
                            </h2>
                            <div className="text-5xl font-bold text-blue-700">
                                {user?.mchongo_points}
                            </div>
                            <p className="text-gray-500 mt-2">
                                Total posting points
                            </p>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col md:flex-row my-4">
                    <div className="w-full md:w-1/2 py-2 px-4 my-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg text-blue-900 font-semibold">
                                Jobs Posted
                            </h3>
                            <button
                                onClick={newJob}
                                className="bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 text-white cursor-pointer flex items-center space-x-2 font-semibold text-sm"
                            >
                                <FaPlus /> <span>new job</span>
                            </button>
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
                                            Date Posted
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
                                    {stats?.jobs?.map((job, index) => {
                                        return (
                                            <tr key={job.id}>
                                                <td className="p-2 text-left border border-gray-300">
                                                    {index + 1}
                                                </td>
                                                <td className="p-2 text-left border border-gray-300">
                                                    {job.title}
                                                </td>
                                                <td className="p-2 text-left border border-gray-300">
                                                    {formatDate(job.created_at)}
                                                </td>
                                                <td className="p-2 text-left border border-gray-300">
                                                    {job.status.name}
                                                </td>
                                                <td className="p-2 text-left border border-gray-300">
                                                    <Link
                                                        to={`/jobposter/jobs/${job.id}`}
                                                    >
                                                        <button className="w-full bg-blue-500 py-1 px-2 rounded-sm hover:bg-blue-600 text-white cursor-pointer">
                                                            view
                                                        </button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 py-2 px-4 my-4">
                        <h3 className="text-lg text-blue-900 mb-4 font-semibold">
                            Job Applications
                        </h3>

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
                                            Date
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
                                    {stats?.applications?.map(
                                        (application, index) => {
                                            return (
                                                <tr key={application.id}>
                                                    <td className="p-2 text-left border border-gray-300">
                                                        {index + 1}
                                                    </td>
                                                    <td className="p-2 text-left border border-gray-300">
                                                        {application.job.title}
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
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="w-full my-2 p-4">
                    <h3 className="text-lg text-blue-900 font-semibold">
                        Graph Analytics
                    </h3>
                    <div className="w-full">
                        <JobsAndApplicationsChart data={graphData} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
