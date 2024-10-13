"use client";

import React, { useState } from "react";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock, AiOutlinePicture } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp,setOtp] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const userData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

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

    if (imageFile && !["image/jpeg", "image/png", "image/jpg"].includes(imageFile.type)) {
      toast.error("Only .jpg, .png, or .jpeg files are allowed.");
      return;
    }

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.res) {
        setOtpSent(true);
        toast.success("otp sent")
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };


  const handleOtp = async (e) => {
    try {
        e.preventDefault()
        // Check if email and otp are provided
        if (!email || !otp) {
            toast.error("Please enter both email and OTP.");
            return;
        }

        // Send request to backend
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/otp`, {
            email,
            otp
        });

        // Handle the response
        if (res.data.res) {
            router.push('/login');
            toast.success("OTP verified successfully. Please login.");
        } else {
            toast.error(res.data.msg || "OTP verification failed.");
        }
    } catch (err) {
        toast.error(err.response?.data?.msg || "An error occurred during OTP verification.");
    }
};


  return (
    <div className="flex items-center justify-center min-h-screen pt-20 ">
      {otpSent ? (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h4 className="text-2xl font-bold mb-4 text-center text-gray-800">Verify OTP</h4>
          <form onSubmit={handleOtp}>
            <input value={otp} onChange={(e)=>setOtp(e.target.value)} type="text" placeholder="Enter OTP" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4" />
            <button className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300">
              Confirm
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
          <h2 className="text-4xl font-extrabold text-center mb-6 text-gray-800">Register</h2>
          <form onSubmit={handleRegister}>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Name</label>
              <div className="relative">
                <AiOutlineUser className="absolute left-3 top-3 text-xl text-gray-400" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
              <div className="relative">
                <AiOutlineMail className="absolute left-3 top-3 text-xl text-gray-400" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="image">Upload Profile Image</label>
              <label className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition duration-300">
                <AiOutlinePicture className="text-3xl mr-2" />
                <span className="font-semibold">Choose an image or drag it here</span>
                <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
              {imageFile && <p className="mt-2 text-center text-gray-500">Selected file: {imageFile.name}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Password</label>
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

            <div className="flex items-center mb-6">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" onChange={() => setPasswordVisible(!passwordVisible)} />
              <span className="ml-2 text-gray-700">Show Password</span>
            </div>

            <button className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 mb-4">
              Register
            </button>

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-indigo-600 font-semibold hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;
