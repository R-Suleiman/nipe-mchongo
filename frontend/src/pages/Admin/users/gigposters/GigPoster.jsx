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

function GigPoster() {
    dayjs.extend(relativeTime);
    const { id } = useParams();
    const [gigPoster, setGigPoster] = useState();
    const [gigs, setGigs] = useState();
    const [loading, setLoading] = useState(true);
    const [meta, setMeta] = useState({});
    const [page, setPage] = useState(1);
    const { openModal } = useModal();

    const getGigPoster = () => {
        axiosClient
            .post(`/admin/users/gig-posters/${id}`)
            .then(({ data }) => {
                setGigPoster(data.gigPoster);
                setGigs(data.gigs);
                setMeta({
                    currentPage: data.gigs.current_page,
                    lastPage: data.gigs.last_page,
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
        getGigPoster();
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
                userData={gigPoster}
                type="poster"
                reload={getGigPoster}
            />,
            "xl5",
            "Update gig poster details"
        );
    };

    const blockUser = () => {
        openModal(
            <BlockUser userId={gigPoster.id} reload={getGigPoster} />,
            "xl5",
            "Block Gig Poster"
        );
    };

    const unblockUser = () => {
        axiosClient
            .post(`/user/unblock-user/${gigPoster.id}`)
            .then(({ data }) => {
                showTopSuccessAlert(data.message);
                getGigPoster()
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
                    Gig Poster Details
                </h2>
                <div className="w-fit my-3">
                    <Link to="/admin/users/gig-posters">
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
                                    src={gigPoster?.profile_photo || userImg}
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
                                                {gigPoster?.firstname}{" "}
                                                {gigPoster?.lastname}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="p-2 border border-gray-300 text-left whitespace-nowrap w-2/6">
                                                Username:
                                            </th>
                                            <td className="p-2 border border-gray-300 w-4/6">
                                                {gigPoster?.username}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="p-2 border border-gray-300 text-left whitespace-nowrap w-2/6">
                                                Age:
                                            </th>
                                            <td className="p-2 border border-gray-300 w-4/6">
                                                {calculateAge(gigPoster?.dob)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="p-2 border border-gray-300 text-left whitespace-nowrap w-2/6">
                                                Phone Number:
                                            </th>
                                            <td className="p-2 border border-gray-300 w-4/6">
                                                {gigPoster?.phone}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="p-2 border border-gray-300 text-left whitespace-nowrap w-2/6">
                                                Email:
                                            </th>
                                            <td className="p-2 border border-gray-300 w-4/6">
                                                {gigPoster?.email}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="p-2 border border-gray-300 text-left whitespace-nowrap w-2/6">
                                                Address:
                                            </th>
                                            <td className="p-2 border border-gray-300 w-4/6">
                                                {gigPoster?.address}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="p-2 border border-gray-300 text-left whitespace-nowrap w-2/6">
                                                Gender:
                                            </th>
                                            <td className="p-2 border border-gray-300 w-4/6">
                                                {gigPoster?.gender}
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
                                            Gigs Posted:
                                        </th>
                                        <td className="p-2 border border-gray-300 w-4/6">
                                            {gigs.total}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="p-2 border border-gray-300 text-left whitespace-nowrap w-2/6">
                                            Applications Received
                                        </th>
                                        <td className="p-2 border border-gray-300 w-4/6">
                                            {
                                                gigPoster?.poster_applications
                                                    .length
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="p-2 border border-gray-300 text-left whitespace-nowrap w-2/6">
                                            Employments Created:
                                        </th>
                                        <td className="p-2 border border-gray-300 w-4/6">
                                            {gigPoster?.poster_applications.filter(
                                                (app) => app.status_id === 2
                                            ).length || 0}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="p-2 border border-gray-300 text-left whitespace-nowrap w-2/6">
                                            Available Mchongo Points:
                                        </th>
                                        <td className="p-2 border border-gray-300 w-4/6">
                                            {gigPoster?.mchongo_points}
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

                            {gigPoster?.blocked ? (
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
                        {gigPoster?.blocked && (
                            <div className="w-full border border-red-500 rounded-lg p-2 my-2">
                                <div className="flex items-center space-x-1">
                                    <FaExclamationCircle className="text-red-500 text-sm" />
                                    <span className="text-sm text-gray-500">
                                        Reason for block
                                    </span>
                                </div>
                                <p className="text-gray-600">
                                    {gigPoster?.blocked.reason}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                {/*  */}
                <h2 className="m-3 font-semibold">Gigs Posted</h2>
                <div className="w-full my-4 overflow-x-auto">
                    <table className="w-full border border-gray-300">
                        <thead>
                            <tr>
                                <th className="p-2 text-left whitespace-nowrap border border-gray-300">
                                    Sn
                                </th>
                                <th className="p-2 text-left whitespace-nowrap border border-gray-300">
                                    Title
                                </th>
                                <th className="p-2 text-left whitespace-nowrap border border-gray-300">
                                    Duration
                                </th>
                                <th className="p-2 text-left whitespace-nowrap border border-gray-300">
                                    Slots
                                </th>
                                <th className="p-2 text-left whitespace-nowrap border border-gray-300">
                                    date posted
                                </th>
                                <th className="p-2 text-left whitespace-nowrap border border-gray-300">
                                    Applications Received
                                </th>
                                <th className="p-2 text-left whitespace-nowrap border border-gray-300">
                                    Status
                                </th>
                                <th className="p-2 text-left whitespace-nowrap border border-gray-300">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {gigs.total > 0 ? (
                                gigs?.data.map((gig, index) => {
                                    return (
                                        <tr key={gig.id}>
                                            <td className="p-2 text-left whitespace-nowrap border border-gray-300">
                                                {index + 1}
                                            </td>
                                            <td className="p-2 text-left whitespace-nowrap border border-gray-300">
                                                {gig.title}
                                            </td>
                                            <td className="p-2 text-left whitespace-nowrap border border-gray-300">
                                                {gig.duration}
                                            </td>
                                            <td className="p-2 text-left whitespace-nowrap border border-gray-300">
                                                {gig.slots}
                                            </td>
                                            <td className="p-2 text-left whitespace-nowrap border border-gray-300">
                                                {formatDate(gig.created_at)}
                                            </td>
                                            <td className="p-2 text-left whitespace-nowrap border border-gray-300">
                                                {gig.applications.length}
                                            </td>
                                            <td className="p-2 text-left whitespace-nowrap border border-gray-300">
                                                {gig.status.name}
                                            </td>
                                            <td className="p-2 text-left whitespace-nowrap border border-gray-300">
                                                <Link
                                                    to={`/admin/jobs/${gig.id}`}
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
                                        No gigs Found!
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

export default GigPoster;
