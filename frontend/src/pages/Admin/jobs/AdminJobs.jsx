import React, { useEffect, useState } from "react";
import { FaCalendar, FaClock, FaPlus, FaSearch, FaTasks, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../../assets/js/axios-client";
import Loading from "../../../components/Loading";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Pagination from "../../../components/Pagination";

function AdminJobs() {
    dayjs.extend(relativeTime);
    const [jobs, setJobs] = useState();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [meta, setMeta] = useState({});
    const [page, setPage] = useState(1);

    const getJobs = () => {
        setLoading(true);
        axiosClient
            .post("/admin/jobs", { search, page})
            .then(({ data }) => {
                setJobs(data.jobs.data);
                setMeta({
                    currentPage: data.jobs.current_page,
                    lastPage: data.jobs.last_page,
                });
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
        const delayDebounce = setTimeout(() => {
            getJobs();
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [search, page]);

    useEffect(() => {
        axiosClient.get("/get-user").then(({ data }) => {
            setUser(data.user);
        });
    }, []);

    const newJob = () => {
        if (user.mchongo_points > 0) {
            navigate("/admin/jobs/create");
        }
    };

   { return loading ? (<Loading />) : (
        <div className="w-full p-2">
            <div className="border-l-4 border-blue-900 text-blue-900 font-semibold text-lg p-2 bg-blue-50 flex items-center justify-between">
                <h2 className="italic">All Available Jobs</h2>{" "}
                <button
                    onClick={newJob}
                    className="bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 text-white cursor-pointer flex items-center space-x-2 font-semibold text-sm"
                >
                    <FaPlus /> <span>new job</span>
                </button>
            </div>

              <div className="w-full flex flex-col md:flex-row">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-5">
                        <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100">
                            <h2 className="text-xl font-semibold text-blue-600 mb-4">
                                Total Jobs
                            </h2>
                            <div className="text-5xl font-bold text-blue-700">
                                {jobs?.length}
                            </div>
                        </div>
                         <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100">
                            <h2 className="text-xl font-semibold text-blue-600 mb-4">
                                Open Jobs
                            </h2>
                            <div className="text-5xl font-bold text-blue-700">
                                {
                                    jobs?.filter(
                                        (job) => job.status_id === 4
                                    ).length
                                }
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100">
                            <h2 className="text-xl font-semibold text-blue-600 mb-4">
                                closed Jobs
                            </h2>
                            <div className="text-5xl font-bold text-blue-700">
                                 {
                                    jobs?.filter(
                                        (job) => job.status_id === 5
                                    ).length
                                }
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-md border border-blue-100">
                            <h2 className="text-xl font-semibold text-blue-600 mb-4">
                                Having Applications
                            </h2>
                            <div className="text-5xl font-bold text-blue-700">
                                {
                                    jobs.filter(
                                        (job) => job.applications.length !== 0
                                    ).length
                                }
                            </div>
                        </div>
                    </div>
                </div>

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
                            placeholder="Type here to search job by name, status"
                        />
                    </div>
                </form>
            </div>

            <div className="w-full my-4 flex flex-col md:flex-row flex-wrap">
                { jobs?.length > 0 ? (
                    jobs?.map((job) => {
                        return (
                            <div className="w-full md:w-1/4 my-2" key={job.id}>
                                <div className="w-11/12 mx-auto flex flex-col space-y-1 border-t-3 border-blue-900 rounded-md p-3 bg-blue-50">
                                    <h3 className="text-lg text-gray-800 font-semibold">
                                        {job.title}
                                    </h3>
                                    <p className="flex space-x-2 text-blue-900 text-sm items-center my-1">
                                        <FaClock/>
                                        <span>
                                            {dayjs(job.created_at).fromNow()}
                                        </span>
                                    </p>
                                    <p className="flex space-x-2 text-blue-900 text-sm items-center my-1">
                                        <FaUser />
                                        <span>
                                            {job.applications.length}{" "}
                                            Applications
                                        </span>
                                    </p>
                                    <p className="flex space-x-2 text-blue-900 text-sm items-center font-semibold my-1">
                                        <FaTasks />
                                        <span
                                            className={`${
                                                job.status.name === "Closed"
                                                    ? "text-red-500"
                                                    : "text-green-500"
                                            }`}
                                        >
                                            {job.status.name}
                                        </span>
                                    </p>
                                    <div className="w-full mt-2">
                                        <Link to={`/admin/jobs/${job.id}`}>
                                            <button className="border-2 border-blue-500 text-blue-500 font-semibold hover:text-white p-2 text-sm w-full rounded-sm hover:bg-blue-500 cursor-pointer">
                                                View Job
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="my-4 w-fit mx-auto">
                        <p className="text-lg font-semibold text-gray-600">
                            No Jobs Found!
                        </p>
                    </div>
                )}
                <div />
            </div>

            <Pagination
                currentPage={meta.currentPage}
                lastPage={meta.lastPage}
                onPageChange={setPage}
            />
        </div>
    )};
}

export default AdminJobs;
