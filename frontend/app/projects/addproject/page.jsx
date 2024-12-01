"use client";
import React, { useContext, useState, useEffect } from 'react';
import Select from 'react-select';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import { FileText, Link, Type, Users, Code, Eye, Tag } from 'lucide-react';
import 'react-quill/dist/quill.snow.css';
import { globalContext } from '@/context_api/globalContext';
import { toast } from 'react-toastify';
import { redirect, useRouter } from 'next/navigation';
import axios from 'axios';

const defaultLanguages = [
    { label: 'JavaScript', value: 'JavaScript' },
    { label: 'Python', value: 'Python' },
    { label: 'Java', value: 'Java' },
    { label: 'C++', value: 'C++' },
    { label: 'TypeScript', value: 'TypeScript' },
    { label: 'Ruby', value: 'Ruby' },
    { label: 'Go', value: 'Go' },
    { label: 'PHP', value: 'PHP' },
    { label: 'Swift', value: 'Swift' },
    { label: 'Kotlin', value: 'Kotlin' },
    { label: 'Rust', value: 'Rust' },
    { label: 'Scala', value: 'Scala' },
    { label: 'Perl', value: 'Perl' },
    { label: 'R', value: 'R' },
];

const AddProject = () => {
    const { user, project } = useContext(globalContext);
    const [contributors, setContributors] = useState('');
    const [tags, setTags] = useState('');
    const [fields, setFields] = useState(project?.title ? project : {
        title: '',
        description: '',
        contributors: contributors?.split(',').map(item => item.trim()),
        languages: [],
        tags: tags?.split(',').map(item => item.trim()),
        codeLink: '',
        demoLink: '',
        user: { id: user._id, name: user.name }
    });

    // Updating fields based on contributors and tags
    useEffect(() => {
        setFields(prev => ({
            ...prev,
            contributors: contributors?.split(',').map(item => item.trim()),
            tags: tags?.split(',').map(item => item.trim()),
        }));
    }, [contributors, tags]);

    // edit proj
    useEffect(() => {

        if (project?._id) {
            setContributors(project?.contributors?.join(', '));
            setTags(project?.tags?.join(', '));
        }


    }, [])

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { title, description, contributors, languages, tags, codeLink, demoLink } = fields;
            if (!title || !description || !contributors.length || !languages.length || !tags.length || !codeLink || !demoLink) {
                return toast.error('All fields are required');
            }
            const data = fields;
            const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/project/addproject', data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (res.data.res) {
                toast.success(res.data.msg);
                router.push('/projects/' + res.data.project._id);
            } else {
                toast.error(res.data.msg);
            }
        } catch (err) {
            console.log(err);
            toast.error('Internal server error');
        }
    };

    const handleArrayField = (field, value) => {
        setFields({ ...fields, [field]: value.split(',').map(item => item.trim()) });
    };

    if (!user?.name) {
        return redirect('/login');
    }

    return (

        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-20">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        {project?._id ? 'Edit Project' : 'Add New Project'}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Share your project with the community
                    </p>
                </div>

                {/* Main Form */}
                <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
                    <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
                        {/* Title Section */}
                        <div className="p-6 space-y-4">
                            <div className="flex flex-col space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <Type className="w-4 h-4 mr-2 text-gray-400" />
                                    Project Title
                                </label>
                                <input
                                    type="text"
                                    value={fields.title}
                                    onChange={(e) => setFields({ ...fields, title: e.target.value })}
                                    placeholder="Enter a descriptive title"
                                    className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                />
                            </div>

                            {/* Description */}
                            <div className="flex flex-col space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <FileText className="w-4 h-4 mr-2 text-gray-400" />
                                    Description
                                </label>
                                <div className="prose-editor">
                                    <ReactQuill
                                        theme="snow"
                                        value={fields.description}
                                        onChange={(value) => setFields({ ...fields, description: value })}
                                        className="bg-gray-50 rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contributors & Languages Section */}
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-2">
                                    <label className="flex items-center text-sm font-medium text-gray-700">
                                        <Users className="w-4 h-4 mr-2 text-gray-400" />
                                        Contributors
                                    </label>
                                    <input
                                        type="text"
                                        value={contributors}
                                        onChange={(e) => setContributors(e.target.value)}
                                        placeholder="e.g., John Doe, Jane Smith"
                                        className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label className="flex items-center text-sm font-medium text-gray-700">
                                        <Code className="w-4 h-4 mr-2 text-gray-400" />
                                        Languages
                                    </label>
                                    <Select
                                        options={defaultLanguages}
                                        isMulti
                                        onChange={(selected) => setFields({ ...fields, languages: selected.map(option => option.value) })}
                                        placeholder="Select languages"
                                        classNamePrefix="select"
                                        value={fields?.languages?.map(lang => ({ label: lang, value: lang }))}
                                        className="react-select-container"
                                        styles={{
                                            control: (base) => ({
                                                ...base,
                                                backgroundColor: '#F9FAFB',
                                                borderColor: '#E5E7EB',
                                                '&:hover': {
                                                    borderColor: '#E5E7EB'
                                                }
                                            })
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-col space-y-2">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <Tag className="w-4 h-4 mr-2 text-gray-400" />
                                    Tags
                                </label>
                                <input
                                    type="text"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    placeholder="e.g., web-development, machine-learning, api"
                                    className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                />
                            </div>
                        </div>

                        {/* Links Section */}
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col space-y-2">
                                    <label className="flex items-center text-sm font-medium text-gray-700">
                                        <Link className="w-4 h-4 mr-2 text-gray-400" />
                                        Code Repository
                                    </label>
                                    <input
                                        type="url"
                                        value={fields.codeLink}
                                        onChange={(e) => setFields({ ...fields, codeLink: e.target.value })}
                                        placeholder="https://github.com/username/repo"
                                        className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label className="flex items-center text-sm font-medium text-gray-700">
                                        <Eye className="w-4 h-4 mr-2 text-gray-400" />
                                        Live Demo
                                    </label>
                                    <input
                                        type="url"
                                        value={fields.demoLink}
                                        onChange={(e) => setFields({ ...fields, demoLink: e.target.value })}
                                        placeholder="https://your-demo-link.com"
                                        className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Section */}
                        <div className="px-6 py-4 bg-gray-50 flex items-center justify-end">
                            <button
                                type="submit"
                                className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20 transition-colors"
                            >
                                {project?._id ? 'Update Project' : 'Add Project'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProject;