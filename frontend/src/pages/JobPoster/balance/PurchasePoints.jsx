import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import axiosClient from "../../../assets/js/axios-client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Wallet, CheckCircle2, Phone } from "lucide-react";

export default function PurchasePoints() {
    const navigate = useNavigate();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const { user } = useAuth();

    const [phone, setPhone] = useState(user?.phone);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [availableMethods, setAvailableMethods] = useState([]);
    const [unavailableMessages, setUnavailableMessages] = useState({});
    const [reference, setReference] = useState(null);
    const [error, setError] = useState("");
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [polling, setPolling] = useState(false);

    const type = "posting";
    const quantity = parseInt(query.get("quantity")) || 1;
    const total = parseInt(query.get("total")) || 0;

    const updatePhone = (e) => {
        setPhone(e.target.value);
    };

    const getFriendlyErrorMessage = (provider, message) => {
        const amountRegex = /amount must be between\s*(\d+)\s*and\s*(\d+)/i;
        const match = message.match(amountRegex);
        if (match) {
            const minAmount = match[1];
            return `${provider} requires a minimum of ${minAmount} TZS. Please increase the amount or use another phone number.`;
        }
        return `${provider} is currently unavailable. Please try another method or update your number.`;
    };

    const handlePreview = () => {
        setLoading(true);
        setMessage("");
        setError("");
        setAvailableMethods([]);
        setUnavailableMessages({});
        setReference(null);

        axiosClient
            .post("/payments/preview-ussd", {
                user_id: user.id,
                phoneNumber: phone,
                type,
                quantity,
                amount: total,
            })
            .then(({ data }) => {
                setMessage(data.message);
                setAvailableMethods(data.availableMethods || []);
                setUnavailableMessages(data.unavailableMessages || {});
                setReference(data.reference || null);
            })
            .catch((error) => {
                setError(
                    error.response?.data?.error ||
                        "Failed to validate payment details. Please try again."
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handlePayment = async () => {
        if (!selectedMethod) {
            setError("Please select a payment method first.");
            return;
        }
        setLoading(true);
        setMessage("");
        setError("");
        try {
            const response = await axiosClient.post("/payments/initiate-ussd", {
                reference,
                phoneNumber: phone,
                amount: total,
                paymentMethod: selectedMethod,
            });
            setMessage(response.data.message);
            setAvailableMethods([]);
            setPolling(true); // Start polling
        } catch (error) {
            setError(
                error.response?.data?.error || "Failed to initiate payment"
            );
        }
        setLoading(false);
    };

    useEffect(() => {
        let interval;
        if (polling && reference) {
            interval = setInterval(async () => {
                try {
                    const response = await axiosClient.get(
                        `/payments/status/${reference}`
                    );
                    const { status, failure_reason } = response.data;
                    if (status === "COMPLETED") {
                        setMessage("Payment successful! Redirecting...");
                        setPolling(false);
                        setTimeout(() => navigate("/jobposter/payment-success"), 2000);
                    } else if (status === "FAILED") {
                        setError(
                            `Payment failed: ${
                                failure_reason || "Unknown error"
                            }`
                        );
                        setPolling(false);
                    }
                } catch (error) {
                    setError("Failed to check payment status");
                    setPolling(false);
                }
            }, 5000); // Poll every 5 seconds
        }
        return () => clearInterval(interval);
    }, [polling, reference, navigate]);

    return (
        <div className="min-h-screen bg-blue-50 p-8 flex items-center justify-center">
            <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full border border-blue-100">
                <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
                    Confirm Purchase
                </h1>

                {/* Order details */}
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

                    {/* Phone input */}
                    <div className="flex flex-col gap-2 text-blue-700">
                        <label
                            htmlFor="phone"
                            className="flex items-center gap-2"
                        >
                            <Phone className="w-4 h-4" />
                            Payment Number:
                        </label>
                        <input
                            id="phone"
                            type="text"
                            value={phone}
                            onChange={updatePhone}
                            name="phone"
                            className="w-full border border-blue-400 focus:ring-2 focus:ring-blue-500 p-2 rounded-md"
                            placeholder="eg. 07XXXXXXXX"
                        />
                        <span className="text-xs text-blue-500">
                            Please confirm this is the number to be charged.
                        </span>
                    </div>
                </div>

                {/* Validate button */}
                <Button
                    onClick={handlePreview}
                    disabled={loading}
                    className="w-full mb-6"
                >
                    {loading ? "Validating..." : "Validate Payment Details"}
                </Button>

                <div className="max-w-lg mx-auto p-6">
                    {/* Status messages */}
                    {message && (
                        <div className="mb-4 p-3 rounded-lg bg-green-50 text-green-700 border border-green-200">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 border border-red-200 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                     {polling && (
                        <div className="mb-4 p-3 rounded-lg bg-blue-50 text-blue-700 border border-blue-200">
                            Waiting for payment confirmation...
                        </div>
                    )}

                    {Object.keys(unavailableMessages).length > 0 && (
                        <div className="mb-4 p-3 rounded-lg bg-yellow-50 text-yellow-700 border border-yellow-200">
                            {Object.entries(unavailableMessages).map(
                                ([provider, msg]) => (
                                    <p key={provider} className="mb-1">
                                        {getFriendlyErrorMessage(provider, msg)}
                                    </p>
                                )
                            )}
                        </div>
                    )}

                    {/* Payment methods */}
                    {availableMethods.length > 0 && (
                        <Card className="shadow-lg rounded-2xl">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Wallet className="w-5 h-5 text-blue-600" />
                                    Select a Payment Method
                                </h3>

                                <div className="space-y-3 mb-4">
                                    {availableMethods.map((method, index) => (
                                        <div
                                            key={index}
                                            onClick={() =>
                                                setSelectedMethod(method.name)
                                            }
                                            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition
                        ${
                            selectedMethod === method.name
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:bg-gray-50"
                        }`}
                                        >
                                            <div>
                                                <p className="font-medium text-gray-800">
                                                    {method.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Fee: {method.fee}
                                                </p>
                                            </div>
                                            {selectedMethod === method.name && (
                                                <CheckCircle2 className="text-blue-600 w-5 h-5" />
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    onClick={handlePayment}
                                    disabled={!selectedMethod || loading}
                                    className="w-full"
                                >
                                    {loading
                                        ? "Processing..."
                                        : selectedMethod
                                        ? `Pay with ${selectedMethod}`
                                        : "Select a method to pay"}
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* No available methods */}
                    {!loading &&
                        availableMethods.length === 0 &&
                        Object.keys(unavailableMessages).length > 0 && (
                            <div className="text-center text-sm text-blue-500 mt-6">
                                No supported payment methods for this number.
                                Please update your number above and try again.
                            </div>
                        )}
                </div>

                <div className="text-center text-blue-400 text-sm mt-4">
                    <p>🔒 Secure Payment</p>
                </div>
            </div>
        </div>
    );
}
