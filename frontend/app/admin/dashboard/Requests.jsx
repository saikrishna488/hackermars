"use client";

import { useEffect, useState } from 'react';
import { 
  ChevronDown, ChevronUp, User, Check, X, 
  Building, Phone, Mail, LogIn, AlertCircle,
  Loader2, FileText, Users
} from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Requests = ({ requests, setRequests }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/userrequests`,
          { headers: { "Content-Type": "application/json" }}
        );

        if (res.data.res) {
          setRequests(res.data.requests);
        } else {
          console.log(res.data.msg);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading requests...</p>
        </div>
      </div>
    );
  }

  if (!requests?.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-3">
        <Users className="w-12 h-12" />
        <p className="text-lg">No pending requests</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full space-y-4 p-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Hackathon Requests</h2>
          <p className="text-gray-600 mt-1">Manage participant verification requests</p>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-lg">
          <span className="text-blue-700 font-medium">{requests.length} Pending</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {requests.map((user, index) => (
          <UserCard 
            key={user.email || index} 
            user={user} 
            setRequests={setRequests}
            labels={{
              email: "Email Address",
              phone: "Contact Number",
              organization: "Organization Name",
              organization_id: "Organization ID",
              login_type: "Login Method",
              request_status: "Request Status",
              reason: "Request Reason"
            }}
          />
        ))}
      </div>
    </div>
  );
};

const UserCard = ({ user, setRequests, labels }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleAction = async (email, task) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/verifyuser`,
        { email, task },
        { headers: { "Content-Type": "application/json" }}
      );

      if (res.data.res) {
        setRequests((prevRequests) =>
          prevRequests.filter((req) => req.email !== email)
        );
        toast.success(res.data.msg);
      } else {
        console.log(res.data.msg);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md">
      {/* Header */}
      <div 
        className="p-4 cursor-pointer flex items-center justify-between hover:bg-gray-50"
        onClick={toggleExpand}
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            {user?.profile_url ? (
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${user.profile_url}`}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-200"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-yellow-400 border-2 border-white" />
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm rounded-full bg-yellow-50 text-yellow-700 font-medium">
            Pending Review
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-100">
          <div className="p-4 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <div>
                  <span className="text-xs text-gray-500 block">{labels.email}</span>
                  <span className="text-sm">{user.email}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <div>
                  <span className="text-xs text-gray-500 block">{labels.phone}</span>
                  <span className="text-sm">{user.phone || 'Not provided'}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Building className="w-4 h-4" />
                <div>
                  <span className="text-xs text-gray-500 block">{labels.organization}</span>
                  <span className="text-sm">{user.organization || 'Not provided'}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <FileText className="w-4 h-4" />
                <div>
                  <span className="text-xs text-gray-500 block">{labels.organization_id}</span>
                  <span className="text-sm">{user.organization_id || 'Not provided'}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <LogIn className="w-4 h-4" />
                <div>
                  <span className="text-xs text-gray-500 block">{labels.login_type}</span>
                  <span className="text-sm capitalize">{user.login_type || 'Default'}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <AlertCircle className="w-4 h-4" />
                <div>
                  <span className="text-xs text-gray-500 block">{labels.request_status}</span>
                  <span className="text-sm">{user.request_status || 'Pending'}</span>
                </div>
              </div>
            </div>

            {user.reason && (
              <div className="mt-4">
                <span className="text-xs text-gray-500 block mb-1">{labels.reason}</span>
                <div className="p-3 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-600 leading-relaxed">{user.reason}</p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => handleAction(user.email, "reject")}
                disabled={loading}
                className="px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 flex items-center gap-2 transition-colors duration-200"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <X className="w-4 h-4" />
                )}
                Reject Request
              </button>
              
              <button
                onClick={() => handleAction(user.email, "approve")}
                disabled={loading}
                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 flex items-center gap-2 transition-colors duration-200"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Check className="w-4 h-4" />
                )}
                Approve Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requests;
