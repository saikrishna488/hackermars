"use client"

import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { CheckSquare, FileText, User, Phone, Clipboard, Send, CheckCircleIcon, MailIcon, X, Shield } from 'lucide-react'
import { globalContext } from '@/context_api/globalContext'
import { toast } from 'react-toastify'
import { redirect, useRouter } from 'next/navigation'
import axios from 'axios'

const Host = () => {

    const [confirm, setConfirm] = useState(false)
    const { user, setUser } = useContext(globalContext);
    const [isChecked, setIsChecked] = useState(false)
    const router = useRouter()
    const [obj, setObj] = useState({
        organization: "",
        organization_id: "",
        reason: "",
        phone: "",
        email: user.email || ""
    })


    //redirect verified user
    useEffect(()=>{
        if (user?.request_status == "verified") {
            router.replace('/host/dashboard');
        }
    },[])

    const handleRequest = async (e) => {

        e.preventDefault();

        try {

            if(!isChecked){
                toast.error("Please agree to the terms and conditions")
                return
            }

            const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/user/appeal', obj, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (res.data.res) {
                setUser(res.data.user)
                toast.success(res.data.msg)
            }
            else {
                toast.error(res.data.msg)
            }

        }
        catch (err) {
            console.log(err)
            toast.success("Error Occured")
        }
    }




    //handle continue button in rejected view
    const handleContinue = ()=>{
        setConfirm(true)
    }

    // check if user is logged in
    if (!user?.name) {
        
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="text-center">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Please Login</h2>
                        <p className="text-sm text-gray-600 mb-6">
                            You need to login to continue with the verification process.
                        </p>
                        <Link href="/login">
                            <button className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Login
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (user?.request_status === "pending") {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircleIcon className="w-8 h-8 text-yellow-500" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Verification in Progress</h2>
                        <p className="text-sm text-gray-600 mb-6">
                            We're reviewing your application. This usually takes 24-48 hours.
                        </p>
                        <div className="space-y-3 text-xs text-gray-500 mb-6">
                            <div className="flex items-center justify-center gap-2">
                                <CheckCircleIcon className="w-4 h-4 text-blue-500" />
                                <span>Application submitted successfully</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <MailIcon className="w-4 h-4 text-green-500" />
                                <span>You'll receive an email once verified</span>
                            </div>
                        </div>
                        <button
                            onClick={() => router.push('/')}
                            className="text-sm px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                        >
                            Return to Homepage
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (user?.request_status === "rejected" && !confirm) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <X className="w-8 h-8 text-red-500" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Application Not Approved</h2>
                        <p className="text-sm text-gray-600 mb-6">
                            Unfortunately, we couldn't verify your information. Please ensure all details are accurate and try again.
                        </p>
                        <button
                            onClick={handleContinue}
                            className="text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Submit New Application
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (user?.request_status == "verified") {
        return null
    }

    if (user?.request_status == "verified" || user?.request_status == "pending") {
        return null
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 ">
            <div className="max-w-md mx-auto">
                {!confirm ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                <Shield className="w-5 h-5 text-blue-500" />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900">Host Verification</h2>
                        </div>
                        
                        <div className="space-y-4 mb-6">
                            <p className="text-sm text-gray-600">
                                To maintain quality and prevent misuse, we verify all hackathon organizers.
                            </p>
                            <div className="space-y-2">
                                {[
                                    "Submit your organization or student ID for verification",
                                    "Quick review process (usually within 48 hours)",
                                    "Host unlimited hackathons once verified",
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                        <CheckCircleIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <button
                            onClick={() => setConfirm(true)}
                            className="w-full text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Continue to Verification
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Verification Details</h2>
                        <form onSubmit={handleRequest} className="space-y-4">
                            {[
                                { icon: FileText, placeholder: "Organization Name", value: "organization" },
                                { icon: Clipboard, placeholder: "Organization/Student ID (optional)", value: "organization_id" },
                                { icon: Phone, placeholder: "Mobile Number", value: "phone", type: "tel" },
                            ].map((field) => (
                                <div key={field.value} className="relative">
                                    <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type={field.type || "text"}
                                        placeholder={field.placeholder}
                                        value={obj[field.value]}
                                        onChange={(e) => setObj({ ...obj, [field.value]: e.target.value })}
                                        className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        maxLength={20}
                                    />
                                </div>
                            ))}
                            
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                <textarea
                                    placeholder="Why do you want to host hackathons?"
                                    value={obj.reason}
                                    onChange={(e) => setObj({ ...obj, reason: e.target.value })}
                                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    rows={3}
                                    maxLength={255}
                                />
                            </div>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" checked={isChecked} onChange={(e)=> setIsChecked(e.target.checked)} />
                                <span className="text-xs text-gray-600">
                                    I agree to the <span  onClick={()=>router.push('/terms')} className="text-blue-600 hover:underline">terms and conditions</span>
                                </span>
                            </label>

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 text-sm px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Send className="w-4 h-4" />
                                Submit Application
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Host
