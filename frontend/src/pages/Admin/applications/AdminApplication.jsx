import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../../assets/js/axios-client";
import Loading from "../../../components/Loading";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import userImg from "../../../assets/images/user.avif";
import { showTopErrorAlert } from "../../../utils/sweetAlert";
import { useModal } from "../../../context/ModalContext";

function AdminApplication() {
    dayjs.extend(relativeTime);
    const { id } = useParams();
    const [application, setApplication] = useState();
    const [loading, setLoading] = useState(true);
    const { openModal } = useModal();

    const getApplication = () => {
        axiosClient
            .get(`/admin/job-applications/${id}`)
            .then(({ data }) => {
                setApplication(data.application);
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
        getApplication();
    }, []);

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
                    <Link to="/admin/applications">
                        <FaArrowLeft className="text-lg text-blue-900" />
                    </Link>
                </div>

                <div className="w-full p-4 my-4 bg-blue-50 flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/2">
                        <h4 className="text-lg text-blue-900 mb-4 font-semibold">
                            Applicant Profile
                        </h4>
                        <div className="w-full flex flex-col md:flex-row md:space-x-4">
                            <div className="w-24 h-24">
                                <img
                                    src={
                                        application?.seeker?.profile_photo ||
                                        userImg
                                    }
                                    alt=""
                                    className="w-full h-full rounded-full border-2 border-blue-400"
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
                                <Link to="">
                                    <button className="bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 text-white cursor-pointer flex items-center space-x-2 font-semibold text-sm my-4">
                                        <span>view applicant</span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h4 className="text-lg text-blue-900 mb-4 font-semibold">
                            Gig Poster
                        </h4>
                        <div className="w-full flex flex-col md:flex-row md:space-x-4">
                            <div className="w-24 h-24">
                                <img
                                    src={
                                        application?.poster?.profile_photo ||
                                        userImg
                                    }
                                    alt=""
                                    className="w-full h-full rounded-full border-2 border-blue-400"
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
                                                {application?.poster.firstname}{" "}
                                                {application?.poster.lastname}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="p-2 border border-gray-300 text-left w-2/6">
                                                Age:
                                            </th>
                                            <td className="p-2 border border-gray-300 w-4/6">
                                                {calculateAge(
                                                    application?.poster.dob
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="p-2 border border-gray-300 text-left w-2/6">
                                                Phone Number:
                                            </th>
                                            <td className="p-2 border border-gray-300 w-4/6">
                                                {application?.poster.phone}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="p-2 border border-gray-300 text-left w-2/6">
                                                Address:
                                            </th>
                                            <td className="p-2 border border-gray-300 w-4/6">
                                                {application?.poster.address}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="p-2 border border-gray-300 text-left w-2/6">
                                                Gender:
                                            </th>
                                            <td className="p-2 border border-gray-300 w-4/6">
                                                {application?.poster.gender}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Link to={`/admin/users/gig-posters/${application.poster.id}`}>
                                    <button className="bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 text-white cursor-pointer flex items-center space-x-2 font-semibold text-sm my-4">
                                        <span>view poster</span>
                                    </button>
                                </Link>
                            </div>
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
                        <span className="text-green-600">Accepted</span>
                    </p>
                ) : application?.status.id === 3 ? (
                    <p className="text-lg font-semibold my-4">
                        Application <span className="text-red-600">Denied</span>
                    </p>
                ) : (
                    <p className="text-lg font-semibold my-4">
                        <span className="text-gray-600">Status: Pending </span>
                        Application{" "}
                    </p>
                )}
            </div>
        );
    }
}

export default AdminApplication;
