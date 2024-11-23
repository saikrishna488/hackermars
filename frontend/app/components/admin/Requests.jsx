"use client";

import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, User } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Requests = ({ requests, setRequests }) => {

    useEffect(() => {
        const fetchRequests = async () => {

            try {

                const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/admin/userrequests', {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                if (res.data.res) {
                    setRequests(res.data.requests)
                    toast.success(res.data.msg)
                    console.log(res.data)
                }
                else {
                    toast.error(res.data.msg)
                }

            }
            catch (err) {
                console.log(err)
                toast.success(err.response.data.msg || "Error Occured")
            }
        }

        fetchRequests()

    }, [])




    if (!requests?.length > 0) {
        return (
            <div className='flex items-center justify-center'>
                No Requests made
            </div>
        )
    }

    return (
        <div className="w-full h-full">
            {requests.map((user, index) => (
                <UserCard key={index} user={user} requests={requests} setRequests={setRequests} />
            ))}
        </div>
    );
};






// UserCard component
const UserCard = ({ user, setRequests, requests }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);





    const handleApprove = async (email) => {
        try {

            const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/admin/verifyuser', { email ,task : "approve" }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (res.data.res) {
                console.log(res.data.user)

                setRequests((prevRequests) =>
                    prevRequests.filter((req) => req.email !== email) // Only keep requests where email does not match
                );
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



    const handleReject = async (email) => {
        try {

            const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/admin/verifyuser', { email , task : "reject" }, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (res.data.res) {
                console.log(res.data.user)

                setRequests((prevRequests) =>
                    prevRequests.filter((req) => req.email !== email) 
                );
                toast.success(res.data.msg)
            }
            else {
                toast.error(res.data.msg)
            }

        }
        catch (err) {
            console.log(err)
            toast.success(err.response.data.msg || "Error Occured")
        }
    }

    return (
        <div className="w-full mx-auto my-4 bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
            {/* Collapsed Card Header */}
            <div className="flex items-center p-4 justify-between">
                <div className="flex items-center space-x-4">

                    {
                        user?.profile_url ? <img
                            src={process.env.NEXT_PUBLIC_BACKEND_URL + '/' + user.profile_url}
                            alt={user.name}
                            className="w-12 h-12 rounded-full object-cover border border-gray-300"
                        /> : (
                            <User />
                        )
                    }

                    <div>
                        <h2 className="text-lg font-semibold">{user.name}</h2>
                        <p className="text-sm text-gray-500">{user.reason}</p>
                    </div>
                </div>
                {/* Expand/Collapse Icon */}
                <button onClick={toggleExpand} className="text-gray-500 hover:text-gray-800">
                    {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </button>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="p-4 bg-gray-50">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <strong>Email: </strong> {user.email}
                        </div>
                        <div>
                            <strong>Phone: </strong> {user.phone}
                        </div>
                        <div>
                            <strong>Aadhar: </strong> {user.aadhar}
                        </div>
                        <div>
                            <strong>Organization Name: </strong> {user.organization}
                        </div>
                        <div>
                            <strong>Organization ID: </strong> {user.organization_id}
                        </div>
                        <div>
                            <strong>Login Type: </strong> {user.login_type}
                        </div>
                        <div className="col-span-2">
                            <strong>Verification Status: </strong> {user.is_verified ? "Verified" : "Unverified"}
                        </div>
                        <div className="col-span-2">
                            <strong>Request: </strong> {user.request_status}
                        </div>
                        <div className="col-span-2">
                            <strong>Reason: </strong> {user.reason}
                        </div>
                    </div>
                    {/* Approve and Reject Buttons */}
                    <div className="flex justify-between mt-4">
                        <button onClick={() => handleApprove(user.email)} className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600">
                            Approve
                        </button>
                        <button onClick={() => handleReject(user.email)} className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600">
                            Reject
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Requests;
