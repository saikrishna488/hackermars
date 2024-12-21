"use client"
import React, { useContext, useState } from 'react';
import { globalContext } from '@/context_api/globalContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Key, CheckCircle, AlertCircle } from 'lucide-react'; // Import Lucide icons
import { useRouter } from 'next/navigation';

const Admin = () => {
  const { admin, setAdmin } = useContext(globalContext);
  const [key, setKey] = useState('');
  const router = useRouter()

  const handleAdmin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/admin/login', {
        key,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.data.res) {
        setAdmin(res.data.admin);
        console.log(res.data.admin)
        router.push('/admin/dashboard')
        toast.success(res.data.msg);
      } else {
        toast.error("Check your key and try again")
      }
    } catch (err) {
      toast.error("Error occurred");
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all duration-300 ">
        <div className="p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Admin Portal</h2>
            <p className="text-gray-500 text-sm">Secure Access Required</p>
          </div>
          
          <form onSubmit={handleAdmin} className="space-y-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" size={20} />
              </div>
              <input
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter Admin Key"
                className="w-full py-3 pl-10 pr-4 text-gray-700 bg-gray-100 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white 
                  transition-all duration-300 border border-transparent 
                  hover:border-blue-300"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg 
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 
                transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                flex items-center justify-center space-x-2"
            >
              <CheckCircle size={20} />
              <span>Verify Access</span>
            </button>
          </form>
          
          <div className="text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center space-x-1">
              <AlertCircle size={12} className="text-yellow-500" />
              <span>Restricted to Authorized Personnel Only</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
