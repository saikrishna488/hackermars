"use client"
import { globalContext } from '@/context_api/globalContext';
import axios from 'axios';
import { redirect, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Plus, Star, Edit, Trash2, Eye } from 'lucide-react';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const { user, setProject } = useContext(globalContext);
  const router = useRouter();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL + '/project/getuserprojects/' + user._id
        );

        console.log(res.data);
        if (res.data.res) {
          setProjects(res.data.projects);
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong');
      }
    };

    if (user?.name) {
      fetchProject();
    }
  }, [user]);


  const handleEdit = (proj)=>{
    setProject(proj);
    router.push('/projects/addproject')
  }

  //add project button
  const handleAddProject = ()=>{
    setProject(null);
    router.push('/projects/addproject');
  }

  //delete proj button
  const handleDelete = async (id)=>{
    try {
      const res = await axios.delete(
        process.env.NEXT_PUBLIC_BACKEND_URL + '/project/deleteproject/' + id
      );
      
      if (res.data.res) {
        toast.success(res.data.msg);
        setProjects(projects.filter(proj => proj._id !== id));
      }

    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  }

  if (!user?.name) {
    return redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">Projects Dashboard</h1>
              <p className="mt-2 text-sm text-gray-600">
                Manage and monitor all your projects efficiently
              </p>
            </div>
            <button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              onClick={() => router.push('/projects/create')}
            >
              <Plus className="text-sm" />
              Add Project
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">No projects yet</h3>
            <p className="mt-2 text-sm text-gray-600">Start by creating your first project</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div 
              key={index} 
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200"
            >
              <div className="p-4 flex flex-col h-full">
                {/* Title and likes */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-1">
                      {project.title}
                    </h2>
                    
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200"
                      onClick={() => router.push('/projects/'+project._id)}
                      aria-label="View Project"
                    >
                      <Eye size={20} className="text-sm" />
                    </button>
                    <button
                      className="p-1.5 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors duration-200"
                      onClick={() => handleEdit(project)}
                      aria-label="Edit Project"
                    >
                      <Edit size={20} className="text-sm" />
                    </button>
                    <button
                      className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                      onClick={() => handleDelete(project._id)}
                      aria-label="Delete Project"
                    >
                      <Trash2 size={20} className="text-sm" />
                    </button>
                  </div>
                </div>
            
                {/* Description */}
                {project.description && (
                  <p 
                    dangerouslySetInnerHTML={{ __html: project.description }} 
                    className="text-gray-600 text-xs line-clamp-2 mb-3 flex-grow"
                  >
                  </p>
                )}
            
                {/* Footer Section */}
                <div className="pt-3 border-t flex flex-row justify-between border-gray-100 mt-auto">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
                    {project.status && (
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.status === 'active' ? 'bg-green-100 text-green-800' : 
                        project.status === 'completed' ? 'bg-blue-100 text-blue-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {project.status}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                      <Star fill='gold' className="text-yellow-400 text-sm" />
                      <span className="text-xs text-gray-600">
                        {project.likes} {project.likes === 1 ? 'Star' : 'Stars'}
                      </span>
                    </div>
                </div>
              </div>
            </div>
            

            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
