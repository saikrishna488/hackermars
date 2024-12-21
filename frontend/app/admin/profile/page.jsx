'use client'

import { globalContext } from '@/context_api/globalContext'
import React, { useContext } from 'react'
import { FiUser, FiUsers, FiAward, FiFolder, FiKey, FiArrowLeft, FiMail } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

const AdminProfile = () => {
  const { admin } = useContext(globalContext)
  const router = useRouter()

  if (!admin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4 max-w-lg text-center">
          <h1 className="text-xl font-semibold text-gray-900">Access Denied</h1>
          <p className="text-gray-600">Please login to view your profile</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <FiArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-12">
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 p-4 rounded-full">
                <FiUser className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{admin.name}</h1>
                <p className="text-blue-100 mt-1">Admin Profile</p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="px-8 py-6">
            <div className="grid gap-6">
              {/* Key */}
              <div className="flex items-center p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                  <FiKey className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Admin Key</h3>
                  <p className="text-lg font-semibold text-gray-900">{admin.key}</p>
                </div>
              </div>

              {/* Access Permissions */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Access Permissions</h3>
                <div className="grid gap-4">
                  <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200">
                    <div className={`flex items-center justify-center h-10 w-10 rounded-full ${admin.hasUsersAccess ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <FiUsers className={`h-5 w-5 ${admin.hasUsersAccess ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Users Access</p>
                      <p className="text-sm text-gray-500">{admin.hasUsersAccess ? 'Enabled' : 'Disabled'}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200">
                    <div className={`flex items-center justify-center h-10 w-10 rounded-full ${admin.hasHackathonsAccess ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <FiAward className={`h-5 w-5 ${admin.hasHackathonsAccess ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Hackathons Access</p>
                      <p className="text-sm text-gray-500">{admin.hasHackathonsAccess ? 'Enabled' : 'Disabled'}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200">
                    <div className={`flex items-center justify-center h-10 w-10 rounded-full ${admin.hasProjectsAccess ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <FiFolder className={`h-5 w-5 ${admin.hasProjectsAccess ? 'text-green-600' : 'text-gray-400'}`} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Projects Access</p>
                      <p className="text-sm text-gray-500">{admin.hasProjectsAccess ? 'Enabled' : 'Disabled'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-center space-x-3">
                  <FiMail className="h-5 w-5 text-blue-600" />
                  <h3 className="text-sm font-medium text-blue-900">Need Help?</h3>
                </div>
                <p className="mt-2 text-sm text-blue-800">
                  If you need any assistance with permissions or encounter any bugs, please contact the Super Admin at{' '}
                  <a href="mailto:oltvez@gmail.com" className="font-medium hover:underline">
                    oltvez@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile