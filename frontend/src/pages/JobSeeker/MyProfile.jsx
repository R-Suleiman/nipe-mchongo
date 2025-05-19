import React from "react";
import JobSeekerLayout from "../../layouts/JobSeekerLayout";

export default function MyProfile() {
    // Dummy user data for testing
    const user = {
        firstname: "John",
        lastname: "Doe",
        dob: "1995-06-15", // Consider formatting this if needed
        gender: "Male",
        email: "johndoe@example.com",
        address: "123 Main Street, Nairobi, Kenya",
    };

    return (
        <JobSeekerLayout>
            {/* Profile Card */}
            <div className="bg-orange-50 rounded-3xl p-6 text-center shadow-lg hover:shadow-2xl transition">
                <img src="/images/nipe-mchongo.jpeg" alt="Profile" className="mx-auto rounded-full w-32 h-32 border-4 border-orange-400 shadow mb-4" />
                <h3 className="text-xl font-bold text-gray-800">{user.firstname} {user.lastname}</h3>
                <p className="text-sm text-gray-600">Age: {user.dob}</p>
                <p className="text-sm text-gray-600">Gender: {user.gender}</p>
                <p className="text-sm text-gray-600 mb-4">{user.email}</p>
                <p className="text-sm text-gray-600 mb-4">{user.address}</p>
                <button className="py-2 px-4 rounded-md bg-orange-600 text-white font-semibold text-xs hover:bg-orange-700">Update Profile</button>
            </div>
        </JobSeekerLayout>
    );
}
