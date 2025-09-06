import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { showTopErrorAlert, showTopSuccessAlert } from "../../utils/sweetAlert";
import axiosClient from "../../assets/js/axios-client";
import { useAuth } from "../../context/AuthProvider";
import logo from "../../assets/images/logo-2.png";

function Login() {
    const navigate = useNavigate();
    const { setUser, setToken } = useAuth();
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const login = async (e) => {
        e.preventDefault();
        setLoading(true);

        axiosClient
            .post(`/login`, loginData)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);

                if (data.success === true) {
                    showTopSuccessAlert("Login Successful", `Welcome back!`);
                    if (data.user.usertype === "poster") {
                        navigate("/jobposter/dashboard");
                    } else if (data.user.usertype === "seeker") {
                        navigate("/job/seeker/dashboard");
                    } else if (data.user.usertype === "admin") {
                        navigate("/admin/dashboard");
                    }
                }
            })
            .catch((err) => {
                const response = err.response;
                if (response) {
                    if (response.status === 422) {
                        setErrors(
                            response.data.errors || {
                                email: [response.data.message],
                            }
                        );
                    } else if (response.status === 403) {
                        if (response.data.isVerified === false) {
                            localStorage.setItem('USER', JSON.stringify(response.data.user))
                            showTopErrorAlert(response.data.message);
                            navigate("/verify-otp");
                        }

                        setErrors({
                            general: [
                                response.data.message || "Access denied.",
                            ],
                        });
                    } else {
                        setErrors({
                            general: [
                                "An unexpected error occurred. Please try again.",
                            ],
                        });
                    }
                }
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[url('/assets/images/register.png')] bg-cover bg-no-repeat bg-center">
            <div className="w-full max-w-md bg-white px-8 py-4 rounded-2xl shadow-xl m-3">
                <div className="w-fit mx-auto">
                    <img src={logo} alt="logo" className="w-40 h-32" />
                </div>
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
                    Sign In
                </h2>
                <form onSubmit={login} className="space-y-5">
                    {errors && (
                        <div className="p-2 text-red-500 font-semibold">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={loginData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={loginData.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="password"
                        />
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition-all duration-300">
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>

                <p className="mt-4 text-sm text-center">
                    <Link
                        to="/forgot-password"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Forgot Password?
                    </Link>
                </p>

                <p className="mt-4 text-sm text-center">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
