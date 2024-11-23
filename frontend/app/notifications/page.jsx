"use client"
import { globalContext } from '@/context_api/globalContext'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'
import { FaCheckCircle } from 'react-icons/fa'; // Icon for mark as read
import { toast } from 'react-toastify';

const NotificationsPage = () => {
    const { user, setUser } = useContext(globalContext);
    const router = useRouter();

    // If no user or name, redirect to login page
    if (!user?.name) {
        return (
            <div className='flex justify-center items-center w-full h-full'>
                <h3 className="text-lg text-gray-700">Hold on loading...</h3>
            </div>
        );
    }

    // Function to handle "mark as read" functionality
    const markAsRead = async (id) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/markasread`, {
                id,
                userId: user._id
            }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (res.data.res) {
                setUser(res.data.user);
                toast.success(res.data.msg);
            } else {
                toast.error(res.data.msg);
            }
        } catch (err) {
            console.log(err);
        }
    }

    // Sort notifications in descending order based on the date (latest first)
    const sortedNotifications = user.notifications?.sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="max-w-2xl mx-auto pt-24 mb-20">
            <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">Notifications</h1>
            <div className="space-y-4">
                {sortedNotifications?.length === 0 ? (
                    <p className="text-center text-gray-500">No notifications available</p>
                ) : (
                    sortedNotifications.map((notification, index) => (
                        <div key={index} className={`bg-white p-4 rounded-lg shadow transition-shadow duration-300 border-l-4 ${notification.isRead ? 'border-transparent' : 'border-red-500'}`}>
                            <div className="flex justify-between items-start">
                                <p className={`text-sm ${notification.isRead ? 'text-gray-800' : 'text-blue-600 font-semibold'}`}>{notification.message}</p>
                                <FaCheckCircle
                                    onClick={() => markAsRead(notification._id)}
                                    className={`text-gray-500 hover:text-green-500 cursor-pointer ${notification.isRead ? 'hidden' : ''}`}
                                    size={20}
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                {new Date(notification.date).toLocaleString("en", {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true
                                })}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default NotificationsPage;