'use client'

import { globalContext } from '@/context_api/globalContext'
import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { toast } from 'react-toastify'
import { FiUsers, FiAward, FiFolder, FiTrash2, FiPlus } from 'react-icons/fi'

const AddAdmins = () => {
  const [loading, setLoading] = useState(false)
  const [admins, setAdmins] = useState([]);
  const {admin} = useContext(globalContext)
  const [selectedAdmins, setSelectedAdmins] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    key: '',
    hasUsersAccess: false,
    hasHackathonsAccess: false,
    hasProjectsAccess: false,
  })

  useEffect(() => {
    fetchAdmins()
  }, [])

  const fetchAdmins = async () => {
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + '/admin/admins')
      if(res.data.res){
        setAdmins(res.data.admins)
      }
    } catch (error) {
      toast.error('Failed to fetch admins')
      console.error(error)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.key) {
      toast.error('Name and key are required')
      return
    }

    try {
      setLoading(true)
      const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/admin/add', {
        name: formData.name,
        key: formData.key,
        hasUsersAccess: formData.hasUsersAccess,
        hasHackathonsAccess: formData.hasHackathonsAccess,
        hasProjectsAccess: formData.hasProjectsAccess,
      })

      if(res.data.res){
        toast.success('Admin added successfully!')
        fetchAdmins()
        setFormData({
          name: '',
          key: '',
          hasUsersAccess: false,
          hasHackathonsAccess: false,
          hasProjectsAccess: false,
        })
      } else {
        toast.error('Failed to add admin')
      }
    } catch (error) {
      toast.error('Failed to add admin')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectAdmin = (adminId) => {
    setSelectedAdmins(prev => {
      if (prev.includes(adminId)) {
        return prev.filter(id => id !== adminId)
      } else {
        return [...prev, adminId]
      }
    })
  }

  const handleRemoveAdmins = async () => {
    if (selectedAdmins.length === 0) {
      toast.error('Please select admins to remove')
      return
    }

    try {
      setLoading(true)
      const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/admin/remove', {
        adminIds: selectedAdmins, key: admin.key
      })

      if (res.data.res) {
        toast.success('Admins removed successfully')
        setSelectedAdmins([])
        fetchAdmins()
      } else {
        toast.error('Failed to remove admins')
      }
    } catch (error) {
      toast.error('Failed to remove admins')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if(!admin?.hasUsersAccess){
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4 max-w-lg text-center">
          <h1 className="text-xl font-semibold text-gray-900">Access Denied</h1>
          <p className="text-gray-600">You do not have access to this page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Add Admin Form */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center space-x-2 mb-6">
                <FiPlus className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Add New Admin</h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter admin name"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-700">Key</label>
                    <input
                      type="text"
                      name="key"
                      value={formData.key}
                      onChange={handleChange}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter admin key"
                      required
                    />
                  </div>

                  <div className="space-y-3 pt-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Access Permissions</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <label className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          name="hasUsersAccess"
                          checked={formData.hasUsersAccess}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <div className="ml-3 flex items-center">
                          <FiUsers className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-700">Users Access</span>
                        </div>
                      </label>

                      <label className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          name="hasHackathonsAccess"
                          checked={formData.hasHackathonsAccess}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <div className="ml-3 flex items-center">
                          <FiAward className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-700">Hackathons Access</span>
                        </div>
                      </label>

                      <label className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          name="hasProjectsAccess"
                          checked={formData.hasProjectsAccess}
                          onChange={handleChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <div className="ml-3 flex items-center">
                          <FiFolder className="h-5 w-5 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-700">Projects Access</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center space-x-2 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <span>Adding...</span>
                  ) : (
                    <>
                      <FiPlus className="h-5 w-5" />
                      <span>Add Admin</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Admin List */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Admin List</h2>
                <button
                  onClick={handleRemoveAdmins}
                  disabled={loading || selectedAdmins.length === 0}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FiTrash2 className="h-5 w-5" />
                  <span>Remove Selected</span>
                </button>
              </div>

              {admins.length === 0 ? (
                <div className="bg-white rounded-lg p-8 text-center">
                  <p className="text-gray-500 text-lg">No admins found</p>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <input
                              type="checkbox"
                              checked={selectedAdmins.length === admins.length}
                              onChange={() => {
                                if (selectedAdmins.length === admins.length) {
                                  setSelectedAdmins([])
                                } else {
                                  setSelectedAdmins(admins.map(a => a._id))
                                }
                              }}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Access
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {admins.map((admin) => (
                          <tr key={admin._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="checkbox"
                                checked={selectedAdmins.includes(admin._id)}
                                onChange={() => handleSelectAdmin(admin._id)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex justify-center space-x-4">
                                <div className="flex items-center" title="Users Access">
                                  <FiUsers className={`h-5 w-5 ${admin.hasUsersAccess ? 'text-green-500' : 'text-gray-300'}`} />
                                </div>
                                <div className="flex items-center" title="Hackathons Access">
                                  <FiAward className={`h-5 w-5 ${admin.hasHackathonsAccess ? 'text-green-500' : 'text-gray-300'}`} />
                                </div>
                                <div className="flex items-center" title="Projects Access">
                                  <FiFolder className={`h-5 w-5 ${admin.hasProjectsAccess ? 'text-green-500' : 'text-gray-300'}`} />
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddAdmins