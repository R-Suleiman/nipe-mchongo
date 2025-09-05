import React from "react";
import { FaCheck, FaStar } from "react-icons/fa";

function ApplicationConfirmMessage(props) {
    const { application } = props;
    return (
        <div className="w-11/12 mx-auto p-2 flex flex-col items-center space-y-2">
            <h2 className="text-3xl font-semibold text-center">
                Congratulations {application?.poster.firstname}!
            </h2>
            <FaCheck className="text-5xl text-white bg-green-600 p-2 rounded-full my-6" />
            <p className="text-xl font-semibold text-gray-600 text-center">
                You have just created a new opportunity for a new Gig.
            </p>
            <p className="text-lg font-semibold text-gray-600 text-center">
                We will notify{" "}
                <span>
                    {application?.seeker.firstname}{" "}
                    {application?.seeker.lastname}
                </span>{" "}
                that their application got approved and they shall expect to
                hear from you for furthur details.
            </p>
            <p className="text-lg font-semibold text-gray-600 text-center">
                Check their profile for contact information
            </p>

            {/* <div className="my-6 pt-4">
                <p className="font-semibold text-gray-600 text-center">
                    How do you rate Nipe Mchongo?
                </p>
                <div className="my-2 w-fit mx-auto flex items-center space-x-2">
                    <FaStar className="text-lg text-yellow-600" />
                    <FaStar className="text-lg text-yellow-600" />
                    <FaStar className="text-lg" />
                    <FaStar className="text-lg" />
                    <FaStar className="text-lg" />
                </div>
            </div> */}
        </div>
    );
}

export default ApplicationConfirmMessage;
