import React from "react";
import { FaTimes } from "react-icons/fa";

function NoPointsModal() {
    return (
        <div className="w-11/12 mx-auto p-2 flex flex-col items-center space-y-2">
            <h2 className="text-3xl font-semibold text-center">
                You currently have 0 Mchongo Points
            </h2>
            <FaTimes className="text-5xl text-white bg-red-600 p-2 rounded-full my-6" />
            <p className="text-lg font-semibold text-gray-600 text-center">
                You need at least 1 Mchongo Point to post a Gig
            </p>
        </div>
    );
}

export default NoPointsModal;
