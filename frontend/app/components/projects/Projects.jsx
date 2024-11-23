'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Code, Star, Plus, FolderKanban } from 'lucide-react'

// Default languages for the dropdown
const defaultLanguages = [
  { label: 'All Languages', value: '' },
  { label: 'JavaScript', value: 'JavaScript' },
  { label: 'Python', value: 'Python' },
  { label: 'Java', value: 'Java' },
  { label: 'C++', value: 'C++' },
  { label: 'Ruby', value: 'Ruby' },
  { label: 'Go', value: 'Go' },
  { label: 'PHP', value: 'PHP' },
]

export default function Projects({ projs = [] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [projects, setProjects] = useState([])
  const router = useRouter()

  useEffect(() => {
    setProjects(projs)
  }, [projs])

  const filteredProjects = projects.filter((project) =>
    (project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.languages.join(' ').toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.join(' ').toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!selectedLanguage || project.languages.includes(selectedLanguage))
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => router.push('/projects/dashboard')}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition duration-200 flex items-center shadow-lg"
          >
            <FolderKanban className="mr-2 h-4 w-4" />
            My Projects
          </button>
          <button
            onClick={() => router.push('/projects/addproject')}
            className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-md hover:bg-green-700 transition duration-200 flex items-center shadow-lg"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </button>
        </div>

        <div className="flex gap-2 sm:ml-auto">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-48 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">All Languages</option>
            {defaultLanguages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center text-gray-500 text-sm mt-8">
          No projects found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-x-6 gap-y-8">
          {filteredProjects.map((project) => (
            <div
            key={project._id}
            className="bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer transform w-full max-w-sm"
            onClick={() => router.push(`/projects/${project._id}`)}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-base font-bold text-gray-900 truncate">
                {project.title}
              </h3>
            </div>
          
            {/* Main Content */}
            <div className="p-4 min-h-[120px]">
              <p
                className="text-xs text-gray-700 mb-3 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
              <div className="flex items-center gap-x-2 mb-2 text-xs">
                <Code className="h-4 w-4 text-blue-500" />
                <span className="text-gray-600 truncate">
                  {project.languages.slice(0, 2).join(", ")}
                  {project.languages.length > 2 && ` +${project.languages.length - 2}`}
                </span>
              </div>
              <div className="flex flex-wrap gap-x-1 gap-y-1">
                {project.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] bg-blue-gray-light text-gray-dark px-2 py-1 rounded-full border border-gray-light"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 2 && (
                  <span className="text-[10px] bg-blue-gray-light text-gray-dark px-2 py-1 rounded-full border border-gray-light">
                    +{project.tags.length - 2}
                  </span>
                )}
              </div>
            </div>
          
            {/* Footer */}
            <div className="bg-gray-faint px-3 py-2 flex justify-between items-center text-[10px] text-gray-dark border-t border-gray-light">
              <span>{new Date(project.createdAt).toLocaleDateString()}</span>
              <div className="flex items-center">
                <Star className="h-3 w-3 text-yellow mr-1" fill="currentColor" />
                <span>{project.likes}</span>
              </div>
            </div>
          </div>
          
          
          ))}
        </div>
      )}
    </div>
  )
}