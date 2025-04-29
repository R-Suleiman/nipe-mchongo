import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccessAlert } from "../utils/sweetAlert";
import axiosClient from "../assets/js/axios-client";
import { useAuth } from "../context/AuthProvider";

function Home() {
    const navigate = useNavigate();
    const { setUser, setToken } = useAuth();
    const [errors, setErrors] = useState(null);
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const login = async (e) => {
        e.preventDefault();

        axiosClient
            .post(`/login`, loginData)
            .then(({ data }) => {
                if (!data.user) {
                    console.error("User data is missing");
                    return;
                }

                setUser(data.user);
                setToken(data.token);

                showSuccessAlert("Login Successful", `Welcome back!`);
                if (data.user.usertype === "poster") {
                    navigate("/jobposter/dashboard");
                } else if (data.user.usertype === "seeker") {
                    navigate("/jobseeker/dashboard");
                }
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(
                        response.data.errors || {
                            email: [response.data.message],
                        }
                    );
                }
            });
    };
    return (
        <div>
            <form
                className="w-3/6 mx-auto border-2 border-blue-800 p-4 rounded-md my-24"
                onSubmit={login}
            >
                {errors && (
                    <div className="p-2 text-red-500 font-semibold">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}

                <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    className="w-11/12 mx-auto p-2 border border-gray-300 tounded-md my-2"
                    placeholder="email"
                />
                <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    className="w-11/12 mx-auto p-2 border border-gray-300 tounded-md my-2"
                    placeholder="password"
                />

                <button className="bg-blue-700 p-2 font-semibold text-white rounded-md">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Home;
