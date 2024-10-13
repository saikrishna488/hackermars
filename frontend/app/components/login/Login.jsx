"use client";

import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { FaGoogle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { globalContext } from '@/context_api/globalContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const {setUser} = useContext(globalContext);
    const router = useRouter();

    useEffect(() => {
        const initializeGoogleSignIn = () => {
            window.google.accounts.id.initialize({
                client_id: '726105873846-7rr65gueb94pmgoj2invg1gb4iuvdpft.apps.googleusercontent.com', // Replace with your client ID
                callback: handleLoginSuccess,      // Callback function on success
            });
        };

        if (window.google && window.google.accounts) {
            initializeGoogleSignIn();
        } else {
            // Load Google Identity Services API
            const script = document.createElement('script');
            script.src = "https://accounts.google.com/gsi/client";
            script.async = true;
            script.onload = initializeGoogleSignIn;
            document.head.appendChild(script);
        }
    }, []);

    const handleLogin = async (e)=>{

        e.preventDefault();
        const formData  = new FormData(e.target)

        const userData = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        if (!userData.email || !userData.password) {
            toast.error("All fields are required.");
            return;
        }
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log(res.data)

            if (res.data.res) {
                toast.success("Login successful!");
                setUser(res.data.user)
                setCookie("token", res.data.token, 30)
                router.push('/'); // Redirect to login after successful registration
            } else {
                toast.error(res.data.msg);
            }
        } catch (error) {
            toast.error("Login failed. Please try again.");
        }

    }



    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Convert days to milliseconds
            expires = `; expires=${date.toUTCString()}`;
        }
        document.cookie = `${name}=${value || ""}${expires}; path=/; secure; samesite=strict`;
    }





    const handleLoginSuccess = async (response) => {

        try{
            const idToken = response.credential;


        const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL+'/user/google',{
            token : idToken
        })
        
        const data = res.data;

        if(data.res){
            toast.successt("Sign in successfull");
            setUser(data.user)
            router.push('/')
            toast.success("Welcome "+data.user.name)

            setCookie("token",idToken,30)
            
        }
        else{
            toast.error("Failed Try Another method");
        }

        }
        catch(err){
            toast("Failed Try Another method")
        }
        
    };

    const handleGoogleSignIn = () => {
        window.google.accounts.id.prompt(); // Triggers the Google Sign-In popup
    };

    return (
        <div className="flex items-center justify-center min-h-screen pt-20">
            <div className="bg-white rounded-xl shadow-xl p-8 max-w-lg w-full">
                <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Login</h2>
                <form onSubmit={handleLogin}>
                    {/* Username/Email Field */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                            Username or Email
                        </label>
                        <div className="relative">
                            <AiOutlineMail className="absolute left-3 top-3 text-xl text-gray-400" />
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Enter your username or email"
                                className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <AiOutlineLock className="absolute left-3 top-3 text-xl text-gray-400" />
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>
                    </div>

                    {/* Show Password Checkbox */}
                    <div className="flex items-center mb-6">
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-indigo-600"
                            onChange={() => setPasswordVisible(!passwordVisible)}
                        />
                        <span className="ml-2 text-gray-700">Show Password</span>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 mb-4"
                    >
                        Login
                    </button>

                    {/* Custom Google Sign-In Button */}
                    <div className="flex justify-center">
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="flex items-center justify-center w-full bg-white text-gray-700 border border-gray-300 font-semibold py-3 px-4 rounded-lg hover:bg-gray-100 transition duration-300"
                        >
                            <FaGoogle className="mr-3 text-2xl text-red-600" /> {/* Red color for Google icon */}
                            <span>Sign in with Google</span>
                        </button>
                    </div>

                    {/* Register Link */}
                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            New here?{" "}
                            <Link href="/register" className="text-indigo-600 font-semibold hover:underline">
                                Register
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
