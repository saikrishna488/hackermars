import axios from 'axios';
import { User, Mail, Phone, IdCard, Building, LogIn, Link, CheckCircle, AlertCircle, Edit } from 'lucide-react';

import { toast } from 'react-toastify';



const UserSection = ({ user, setUser }) => {

  const fetchUser = async (e) => {
    e.preventDefault()

    try {

      const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/admin/user', { email: user.email }, {
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
      toast("Error Occured")
    }
  }

  const handleUser = async (e) => {
    e.preventDefault()

    try {

      const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/admin/userupdate', user, {
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
      toast("Error Occured")
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()

    try {

      const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/admin/userdelete', {
        email : user.email
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      if (res.data.res) {
        toast.success(res.data.msg)
      }
      else {
        toast.error(res.data.msg)
      }

    }
    catch (err) {
      console.log(err)
      toast("Error Occured")
    }
  }



  return (
    <div className="rounded-xl shadow-lg w-full overflow-y-auto relative h-full bg-gray-100 p-2 transition-all duration-300">
      <div className="bg-white rounded-lg p-2 lg:w-[60%] mx-auto">
        <h4 className="text-2xl font-semibold text-gray-800 mb-4">Fetch User</h4>

        <form onSubmit={fetchUser} className="flex items-center flex-col gap-4 mb-6">
          <div className="relative w-full">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Enter user email"
              className="w-full py-2 pl-10 pr-4 rounded-md bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <button className="bg-blue-600 w-full text-white px-4 py-4 rounded-md hover:bg-blue-500 transition duration-300">
            Fetch
          </button>
          <button onClick={handleDelete} className="bg-red-600 w-full text-white font-bold py-4 px-4 rounded hover:bg-red-700 transition duration-300">
            Delete
          </button>
        </form>


        {
          user?.name && (
            <div>
              <h4 className="text-2xl font-semibold text-gray-800 mb-4">Update User</h4>
              <form onSubmit={handleUser} className="space-y-4">

                {/* Name Field */}
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
                  <User className="text-gray-400 mr-3" />
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter Name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="w-full py-2 bg-transparent text-gray-700 focus:outline-none"
                  />
                </div>

                {/* Email Field */}
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
                  <Mail className="text-gray-400 mr-3" />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter Email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="w-full py-2 bg-transparent text-gray-700 focus:outline-none"
                  />
                </div>

                {/* Phone Field */}
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
                  <Phone className="text-gray-400 mr-3" />
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Enter Phone Number"
                    value={user.phone}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    className="w-full py-2 bg-transparent text-gray-700 focus:outline-none"
                  />
                </div>

                {/* Aadhar Field */}
                <label htmlFor="aadhar" className="block text-sm font-medium text-gray-700">Aadhar Number</label>
                <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
                  <IdCard className="text-gray-400 mr-3" />
                  <input
                    id="aadhar"
                    type="text"
                    placeholder="Enter Aadhar Number"
                    value={user.aadhar}
                    onChange={(e) => setUser({ ...user, aadhar: e.target.value })}
                    className="w-full py-2 bg-transparent text-gray-700 focus:outline-none"
                  />
                </div>

                {/* Organization Field */}
                <label htmlFor="organization" className="block text-sm font-medium text-gray-700">Organization Name</label>
                <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
                  <Building className="text-gray-400 mr-3" />
                  <input
                    id="organization"
                    type="text"
                    placeholder="Enter Organization Name"
                    value={user.organization}
                    onChange={(e) => setUser({ ...user, organization: e.target.value })}
                    className="w-full py-2 bg-transparent text-gray-700 focus:outline-none"
                  />
                </div>

                {/* Organization ID Field */}
                <label htmlFor="organization_id" className="block text-sm font-medium text-gray-700">Organization ID</label>
                <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
                  <IdCard className="text-gray-400 mr-3" />
                  <input
                    id="organization_id"
                    type="text"
                    placeholder="Enter Organization ID"
                    value={user.organization_id}
                    onChange={(e) => setUser({ ...user, organization_id: e.target.value })}
                    className="w-full py-2 bg-transparent text-gray-700 focus:outline-none"
                  />
                </div>

                {/* Login Type Field */}
                <label htmlFor="login_type" className="block text-sm font-medium text-gray-700">Login Type</label>
                <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
                  <LogIn className="text-gray-400 mr-3" />
                  <select
                    id="login_type"
                    value={user.login_type}
                    onChange={(e) => setUser({ ...user, login_type: e.target.value })}
                    className="w-full py-2 bg-transparent text-gray-700 focus:outline-none"
                  >
                    <option value="default">Default</option>
                    <option value="google">Google</option>
                  </select>
                </div>

                {/* Profile URL Field */}
                <label htmlFor="profile_url" className="block text-sm font-medium text-gray-700">Profile URL</label>
                <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
                  <Link className="text-gray-400 mr-3" />
                  <input
                    id="profile_url"
                    type="text"
                    placeholder="Enter Profile URL"
                    value={user.profile_url}
                    onChange={(e) => setUser({ ...user, profile_url: e.target.value })}
                    className="w-full py-2 bg-transparent text-gray-700 focus:outline-none"
                  />
                </div>

                {/* Verification Status Field */}
                <label htmlFor="is_verified" className="block text-sm font-medium text-gray-700">Verification Status</label>
                <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
                  <CheckCircle className="text-gray-400 mr-3" />
                  <select
                    id="is_verified"
                    value={user.is_verified ? "true" : "false"}
                    onChange={(e) => setUser({ ...user, is_verified: e.target.value === "true" })}
                    className="w-full py-2 bg-transparent text-gray-700 focus:outline-none"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>

                {/* Request Status Field */}
                <label htmlFor="request_status" className="block text-sm font-medium text-gray-700">Request Status</label>
                <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
                  <AlertCircle className="text-gray-400 mr-3" />
                  <select
                    id="request_status"
                    value={user.request_status}
                    onChange={(e) => setUser({ ...user, request_status: e.target.value })}
                    className="w-full py-2 bg-transparent text-gray-700 focus:outline-none"
                  >
                    <option value="">Not Selected</option>
                    <option value="pending">Pending</option>
                    <option value="verified">Verified</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                {/* Reason Field */}
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason</label>
                <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
                  <Edit className="text-gray-400 mr-3" />
                  <input
                    id="reason"
                    type="text"
                    placeholder="Enter Reason"
                    value={user.reason}
                    onChange={(e) => setUser({ ...user, reason: e.target.value })}
                    className="w-full py-2 bg-transparent text-gray-700 focus:outline-none"
                  />
                </div>

                {/* Submit Button */}
                <button className="w-full py-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-500 transition duration-300">
                  Update/Add
                </button>


              </form>
            </div>
          )
        }

      </div>
    </div>
  )
}


export default UserSection;