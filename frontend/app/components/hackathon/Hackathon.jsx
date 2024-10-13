"use client";
import React, { useState } from "react";
import {
    Calendar,
    Users,
    MapPin,
    Clock,
    Globe,
    User,
    CheckCircle,
} from "lucide-react"; // Importing Lucide icons

const hackathonData = {
    title: "Hackathon A",
    poster: "https://hacktour-indore.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F69b24ce1c60040fb922217a4fd7517b6%2Fassets%2Fcover%2F743.png&w=1440&q=100", // Example poster
    date: "2024-11-15",
    remainingDays: 35,
    mode: "Online",
    location: "Virtual",
    organizer: "TechCorp",
    description:
        "Hackathon A is an exciting event that brings together developers, designers, and innovators to build cutting-edge solutions.",
    judges: ["Judge 1", "Judge 2", "Judge 3"],
    prizes: [
        "First Prize: $10,000",
        "Second Prize: $5,000",
        "Third Prize: $2,000",
    ],
    contact: "contact@hackathon.com",
    organizers: ["Organizer 1", "Organizer 2"],
};

const TabContent = ({ selectedTab }) => {
    switch (selectedTab) {
        case "description":
            return <p className="text-gray-700">{hackathonData.description}</p>;
        case "judges":
            return (
                <ul className="list-disc pl-5 text-gray-700">
                    {hackathonData.judges.map((judge, index) => (
                        <li key={index}>{judge}</li>
                    ))}
                </ul>
            );
        case "prizes":
            return (
                <ul className="list-disc pl-5 text-gray-700">
                    {hackathonData.prizes.map((prize, index) => (
                        <li key={index}>{prize}</li>
                    ))}
                </ul>
            );
        case "contact":
            return <p className="text-gray-700">Contact: {hackathonData.contact}</p>;
        case "organizers":
            return (
                <ul className="list-disc pl-5 text-gray-700">
                    {hackathonData.organizers.map((organizer, index) => (
                        <li key={index}>{organizer}</li>
                    ))}
                </ul>
            );
        default:
            return null;
    }
};

const Hackathon = () => {
    const [selectedTab, setSelectedTab] = useState("description");

    return (
        <div className="lg:w-[80%] w-full mx-auto pt-24 mt-16 bg-white  rounded-lg p-6 space-y-6">
            {/* Poster and Information Section */}
            <div className="md:flex space-y-6 md:space-y-0 md:space-x-6">
                {/* Poster */}
                <div className="flex justify-center ">
                    <img
                        src={hackathonData.poster}
                        alt={hackathonData.title}
                        className="h-[200px] w-[100%] object-cover rounded-lg shadow-md transition-transform hover:scale-105 duration-300"
                    />
                </div>

                {/* Hackathon Information */}
                <div className="md:w-1/2 space-y-4">
                    {/* Title */}
                    <h1 className="text-3xl font-semibold text-gray-900 text-center md:text-left">
                        {hackathonData.title}
                    </h1>

                    {/* Hackathon Info Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Info Card */}
                        {[
                            { icon: Calendar, label: "Date", value: hackathonData.date },
                            { icon: Clock, label: "Days Remaining", value: hackathonData.remainingDays },
                            { icon: Globe, label: "Mode", value: hackathonData.mode },
                            { icon: MapPin, label: "Location", value: hackathonData.location },
                            { icon: User, label: "Organizer", value: hackathonData.organizer },
                        ].map(({ icon: Icon, label, value }, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-3">
                                <Icon className="w-5 h-5 text-blue-500" />
                                <div>
                                    <span className="block text-gray-900 font-medium text-sm">{label}</span>
                                    <span className="text-gray-600 text-xs">{value}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Register Button */}
                    <div className="bg-blue-600 text-white rounded-lg shadow-md text-center p-4 cursor-pointer hover:bg-blue-700 transition-colors duration-300">
                        <CheckCircle className="inline w-5 h-5 mr-2" />
                        <span className="text-sm font-semibold">Register Now</span>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-gray-100 rounded-lg shadow-sm p-4">
                <ul className="flex space-x-4 text-sm text-gray-600 justify-center md:justify-start">
                    {["description", "judges", "prizes", "contact", "organizers"].map((tab) => (
                        <li
                            key={tab}
                            className={`cursor-pointer pb-1 ${selectedTab === tab
                                ? "border-b-2 border-blue-600 text-gray-900"
                                : ""
                                }`}
                            onClick={() => setSelectedTab(tab)}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg shadow-md p-4">
                <TabContent selectedTab={selectedTab} />
            </div>
        </div>
    );
};

export default Hackathon;
