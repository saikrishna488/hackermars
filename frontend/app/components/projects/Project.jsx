'use client'

import React, { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaStar, FaRegStar, FaCode, FaExternalLinkAlt, FaTag, FaLanguage, FaUserAlt } from 'react-icons/fa'
import { globalContext } from '@/context_api/globalContext'

export default function ProjectPage({ project: initialProject }) {
  const [liked, setLiked] = useState(false)
  const [project, setProject] = useState(initialProject || {})
  const { user } = useContext(globalContext)
  const router = useRouter()

  useEffect(() => {
    setProject(initialProject || {})
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
    <div className="max-w-6xl mx-auto pt-16 px-4 sm:px-6 lg:px-8 mb-24">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">{project.title}</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => openLink(project.codeLink)}
                className="flex items-center gap-1 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition duration-150"
              >
                <FaCode className="text-gray-600 h-4 w-4" />
                <span className="hidden sm:inline text-sm">Source Code</span>
              </button>
              <button
                onClick={() => openLink(project.demoLink)}
                className="flex items-center gap-1 px-3 py-1 rounded-md bg-blue-100 hover:bg-blue-200 text-blue-700 transition duration-150"
              >
                <FaExternalLinkAlt className="text-blue-600 h-4 w-4" />
                <span className="hidden sm:inline text-sm">Live Demo</span>
              </button>
              <button
                onClick={handleLike}
                className="flex items-center gap-1 px-3 py-1 rounded-md bg-yellow-100 hover:bg-yellow-200 text-yellow-700 transition duration-150"
              >
                {liked ? <FaStar className="text-yellow-500 h-4 w-4" /> : <FaRegStar className="h-4 w-4" />}
                <span className="text-sm">{project.likes}</span>
              </button>
            </div>
          </div>

          <div className="prose prose-sm max-w-none mb-8 text-gray-600 leading-relaxed">
            <p dangerouslySetInnerHTML={{ __html: project.description }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[20px] gap-y-[10px] mb-8">
            {/* Tags Section */}
            <div className="bg-gray-faint rounded-lg p-[15px] shadow-sm transition-shadow duration-150 hover:shadow-md">
              <h2 className="text-lg font-semibold text-gray-900 mb-[10px] flex items-center">
                <FaTag className="mr-[5px] text-blue-500 h-[20px] w-[20px]" />
                Tags
              </h2>
              <div className="flex flex-wrap gap-[5px]">
                {project.tags?.map((tag, index) => (
                  <span key={index} className="px-[8px] py-[3px] bg-white border border-gray-light text-gray-dark rounded-md text-xs font-medium hover:border-blue transition-colors duration-150">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages Section */}
            <div className="bg-gray-faint rounded-lg p-[15px] shadow-sm transition-shadow duration-150 hover:shadow-md">
              <h2 className="text-lg font-semibold text-gray-900 mb-[10px] flex items-center">
                <FaLanguage className="mr-[5px] text-green-500 h-[20px] w-[20px]" />
                Languages
              </h2>
              <div className="flex flex-wrap gap-[5px]">
                {project.languages?.map((lang, index) => (
                  <span key={index} className="px-[8px] py-[3px] bg-white border border-gray-light text-gray-dark rounded-md text-xs font-medium hover:border-green transition-colors duration=150">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contributors Section */}
          <div className="bg-gray-faint rounded-lg p-[15px] mb-[20px] shadow-sm transition-shadow duration=150 hover:shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-[10px] flex items-center">
              <FaUserAlt className="mr-[5px] text-purple-500 h-[20px] w-[20px]" />
              Contributors
            </h2>
            <div className="flex flex-wrap gap-[5px]">
              {project.contributors?.map((contributor, index) => (
                <span key={index} className="px-[8px] py-[3px] bg-white border border-gray-light text-gray-dark rounded-md text-xs font-medium hover:border-purple transition-colors duration=150">
                  {contributor}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Section */}
          <div className="mt-[10px] pt-[10px] border-t border-gray-light text-xs text-gray-dark flex items-center justify-between">
            <div className="flex items-center gap-x-[5px]">
              <FaUserAlt className="text-gray-light" />
              <span>Posted by 
                <span className="font-medium text-gray-dark"> {project.user?.name || "user488"}</span>
              </span>
            </div>
            <time className="text-gray-light">{new Date(project.createdAt).toLocaleDateString()}</time>
          </div>
        </div>
      </div>
    </div>
  )
}