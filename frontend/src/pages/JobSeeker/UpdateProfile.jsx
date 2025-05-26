import { useState } from "react";
import JobSeekerLayout from "../../layouts/JobSeekerLayout";

export default function UpdateProfile() {
    const [formData, setFormData] = useState({
        fullName: 'John Doe',
        email: 'johndoe@example.com',
        phone: '+255712345678',
        location: 'Dar es Salaam',
        bio: 'Experienced freelance photographer passionate about capturing moments.',
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send formData to the backend via API here
        alert('Profile updated successfully!');
    };

    return (
        <JobSeekerLayout>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto mt-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Short Bio</label>
                        <textarea
                            name="bio"
                            rows="4"
                            value={formData.bio}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
                        <input
                            type="file"
                            name="profilePhoto"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
                        />
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
        </JobSeekerLayout>
    );
}
