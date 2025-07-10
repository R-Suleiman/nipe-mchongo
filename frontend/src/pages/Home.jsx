import React from "react";
import {
    FaSearch,
    FaEdit,
    FaComments,
    FaUserCheck,
    FaRocket,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
    return (
        <div className="text-white">
            {/* Hero Section */}
            <section className="py-20 px-4 h-[600px] bg-[url('/assets/images/main-bg1.jpg')] bg-cover bg-no-repeat bg-center">
                <div className="w-7/12 p-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Find or Post Jobs in Your Community — Instantly!
                    </h1>
                    <p className="text-lg md:text-xl mb-6">
                        Connecting job posters and seekers for casual work. No
                        CV needed — just skills, opportunity, and trust!
                    </p>
                    <div className="flex justify-center gap-4">
                        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300">
                            Find Jobs
                        </button>
                        <button className="bg-white text-blue-900 hover:bg-gray-200 font-semibold py-2 px-6 rounded-full transition-all duration-300">
                            Post a Job
                        </button>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="bg-white text-blue-900 py-16 px-6">
                <h2 className="text-3xl font-bold text-center mb-12">
                    How It Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    <div className="text-center">
                        <FaSearch className="text-5xl text-orange-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                            Browse Jobs
                        </h3>
                        <p>Explore available listings in your area.</p>
                    </div>
                    <div className="text-center">
                        <FaEdit className="text-5xl text-orange-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                            Post a Job
                        </h3>
                        <p>Quickly create a job listing for free.</p>
                    </div>
                    <div className="text-center">
                        <FaComments className="text-5xl text-orange-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                            Connect Easily
                        </h3>
                        <p>Chat directly and get the job done.</p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-6 bg-blue-50 text-blue-900">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Platform Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    <div className="text-center">
                        <FaUserCheck className="text-4xl text-orange-500 mx-auto mb-2" />
                        <h4 className="font-semibold text-lg">
                            No CV Required
                        </h4>
                        <p className="text-sm">Apply based on your ability.</p>
                    </div>
                    <div className="text-center">
                        <FaRocket className="text-4xl text-orange-500 mx-auto mb-2" />
                        <h4 className="font-semibold text-lg">
                            Quick Registration
                        </h4>
                        <p className="text-sm">Get started in minutes.</p>
                    </div>
                    <div className="text-center">
                        <FaSearch className="text-4xl text-orange-500 mx-auto mb-2" />
                        <h4 className="font-semibold text-lg">
                            Local Opportunities
                        </h4>
                        <p className="text-sm">Find nearby jobs easily.</p>
                    </div>
                    <div className="text-center">
                        <FaEdit className="text-4xl text-orange-500 mx-auto mb-2" />
                        <h4 className="font-semibold text-lg">Free to Use</h4>
                        <p className="text-sm">All features at no cost.</p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-white py-16 px-6 text-blue-900">
                <h2 className="text-3xl font-bold text-center mb-12">
                    What Users Say
                </h2>
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="bg-blue-100 p-6 rounded shadow">
                        <p className="text-lg font-medium mb-2">
                            “I found a house cleaning job in just a few hours —
                            amazing platform!”
                        </p>
                        <p className="text-sm font-semibold text-right">
                            — Asha M.
                        </p>
                    </div>
                    <div className="bg-blue-100 p-6 rounded shadow">
                        <p className="text-lg font-medium mb-2">
                            “Simple to use and super helpful, especially for
                            short-term gigs.”
                        </p>
                        <p className="text-sm font-semibold text-right">
                            — Hamis K.
                        </p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className=" text-white py-16 px-6 h-96 bg-[url('/assets/images/footer-bg.png')] bg-cover bg-no-repeat bg-center flex justify-center align-center">
                <div className="mt-auto text-center w-full">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="mb-6 text-lg">
                        Post or find a job today. It's fast and free!
                    </p>
                    <button className="bg-white text-orange-600 font-semibold py-2 px-8 rounded-full hover:bg-orange-100 transition">
                        Join Now
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="text-white text-center py-6 bg-[#01367E]">
                <p>
                    &copy; {new Date().getFullYear()} Nipe Mchongo. All rights
                    reserved.
                </p>
            </footer>
        </div>
    );
}
