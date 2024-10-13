"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { CheckSquare, FileText, User, Phone, Clipboard, Send } from 'lucide-react'

const Host = () => {

    const [confirm, setConfirm] = useState(false)

    return (
        <div className="max-w-lg mt-24 mx-auto p-6 bg-white shadow-md rounded-lg">
            {
                !confirm ? (
                    <div>
                        <h4 className="text-xl font-semibold mb-4">Verification Required To Host a Hackathon</h4>
                        <p className="mb-2">Hosting a hackathon is completely free, but to limit spam and fake events, we verify organizers before allowing them to host.</p>
                        <p className="mb-2">Submit your application with details like college ID, organization ID, or identity proof.</p>
                        <p className="mb-2">Our team will verify your application and enable access to your account.</p>
                        <p className="mb-2">Each user can host only one hackathon per day.</p>
                        <p className="mb-4">To know more, <Link href="" className="text-blue-500 underline">visit here</Link>.</p>
                        <button onClick={()=>setConfirm(true)} className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-150">Continue</button>
                    </div>
                ) : (
                    <div>
                        <h4 className="text-xl font-semibold mb-6">Application To Host Hackathon</h4>
                        <form className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <CheckSquare className="text-gray-600" />
                                <input type="text" className="border w-full p-2 rounded-md focus:outline-none focus:border-blue-500" placeholder="Aadhar Number" />
                            </div>
                            <div className="flex items-center space-x-2">
                                <FileText className="text-gray-600" />
                                <input type="text" className="border w-full p-2 rounded-md focus:outline-none focus:border-blue-500" placeholder="Organization Name" />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Clipboard className="text-gray-600" />
                                <input type="text" className="border w-full p-2 rounded-md focus:outline-none focus:border-blue-500" placeholder="Organization ID/Student ID" />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Phone className="text-gray-600" />
                                <input type="text" className="border w-full p-2 rounded-md focus:outline-none focus:border-blue-500" placeholder="Mobile Number" />
                            </div>
                            <div className="flex items-start space-x-2">
                                <User className="text-gray-600 mt-1" />
                                <textarea className="border w-full p-2 rounded-md focus:outline-none focus:border-blue-500" placeholder="Reason to Host Hackathon"></textarea>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                                <label className="text-sm text-gray-600">I agree to the terms and conditions</label>
                            </div>
                            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-150 flex items-center space-x-2">
                                <Send className="h-4 w-4" />
                                <span>Send Appeal</span>
                            </button>
                        </form>
                    </div>
                )
            }
        </div>
    )
}

export default Host
