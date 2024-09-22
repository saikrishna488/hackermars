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
    Handshake,
    SwatchBook,
    UserCheck,
    Timer,
    Flag,
    PenTool,
    Info,
    BookOpen,
    IndianRupee,
    Users as UserGroup,
} from "lucide-react";

const Hackathon = ({ id }) => {
    const [timeLeft, setTimeLeft] = useState(null);
    const [hackathon, setHackathon] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false)

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
        const countDown = setInterval(() => {
            const today = new Date();
            const hday = new Date(hackathon?.date);
            const distance = hday.getTime() - today.getTime();

            if (distance <= 0) {
                clearInterval(countDown);
                setTimeLeft("0d 0h 0m 0s");
                setIsCompleted(true);
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
        }, 1000);

        return () => clearInterval(countDown);
    }, [hackathon?.date]);

    const View = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };




    //time and date

    const formattedDate = hackathon ? new Date(hackathon.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }) : '';

    const formattedStartTime = new Date(hackathon?.start_time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    const formattedEndTime = new Date(hackathon?.end_time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });







    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

    const formatContent = (content) => {
        if (typeof content !== 'string') return '';
        let formattedContent = content.replace(/\r\n/g, '<br />');
        formattedContent = formattedContent.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formattedContent = formattedContent.replace(/\*(.*?)\*/g, '<em>$1</em>');
        return formattedContent;
    };

    return (
        <>
            {hackathon && (
                <div className="w-full h-full flex lg:pt-20 pt-28 relative justify-center">
                    <div className="w-full max-w-4xl mx-auto h-full relative p-4 overflow-y-auto bg-gray-100 shadow-lg rounded-lg space-y-8">
                        {/* Poster */}
                        <div className="w-full lg:h-[300px] h-[200px] rounded-lg overflow-hidden border border-gray-300 shadow-md mb-8 transition-transform transform hover:scale-105">
                            <img
                                src={process.env.NEXT_PUBLIC_BACKEND_URL + '/' + hackathon.image_url}
                                alt="Hackathon Poster"
                                className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-90"
                            />
                        </div>

                        {/* Hackathon Details */}
                        <div className="w-full p-4 h-auto space-y-4 bg-white shadow-sm rounded-lg">
                            <h4 className="text-3xl font-bold text-gray-800">{hackathon.title}</h4>
                            <div className="flex flex-col sm:flex-row gap-4 text-gray-700">
                                <div className="flex items-center gap-2">
                                    <Monitor className="text-blue-600 w-6 h-6" />
                                    <span className="text-lg">{hackathon.mode}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="text-green-600 w-6 h-6" />
                                    <span className="lg:text-lg text-sm">Team size: {hackathon.team_size}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <Calendar className="text-red-500 w-6 h-6" />
                                <span className="lg:text-lg text-sm">Event Date: {formattedDate}</span>
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
                                    className={`bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-transform transform hover:scale-105 shadow-sm flex items-center ${isCompleted ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={isCompleted}
                                >
                                    {isCompleted ? "Completed" : <><CheckCircle className="mr-2 w-5 h-5" /> Register</>}
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
                            <span onClick={() => View("description")} className="cursor-pointer hover:text-blue-500 transition-transform transform hover:scale-105">Description</span>
                            <span onClick={() => View("about")} className="cursor-pointer hover:text-blue-500 transition-transform transform hover:scale-105">About</span>
                            <span onClick={() => View("prizes")} className="cursor-pointer hover:text-blue-500 transition-transform transform hover:scale-105">Prizes</span>
                            <span onClick={() => View("contact")} className="cursor-pointer hover:text-blue-500 transition-transform transform hover:scale-105">Contact</span>
                        </div>

                        {/* Description Section */}
                        <div id="description" className="space-y-4 p-6 bg-gray-50 rounded-lg shadow-sm">
                            <h4 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                                <PenTool className="text-gray-600 w-6 h-6" /> Description
                            </h4>
                            <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: formatContent(hackathon.description) }} />
                        </div>

                        {/* About Section */}
                        <div id="about" className="space-y-4 p-6 bg-gray-50 rounded-lg shadow-sm">
                            <h4 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                                <Info className="text-gray-600 w-6 h-6" /> About
                            </h4>
                            <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: formatContent(hackathon.about) }} />
                        </div>

                        {/* Prizes Section */}
                        <div id="prizes" className="space-y-4 p-6 bg-gray-50 rounded-lg shadow-sm">
                            <h4 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                                <Trophy className="text-gray-600 w-6 h-6" /> Prizes
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {hackathon.prizes.map((prize, index) => (
                                    <div key={index} className="flex items-center bg-white shadow-sm rounded-lg p-4">
                                        <Trophy className="text-yellow-500 w-6 h-6 mr-2" />
                                        <span className="text-gray-600">{prize}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Organizers */}
                        <div id="organizers" className="space-y-4 p-6 bg-gray-50 rounded-lg shadow-sm">
                            <h4 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                                <UserGroup className="text-gray-600 w-6 h-6" /> Organizers
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {hackathon.organizers.map((organizer, index) => (
                                    <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-md">
                                        <UserGroup className="text-blue-600 w-6 h-6 mr-2" />
                                        <span className="text-gray-800">{organizer}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Partners */}
                        <div id="partners" className="space-y-4 p-6 bg-gray-50 rounded-lg shadow-sm">
                            <h4 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                                <Handshake className="text-red-500 w-6 h-6" /> Partners
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {hackathon.partners.map((partner, index) => (
                                    <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-md">
                                        <Flag className="text-green-600 w-6 h-6 mr-2" />
                                        <span className="text-gray-800">{partner}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Themes */}
                        <div id="themes" className="space-y-4 p-6 bg-gray-50 rounded-lg shadow-sm">
                            <h4 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                                <SwatchBook className="text-gray-600 w-6 h-6" /> Themes
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {hackathon.themes.map((theme, index) => (
                                    <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-md">
                                        <BookOpen className="text-yellow-500 w-6 h-6 mr-2" />
                                        <span className="text-gray-800">{theme}</span>
                                    </div>
                                ))}
                            </div>
                        </div>




                        {/* Contact Section */}
                        <div id="contact" className="space-y-4 p-6 bg-gray-50 rounded-lg shadow-sm">
                            <h4 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                                <Users className="text-gray-600 w-6 h-6" /> Contact
                            </h4>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <div className="flex items-center gap-2">
                                    <Mail className="text-gray-600 w-5 h-5" />
                                    <span className="text-gray-600">{hackathon.email}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <Phone className="text-gray-600 w-5 h-5" />
                                    <span className="text-gray-600">{hackathon.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Hackathon;
