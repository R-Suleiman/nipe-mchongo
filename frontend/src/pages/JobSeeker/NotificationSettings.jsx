import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import axiosClient from "../../assets/js/axios-client";
import { toast } from "react-toastify";

export default function NotificationSettings() {
    const { user } = useAuth();
    const [categories, setCategories] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        fetchCategories();
        fetchUserSubscriptions();
    }, []);

    const fetchCategories = () => {
        axiosClient.get('/gig-categories')
            .then(res => setCategories(res.data))
            .catch(err => console.error("Error fetching categories:", err));
    };

    const fetchUserSubscriptions = () => {
        axiosClient.get(`/notification-subscriptions/${user.id}`)
            .then(res => setSubscriptions(res.data))
            .catch(err => console.error("Error fetching subscriptions:", err));
    };

    const handleToggle = async (categoryId, checked) => {
        try {
            const endpoint = checked ? '/notification-subscribe' : '/notification-unsubscribe';
            await axiosClient.post(endpoint, {
                user_id: user.id,
                gig_category_id: categoryId,
            });
            toast.success(checked ? "Subscribed!" : "Unsubscribed!");
            fetchUserSubscriptions();
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="space-y-8">
            {/* <h1 className="text-xl font-bold">Hi, {user?.firstname}</h1> */}
            <p className="text-gray-600">Manage your notification preferences</p>

            <form className="space-y-4">
                {categories.map(category => (
                    <label key={category.name} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={subscriptions.includes(category.id)}
                            onChange={(e) =>
                                handleToggle(category.id, e.target.checked)
                            }
                            className="w-4 h-4"
                        />
                        <span className="capitalize text-gray-800">{category.name}</span>
                    </label>
                ))}
            </form>
        </div>
    );
}
