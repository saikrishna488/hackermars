"use client";

import React, { useContext, useEffect, useState } from 'react';
import { CreditCard, PlusCircle, Edit, User, LogOut, Trash, Menu, X } from 'lucide-react';
import { globalContext } from '@/context_api/globalContext';
import { useRouter } from 'next/navigation';
import ClientRender from '@/app/host/login/ClientRender';
import axios from 'axios';
import { toast } from 'react-toastify';

const Host = () => {
    const { client, setClient, setHackathon } = useContext(globalContext);
    const [hackathons, setHackathons] = useState([]);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false); // State for sidebar visibility

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        const fetchHackathons = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/hackathon/showspecific?client_id=` + client._id);
                if (res.data.res) {
                    setHackathons(res.data.hackathons);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchHackathons();
    }, [setHackathons]);

    ClientRender();

   useEffect(()=>{
    if (!client.name) {
        router.push('/host/register');
    }
   },[])

    const getEventStatus = (eventDate) => {
        const today = new Date();
        const eventDay = new Date(eventDate);
        if (eventDay < today) return "Ended";
        if (eventDay.toDateString() === today.toDateString()) return "Live";
        return "Upcoming";
    };

    const handleEdit = (h) => {
        setHackathon(h);
        router.push('/host/newhackathon')
    };

    const handleDelete = async (eventId) => {
        const updatedEvents = hackathons.filter(event => event._id !== eventId);
        setHackathons(updatedEvents);

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/hackathon/delete`, {
                id: eventId
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (res.data.res) {
                toast.success("Deleted successfully");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setClient({});
        router.push('/');
        document.cookie = "clientToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    };

    return (
        <div className="h-[100vh] bg-gradient-to-b from-gray-50 to-white flex flex-col lg:flex-row">
            {/* Mobile Navbar */}
            <div className="lg:hidden flex items-center justify-between bg-white shadow-md p-4 w-full">
                <h1 className="text-xl font-bold">Client Panel</h1>
                <div className="flex items-center">
                    <Menu
                        className="text-gray-800 mr-4 cursor-pointer"
                        onClick={() => setSidebarVisible(!sidebarVisible)}
                    />
                    {client.profile_url ? (
                        <img
                            src={process.env.NEXT_PUBLIC_BACKEND_URL + "/" + client.profile_url}
                            alt="Profile"
                            className="w-8 h-8 rounded-full border border-gray-300 object-cover cursor-pointer"
                            onClick={() => setSidebarVisible(!sidebarVisible)}
                        />
                    ) : (
                        <User
                            className="text-gray-800 w-8 h-8 cursor-pointer"
                            onClick={() => setSidebarVisible(!sidebarVisible)}
                        />
                    )}
                </div>
            </div>

            {/* Sidebar */}
            <div className={`fixed lg:static top-0 left-0 z-50 bg-white shadow-lg w-[350px] p-5 h-full transform lg:transform-none transition-transform ${sidebarVisible ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
            <X
                        className="lg:hidden text-gray-800 mr-4 float-right cursor-pointer"
                        onClick={() => setSidebarVisible(!sidebarVisible)}
                    />
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile</h2>
                <div className="flex items-center mb-4 relative">
                    {client.profile_url ? (
                        <img
                            src={process.env.NEXT_PUBLIC_BACKEND_URL + "/" + client.profile_url}
                            alt="Profile"
                            className="w-12 h-12 rounded-full border border-gray-300 object-cover"
                        />
                    ) : (
                        <div className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-full">
                            <User className="text-gray-400" size={32} />
                        </div>
                    )}
                    <div className="ml-4 w-full flex flex-col">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{client.name}</h3>
                        <p className="text-gray-600 truncate">{client.email}</p>
                        <p className="text-gray-600 truncate">Phone: {client.phone}</p>
                    </div>
                </div>

                <div className="flex items-center mt-4">
                    <CreditCard className="text-gray-500" />
                    <span className="ml-2 text-gray-800">Credits: {client.credits}</span>
                </div>
                <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
                    Renewal Credits
                </button>

                {/* Logout Button */}
                <button
                    onClick={() => logout()}
                    className="mt-4 bg-red-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-red-700 transition duration-300 flex items-center"
                >
                    <LogOut className="mr-2" />
                    Logout
                </button>

                {/* Back to Home Button */}
                <button
                    onClick={() => router.push('/')}
                    className="mt-4 bg-green-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-green-700 transition duration-300 flex items-center"
                >
                    <span className="mr-2">🏠</span>
                    Back to Home
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-5 lg:p-10">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Host a New Hackathon</h1>
                <button
                    onClick={() => router.push('/host/newhackathon')}
                    className="flex items-center bg-blue-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 mb-4"
                >
                    <PlusCircle className="mr-2" />
                    Conduct New Hackathon
                </button>

                <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-4">Previously Conducted Hackathons</h2>
                <div className="space-y-4">
                    {hackathons.length > 0 ? hackathons.map((event,i) => (
                        <div
                            key={i}
                            className="bg-white shadow-md rounded-lg p-4 flex flex-col lg:flex-row justify-between items-start lg:items-center"
                        >
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
                                <p className="text-gray-600">Date: {formatDate(event.date)}</p>
                                <p className="text-gray-600">Registered Users: {event.registered_users.length}</p>
                            </div>
                            <div className="flex items-center mt-2 lg:mt-0">
                                <span className={`px-3 py-1 rounded-full text-white ${getEventStatus(event.date) === 'Live' ? 'bg-green-500' : getEventStatus(event.date) === 'Ended' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                                    {getEventStatus(event.date)}
                                </span>
                                <button onClick={() => handleEdit(event)} className="ml-4 text-blue-500 hover:underline">
                                    <Edit className="inline mr-1" /> Edit
                                </button>
                                <button onClick={() => handleDelete(event._id)} className="ml-4 text-red-500 hover:underline">
                                    <Trash className="inline mr-1" /> Delete
                                </button>
                            </div>
                        </div>
                    )) : (
                        <div className='flex w-full justify-center'>
                            <h5>No hackathons Hosted</h5>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Host;
