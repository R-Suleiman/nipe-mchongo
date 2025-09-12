import React, { useEffect, useState } from "react";
import axiosClient from "../../../assets/js/axios-client";
import { useNavigate } from "react-router-dom";
import Spinner from "../../../components/Spinner";
import {
    showTopErrorAlert,
    showTopSuccessAlert,
} from "../../../utils/sweetAlert";
import { useAuth } from "../../../context/AuthProvider";

function JobsForm() {
    const { user: userData } = useAuth();
    const navigate = useNavigate();
    const [jobCategories, setJobCategories] = useState();
    const [loading, setLoading] = useState(false);
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

    const createJob = (e) => {
        e.preventDefault();
        setLoading(true);
        axiosClient
            .post(`/jobs/create`, job)
            .then(({ data }) => {
                showTopSuccessAlert(data.message);
                setLoading(false);
                navigate("/jobposter/jobs");
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
        const getJobCategories = () => {
            axiosClient
                .get("/job-categories")
                .then(({ data }) => {
                    setJobCategories(data);
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status == 422) {
                        console.error(response.data.errors);
                    }
                });
        };

        getJobCategories();
    }, []);

    return (
        <div className="w-full p-2">
            <h2 className="border-l-4 border-blue-900 text-blue-900 font-semibold text-lg p-2 italic bg-blue-50">
                Create a new Job
            </h2>

            <div className="w-full p-4 my-4">
                <form onSubmit={createJob}>
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
                                Job Salary (TZS):
                            </label>
                            <input
                                type="number"
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
                                <option value="">-- select --</option>
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
                                placeholder="eg. 2 weeks"
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
                                type="number"
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
                                    <span>Posting...</span>{" "}
                                </div>
                            ) : (
                                "Post Job"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default JobsForm;
