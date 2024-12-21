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
  UserCircle,
  ChevronLeft,
  Share2,
  Heart,
} from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import parse from "html-react-parser";
import { globalContext } from "@/context_api/globalContext";

// Reusable components
const InfoCard = ({ icon: Icon, label, value }) => (
  <div className="relative overflow-hidden bg-white rounded-xl border border-gray-100 p-5
                  hover:border-blue-200 transition-all duration-300 hover:shadow-md group">
    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-transparent 
                    rounded-bl-full opacity-50 transition-transform duration-300 group-hover:scale-110" />
    <div className="relative flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0
                    group-hover:bg-blue-100 transition-colors duration-300">
        <Icon className="h-5 w-5 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" />
      </div>
      <div>
        <div className="text-xs font-medium text-gray-500 mb-1">{label}</div>
        <div className="text-sm font-semibold text-gray-900">{value}</div>
      </div>
    </div>
  </div>
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
  let textColor = "text-yellow-800";
  let bgColor = "bg-yellow-50";

  if (now > end) {
    status = "Completed";
    statusColor = "bg-gray-500";
    textColor = "text-gray-800";
    bgColor = "bg-gray-50";
  } else if (now >= start && now <= end) {
    status = "In Progress";
    statusColor = "bg-green-500";
    textColor = "text-green-800";
    bgColor = "bg-green-50";
  }

  return (
    <div className={`inline-flex items-center gap-1.5 ${bgColor} px-3 py-1.5 rounded-full`}>
      <div className={`w-2 h-2 rounded-full ${statusColor} animate-pulse`} />
      <span className={`text-xs font-medium ${textColor}`}>{status}</span>
    </div>
  );
};

const Hackathon = ({ hackathonn }) => {
  const { hackathon, setHackathon, user } = useContext(globalContext);
  const [selectedTab, setSelectedTab] = useState("description");
  const [registered, setRegistered] = useState(false);
  const hasStarted = isHackathonStarted(hackathon?.start_date);
  const router = useRouter();

  useEffect(() => {
    setHackathon(hackathonn);
    if (user?.registered_events?.includes(hackathonn._id)) {
      setRegistered(true);
    }
  }, [hackathonn, user?.registered_events]);

  const handleRegister = () => {
    router.push("/hackathon/register");
  };

  if (!hackathon?.title) {
    return null;
  }

  const formatDateTime = (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const tabs = [
    { id: "description", label: "Overview", icon: BookOpen },
    { id: "judges", label: "Judges", icon: Award },
    { id: "prizes", label: "Prizes", icon: Gift },
    { id: "contact", label: "Contact", icon: Phone },
    { id: "organizers", label: "Team", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/10 py-4 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="group mb-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 
                    bg-white/80 rounded-lg border border-gray-200 hover:bg-gray-50
                    transition-all duration-200"
        >
          <ChevronLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Back
        </button>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md">
          <div className="relative aspect-[21/9] w-full">
            <img
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${hackathon.image}`}
              alt={hackathon.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Status Badge */}
            <div className="absolute top-3 right-3">
              <StatusIndicator startDate={hackathon.start_date} endDate={hackathon.end_date} />
            </div>
          </div>

          {/* Title and Meta Section */}
          <div className="p-5 space-y-3 bg-white border-t border-gray-100">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight leading-tight">
              {hackathon.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 bg-blue-50 px-2.5 py-1 rounded-full">
                <Users className="h-3.5 w-3.5 text-blue-500" />
                <span className="text-xs text-blue-700 font-medium">
                  {hackathon.registered_users?.length}/{hackathon.max_users} Teams
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-full">
                <MapPin className="h-3.5 w-3.5 text-gray-500" />
                <span className="text-xs text-gray-700 font-medium">
                  {hackathon.mode === "Online" ? "Online Event" : hackathon.location}
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-full">
                <Calendar className="h-3.5 w-3.5 text-gray-500" />
                <span className="text-xs text-gray-700 font-medium">
                  {new Date(hackathon.start_date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Details Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-md">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Quick Details</h3>
              <div className="space-y-3">
                <InfoCard
                  icon={Calendar}
                  label="Start Date"
                  value={formatDateTime(hackathon.start_date)}
                />
                <InfoCard
                  icon={Calendar}
                  label="End Date"
                  value={formatDateTime(hackathon.end_date)}
                />
                <InfoCard
                  icon={Clock}
                  label="Duration"
                  value={`${hackathon.duration || 48} Hours`}
                />
                <InfoCard
                  icon={MapPin}
                  label="Location"
                  value={hackathon.mode === "Online" ? "Online Event" : hackathon.location}
                />
                <InfoCard
                  icon={Users}
                  label="Team Size"
                  value={`${hackathon.team_size} Members`}
                />
                <InfoCard
                  icon={Trophy}
                  label="Prize Pool"
                  value={hackathon.prizes?.length ? `${hackathon.prizes.length} Prizes` : "TBA"}
                />
              </div>

              <div className="mt-6">
                <button
                  onClick={() => !registered && !hasStarted && handleRegister(hackathon.team_size)}
                  disabled={registered || hasStarted}
                  className={`w-full py-2.5 px-4 text-sm font-medium rounded-lg shadow-sm 
                            transition-all duration-300 transform hover:-translate-y-0.5 
                            ${
                              registered || hasStarted
                                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
                            }`}
                >
                  {registered
                    ? "Already Registered"
                    : hasStarted
                    ? "Registration Closed"
                    : "Register Now"}
                </button>
                {hasStarted && (
                  <p className="mt-2 text-xs text-gray-500 text-center">
                    Registration is closed as the hackathon has already started.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Tabs Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
              <div className="border-b border-gray-100">
                <div className="flex gap-2 p-1 overflow-x-auto scrollbar-hide">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg
                                  transition-all duration-300 min-w-max
                                  ${
                                    selectedTab === tab.id
                                      ? "bg-blue-50 text-blue-600"
                                      : "text-gray-600 hover:bg-gray-50"
                                  }`}
                      >
                        <Icon className="h-4 w-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <TabContent selectedTab={selectedTab} hackathon={hackathon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TabContent = ({ selectedTab, hackathon }) => {
  switch (selectedTab) {
    case "description":
      return (
        <div className="space-y-12">
          {/* About Section */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="p-2 bg-blue-50 rounded-xl">
                <Target className="h-4 w-4 text-blue-500" />
              </div>
              About
            </h3>
            <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed 
                          prose-headings:font-semibold prose-headings:text-gray-900
                          prose-p:text-gray-600 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                          prose-strong:text-gray-900 prose-strong:font-semibold">
              {parse(hackathon.about)}
            </div>
          </section>

          {/* Description Section */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="p-2 bg-blue-50 rounded-xl">
                <BookOpen className="h-4 w-4 text-blue-500" />
              </div>
              Description
            </h3>
            <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed
                          prose-headings:font-semibold prose-headings:text-gray-900
                          prose-p:text-gray-600 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                          prose-strong:text-gray-900 prose-strong:font-semibold">
              {parse(hackathon.description)}
            </div>
          </section>

          {/* Themes Section */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <div className="p-2 bg-blue-50 rounded-xl">
                <Target className="h-4 w-4 text-blue-500" />
              </div>
              Themes
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {hackathon.themes.map((theme, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-white
                            rounded-xl border border-blue-100 hover:border-blue-200 hover:shadow-md 
                            transition-all duration-300 group"
                >
                  <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center
                                group-hover:bg-blue-200 transition-colors duration-300">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  </div>
                  <span className="text-sm text-gray-700 font-medium">{theme}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      );

    case "judges":
      return (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <div className="p-2 bg-blue-50 rounded-xl">
              <Award className="h-4 w-4 text-blue-500" />
            </div>
            Judges Panel
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {hackathon.judges.map((judge, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-white
                            rounded-xl border border-blue-100 hover:border-blue-200 hover:shadow-md 
                            transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center
                              group-hover:bg-blue-200 transition-colors duration-300">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <span className="text-sm text-gray-900 font-medium block mb-1">
                    {judge}
                  </span>
                  <p className="text-xs text-gray-500">Judge</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "prizes":
      return (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <div className="p-2 bg-blue-50 rounded-xl">
              <Gift className="h-4 w-4 text-blue-500" />
            </div>
            Prizes & Rewards
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {hackathon.prizes.map((prize, index) => (
              <div
                key={index}
                className="group p-4 bg-gradient-to-br from-yellow-50 to-white
                            rounded-xl border border-yellow-100 hover:border-yellow-200 hover:shadow-md 
                            transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center
                                group-hover:bg-yellow-200 transition-colors duration-300">
                    <Trophy className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="text-sm text-gray-900 font-semibold">{`Prize ${index + 1}`}</div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{prize}</p>
              </div>
            ))}
          </div>
        </div>
      );

    case "contact":
      return (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <div className="p-2 bg-blue-50 rounded-xl">
              <Phone className="h-4 w-4 text-blue-500" />
            </div>
            Contact Information
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-white
                          rounded-xl border border-blue-100 hover:border-blue-200 hover:shadow-md 
                          transition-all duration-300 group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center
                              group-hover:bg-blue-200 transition-colors duration-300">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Phone Number</div>
                  <div className="text-sm text-gray-900 font-medium">
                    {hackathon.phone}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-blue-50 to-white
                          rounded-xl border border-blue-100 hover:border-blue-200 hover:shadow-md 
                          transition-all duration-300 group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center
                              group-hover:bg-blue-200 transition-colors duration-300">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Email Address</div>
                  <div className="text-sm text-gray-900 font-medium break-all">
                    {hackathon.email}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case "organizers":
      return (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <div className="p-2 bg-blue-50 rounded-xl">
              <Users className="h-4 w-4 text-blue-500" />
            </div>
            Organizing Team
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {hackathon.organizers.map((organizer, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-white
                            rounded-xl border border-blue-100 hover:border-blue-200 hover:shadow-md 
                            transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center
                              group-hover:bg-blue-200 transition-colors duration-300">
                  <UserCircle className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <span className="text-sm text-gray-900 font-medium block mb-1">
                    {organizer}
                  </span>
                  <p className="text-xs text-gray-500">Organizer</p>
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
