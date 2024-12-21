'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Code, Star, Plus, FolderKanban, ArrowUpRight } from 'lucide-react'

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



//project card
const ProjectCard = ({ project, onClick }) => (
  <div
    onClick={onClick}
    className="group flex flex-col bg-white rounded-xl border border-gray-100 hover:border-blue-100 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden"
  >
    {/* Project Header */}
    <div className="p-6 flex-grow space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
              {project.languages.slice(0, 3).join(', ')}
            </span>
            {project.languages.length > 1 && (
              <span className="text-xs text-gray-500">
                +{project.languages.length - 1} more
              </span>
            )}
          </div>
        </div>
        <div className="transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200">
          <ArrowUpRight className="h-5 w-5 text-blue-500" />
        </div>
      </div>

      {/* Description */}
      <div
        className="prose prose-sm max-w-none text-gray-600 line-clamp-2 overflow-hidden"
        dangerouslySetInnerHTML={{
          __html: project.description.replace(/<[^>]*>?/gm, ' ').substring(0, 150) + '...'
        }}
      />

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 pt-2">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 text-xs font-medium bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 3 && (
          <span className="px-2.5 py-1 text-xs font-medium text-gray-500">
            +{project.tags.length - 3}
          </span>
        )}
      </div>
    </div>

    {/* Card Footer */}
    <div className="px-6 py-4 border-t border-gray-50 bg-gray-50/50 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
        <span className="text-sm text-gray-600 font-medium">
          {project.user.name.slice(0, 20) + '...' || 'Anonymous'}
        </span>
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <time className="hidden sm:block">
          {new Date(project.createdAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </time>
        <div className="flex items-center gap-1.5">
          <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
          <span className="font-medium">{project.likes}</span>
        </div>
      </div>
    </div>
  </div>
);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/10 py-4 pt-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Discover Projects
          </h1>
          <p className="mt-2 text-gray-600">
            Explore innovative projects from our community of developers and showcase your own work.
          </p>
        </div>

        {/* Controls Section */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 mb-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            {/* Left buttons group */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => router.push('/projects/dashboard')}
                className="inline-flex items-center px-4 py-2.5 bg-gray-50 text-gray-700 text-sm 
                          font-medium rounded-lg hover:bg-gray-100 transition-colors border border-gray-200
                          w-full sm:w-auto justify-center"
              >
                <FolderKanban className="mr-2 h-4 w-4" />
                My Projects
              </button>
              <button
                onClick={() => router.push('/projects/addproject')}
                className="inline-flex items-center px-4 py-2.5 bg-blue-600 text-white text-sm 
                          font-medium rounded-lg hover:bg-blue-700 transition-colors
                          w-full sm:w-auto justify-center"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </button>
            </div>

            {/* Right search group */}
            <div className="flex flex-col sm:flex-row gap-3 lg:ml-auto w-full lg:w-auto">
              <div className="relative flex-grow sm:flex-grow-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full sm:w-72 pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 
                            rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                            focus:border-blue-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <select
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full sm:w-48 px-3 py-2.5 text-sm bg-white border border-gray-200 
                          rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 
                          focus:border-blue-500 cursor-pointer"
              >
                {defaultLanguages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No projects found matching your criteria.</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onClick={() => router.push(`/projects/${project._id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}