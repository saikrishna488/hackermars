"use client";
import React, { useContext, useEffect, useState } from "react";
import {
    Calendar,
    Users,
    MapPin,
    Clock,
    Globe,
    User,
    CheckCircle,
    Phone, Mail
} from "lucide-react"; // Importing Lucide icons
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import parse from "html-react-parser";
import { globalContext } from "@/context_api/globalContext";



const Hackathon = ({ hackathonn }) => {

    const { hackathon, setHackathon, user } = useContext(globalContext)
    const [selectedTab, setSelectedTab] = useState("description");
    const [registered, setRegistered] = useState(false)
    const router = useRouter()


    useEffect(() => {
        setHackathon(hackathonn)
        if (user?.registered_events?.includes(hackathonn._id)) {
            setRegistered(true)
        }

    }, [hackathonn, user?.registered_events])


    const handleRegister = () => {
        router.push('/hackathon/register')
    }


    if (!hackathon?.title) {
        return null
    }


    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-20">
            {/* Header Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative h-64 sm:h-80">
                    <img
                        src={process.env.NEXT_PUBLIC_BACKEND_URL + '/' + hackathon.image}
                        alt={hackathon.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h1 className="text-2xl font-bold mb-2">{hackathon.title}</h1>
                        <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1.5">
                                <Users className="h-4 w-4" />
                                {hackathon.registered_users?.length || 0} Registered
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-xs ${
                                hackathon.mode === 'online' 
                                    ? 'bg-blue-100 text-blue-700' 
                                    : 'bg-purple-100 text-purple-700'
                            }`}>
                                {hackathon.mode}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Quick Info Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-gray-100 border-t border-gray-100">
                    {[
                        { icon: Calendar, label: "Starts", value: new Date(hackathon.start_date).toLocaleDateString() },
                        { icon: Calendar, label: "Ends", value: new Date(hackathon.end_date).toLocaleDateString() },
                        { icon: Clock, label: "Duration", value: "48 Hours" },
                        { icon: MapPin, label: "Location", value: hackathon.location?.slice(0, 20) || "N/A" },
                        { icon: User, label: "Team Size", value: hackathon.team_size || "N/A" },
                        { icon: Users, label: "Participants", value: hackathon.registered_users?.length || 0 },
                    ].map(({ icon: Icon, label, value }, index) => (
                        <div key={index} className="bg-white p-4 text-center">
                            <Icon className="h-4 w-4 text-gray-400 mx-auto mb-1" />
                            <div className="text-xs text-gray-500">{label}</div>
                            <div className="text-sm font-medium text-gray-900 mt-0.5">{value}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Registration Button */}
            <div className="mt-6 flex justify-center">
                <button
                    onClick={() => registered ? null : handleRegister(hackathon.team_size)}
                    className={`${
                        registered 
                            ? "bg-gray-100 text-gray-600" 
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                    } px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2`}
                >
                    <CheckCircle className="h-4 w-4" />
                    {registered ? "Already Registered" : "Register Now"}
                </button>
            </div>

            {/* Navigation Tabs */}
            <div className="mt-8 border-b border-gray-200">
                <nav className="flex gap-6 -mb-px">
                    {["description", "judges", "prizes", "contact", "organizers"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setSelectedTab(tab)}
                            className={`py-2 px-1 text-sm font-medium border-b-2 transition-colors duration-200 ${
                                selectedTab === tab
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
                <TabContent selectedTab={selectedTab} hackathon={hackathon} />
            </div>
        </div>
    );



};

export default Hackathon;






const TabContent = ({ selectedTab, hackathon }) => {
    const contentClass = "prose prose-sm max-w-none text-gray-600";
    
    switch (selectedTab) {
        case "description":
            return (
                <div className="space-y-8">
                    <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
                        <div className={contentClass} dangerouslySetInnerHTML={{ __html: hackathon.about }} />
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                        <div className={contentClass} dangerouslySetInnerHTML={{ __html: hackathon.description }} />
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Themes</h3>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {hackathon.themes.map((theme, index) => (
                                <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                                    <span className="text-blue-500">•</span>
                                    {theme}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            );

        case "judges":
            return (
                <div className="grid sm:grid-cols-2 gap-4">
                    {hackathon.judges.map((judge, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-gray-500" />
                            </div>
                            <span className="text-sm text-gray-700">{judge}</span>
                        </div>
                    ))}
                </div>
            );

        case "prizes":
            return (
                <div className="space-y-4">
                    {hackathon.prizes.map((prize, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                            <div className="text-yellow-500 text-lg">🏆</div>
                            <span className="text-sm text-gray-700">{prize}</span>
                        </div>
                    ))}
                </div>
            );

        case "contact":

            return (
                <div className="bg-white p-8 rounded-lg w-full mx-auto shadow-lg border border-gray-200">
                    <h4 className="text-lg font-semibold text-blue-600 mb-6 border-b-2 pb-3 border-blue-300">
                        Contact Information
                    </h4>
                    <div className="space-y-4">
                        <div className="flex items-center bg-blue-50 p-2 rounded-lg shadow-sm border border-blue-100">
                            <Phone className="text-blue-600 text-xl mr-4" />
                            <div>
                                <span className="text-gray-600 font-medium text-sm">Phone</span>
                                <p className="text-gray-700 text-sm">{hackathon.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center bg-blue-50 p-2 rounded-lg shadow-sm border border-blue-100">
                            <Mail className="text-blue-600 text-xl mr-4" />
                            <div>
                                <span className="text-gray-600 font-medium text-sm">Email</span>
                                <p className="text-gray-700 text-sm">{hackathon.email}</p>
                            </div>
                        </div>
                    </div>
                </div>


            );

        case "organizers":
            return (
                <div className="bg-white rounded-lg p-2 w-full mx-auto">
                    <h4 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Organizers</h4>
                    <ul className="space-y-3">
                        {hackathon.organizers.map((organizer, index) => (
                            <li
                                key={index}
                                className="flex items-center p-4 bg-blue-50 border border-blue-300 rounded-md shadow-sm"
                            >
                                <i className="fas fa-user-circle text-blue-500 mr-3"></i>
                                <span className="text-gray-800 font-medium">{organizer}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            );

        default:
            return null;
    }
};