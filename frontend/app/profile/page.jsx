"use client";
import React, { useContext, useState, useRef, useEffect } from 'react';
import { User, Mail, Lock, Bell, Calendar, Layout, Camera, Edit2 } from 'lucide-react';
import { globalContext } from '@/context_api/globalContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { set } from 'react-hook-form';






//main component

const Profile = () => {
    const { user, setUser } = useContext(globalContext);
    const router = useRouter();
    const fileRef = useRef();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email : user?.email || '',
        oldpassword: '',
        newpassword: '',
        image: null,
        userId : user?._id || ''
    });



    //use effect
    useEffect(() => {

        setFormData({
            name: user?.name || '',
            email: user?.email || '',
            oldpassword: '',
            newpassword: '',
            image: null,
            userId : user?._id
        })
        
    }, [user])




    //essential 1
    const handleImageChange = async (e) => {
        const file = e.target.files[0];


        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
            const form = new FormData();
            form.append('image',file);
            form.append('userId', user._id)

            console.log(form.get('image'));


            try {
                const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/user/upload-profile', form, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });

                // console.log(res);
                if (res.data.res) {
                    toast.success(res.data.msg);
                    setUser(res.data.user);
                }
                else {
                    toast.error(res.data.msg);
                }
            } catch (error) {
                console.log(error);
                toast.error('Failed to upload profile image');
            }
        }
    };


    //essential 2

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL+'/user/update-profile', formData);

            if(res.data.res){
                toast.success(res.data.msg);
                setUser({...user,name:formData.name})
                setIsEditing(false);
            }
            else{
                toast.error(res.data.msg);
            }
            
        } catch (error) {
            toast.error('Failed to update profile');
        }
    };


    // check if user is logged in
    if(!user?.name){
        
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h1 className="text-2xl font-semibold text-gray-900">You are not logged in</h1>
                    <p className="mt-2 text-sm text-gray-500">Please login to view your profile</p>
                    <button
                        onClick={() => router.push('/login')}
                        className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-16 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Profile Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="relative h-32 bg-gradient-to-r from-blue-500 to-indigo-600">
                        <div className="absolute -bottom-12 left-8">
                            <div className="relative">
                                <img
                                    src={user?.login_type == "google" ? user?.profile_url : user?.profile_url ? process.env.NEXT_PUBLIC_BACKEND_URL + "/" + user.profile_url : "https://banner2.cleanpng.com/20180622/tqt/aazen4lhc.webp"}
                                    alt={user?.name}
                                    className="w-24 h-24 rounded-full border-4 border-white object-cover"
                                />
                                <button
                                    onClick={() => fileRef.current.click()}
                                    className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-sm border border-gray-200 hover:border-gray-300 transition-colors"
                                >
                                    <Camera className="w-4 h-4 text-gray-600" />
                                </button>
                                <input
                                    type="file"
                                    ref={fileRef}
                                    onChange={handleImageChange}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-16 pb-6 px-8">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-semibold text-gray-900">{user?.name}</h1>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                            >
                                <Edit2 className="w-4 h-4" />
                                {isEditing ? 'Cancel' : 'Edit Profile'}
                            </button>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{user?.email}</p>
                    </div>
                </div>

                {/* Profile Form */}
                <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    disabled={!isEditing}
                                    className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    value={user?.email}
                                    disabled
                                    className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                                />
                            </div>
                        </div>

                        {/* Password Fields - Only shown when editing */}
                        {isEditing && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Current Password</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            value={formData.oldpassword}
                                            onChange={(e) => setFormData(prev => ({ ...prev, oldpassword: e.target.value }))}
                                            className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            value={formData.newpassword}
                                            onChange={(e) => setFormData(prev => ({ ...prev, newpassword: e.target.value }))}
                                            className="block w-full pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Action Buttons */}
                        {isEditing && (
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Save Changes
                                </button>
                            </div>
                        )}
                    </form>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                        onClick={() => router.push('/notifications')}
                        className="flex items-center justify-center gap-2 p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                        <Bell className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium text-gray-700">Notifications</span>
                    </button>

                    <button
                        onClick={() => router.push('/registered-events')}
                        className="flex items-center justify-center gap-2 p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                        <Calendar className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium text-gray-700">Registered Events</span>
                    </button>

                    <button
                        onClick={() => router.push('/dashboard')}
                        className="flex items-center justify-center gap-2 p-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                        <Layout className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium text-gray-700">Dashboard</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;