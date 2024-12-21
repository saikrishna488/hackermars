'use client'

import React, { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaStar, FaRegStar, FaCode, FaExternalLinkAlt, FaTag, FaLanguage, FaUserAlt, FaArrowLeft } from 'react-icons/fa'
import { globalContext } from '@/context_api/globalContext'

export default function ProjectPage({ project: initialProject }) {
  const [liked, setLiked] = useState(false)
  const [project, setProject] = useState({})
  const { user } = useContext(globalContext)
  const router = useRouter()

  useEffect(() => {
    setProject(initialProject)
  }, [initialProject])

  useEffect(() => {
    const fetchLikes = async () => {
      if (!project?.title || !user?._id) return

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/getlike`,
          { projectId: project._id, userId: user._id },
          { headers: { 'Content-Type': 'application/json' } }
        )

        if (res.data.res) {
          setLiked(res.data.like)
        }
      } catch (err) {
        console.error(err)
      }
    }

    fetchLikes()
  }, [project, user])

  const handleLike = async () => {
    if (!user?.name) {
      toast.error('Please login to like the project')
      return
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/project/likeproject`,
        { projectId: project._id, userId: user._id },
        { headers: { 'Content-Type': 'application/json' } }
      )

      if (res.data.res) {
        setProject(res.data.project)
        setLiked(!liked)
      } else {
        toast.error(res.data.msg)
      }
    } catch (err) {
      console.error(err)
      toast.error('Internal server error')
    }
  }

  const openLink = (url) => {
    window.open(url, "_blank", "noopener noreferrer")
  }

  if (!project?.title) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/10 py-4 pt-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="group mb-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 
                    bg-white/80 rounded-lg border border-gray-200 hover:bg-gray-50
                    transition-all duration-200"
        >
          <FaArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Back
        </button>

        {/* Project Content */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h1 className="text-2xl font-semibold text-gray-800">{project.title}</h1>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => openLink(project.codeLink)}
                  className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <FaCode className="h-4 w-4 text-gray-600" />
                  <span className="ml-2 text-sm font-medium text-gray-700">Source</span>
                </button>
                <button
                  onClick={() => openLink(project.demoLink)}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                >
                  <FaExternalLinkAlt className="h-4 w-4" />
                  <span className="ml-2 text-sm font-medium">Demo</span>
                </button>
                <button
                  onClick={handleLike}
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  {liked ? 
                    <FaStar className="h-4 w-4 text-yellow-400" /> : 
                    <FaRegStar className="h-4 w-4 text-gray-400" />
                  }
                  <span className="ml-2 text-sm font-medium text-gray-700">{project.likes}</span>
                </button>
              </div>
            </div>
          </div>
  
          {/* Main Content */}
          <div className="p-8">
            {/* Description */}
            <div className="prose prose-gray max-w-none mb-8">
              <p className="text-gray-600 leading-relaxed" 
                 dangerouslySetInnerHTML={{ __html: project.description }} 
              />
            </div>
  
            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Tags Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-base font-medium text-gray-800 mb-4 flex items-center">
                  <FaTag className="mr-2 text-blue-500" />
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tag, index) => (
                    <span key={index} 
                          className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
  
              {/* Languages Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-base font-medium text-gray-800 mb-4 flex items-center">
                  <FaLanguage className="mr-2 text-green-500" />
                  Languages
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.languages?.map((lang, index) => (
                    <span key={index} 
                          className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
  
              {/* Contributors Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-base font-medium text-gray-800 mb-4 flex items-center">
                  <FaUserAlt className="mr-2 text-purple-500" />
                  Contributors
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.contributors?.map((contributor, index) => (
                    <span key={index} 
                          className="px-3 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200">
                      {contributor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
  
            {/* Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <FaUserAlt className="h-4 w-4" />
                <span>Posted by <span className="font-medium">{project.user?.name || "user488"}</span></span>
              </div>
              <time className="text-sm text-gray-500">
                {new Date(project.createdAt).toLocaleDateString()}
              </time>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}