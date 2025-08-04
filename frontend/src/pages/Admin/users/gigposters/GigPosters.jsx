import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../../../assets/js/axios-client";
import Loading from "../../../../components/Loading";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Pagination from "../../../../components/Pagination";
import CreateUser from "../CreateUser";
import { useModal } from "../../../../context/ModalContext";

function GigPosters() {
    dayjs.extend(relativeTime);
    const [users, setusers] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [meta, setMeta] = useState({});
    const [page, setPage] = useState(1);
    const { openModal } = useModal();

    const getusers = () => {
        setLoading(true);
        axiosClient
            .post("/admin/users/gig-posters", { search, page })
            .then(({ data }) => {
                setusers(data.users.data);
                setMeta({
                    currentPage: data.users.current_page,
                    lastPage: data.users.last_page,
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
            getusers();
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [search, page]);

    const createUser = () => {
        openModal(<CreateUser type='poster' reload={getusers}/>, 'xl5', 'Create new gig poster');
    };

    {
        return loading ? (
            <Loading />
        ) : (
            <div className="w-full p-2">
                <div className="border-l-4 border-blue-900 text-blue-900 font-semibold text-lg p-2 bg-blue-50 flex items-center justify-between">
                    <h2 className="italic">gig posters list</h2>{" "}
                    <button
                        className="bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600 text-white cursor-pointer flex items-center space-x-2 font-semibold text-sm"
                        onClick={createUser}
                    >
                        <FaPlus /> <span>Register user</span>
                    </button>
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
                                placeholder="Type here to search users"
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
                                    First Name
                                </th>
                                <th className="p-2 text-left border border-gray-300">
                                    Last Name
                                </th>
                                <th className="p-2 text-left border border-gray-300">
                                    Username
                                </th>
                                <th className="p-2 text-left border border-gray-300">
                                    Gender
                                </th>
                                <th className="p-2 text-left border border-gray-300">
                                    Phone
                                </th>
                                <th className="p-2 text-left border border-gray-300">
                                    Gigs Posted
                                </th>
                                <th className="p-2 text-left border border-gray-300">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.length > 0 ? (
                                users?.map((user, index) => {
                                    return (
                                        <tr key={user.id}>
                                            <td className="p-2 text-left border border-gray-300">
                                                {index + 1}
                                            </td>
                                            <td className="p-2 text-left border border-gray-300">
                                                {user.firstname}
                                            </td>
                                            <td className="p-2 text-left border border-gray-300">
                                                {user.lastname}
                                            </td>
                                            <td className="p-2 text-left border border-gray-300">
                                                {user.username}
                                            </td>
                                            <td className="p-2 text-left border border-gray-300">
                                                {user.gender}
                                            </td>
                                            <td className="p-2 text-left border border-gray-300">
                                                {user.phone}
                                            </td>
                                            <td className="p-2 text-left border border-gray-300">
                                                {user.gigs.length}
                                            </td>
                                            <td className="p-2 text-left border border-gray-300">
                                                <Link
                                                    to={`/admin/users/gig-posters/${user.id}`}
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
                                        No users Found!
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

export default GigPosters;
