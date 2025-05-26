import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import axiosClient from "../../../assets/js/axios-client";
import {
    showConfirmAlert,
    showErrorAlert,
    showSuccessAlert,
} from "../../../utils/sweetAlert";
import Spinner from "../../../components/Spinner";

export default function PurchasePoints() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const { user } = useAuth();
    const [phone, setPhone] = useState(user?.phone);
    const [loading, setLoading] = useState(false);

    const updatePhone = (e) => {
        setPhone(e.target.value);
    };

    const type = "posting";
    const quantity = parseInt(query.get("quantity")) || 1;
    const total = parseInt(query.get("total")) || 0;

    const handlePayment = () => {
        showConfirmAlert(
            "Confirm Payment",
            "Are you sure you want to proceed with this payment?",
            () => handlePaymentCallback()
        );
    };

    const handlePaymentCallback = () => {
        setLoading(true);

        axiosClient
            .post("/buy-points", {
                user_id: user.id,
                phone,
                type,
                quantity,
                amount: total,
            })
            .then(({ data }) => {
                if (data.success) {
                    showSuccessAlert("Payment Successful", data.message);
                    navigate("/jobposter/points");
                } else {
                    showErrorAlert("Payment Failed", data.message);
                }
                setLoading(false)
            }).catch((err) => {
                console.log(err)
                setLoading(false)
            })
    };

    return (
        <div className="min-h-screen bg-blue-50 p-8 flex items-center justify-center">
            <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full border border-blue-100">
                <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
                    Confirm Purchase
                </h1>

                <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-blue-600">
                        <span>Point Type:</span>
                        <span className="font-semibold capitalize">{type}</span>
                    </div>
                    <div className="flex justify-between text-blue-600">
                        <span>Quantity:</span>
                        <span className="font-semibold">{quantity}</span>
                    </div>
                    <div className="flex justify-between text-blue-700 text-lg font-bold">
                        <span>Total:</span>
                        <span>{total.toLocaleString()} TZS</span>
                    </div>
                    <div className="flex space-y-2 flex-col text-blue-700">
                        <span>Payment Number:</span>
                        <span className="text-sm">
                            Please confirm this as your payment number
                        </span>
                        <input
                            type="text"
                            value={phone}
                            onChange={updatePhone}
                            name="phone"
                            className="w-full border border-blue-600 p-2 rounded-md"
                            placeholder="eg. 07XXXXXXXX"
                        />
                    </div>
                </div>

                <button
                    onClick={handlePayment}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 cursor-pointer" disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center w-fit mx-auto">
                            <Spinner />
                            <span>Loading...</span>{" "}
                        </div>
                    ) : (
                        "Pay Now"
                    )}
                </button>

                <div className="text-center text-blue-400 text-sm mt-4">
                    <p>Secure Payment powered by AzamPay</p>
                </div>
            </div>
        </div>
    );
}
