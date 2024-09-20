"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
    Clock,
    Users,
    Calendar,
    Monitor,
    CheckCircle,
    Trophy,
    Mail,
    Phone,
    Star,
    Flag,
    ThumbsUp,
    DollarSign,
    PenTool,
    Info,
    BookOpen,
    Users as UserGroup,
} from "lucide-react";

const Hackathon = ({ id }) => {
    const [timeLeft, setTimeLeft] = useState(null);
    const [hackathon, setHackathon] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHackathon = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/hackathon/one?id=${id}`);
                if (res.data.res) {
                    setHackathon(res.data.hackathon);
                } else {
                    setError("No hackathon found.");
                }
            } catch (err) {
                console.log(err);
                setError("An error occurred while fetching hackathon data.");
            } finally {
                setLoading(false);
            }
        };

        fetchHackathon();
    }, [id]);

    useEffect(() => {
        if (hackathon) {
            const countDown = setInterval(() => {
                const today = new Date();
                const hday = new Date(hackathon.date);
                const distance = hday.getTime() - today.getTime();

                if (distance <= 0) {
                    clearInterval(countDown);
                    setTimeLeft("0d 0h 0m 0s");
                    return;
                }

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            }, 1000);

            return () => clearInterval(countDown);
        }
    }, [hackathon]);

    const View = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const formattedDate = hackathon ? new Date(hackathon.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }) : '';

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            {hackathon && (
                <div className="w-full h-full flex pt-20 relative justify-center">
                    <div className="w-full max-w-4xl mx-auto h-full relative p-6 overflow-y-auto bg-white shadow-md rounded-lg space-y-8">
                        {/* Poster */}
                        <div className="w-full lg:h-[300px] h-[200px] rounded-lg overflow-hidden border shadow-sm mb-8 transition-transform transform hover:scale-105">
                            <img
                                src={hackathon.image_url}
                                alt="Hackathon Poster"
                                className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-90"
                            />
                        </div>

                        {/* Hackathon Details */}
                        <div className="w-full p-4 h-auto space-y-4 bg-gray-50 shadow-sm rounded-lg">
                            <h4 className="text-3xl font-bold text-gray-800">{hackathon.title}</h4>
                            <div className="flex flex-col sm:flex-row gap-4 text-gray-700">
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
                                <span className="text-lg">Event Date: {formattedDate}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <DollarSign className="text-yellow-500 w-6 h-6" />
                                <span className="text-lg">Fee: {hackathon.fee}</span>
                            </div>
                            <div className="flex justify-between items-center gap-4">
                                <span className="text-lg font-semibold text-gray-700 bg-blue-50 py-1 px-3 rounded-lg transition-transform transform hover:scale-105">
                                    <Clock className="inline-block text-gray-500 mr-1 w-5 h-5" />
                                    Submission Closes in <span className="animate-pulse">{timeLeft}</span>
                                </span>
                                <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-transform transform hover:scale-105 shadow-sm flex items-center">
                                    <CheckCircle className="mr-2 w-5 h-5" /> Register
                                </button>
                            </div>
                        </div>

                        {/* Eligibility */}
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <CheckCircle className="text-green-500 w-6 h-6" /> Eligibility: All
                            </h4>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="flex gap-6 text-gray-600 border-b pb-2">
                            {[
                                { id: "description", title: "Description" },
                                { id: "about", title: "About" },
                                { id: "prizes", title: "Prizes" },
                                { id: "contact", title: "Contact" },
                            ].map(tab => (
                                <span key={tab.id} onClick={() => View(tab.id)} className="cursor-pointer hover:text-blue-500 transition-transform transform hover:scale-105">
                                    {tab.title}
                                </span>
                            ))}
                        </div>

                        {/* Sections */}
                        {[
                            { id: "description", title: "Description", content: hackathon.description, icon: <PenTool className="text-gray-600 w-6 h-6" /> },
                            { id: "about", title: "About", content: hackathon.about, icon: <Info className="text-gray-600 w-6 h-6" /> },
                            { id: "prizes", title: "Prizes", content: hackathon.prizes, icon: <Trophy className="text-gray-600 w-6 h-6" /> },
                            { id: "themes", title: "Themes", content: hackathon.themes, icon: <BookOpen className="text-gray-600 w-6 h-6" /> },
                            { id: "organizers", title: "Organizers", content: hackathon.organizers, icon: <UserGroup className="text-gray-600 w-6 h-6" /> },
                            { id: "partners", title: "Partners", content: hackathon.partners, icon: <Flag className="text-red-500 w-6 h-6" /> },
                        ].map(section => (
                            <div key={section.id} id={section.id} className="space-y-4 p-6 bg-gray-50 rounded-lg shadow-sm">
                                <h4 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                                    {section.icon} {section.title}
                                </h4>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {(Array.isArray(section.content) ? section.content : [section.content]).map((item, index) => (
                                        <div key={index} className="p-4 bg-white shadow-sm rounded-lg transition-transform transform hover:scale-105">
                                            <p className="text-gray-600">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Contact Section */}
                        <div id="contact" className="space-y-4 p-6 bg-gray-50 rounded-lg shadow-sm">
                            <h4 className="text-2xl font-semibold text-gray-800">Contact</h4>
                            <div className="flex items-center gap-2 text-gray-700">
                                <Mail className="text-purple-600 w-6 h-6" />
                                <span>{hackathon.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <Phone className="text-green-600 w-6 h-6" />
                                <span>{hackathon.phone}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Hackathon;
