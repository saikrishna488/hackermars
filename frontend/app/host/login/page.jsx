"use client";

import React, { useContext, useState } from 'react';
import { Mail, Lock } from 'lucide-react'; // Lucide Icons
import Navbar from '@/app/components/navbar/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify'; // Ensure this package is installed
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { globalContext } from '@/context_api/globalContext';
import ClientRender from './ClientRender';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { setClient } = useContext(globalContext); // Fixed context variable naming



    ClientRender()

    const handleLogin = async (e) => {
        e.preventDefault();

        // Validate user data
        if (!email || !password) {
            toast.error("All fields are required.");
            return;
        }

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/client/login`, {
                email,
                password,
            });

            if (res.data.res) {
                toast.success("Login successful!");
                setClient(res.data.client); // Set client context
                setCookie("clientToken",res.data.token,30)
                router.push('/host');
            } else {
                toast.error(res.data.msg);
            }
        } catch (error) {
            toast.error("Login failed. Please try again.");
        }
    };



    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Convert days to milliseconds
            expires = `; expires=${date.toUTCString()}`;
        }
        document.cookie = `${name}=${value || ""}${expires}; path=/; secure; samesite=strict`;
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen pt-20 bg-gradient-to-b from-blue-50 to-white flex justify-center items-center">
                <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-10 space-y-8">
                    <h1 className="text-4xl font-semibold text-gray-900 text-center">Login</h1>

                    {/* Form Fields */}
                    <form className="space-y-5" onSubmit={handleLogin}>
                        <div className="flex items-center space-x-2 bg-gray-100 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
                            <Mail className="text-gray-400" />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent focus:outline-none text-gray-900 placeholder-gray-500"
                                required // Added required attribute
                            />
                        </div>
                        <div className="flex items-center space-x-2 bg-gray-100 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
                            <Lock className="text-gray-400" />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent focus:outline-none text-gray-900 placeholder-gray-500"
                                required // Added required attribute
                            />
                        </div>

                        {/* Login Button */}
                        <div className="text-center">
                            <button
                                type="submit" // Added type for form submission
                                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
                            >
                                Login
                            </button>
                        </div>
                    </form>

                    {/* Forgot Password Link */}
                    <div className="text-center">
                        <Link href="/forgot-password" className="text-blue-500 text-lg hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Register Link */}
                    <div className="text-center">
                        <p className="text-gray-500">Don't have an account? <Link href="/host/register" className="text-blue-500">Register</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
