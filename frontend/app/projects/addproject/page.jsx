"use client";
import React, { useContext, useState, useEffect } from 'react';
import Select from 'react-select';
import ReactQuill from 'react-quill';
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
    useEffect(()=>{

        if(project?._id){
            setContributors(project?.contributors?.join(', '));
        setTags(project?.tags?.join(', '));
        }


    },[])

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
        <div className="max-w-4xl mx-auto pt-24 pb-20 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New Project</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="flex flex-col">
                    <label className="text-gray-700 flex items-center mb-1">
                        <Type className="mr-2 text-gray-500" /> Title
                    </label>
                    <input
                        type="text"
                        value={fields.title}
                        onChange={(e) => setFields({ ...fields, title: e.target.value })}
                        placeholder="Enter project title"
                        className="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-200"
                    />
                    <small className="text-gray-500">Enter a descriptive title for your project.</small>
                </div>

                {/* Description */}
                <div className="flex flex-col">
                    <label className="text-gray-700 flex items-center mb-1">
                        <FileText className="mr-2 text-gray-500" /> Description
                    </label>
                    <ReactQuill
                        theme="snow"
                        value={fields.description}
                        onChange={(value) => setFields({ ...fields, description: value })}
                        placeholder="Enter project description..."
                        className="border border-gray-300 rounded"
                    />
                    <small className="text-gray-500">Provide a detailed description of your project.</small>
                </div>

                {/* Contributors */}
                <div className="flex flex-col">
                    <label className="text-gray-700 flex items-center mb-1">
                        <Users className="mr-2 text-gray-500" /> Contributors
                    </label>
                    <input
                        type="text"
                        value={contributors}
                        onChange={(e) => setContributors(e.target.value)}
                        placeholder="Enter contributor names (comma separated)"
                        className="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-200"
                    />
                    <small className="text-gray-500">List contributors separated by commas.</small>
                </div>

                {/* Languages */}
                <div className="flex flex-col">
                    <label className="text-gray-700 flex items-center mb-1">
                        <Code className="mr-2 text-gray-500" /> Languages
                    </label>
                    <Select
                        options={defaultLanguages}
                        isMulti
                        onChange={(selected) => setFields({ ...fields, languages: selected.map(option => option.value) })}
                        placeholder="Select languages used in the project"
                        classNamePrefix="select"
                        value={fields?.languages ? fields.languages.map(lang => ({ label: lang, value: lang })) : []}
                    />
                    <small className="text-gray-500">Select the programming languages used.</small>
                </div>

                {/* Tags */}
                <div className="flex flex-col">
                    <label className="text-gray-700 flex items-center mb-1">
                        <Tag className="mr-2 text-gray-500" /> Tags
                    </label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Enter tags (comma separated)"
                        className="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-200"
                    />
                    <small className="text-gray-500">Add relevant tags separated by commas.</small>
                </div>

                {/* Code Link */}
                <div className="flex flex-col">
                    <label className="text-gray-700 flex items-center mb-1">
                        <Link className="mr-2 text-gray-500" /> Code Link
                    </label>
                    <input
                        type="url"
                        value={fields.codeLink}
                        onChange={(e) => setFields({ ...fields, codeLink: e.target.value })}
                        placeholder="Enter GitHub link for code or other files"
                        className="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-200"
                    />
                    <small className="text-gray-500">Enter a GitHub link for code or file links (mp4, pptx, etc.).</small>
                </div>

                {/* Demo Link */}
                <div className="flex flex-col">
                    <label className="text-gray-700 flex items-center mb-1">
                        <Eye className="mr-2 text-gray-500" /> Demo Link
                    </label>
                    <input
                        type="url"
                        value={fields.demoLink}
                        onChange={(e) => setFields({ ...fields, demoLink: e.target.value })}
                        placeholder="Enter deployed URL or prototype link"
                        className="p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-200"
                    />
                    <small className="text-gray-500">Enter a deployed URL or prototype link.</small>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button type="submit" className="px-6 py-[10px] bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200 shadow-md">
                        Add Project
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProject;