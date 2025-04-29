import React, { useEffect, useState } from "react";
import axiosClient from "../../../assets/js/axios-client";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import {
    showTopErrorAlert,
    showTopSuccessAlert,
} from "../../../utils/sweetAlert";
import { FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../../../context/AuthProvider";

function JobsEditForm() {
    const { id } = useParams();
   const { user: userData } = useAuth();
    const navigate = useNavigate();
    const [jobCategories, setJobCategories] = useState();
    const [loading, setLoading] = useState();
    const [job, setJob] = useState({
        gig_poster_id: userData.id,
        title: "",
        gig_category_id: "",
        description: "",
        location: "",
        duration: "",
        payment: "",
        payment_frequency: "",
        slots: "",
    });

    const handleInputChange = (e) => {
        setJob({ ...job, [e.target.name]: e.target.value });
    };

    const getJob = () => {
        axiosClient
            .get(`/jobposter/jobs/${id}`)
            .then(({ data }) => {
                setJob(data.job);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status == 422) {
                    console.error(response.data.errors);
                }
            })
    };

    const getJobCategories = () => {
        axiosClient
            .get("/job-categories")
            .then(({ data }) => {
                setJobCategories(data.categories);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status == 422) {
                    console.error(response.data.errors);
                }
            });
    };

    useEffect(() => {
        getJobCategories();
        getJob();
    }, []);

    const updateJob = (e) => {
        e.preventDefault();
        setLoading(true);
        axiosClient
            .put(`/jobposter/jobs/${id}/edit`, job)
            .then(({ data }) => {
                showTopSuccessAlert(data.message);
                navigate("/jobposter/jobs");
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status == 422) {
                    showTopErrorAlert(response.data.errors);
                }
            })
            .finally(setLoading(false));
    };

    return (
        <div className="w-full p-2">
            <h2 className="border-l-4 border-blue-900 text-blue-900 font-semibold text-lg p-2 italic bg-blue-50">
                Jobs Management
            </h2>
            <div className="w-full my-3 flex items-center justify-between">
                <Link to={`/jobposter/jobs/${job.id}`}>
                    <FaArrowLeft className="text-lg text-blue-900" />
                </Link>
            </div>
            <div className="w-full p-4 my-4">
                <form onSubmit={updateJob}>
                    <div className="flex flex-col md:flex-row my-2">
                        <div className="w-full md:w-1/2 flex flex-col space-y-2 my-2">
                            <label
                                htmlFor="title"
                                className="text-gray-600 text-lg font-semibold"
                            >
                                Job Title:
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={job.title}
                                onChange={handleInputChange}
                                className="w-10/12 p-2 outline-0 border border-blue-300 rounded-sm"
                            />
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col space-y-2 my-2">
                            <label
                                htmlFor="gig_category_id"
                                className="text-gray-600 text-lg font-semibold"
                            >
                                Job Category:
                            </label>
                            <select
                                name="gig_category_id"
                                value={job.gig_category_id}
                                onChange={handleInputChange}
                                className="w-10/12 p-2 outline-0 border border-blue-300 rounded-sm"
                            >
                                <option value="">--select--</option>
                                {jobCategories?.map((category) => {
                                    return (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row my-2">
                        <div className="w-full md:w-1/2 flex flex-col space-y-2 my-2">
                            <label
                                htmlFor="description"
                                className="text-gray-600 text-lg font-semibold"
                            >
                                Description:
                            </label>
                            <textarea
                                name="description"
                                value={job.description}
                                onChange={handleInputChange}
                                className="w-10/12 p-2 outline-0 border border-blue-300 rounded-sm"
                            ></textarea>
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col space-y-2 my-2">
                            <label
                                htmlFor="location"
                                className="text-gray-600 text-lg font-semibold"
                            >
                                Job location:
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={job.location}
                                onChange={handleInputChange}
                                className="w-10/12 p-2 outline-0 border border-blue-300 rounded-sm"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row my-2">
                        <div className="w-full md:w-1/2 flex flex-col space-y-2 my-2">
                            <label
                                htmlFor="payment"
                                className="text-gray-600 text-lg font-semibold"
                            >
                                Job Salary:
                            </label>
                            <input
                                type="text"
                                name="payment"
                                value={job.payment}
                                onChange={handleInputChange}
                                className="w-10/12 p-2 outline-0 border border-blue-300 rounded-sm"
                            />
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col space-y-2 my-2">
                            <label
                                htmlFor="payment_frequency"
                                className="text-gray-600 text-lg font-semibold"
                            >
                                Payment Frequency:
                            </label>
                            <select
                                name="payment_frequency"
                                value={job.payment_frequency}
                                onChange={handleInputChange}
                                className="w-10/12 p-2 outline-0 border border-blue-300 rounded-sm"
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row my-2">
                        <div className="w-full md:w-1/2 flex flex-col space-y-2 my-2">
                            <label
                                htmlFor="duration"
                                className="text-gray-600 text-lg font-semibold"
                            >
                                Job duration:
                            </label>
                            <input
                                name="duration"
                                value={job.duration}
                                onChange={handleInputChange}
                                className="w-10/12 p-2 outline-0 border border-blue-300 rounded-sm"
                            />
                        </div>
                        <div className="w-full md:w-1/2 flex flex-col space-y-2 my-2">
                            <label
                                htmlFor="slots"
                                className="text-gray-600 text-lg font-semibold"
                            >
                                Job slots:
                            </label>
                            <input
                                name="slots"
                                value={job.slots}
                                onChange={handleInputChange}
                                className="w-10/12 p-2 outline-0 border border-blue-300 rounded-sm"
                                placeholder="how many people for the job"
                            />
                        </div>
                    </div>

                    <div className="my-4">
                        <button
                            className="bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 text-white cursor-pointer"
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center">
                                    <Spinner />
                                    <span>Updating...</span>{" "}
                                </div>
                            ) : (
                                "Update Job"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default JobsEditForm;
