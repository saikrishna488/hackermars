"use client";
import React, { useContext, useEffect, useState } from "react";
import {
    Calendar,
    Users,
    MapPin,
    Clock,
    Trophy,
    User,
    CheckCircle,
    Phone,
    Mail,
    Building,
    Target,
    Award,
    BookOpen,
    Gift,
    UserCircle
} from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import parse from "html-react-parser";
import { globalContext } from "@/context_api/globalContext";

// Reusable components
const InfoCard = ({ icon: Icon, label, value }) => (
    <div className="bg-white p-3 rounded-lg border border-gray-100 
        hover:border-blue-100 transition-all duration-200 hover:shadow-sm
        flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
            <Icon className="h-4 w-4 text-blue-500" />
        </div>
        <div>
            <div className="text-xs text-gray-500">{label}</div>
            <div className="text-sm font-semibold text-gray-900">{value}</div>
        </div>
    </div>
);
const TabButton = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
            ? "bg-blue-50 text-blue-600 shadow-sm"
            : "text-gray-600 hover:bg-gray-50"
            }`}
    >
        {label}
    </button>
);


//helper function
const isHackathonStarted = (startDate) => {
    const now = new Date();
    const hackathonStart = new Date(startDate);
    return now >= hackathonStart;
};

//status indicator
const StatusIndicator = ({ startDate, endDate }) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    let status = "Upcoming";
    let statusColor = "bg-yellow-500";

    if (now > end) {
        status = "Completed";
        statusColor = "bg-gray-500";
    } else if (now >= start && now <= end) {
        status = "In Progress";
        statusColor = "bg-green-500";
    }

    return (
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 
            backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
            <div className={`w-2 h-2 rounded-full ${statusColor} animate-pulse`} />
            <span className="text-xs font-medium text-gray-700">{status}</span>
        </div>
    );
};


const Hackathon = ({ hackathonn }) => {
    const { hackathon, setHackathon, user } = useContext(globalContext);
    const [selectedTab, setSelectedTab] = useState("description");
    const [registered, setRegistered] = useState(false);
    const hasStarted = isHackathonStarted(hackathon.start_date);
    const router = useRouter();

    useEffect(() => {
        setHackathon(hackathonn);
        if (user?.registered_events?.includes(hackathonn._id)) {
            setRegistered(true);
        }
    }, [hackathonn, user?.registered_events]);

    const handleRegister = () => {
        router.push('/hackathon/register');
    };

    if (!hackathon?.title) {
        return null;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24">
            {/* Hero Section */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="relative h-64 sm:h-80 lg:h-96">
                    <StatusIndicator
                        startDate={hackathon.start_date}
                        endDate={hackathon.end_date}
                    />
                    <img
                        src={process.env.NEXT_PUBLIC_BACKEND_URL + '/' + hackathon.image}
                        alt={hackathon.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                        <div className="max-w-3xl">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-4">
                                {hackathon.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-white/90">
                                <span className="flex items-center gap-2 text-sm sm:text-base">
                                    <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                                    {hackathon.registered_users?.length || 0} Participants
                                </span>
                                <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${hackathon.mode === 'online'
                                    ? 'bg-blue-500/20 text-blue-100'
                                    : 'bg-purple-500/20 text-purple-100'
                                    }`}>
                                    {hackathon.mode}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100">
                    <div className="max-w-4xl mx-auto p-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            <InfoCard
                                icon={Calendar}
                                label="Start Date"
                                value={new Date(hackathon.start_date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            />
                            <InfoCard
                                icon={Calendar}
                                label="End Date"
                                value={new Date(hackathon.end_date).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            />
                            <InfoCard
                                icon={Clock}
                                label="Duration"
                                value={`${hackathon.duration || 48} Hours`}
                            />
                            <InfoCard
                                icon={MapPin}
                                label="Location"
                                value={hackathon.mode === 'online' ? 'Online Event' : hackathon.location?.slice(0, 20) || "N/A"}
                            />
                            <InfoCard
                                icon={Users}
                                label="Team Size"
                                value={`${hackathon.team_size} Members`}
                            />
                            <InfoCard
                                icon={Trophy}
                                label="Registered"
                                value={`${hackathon.registered_users?.length || 0} Teams`}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Registration Button */}
            <div className="mt-8 flex flex-col items-center gap-2">
                <button
                    onClick={() => !registered && !hasStarted && handleRegister(hackathon.team_size)}
                    disabled={registered || hasStarted}
                    className={`px-8 py-3 rounded-xl text-sm font-medium transition-all duration-200 
                        flex items-center gap-2 
                        ${registered
                            ? "bg-gray-100 text-gray-600 cursor-not-allowed"
                            : hasStarted
                                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 hover:transform hover:scale-105"
                        }`}
                >
                    <CheckCircle className="h-5 w-5" />
                    {registered
                        ? "Already Registered"
                        : hasStarted
                            ? "Registration Closed"
                            : "Register Now"
                    }
                </button>
                {hasStarted && (
                    <p className="text-sm text-gray-500">
                        Registration is closed as the hackathon has already started.
                    </p>
                )}
            </div>

            {/* Navigation Tabs */}
            <div className="mt-8 sm:mt-12 overflow-x-auto">
                <div className="flex gap-2 justify-start sm:justify-center bg-gray-50/50 p-2 rounded-xl min-w-max mx-auto">
                    {["description", "judges", "prizes", "contact", "organizers"].map((tab) => (
                        <TabButton
                            key={tab}
                            label={tab.charAt(0).toUpperCase() + tab.slice(1)}
                            isActive={selectedTab === tab}
                            onClick={() => setSelectedTab(tab)}
                        />
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
                <TabContent selectedTab={selectedTab} hackathon={hackathon} />
            </div>
        </div>
    );
};

const TabContent = ({ selectedTab, hackathon }) => {
    switch (selectedTab) {
        case "description":
            return (
                <div className="space-y-10">
                    {/* About Section */}
                    <section>
                        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            <Target className="h-5 w-5 text-blue-500" />
                            About
                        </h3>
                        <div className="prose prose-blue max-w-none text-gray-600">
                            {parse(hackathon.about)}
                        </div>
                    </section>

                    {/* Description Section */}
                    <section>
                        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            <BookOpen className="h-5 w-5 text-blue-500" />
                            Description
                        </h3>
                        <div className="prose prose-blue max-w-none text-gray-600">
                            {parse(hackathon.description)}
                        </div>
                    </section>

                    {/* Themes Section */}
                    <section>
                        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                            <Target className="h-5 w-5 text-blue-500" />
                            Themes
                        </h3>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {hackathon.themes.map((theme, index) => (
                                <div key={index}
                                    className="flex items-center gap-3 p-4 bg-blue-50/50 rounded-xl
                                    border border-blue-100 hover:bg-blue-50 transition-all duration-200">
                                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                    <span className="text-gray-700">{theme}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            );

        case "judges":
            return (
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <Award className="h-5 w-5 text-blue-500" />
                        Judges Panel
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {hackathon.judges.map((judge, index) => (
                            <div key={index}
                                className="flex items-center gap-4 p-4 bg-gradient-to-br from-blue-50 to-white
                                rounded-xl border border-blue-100 hover:shadow-md transition-all duration-200">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <User className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <span className="text-gray-900 font-medium">{judge}</span>
                                    <p className="text-sm text-gray-500">Judge</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );

        case "prizes":
            return (
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <Gift className="h-5 w-5 text-blue-500" />
                        Prizes & Rewards
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {hackathon.prizes.map((prize, index) => (
                            <div key={index}
                                className="p-6 bg-gradient-to-br from-yellow-50 to-white
                                rounded-xl border border-yellow-100 hover:shadow-md transition-all duration-200">
                                <div className="text-2xl mb-3">🏆</div>
                                <div className="text-gray-900 font-medium">{`Prize ${index + 1}`}</div>
                                <p className="text-gray-600 mt-2">{prize}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );

        case "contact":
            return (
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <Phone className="h-5 w-5 text-blue-500" />
                        Contact Information
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="p-6 bg-gradient-to-br from-blue-50 to-white
                            rounded-xl border border-blue-100 hover:shadow-md transition-all duration-200">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Phone className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Phone Number</div>
                                    <div className="text-gray-900 font-medium">{hackathon.phone}</div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-gradient-to-br from-blue-50 to-white
                            rounded-xl border border-blue-100 hover:shadow-md transition-all duration-200">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <Mail className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-500">Email Address</div>
                                    <div className="text-gray-900 font-medium">{hackathon.email}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );

        case "organizers":
            return (
                <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                        <Building className="h-5 w-5 text-blue-500" />
                        Organizing Team
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {hackathon.organizers.map((organizer, index) => (
                            <div key={index}
                                className="flex items-center gap-4 p-4 bg-gradient-to-br from-blue-50 to-white
                                rounded-xl border border-blue-100 hover:shadow-md transition-all duration-200">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <UserCircle className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <span className="text-gray-900 font-medium">{organizer}</span>
                                    <p className="text-sm text-gray-500">Organizer</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );

        default:
            return null;
    }
};

export default Hackathon;