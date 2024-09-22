"use client";

import React, { useContext, useEffect, useState } from 'react';
import { Camera, Mail, Phone, User, Lock } from 'lucide-react'; // Lucide Icons
import Navbar from '@/app/components/navbar/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify'; // Assuming you're using toast for notifications
import { useRouter } from 'next/navigation';
import { globalContext } from '@/context_api/globalContext';

const Register = () => {
    const [selectedPlan, setSelectedPlan] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const router = useRouter();
    const {client} = useContext(globalContext)

    // Handle image selection and preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setProfileImage(imageURL);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent default form submission
        const formData = new FormData(e.target);
        const imageFile = formData.get('image');

        const userData = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            phone: formData.get('phone'),
        };
        formData.append("plan",selectedPlan)

        // Validate user data
        if (!userData.name || !userData.email || !userData.password) {
            toast.error("All fields are required.");
            return;
        }

        if (userData.name.length < 6) {
            toast.error("Name must be at least 6 characters long.");
            return;
        }

        if (userData.password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            return;
        }

        if (userData.phone.length < 10) {
            toast.error("Phone number must be 10 digits long");
            return;
        }

        // Validate image file
        if (imageFile) {
            if (!['image/jpeg', 'image/png', 'image/jpg'].includes(imageFile.type)) {
                toast.error("Only .jpg, .png, or .jpeg files are allowed.");
                return;
            }
        }

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/client/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data.res) {
                toast("Registration successful!");
                setOtpSent(true)
            } else {
                toast.error(res.data.msg);
            }
        } catch (error) {
            toast.error("Registration failed. Please try again.");
        }
    };



    const handleOtp = async ()=>{
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/client/otp`, {
                otp
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (res.data.res) {
                toast("Registration successful!");
                router.push('/host/login');
            } else {
                toast.error(res.data.msg);
            }
        } catch (error) {
            toast.error("Registration failed. Please try again.");
        }
    }

    useEffect(()=>{
        if (client?.name) {
            router.push('/host');
        }
    })

    return (
        <>
            <Navbar />
            <div className="min-h-screen pt-20 bg-gradient-to-b from-blue-50 to-white flex justify-center items-center">
                {otpSent ? (
                    <div className="flex items-center space-x-2 bg-gray-100 rounded-xl px-4 py-3">
                        <Mail className="text-gray-400" />
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            
                            className="w-full bg-transparent focus:outline-none text-gray-900 placeholder-gray-500"
                        />
                        <button onClick={()=>handleOtp()} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-6 rounded-full font-semibold shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300">
                            Verify
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleRegister} className="bg-white shadow-2xl rounded-3xl w-full max-w-2xl p-10 space-y-8">
                        {/* Top Bar with Login Button */}
                        <div className="flex justify-between items-center">
                            <h1 className="text-4xl font-semibold text-gray-900">Register</h1>
                            <button onClick={()=>router.push('/host/login')}  className="text-blue-500 text-lg hover:underline">
                                Already a client? Log in
                            </button>
                        </div>

                        {/* Profile Image Upload */}
                        <div className="flex justify-center">
                            <div className="relative">
                                {profileImage ? (
                                    <img
                                        src={profileImage}
                                        alt="Profile"
                                        className="w-28 h-28 rounded-full object-cover shadow-lg transition-all duration-300 hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-28 h-28 rounded-full bg-gray-200 flex justify-center items-center shadow-lg">
                                        <User className="text-gray-400 w-12 h-12" />
                                    </div>
                                )}
                                <label
                                    className="absolute bottom-1 right-1 bg-blue-500 p-2 rounded-full cursor-pointer shadow-md hover:bg-blue-400 transition-all duration-200"
                                    htmlFor="profile-image"
                                >
                                    <Camera className="text-white w-5 h-5" />
                                </label>
                                <input
                                    type="file"
                                    id="profile-image"
                                    name="image"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-5">
                            {[
                                { icon: <User className="text-gray-400" />, placeholder: 'Enter your name', type: 'text', name: 'name' },
                                { icon: <Mail className="text-gray-400" />, placeholder: 'Enter your email', type: 'email', name: 'email' },
                                { icon: <Lock className="text-gray-400" />, placeholder: 'Enter your password', type: 'password', name: 'password' },
                                { icon: <Phone className="text-gray-400" />, placeholder: 'Enter your phone number', type: 'tel', name: 'phone' },
                            ].map(({ icon, placeholder, type, name }, idx) => (
                                <div key={idx} className="flex items-center space-x-2 bg-gray-100 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow">
                                    {icon}
                                    <input
                                        type={type}
                                        placeholder={placeholder}
                                        name={name}
                                        className="w-full bg-transparent focus:outline-none text-gray-900 placeholder-gray-500"
                                        required
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Plan Selection */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-medium text-gray-800">Choose Your Plan</h2>
                            {['Single Event', 'Monthly Subscription'].map((plan, idx) => (
                                <div
                                    key={idx}
                                    className={`p-5 rounded-xl shadow-lg cursor-pointer transition-all duration-300 border-2 ${selectedPlan === plan ? 'border-blue-500 bg-blue-50' : 'border-transparent bg-gray-100 hover:bg-gray-200'
                                        }`}
                                    onClick={() => setSelectedPlan(plan)}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-gray-700">{plan}</span>
                                        <span className="font-semibold text-gray-900">{plan === 'Single Event' ? '₹1200' : '₹5000'}</span>
                                    </div>
                                    <p className="text-sm text-gray-500">{plan === 'Single Event' ? '1 allowed event' : '5 allowed events per month'}</p>
                                </div>
                            ))}
                        </div>

                        {/* Payment Gateway Integration Placeholder */}
                        <div className="py-6">
                            <p className="text-center text-gray-400 italic">
                                Payment gateway integration coming soon...
                            </p>
                        </div>

                        {/* Register Button */}
                        <div className="text-center">
                            <button
                                type="submit"
                                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-8 rounded-full font-semibold shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </>
    );
};

export default Register;
