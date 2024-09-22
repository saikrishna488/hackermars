"use client"
import React, { useContext, useState } from 'react';
import { globalContext } from '@/context_api/globalContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Key, CheckCircle, AlertCircle } from 'lucide-react'; // Import Lucide icons

const Admin = () => {
  const { adminKey, setAdmin } = useContext(globalContext);
  const [key, setKey] = useState('');

  const handleAdmin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + 'user/admin', {
        key,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.data.res) {
        setAdmin(res.data.admin);
        toast(<><CheckCircle color="green" /> Welcome, {res.data.admin.name}</>);
      } else {
        toast(<><AlertCircle color="red" /> Check your key and try again</>);
      }
    } catch (err) {
      toast.error("Error occurred");
    }
  };

  const AdminSection = ()=> (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Admin Verification</h2>
        <form onSubmit={handleAdmin} className="space-y-6">
          <div className="relative">
            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter Admin Key"
              className="w-full py-3 pl-10 pr-4 text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition duration-300"
          >
            Verify
          </button>
        </form>
      </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <AdminSection/>
    </div>
  );
};

export default Admin;
