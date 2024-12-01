"use client";
import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineMail, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FaGoogle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { globalContext } from '@/context_api/globalContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Code } from 'lucide-react';

const InputField = ({ icon: Icon, type, placeholder, name, value, onChange }) => (
    <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl
        focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
        transition-all duration-200 text-gray-600 text-sm placeholder:text-gray-400"
        />
    </div>
);


//set cookie function
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Convert days to milliseconds
        expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ""}${expires}; path=/; secure; samesite=strict`;
}

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { setUser } = useContext(globalContext);
    const router = useRouter();

    useEffect(() => {
        const initializeGoogleSignIn = () => {
            window.google.accounts.id.initialize({
                client_id: "584904539504-dptdc09i4cbjl4dglgdnli5nh79t55rl.apps.googleusercontent.com",
                callback: handleLoginSuccess,
            });
        };

        if (window.google?.accounts) {
            initializeGoogleSignIn();
        } else {
            const script = document.createElement('script');
            script.src = "https://accounts.google.com/gsi/client";
            script.async = true;
            script.onload = initializeGoogleSignIn;
            document.head.appendChild(script);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            toast.error("All fields are required");
            return;
        }

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`,
                formData,
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (res.data.res) {
                toast.success("Welcome back!");
                setUser(res.data.user);
                setCookie("token", res.data.token, 30);
                router.push('/');
            } else {
                toast.error(res.data.msg);
            }
        } catch (error) {
            toast.error("Login failed. Please try again.");
        }
    };

    const handleLoginSuccess = async (response) => {

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/google`,
                { token: response.credential }
            );

            if (res.data.res) {
                toast.success("Welcome back!");
                setUser(res.data.user);
                setCookie("google_token", response.credential, 30);
                router.push('/');
            } else {
                toast.error("Authentication failed. Please try another method.");
            }
        } catch (err) {
            toast.error("Authentication failed. Please try again.");
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4 py-12 pt-20">
            <div className="w-full max-w-md">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-blue-700 
    rounded-xl mx-auto mb-4 flex items-center justify-center shadow-xl shadow-blue-500/20">
                        <Code className="w-6 h-6 text-white" /> {/* Replaced H with Code icon */}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
                    <p className="text-gray-500 mt-2">Please enter your details</p>
                </div>

                {/* Login Form */}
                <div className="bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <InputField
                                icon={AiOutlineMail}
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-700">Password</label>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <InputField
                                    icon={AiOutlineLock}
                                    type={passwordVisible ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {passwordVisible ? (
                                        <AiOutlineEyeInvisible className="text-xl" />
                                    ) : (
                                        <AiOutlineEye className="text-xl" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-blue-700 
                text-white text-sm font-semibold rounded-xl hover:from-blue-700 
                hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:ring-offset-2 transition-all duration-200 shadow-lg shadow-blue-500/20"
                        >
                            Sign in
                        </button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">or continue with</span>
                        </div>
                    </div>

                    <button
                        onClick={() => window.google.accounts.id.prompt()}
                        className="w-full py-3.5 px-4 bg-white border border-gray-200 rounded-xl
              text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none 
              focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 transition-all 
              duration-200 flex items-center justify-center gap-3"
                    >
                        <FaGoogle className="text-lg text-red-500" />
                        Sign in with Google
                    </button>

                    <p className="mt-8 text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <Link
                            href="/register"
                            className="font-semibold text-blue-600 hover:text-blue-700"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;