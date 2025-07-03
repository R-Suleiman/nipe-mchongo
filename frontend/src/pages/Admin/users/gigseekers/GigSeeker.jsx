import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaExclamationCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../../../assets/js/axios-client";
import Loading from "../../../../components/Loading";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import userImg from "../../../../assets/images/user.avif";
import { showTopErrorAlert, showTopSuccessAlert } from "../../../../utils/sweetAlert";
import Pagination from "../../../../components/Pagination";
import { useModal } from "../../../../context/ModalContext";
import CreateUser from "../CreateUser";
import BlockUser from "../blocked/BlockUser";

function GigSeeker() {
    dayjs.extend(relativeTime);
    const { id } = useParams();
    const [gigSeeker, setGigSeeker] = useState();
    const [applications, setApplications] = useState();
    const [loading, setLoading] = useState(true);
    const [meta, setMeta] = useState({});
    const [page, setPage] = useState(1);
    const { openModal } = useModal();

    const getGigSeeker = () => {
        axiosClient
            .post(`/admin/users/gig-seeker/${id}`)
            .then(({ data }) => {
                setGigSeeker(data.gigSeeker);
                setApplications(data.applications);
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
        getGigSeeker();
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

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });
    };

    const updateUser = () => {
        openModal(
            <CreateUser
                userData={gigSeeker}
                type="seeker"
                reload={getGigSeeker}
            />,
            "xl5",
            "Update gig seeker details"
        );
    };

    const blockUser = () => {
        openModal(
            <BlockUser userId={gigSeeker.id} reload={getGigSeeker} />,
            "xl5",
            "Block Gig Seeker"
        );
    };

    const unblockUser = () => {
        axiosClient
            .post(`/user/unblock-user/${gigSeeker.id}`)
            .then(({ data }) => {
                showTopSuccessAlert(data.message);
                getGigSeeker();
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status == 422) {
                    showTopErrorAlert(response.data.errors);
                }
            });
    };

    {
        return loading ? (
            <Loading />
        ) : (
            <div className="w-full p-2">
                <h2 className="border-l-4 border-blue-900 text-blue-900 font-semibold text-lg p-2 italic bg-blue-50">
                    Gig Seeker Details
                </h2>
                <div className="w-fit my-3">
                    <Link to="/admin/users/gig-seekers">
                        <FaArrowLeft className="text-lg text-blue-900" />
                    </Link>
                </div>

                <div className="w-full p-4 my-4 bg-blue-50 flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/2">
                        <h4 className="text-lg text-blue-900 mb-4 font-semibold">
                            Personal Information
                        </h4>
                        <div className="w-full flex flex-col md:flex-row md:space-x-4">
                            <div className="w-24 h-24">
                                <img
                                    src={gigSeeker?.profile_photo || userImg}
                                    alt=""
                                    className="w-full h-full rounded-full border-2 border-blue-400"
                                />
                            </div>
                            <div className="w-full md:w-4/6 my-4 md:my-0 overflow-x-auto">
                                <table className="w-full border border-gray-300">
                                    <tbody>
                                        <tr>
                                            <th className="p-2 border border-gray-300 text-left whitespace-nowrap w-2/6">
                                                Name:
                                            </th>
                                            <td className="p-2 border border-gray-300 w-4/6">
                                                {gigSeeker?.firstname}{" "}
                                                {gigSeeker?.lastname}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="p-2 border border-gray-300 text-left whitespace-nowrap w-2/6">
                                                Username:
                                            </th>
                                            <td className="p-2 border border-gray-300 w-4/6">
                                                {gigSeeker?.username}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="p-2 border border-gray-300 text-left whitespace-nowrap w-2/6">
                                                Age:
                                            </th>
                                            <td className="p-2 border border-gray-300 w-4/6">
                                                {calculateAge(gigSeeker?.dob)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="p-2 border border-gray-300 text-left whitespace-nowrap w-2/6">
                                                Phone Number:
                                            </th>
                                            <td className="p-2 border border-gray-300 w-4/6">
                                                {gigSeeker?.phone}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="p-2 border border-gray-300 text-left whitespace-nowrap w-2/6">
                                                Email:
                                            </th>
                                            <td className="p-2 border border-gray-300 w-4/6">
                                                {gigSeeker?.email}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="p-2 border border-gray-300 text-left whitespace-nowrap w-2/6">
                                                Address:
                                            </th>
                                            <td className="p-2 border border-gray-300 w-4/6">
                                                {gigSeeker?.address}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="p-2 border border-gray-300 text-left whitespace-nowrap w-2/6">
                                                Gender:
                                            </th>
                                            <td className="p-2 border border-gray-300 w-4/6">
                                                {gigSeeker?.gender}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h4 className="text-lg text-blue-900 mb-4 font-semibold">
                            Gig Information
                        </h4>
                        <div className="w-full md:w-4/6 my-4 md:my-0">
                            <table className="w-full border border-gray-300">
                                <tbody>
                                    <tr>
                                        <th className="p-2 border border-gray-300 text-left whitespace-nowrap w-2/6">
                                            Gigs Applied:
                                        </th>
                                        <td className="p-2 border border-gray-300 w-4/6">
                                            {applications.total}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="p-2 border border-gray-300 text-left whitespace-nowrap w-2/6">
                                            Accepted Applications:
                                        </th>
                                        <td className="p-2 border border-gray-300 w-4/6">
                                            {applications.data.filter(
                                                (app) => app.status_id === 2
                                            ).length || 0}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="p-2 border border-gray-300 text-left whitespace-nowrap w-2/6">
                                            Denied Applications:
                                        </th>
                                        <td className="p-2 border border-gray-300 w-4/6">
                                            {applications.data.filter(
                                                (app) => app.status_id === 3
                                            ).length || 0}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="p-2 border border-gray-300 text-left whitespace-nowrap w-2/6">
                                            Available Mchongo Points:
                                        </th>
                                        <td className="p-2 border border-gray-300 w-4/6">
                                            {gigSeeker?.mchongo_points}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 flex items-center space-x-3">
                            <button
                                className="bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 text-white cursor-pointer flex items-center space-x-2 font-semibold text-sm"
                                onClick={updateUser}
                            >
                                <span>update user details</span>
                            </button>

                            {gigSeeker?.blocked ? (
                                <button
                                    className="bg-red-500 py-2 px-4 rounded-md hover:bg-red-600 text-white cursor-pointer flex items-center space-x-2 font-semibold text-sm"
                                    onClick={unblockUser}
                                >
                                    <span>Unblock user</span>
                                </button>
                            ) : (
                                <button
                                    className="bg-red-500 py-2 px-4 rounded-md hover:bg-red-600 text-white cursor-pointer flex items-center space-x-2 font-semibold text-sm"
                                    onClick={blockUser}
                                >
                                    <span>Block user</span>
                                </button>
                            )}
                        </div>
                        {gigSeeker?.blocked && (
                            <div className="w-full border border-red-500 rounded-lg p-2 my-2">
                                <div className="flex items-center space-x-1">
                                    <FaExclamationCircle className="text-red-500 text-sm" />
                                    <span className="text-sm text-gray-500">
                                        Reason for block
                                    </span>
                                </div>
                                <p className="text-gray-600">
                                    {gigSeeker?.blocked.reason}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                {/*  */}
                <h2 className="m-3 font-semibold">Applications made</h2>
                <div className="w-full my-4 overflow-x-auto">
                    <table className="w-full border border-gray-300">
                        <thead>
                            <tr>
                                <th className="p-2 text-left whitespace-nowrap border border-gray-300">
                                    Sn
                                </th>
                                <th className="p-2 text-left whitespace-nowrap border border-gray-300">
                                    Gig title
                                </th>
                                <th className="p-2 text-left whitespace-nowrap border border-gray-300">
                                    Gig Poster
                                </th>
                                <th className="p-2 text-left whitespace-nowrap border border-gray-300">
                                    Date Applied
                                </th>
                                <th className="p-2 text-left whitespace-nowrap border border-gray-300">
                                    Gig Status
                                </th>
                                <th className="p-2 text-left whitespace-nowrap border border-gray-300">
                                    Application Status
                                </th>
                                <th className="p-2 text-left whitespace-nowrap border border-gray-300">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.total > 0 ? (
                                applications?.data.map((application, index) => {
                                    return (
                                        <tr key={application.id}>
                                            <td className="p-2 text-left whitespace-nowrap border border-gray-300">
                                                {index + 1}
                                            </td>
                                            <td className="p-2 text-left whitespace-nowrap border border-gray-300">
                                                {application.job.title}
                                            </td>
                                            <td className="p-2 text-left whitespace-nowrap border border-gray-300">
                                                {application.poster.firstname}{" "}
                                                {application.poster.lastname}
                                            </td>
                                            <td className="p-2 text-left whitespace-nowrap border border-gray-300">
                                                {formatDate(
                                                    application.created_at
                                                )}
                                            </td>
                                            <td className="p-2 text-left whitespace-nowrap border border-gray-300">
                                                {application.job.status.name}
                                            </td>
                                            <td className="p-2 text-left whitespace-nowrap border border-gray-300">
                                                {application.status.name}
                                            </td>
                                            <td className="p-2 text-left whitespace-nowrap border border-gray-300">
                                                <Link
                                                    to={`/admin/applications/${application.id}`}
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
                                        No applications Found!
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

export default GigSeeker;
