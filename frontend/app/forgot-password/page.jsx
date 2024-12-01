"use client";
import React, { useState } from 'react';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/navigation';

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

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/send-otp`, { email });
      if (res.data.res) {
        toast.success("OTP sent to your email!");
        setStep(2);
      } else {
        toast.error(res.data.msg || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/verify-otp`, { email, otp, newPassword });
      if (res.data.res) {
        toast.success("Password reset successfully!");
        router.push('/login');
      } else {
        toast.error(res.data.msg || "Failed to reset password");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Forgot Password</h2>
          <p className="text-gray-500 mt-2">
            {step === 1 ? "Enter your email to receive an OTP" : "Enter the OTP and your new password"}
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-gray-200/50 relative">
          {loading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-2xl z-50">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <InputField
                icon={AiOutlineMail}
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-blue-700 
                  text-white text-sm font-semibold rounded-xl hover:from-blue-700 
                  hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 
                  focus:ring-offset-2 transition-all duration-200 shadow-lg shadow-blue-500/20"
              >
                Send OTP
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <InputField
                icon={AiOutlineMail}
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <InputField
                icon={AiOutlineLock}
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-blue-700 
                  text-white text-sm font-semibold rounded-xl hover:from-blue-700 
                  hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 
                  focus:ring-offset-2 transition-all duration-200 shadow-lg shadow-blue-500/20"
              >
                Reset Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;