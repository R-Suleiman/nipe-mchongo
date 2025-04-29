import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaCheck, FaPen, FaTimes } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../../assets/js/axios-client";
import Loading from "../../../components/Loading";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import userImg from "../../../assets/images/user.avif";
import { showConfirmAlert, showTopErrorAlert } from "../../../utils/sweetAlert";
import Spinner from "../../../components/Spinner";
import { useModal } from "../../../context/ModalContext";
import ApplicationConfirmMessage from "./applicationConfirmMessage";
import ApplicationDenialMessage from "./ApplicationDenialMessage";

function Application() {
    dayjs.extend(relativeTime);
    const { id } = useParams();
    const [application, setApplication] = useState();
    const [loading, setLoading] = useState(true);
    const { openModal } = useModal();

    const getApplication = () => {
        axiosClient
            .get(`/job-applications/${id}`)
            .then(({ data }) => {
                setApplication(data.application);
                setLoading(false)
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status == 422) {
                    showTopErrorAlert(response.data.errors);
                }
                setLoading(false)
            })
    };

    useEffect(() => {
        getApplication();
    }, []);

    const acceptApplication = () => {
        showConfirmAlert(
            "Accept Job Application",
            "Are you sure you want to accept this application?",
            () => acceptApplicationCallback()
        );
    };

    const acceptApplicationCallback = () => {
        setLoading(true);

        axiosClient
            .post(`/job-appplication/accept/${application.id}`)
            .then(({ data }) => {
                if (data) {
                    openModal(
                        <ApplicationConfirmMessage application={application} />,
                        "xl4",
                        "Application Confirmed"
                    );
                    getApplication();
                }
                setLoading(false)
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
                setLoading(false)
            })
    };

    const denyApplication = () => {
        showConfirmAlert(
            "Deny Job Application",
            "Are you sure you want to deny this application?",
            () => denyApplicationCallback()
        );
    };

    const denyApplicationCallback = () => {
        setLoading(true);

        axiosClient
            .post(`/job-appplication/deny/${application.id}`)
            .then(({ data }) => {
                if (data) {
                    openModal(
                        <ApplicationDenialMessage application={application} />,
                        "xl4",
                        "Application Denied"
                    );
                    getApplication();
                }
                setLoading(false)
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
                setLoading(false)
            })
    };

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();

        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();

        if (
            months < 0 ||
            (months === 0 && today.getDate() < birthDate.getDate())
        ) {
            years--;
        }

        return `${years} year${years !== 1 ? "s" : ""}`;
    };

    {
        return loading ? (
            <Loading />
        ) : (
            <div className="w-full p-2">
                <h2 className="border-l-4 border-blue-900 text-blue-900 font-semibold text-lg p-2 italic bg-blue-50">
                    Job Application
                </h2>
                <div className="w-fit my-3">
                    <Link to="/jobposter/applications">
                        <FaArrowLeft className="text-lg text-blue-900" />
                    </Link>
                </div>

                <div className="w-full p-4 my-4 bg-blue-50">
                    <h4 className="text-lg text-blue-900 mb-4 font-semibold">
                        Applicant Profile
                    </h4>
                    <div className="w-full flex flex-col md:flex-row md:space-x-4">
                        <div className="w-24 h-24">
                            <img
                                src={userImg}
                                alt=""
                                className="w-full rounded-full"
                            />
                        </div>
                        <div className="w-full md:w-4/6 my-4 md:my-0">
                            <table className="w-full border border-gray-300">
                                <tbody>
                                    <tr>
                                        <th className="p-2 border border-gray-300 text-left w-2/6">
                                            Name:
                                        </th>
                                        <td className="p-2 border border-gray-300 w-4/6">
                                            {application?.seeker.firstname}{" "}
                                            {application?.seeker.lastname}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="p-2 border border-gray-300 text-left w-2/6">
                                            Age:
                                        </th>
                                        <td className="p-2 border border-gray-300 w-4/6">
                                            {calculateAge(
                                                application?.seeker.dob
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="p-2 border border-gray-300 text-left w-2/6">
                                            Phone Number:
                                        </th>
                                        <td className="p-2 border border-gray-300 w-4/6">
                                            {application?.seeker.phone}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="p-2 border border-gray-300 text-left w-2/6">
                                            Address:
                                        </th>
                                        <td className="p-2 border border-gray-300 w-4/6">
                                            {application?.seeker.address}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="p-2 border border-gray-300 text-left w-2/6">
                                            Gender:
                                        </th>
                                        <td className="p-2 border border-gray-300 w-4/6">
                                            {application?.seeker.gender}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="w-full my-2">
                    <table className="w-full border border-gray-300">
                        <tbody>
                            <tr>
                                <th className="p-2 border border-gray-300 text-left w-1/6">
                                    Applied Job Title:
                                </th>
                                <td className="p-2 border border-gray-300 w-5/6">
                                    {application?.job.title}
                                </td>
                            </tr>
                            <tr>
                                <th className="p-2 border border-gray-300 text-left w-1/6">
                                    Description:
                                </th>
                                <td className="p-2 border border-gray-300 w-5/6">
                                    {application?.job.description}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {application?.status.id === 2 ? (
                    <p className="text-lg font-semibold my-4">
                        Application{" "}
                        <span className="text-green-600">
                            Accepted
                        </span>
                    </p>
                ) : application?.status.id === 3 ? (
                    <p className="text-lg font-semibold my-4">
                        Application{" "}
                        <span className="text-red-600">
                            Denied
                        </span>
                    </p>
                ) : (
                    <div className="my-4 flex space-x-2">
                        <button
                            className="bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 text-white cursor-pointer flex items-center space-x-2 font-semibold"
                            onClick={acceptApplication}
                            disabled={loading}
                        >
                            <FaCheck />{" "}
                            <span>
                                {" "}
                                {loading ? (
                                    <div className="flex items-center">
                                        <Spinner />
                                        <span>Loading...</span>{" "}
                                    </div>
                                ) : (
                                    "Accept"
                                )}
                            </span>
                        </button>
                        <button className="bg-red-500 py-2 px-4 rounded-md hover:bg-red-600 text-white cursor-pointer flex items-center space-x-2 font-semibold"
                        onClick={denyApplication}
                        disabled={loading}
                        >
                            <FaTimes />  <span>
                                {" "}
                                {loading ? (
                                    <div className="flex items-center">
                                        <Spinner />
                                        <span>Loading...</span>{" "}
                                    </div>
                                ) : (
                                    "Deny"
                                )}
                            </span>
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default Application;
