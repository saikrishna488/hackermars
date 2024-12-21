"use client";

import React, { useContext, useState } from 'react';
import { Search, Code2, Link2, Heart, Users, Tag, Globe, Github, ExternalLink, Loader2, Save, Trash2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { globalContext } from '@/context_api/globalContext';

const Projects = () => {
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState(null);
  const {admin} = useContext(globalContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    contributors: [],
    languages: [],
    tags: [],
    codeLink: '',
    demoLink: '',
    user: {
      id: '',
      name: ''
    }
  });

  const fetchProject = async () => {
    if (!searchId.trim()) {
      toast.error('Please enter a project ID');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/project/getproject/${searchId}`);
      if (res.data.res) {
        setProject(res.data.project);
        setFormData({
          title: res.data.project.title,
          description: res.data.project.description,
          contributors: res.data.project.contributors,
          languages: res.data.project.languages,
          tags: res.data.project.tags,
          codeLink: res.data.project.codeLink,
          demoLink: res.data.project.demoLink,
          user: {
            id: res.data.project.user.id,
            name: res.data.project.user.name
          }
        });
      } else {
        toast.error(res.data.message || 'Project not found');
      }
    } catch (error) {
      console.error('Error fetching project:', error);
      toast.error('Failed to fetch project details');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('user.')) {
      const userField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        user: {
          ...prev.user,
          [userField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleArrayInputChange = (e, field) => {
    const value = e.target.value.split(',').map(item => item.trim());
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };



//update project
  const handleUpdate = async () => {
    if (!project?._id) return;
    
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/updateproject`, {
        adminId : admin._id , projectId : project._id , updatedObject : formData
      });
      if (res.data.res) {
        toast.success('Project updated successfully');
        setProject({ ...project, ...formData });
      } else {
        toast.error(res.data.message || 'Failed to update project');
      }
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
    }
  };

  // delete project
  const handleDelete = async () => {    
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/deleteproject/`,{
        adminId : admin._id , projectId : project._id
      });
      if (res.data.res) {
        toast.success('Project deleted successfully');
        setProject(null);
        setFormData({
          title: '',
          description: '',
          contributors: [],
          languages: [],
          tags: [],
          codeLink: '',
          demoLink: '',
          user: {
            id: '',
            name: ''
          }
        });
      } else {
        toast.error(res.data.message || 'Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  if(!admin?.hasProjectsAccess){
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg
          p-6 space-y-4 max-w-lg text-center">
          <h1 className="text-xl font-semibold text-gray-900">Access Denied</h1>
          <p className="text-gray-600">You do not have access to this page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <div className="max-w-2xl">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">Search Project</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  placeholder="Enter Project ID"
                  className="w-full px-4 py-2.5 pl-11 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
            <button
              onClick={fetchProject}
              disabled={loading}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 min-w-[120px]"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  <span>Search</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Project Form */}
      {project && (
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Edit Project</h2>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Update</span>
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-sm hover:shadow-md flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                  <input
                    type="text"
                    name="user.id"
                    value={formData.user.id}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
                  <input
                    type="text"
                    name="user.name"
                    value={formData.user.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contributors (comma-separated)</label>
                <input
                  type="text"
                  value={formData.contributors.join(', ')}
                  onChange={(e) => handleArrayInputChange(e, 'contributors')}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Languages (comma-separated)</label>
                <input
                  type="text"
                  value={formData.languages.join(', ')}
                  onChange={(e) => handleArrayInputChange(e, 'languages')}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags.join(', ')}
                  onChange={(e) => handleArrayInputChange(e, 'tags')}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Code Link</label>
                <input
                  type="url"
                  name="codeLink"
                  value={formData.codeLink}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Demo Link</label>
                <input
                  type="url"
                  name="demoLink"
                  value={formData.demoLink}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Project Stats */}
          <div className="pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <div>Created by: <span className="font-medium text-gray-900">{project.user.name}</span></div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>{project.likes} likes</span>
                </div>
              </div>
              <div>ID: {project._id}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;