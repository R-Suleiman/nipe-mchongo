import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
    return (
        <div className="min-h-screen bg-blue-50 p-8 flex items-center justify-center">
            <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full border border-blue-100 flex flex-col space-y-6">
                <div className="w-fit rounded-full mx-auto my-4 p-2 bg-green-500">
                    <FaCheck className=" text-white rounded-full text-3xl" />
                </div>
                <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
                    Payment Successful!
                </h1>

                <p className="text-center text-gray-600">
                    Your payment has been processed, and your points have been
                    added.
                </p>
                <div className="w-fit mx-auto">
                <Link
                    to="/jobposter/points"
                    className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                    Return to Home
                </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
