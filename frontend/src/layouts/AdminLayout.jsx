import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import userImg from "../assets/images/user.avif";
import {
    FaAlignRight,
    FaCaretRight,
    FaCogs,
    FaEnvelopeOpen,
    FaHome,
    FaMoneyBillWave,
    FaSignOutAlt,
    FaTasks,
    FaTimes,
    FaUser,
    FaUsers,
    // FaHouse
} from "react-icons/fa";
import { useAuth } from "../context/AuthProvider";
import axiosClient from "../assets/js/axios-client";
import { showSuccessAlert } from "../utils/sweetAlert";

function AdminLayout() {
    const navigate = useNavigate();
    const { token, user, setUser, setToken } = useAuth();
    const [newUser, setNewUser] = useState();
    const [loading, setLoading] = useState(false);
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, []);

    const location = useLocation();

    useEffect(() => {
        setHidden(true); // close sidebar on every route change
    }, [location]);

    const logout = () => {
        axiosClient.post("/logout").then(() => {
            setUser(null);
            setToken(null);
            showSuccessAlert("Successfully Logged out!");
        });
    };

    const getUser = () => {
        setLoading(true);
        axiosClient.get("/get-user").then(({ data }) => {
            setNewUser(data.user);
            setLoading(false);
        });
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <section className="w-full">
            <aside
                className={`w-10/12 md:w-[20%] p-2 bg-blue-900 h-full fixed left-0 top-0 shadow-md shadow-orange-100 transform transition-transform duration-300 ease-in-out z-50 ${
                    hidden ? "-translate-x-full" : "translate-x-0"
                } md:translate-x-0 md:block`}
            >
                <div
                    className="m-4 cursor-pointer w-fit ml-auto text-white block md:hidden"
                    onClick={() => setHidden(true)}
                >
                    <FaTimes className="text-2xl" />
                </div>

                <div className="flex flex-col items-center my-4">
                    <div className="w-24 h-24 mx-auto">
                        <img
                            src={newUser?.profile_photo || userImg}
                            alt=""
                            className="w-full h-full rounded-full"
                        />
                    </div>
                    <p className="text-lg text-white my-2 font-semibold">
                        {user?.firstname} {user?.lastname}
                    </p>
                </div>
                <div className="w-full p-2">
                    <ul className="w-full text-white">
                        <Link to="/admin/dashboard">
                            <li className="w-full p-2 font-semibold flex items-center hover:bg-blue-800 rounded-sm cursor-pointer text-lg hover:border-l-4 hover:border-white">
                                <FaHome className="mr-3" />{" "}
                                <span>Dashboard</span>
                            </li>
                        </Link>
                        <Link to="/admin/account">
                            <li className="w-full p-2 font-semibold flex items-center hover:bg-blue-800 rounded-sm cursor-pointer text-lg hover:border-l-4 hover:border-white">
                                <FaUser className="mr-3" />{" "}
                                <span>My Account</span>
                            </li>
                        </Link>
                        <li className="w-full p-2 font-semibold flex items-center hover:bg-blue-800 rounded-sm cursor-pointer text-lg hover:border-l-4 hover:border-white">
                            <FaUsers className="mr-3" /> <span>Users</span>
                            <FaCaretRight className="ml-auto" />
                        </li>
                        <ul className="ml-5">
                            <Link to="/admin/users/gig-posters">
                                <li className="w-full p-2 font-semibold flex items-center hover:bg-blue-800 rounded-sm cursor-pointer hover:border-l-4 hover:border-white">
                                    <span>Gig Posters</span>
                                </li>
                            </Link>
                             <Link to="/admin/users/gig-seekers">
                                <li className="w-full p-2 font-semibold flex items-center hover:bg-blue-800 rounded-sm cursor-pointer hover:border-l-4 hover:border-white">
                                    <span>Gig Seekers</span>
                                </li>
                            </Link>
                        </ul>

                        <Link to="/admin/jobs">
                            <li className="w-full p-2 font-semibold flex items-center hover:bg-blue-800 rounded-sm cursor-pointer text-lg hover:border-l-4 hover:border-white">
                                <FaTasks className="mr-3" />{" "}
                                <span>Jobs Management</span>
                            </li>
                        </Link>
                        <Link to="/admin/applications">
                            <li className="w-full p-2 font-semibold flex items-center hover:bg-blue-800 rounded-sm cursor-pointer text-lg hover:border-l-4 hover:border-white">
                                <FaEnvelopeOpen className="mr-3" />{" "}
                                <span>Job Applications</span>
                            </li>
                        </Link>
                        <Link to="/admin/points">
                            <li className="w-full p-2 font-semibold flex items-center hover:bg-blue-800 rounded-sm cursor-pointer text-lg hover:border-l-4 hover:border-white">
                                <FaMoneyBillWave className="mr-3" />{" "}
                                <span>Mchongo Points</span>
                            </li>
                        </Link>
                        <Link to="/admin/settings">
                            <li className="w-full p-2 font-semibold flex items-center hover:bg-blue-800 rounded-sm cursor-pointer text-lg hover:border-l-4 hover:border-white">
                                <FaCogs className="mr-3" />{" "}
                                <span>Settings</span>
                            </li>
                        </Link>
                        <button
                            className="w-full p-2 font-semibold flex items-center bg-blue-600 rounded-sm cursor-pointer text-lg hover:border-l-4 hover:border-white"
                            onClick={logout}
                        >
                            <FaSignOutAlt className="mr-3" />{" "}
                            <span>Logout</span>
                        </button>
                    </ul>
                </div>

                <div className="w-fit mx-4 absolute bottom-2">
                    <p className="text-blue-200 text-sm font-semibold">
                        &copy; SESWARE NEXUS
                    </p>
                </div>
            </aside>
            <div className="w-full float-none md:w-[80%] md:float-right">
                <div className="w-full bg-blue-900 text-white px-4">
                    <div className="w-full flex items-center justify-between">
                        <h1 className="text-xl font-semibold">
                            <span className="text-orange-500">
                                NIPE MCHONGO
                            </span>{" "}
                            | ADMIN DASHBOARD
                        </h1>
                        <div className="w-32">
                            <img src={logo} alt="" className="w-full" />
                        </div>
                    </div>

                    <div
                        className="mb-4 ml-auto w-fit cursor-pointer block md:hidden p-2"
                        onClick={() => setHidden(false)}
                    >
                        <FaAlignRight className="text-lg" />
                    </div>
                </div>
                <section className="p-2">
                    <Outlet />
                </section>
            </div>
        </section>
    );
}

export default AdminLayout;
