"use client";
import { useState, useEffect } from "react";
import {
  Clock,
  Users,
  Calendar,
  Monitor,
  CheckCircle,
  Trophy,
  Mail,
  PhoneCall,
  Star,
  Flag,
  Timer,
  IndianRupee,
  UserCheck,
  Info,
  BookOpen,
  Users as UserGroup,
} from "lucide-react";

const RightSection = ({ hackathon }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isEventCompleted, setIsEventCompleted] = useState(false);

  useEffect(() => {
    const countDown = setInterval(() => {
      const today = new Date();
      const hday = new Date(hackathon?.date);
      const distance = hday.getTime() - today.getTime();

      if (distance <= 0) {
        clearInterval(countDown);
        setTimeLeft("0d 0h 0m 0s");
        setIsEventCompleted(true);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      setIsEventCompleted(false);
    }, 1000);

    return () => clearInterval(countDown);
  }, [hackathon?.date]);

  const View = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });
  };

  const formatText = (text) => {
    return text
      .replace(/\r?\n/g, "<br/>")
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>");
  };

  const formattedStartTime = new Date(hackathon?.start_time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const formattedEndTime = new Date(hackathon?.end_time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const generateICS = () => {
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${hackathon.title}
DESCRIPTION:${hackathon.description}
DTSTART:${new Date(hackathon.start_time).toISOString().replace(/-|:|\.\d+/g, '')}
DTEND:${new Date(new Date(hackathon.end_time).getTime() + 3600000).toISOString().replace(/-|:|\.\d+/g, '')}
END:VEVENT
END:VCALENDAR
    `.trim();

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${hackathon.title}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!hackathon) return null;

  return (
    <div className="w-[60%] h-full hidden lg:block relative p-6 overflow-y-auto bg-white shadow-md rounded-lg space-y-8">
      {/* Poster */}
      <div className="w-full h-[300px] rounded-lg overflow-hidden border shadow-sm mb-8 transition-transform transform hover:scale-105">
        <img
          src={process.env.NEXT_PUBLIC_BACKEND_URL + '/' + hackathon.image_url}
          alt="Hackathon Poster"
          className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-90"
        />
      </div>

      {/* Hackathon Details */}
      <div className="w-full p-4 h-auto space-y-4 bg-gray-50 shadow-sm rounded-lg">
        <h4 className="text-3xl font-bold text-gray-800">{hackathon.title}</h4>
        <div className="flex flex-row gap-4 text-gray-700">
          <div className="flex items-center gap-2">
            <Monitor className="text-blue-600 w-6 h-6" />
            <span className="text-lg">{hackathon.mode}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="text-green-600 w-6 h-6" />
            <span className="text-lg">Team size: {hackathon.team_size}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Calendar className="text-red-500 w-6 h-6" />
          <span className="lg:text-lg text-sm">Event Date: {formatDate(hackathon.date)}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <Timer className="text-red-500 w-6 h-6" />
          <span className="lg:text-lg text-sm">Start Time: {formattedStartTime} | End Time: {formattedEndTime}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <UserCheck className="text-green-600 w-6 h-6" />
          <span className="lg:text-lg text-sm">
            Registered Users: {hackathon.registered_users.length}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <IndianRupee className="text-yellow-500 w-6 h-6" />
          <span className="lg:text-lg text-sm">Fee: {hackathon.fee ? null : "Free"}</span>
        </div>
        <div className="flex justify-between items-center gap-4">
          <span className="text-lg font-semibold text-gray-700 bg-blue-50 py-1 px-3 rounded-lg transition-transform transform hover:scale-105">
            <Clock className="inline-block text-gray-500 mr-1 w-5 h-5" />
            Submission Closes in <span className="animate-pulse">{timeLeft}</span>
          </span>
          <button
            className={`bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-transform transform hover:scale-105 shadow-sm flex items-center ${isEventCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isEventCompleted}
          >
            {isEventCompleted ? "Completed" : <><CheckCircle className="mr-2 w-5 h-5" /> Register</>}
          </button>
        </div>
        <button onClick={generateICS} className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-transform transform hover:scale-105 shadow-sm flex items-center">
          <Calendar className="mr-2 w-5 h-5" /> Add to Calendar
        </button>
      </div>

      {/* Eligibility */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <CheckCircle className="text-green-500 w-6 h-6" /> Eligibility: {hackathon.eligibility || "All"}
        </h4>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-6 text-gray-600 border-b pb-2">
        {["description", "about", "themes", "organizers", "partners", "contact"].map((tab) => (
          <span
            key={tab}
            onClick={() => View(tab)}
            className="cursor-pointer hover:text-blue-500 transition-transform transform hover:scale-105"
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </span>
        ))}
      </div>

      {/* Details Section */}
      <div className="space-y-4">
        <div id="description" className="space-y-2 p-4 my-4 bg-gray-50 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Info className="text-gray-600 w-6 h-6" /> Description
          </h4>
          <div className="text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: formatText(hackathon.description) }} />
        </div>
        <div id="about" className="space-y-2 p-4 my-4 bg-gray-50 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Info className="text-gray-600 w-6 h-6" /> About
          </h4>
          <div className="text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: formatText(hackathon.about) }} />
        </div>
        <div id="themes" className="space-y-2 p-4 my-4 bg-gray-50 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Star className="text-yellow-500 w-6 h-6" /> Themes
          </h4>
          <ul className="text-gray-700 text-sm list-disc list-inside">
            {hackathon.themes.map((theme, index) => (
              <li key={index} className="ml-4">{theme}</li>
            ))}
          </ul>
        </div>
        <div id="organizers" className="space-y-2 p-4 my-4 bg-gray-50 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <UserGroup className="text-blue-500 w-6 h-6" /> Organizers
          </h4>
          <ul className="text-gray-700 text-sm list-disc list-inside">
            {hackathon.organizers.map((organizer, index) => (
              <li key={index} className="ml-4">{organizer}</li>
            ))}
          </ul>
        </div>
        <div id="partners" className="space-y-2 p-4 my-4 bg-gray-50 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Flag className="text-red-500 w-6 h-6" /> Partners
          </h4>
          <ul className="text-gray-700 text-sm list-disc list-inside">
            {hackathon.partners.map((partner, index) => (
              <li key={index} className="ml-4">{partner}</li>
            ))}
          </ul>
        </div>
        <div id="contact" className="space-y-4 p-4 my-4 bg-gray-50 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
             Contact
          </h4>
          <div className="flex items-center gap-4">
            <Mail className="text-gray-600 w-6 h-6" />
            <span className="text-gray-700">{hackathon.email}</span>
          </div>
          <div className="flex items-center gap-4">
            <PhoneCall className="text-gray-600 w-6 h-6" />
            <span className="text-gray-700">{hackathon.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSection;
