import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import axiosClient from "../../assets/js/axios-client";

export default function UpdateProfile() {
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        firstname: user?.firstname || '',
        lastname: user?.lastname || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
        dob: user?.dob || '',
        gender: user?.gender || '',
        profilePhoto: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profilePhoto') {
            setFormData({ ...formData, profilePhoto: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = new FormData();

        // Append form fields
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                payload.append(key, value);
            }
        });

        // Append user ID from frontend (not using Laravel Auth)
        payload.append('seeker_id', user.id); // <- This is what you meant

        try {
            const response = await axiosClient.post('/profile/update', payload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert("Profile updated!");
        } catch (err) {
            console.error(err);
            alert("Update failed!");
        }
    };

    return (
        <>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                            <input
                                type="text"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <input
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
