"use client";
import React, { useState } from "react";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { Upload, Code, Eye, EyeOff } from 'lucide-react';
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const InputField = ({ icon: Icon, label, type, name, value, onChange, placeholder }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
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
  </div>
);

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

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
      setLoading(true);
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
    setLoading(false);
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };


  const handleOtp = async (e) => {
    try {
      e.preventDefault()
      setLoading(true);
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
      setLoading(false);
    } catch (err) {
      toast.error(err.response?.data?.msg || "An error occurred during OTP verification.");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4 py-12 pt-20">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-blue-700 
            rounded-xl mx-auto mb-4 flex items-center justify-center shadow-xl shadow-blue-500/20">
            <Code className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {otpSent ? "Verify Your Email" : "Create an Account"}
          </h2>
          <p className="text-gray-500 mt-2">
            {otpSent ? "Please enter the OTP sent to your email" : "Fill in your details to get started"}
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 relative"> {/* Added relative positioning */}
          {loading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-2xl z-50"> {/* Added z-50 */}
              <div className="space-y-3">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm text-gray-500 animate-pulse text-center">
                  {otpSent ? "Verifying OTP..." : "Creating your account..."}
                </p>
              </div>
            </div>
          )}

          {otpSent ? (
            <form onSubmit={handleOtp} className="space-y-6">
              <InputField
                icon={AiOutlineMail}
                label="OTP Code"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
              />
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-blue-700 
                text-white text-sm font-semibold rounded-xl hover:from-blue-700 
                hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:ring-offset-2 transition-all duration-200 shadow-lg shadow-blue-500/20"
              >
                Verify OTP
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-6">
              <InputField
                icon={AiOutlineUser}
                label="Full Name"
                type="text"
                name="name"
                placeholder="Enter your full name"
              />

              <InputField
                icon={AiOutlineMail}
                label="Email Address"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                <div className="relative">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="hidden"
                  />
                  <label
                    htmlFor="image"
                    className="flex items-center justify-center gap-3 px-4 py-3.5 bg-gray-50 
                    border-2 border-dashed border-gray-200 rounded-xl cursor-pointer
                    hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {imageFile ? imageFile.name : "Upload profile picture"}
                    </span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    className="w-full px-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl
                    focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                    focus:border-blue-500 transition-all duration-200 text-gray-600 
                    text-sm placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 
                    hover:text-gray-600"
                  >
                    {passwordVisible ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
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
                Create Account
              </button>
            </form>
          )}

          <p className="mt-8 text-center text-sm text-gray-500">
            {otpSent ? (
              "Didn't receive the code? Check your spam folder"
            ) : (
              <>
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Sign in
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
