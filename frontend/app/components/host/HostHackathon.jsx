"use client";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import {
  Upload,
  Calendar,
  Users,
  Trophy,
  UserCheck,
  Building,
  Mail,
  Phone,
  Shield,
  Info,
  Clock,
  Tag,
  Award,
  Plus,
  X
} from 'lucide-react';

// const ReactQuill = dynamic(() => import('react-quill'), {
//   ssr: false, // This ensures the component is only rendered on the client side
// });
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { globalContext } from '@/context_api/globalContext';

const quillModules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link'],
    ['clean']
  ]
};

const quillFormats = [
  'bold', 'italic', 'underline',
  'list', 'bullet',
  'link'
];

const formatDateTime = (dateString) => {
  if (!dateString) return '';
  
  // If it's already in the correct format, return as is
  if (dateString.includes('T')) {
    return dateString.slice(0, 16); // Get YYYY-MM-DDTHH:mm format
  }

  // Convert date string to ISO format
  const date = new Date(dateString);
  return date.toISOString().slice(0, 16); // Get YYYY-MM-DDTHH:mm format
};

const HostHackathon = () => {
  const router = useRouter();
  const fileRef = useRef()
  const { user, hackathon } = useContext(globalContext)

  const [fields, setFields] = useState({
    title: hackathon?.title || '',
    image: hackathon?.image || '',
    team_size: hackathon?.team_size || '',
    about: hackathon?.about || '',
    themes: hackathon?.themes?.join(', ') || "",
    judges: hackathon?.judges?.join(', ') || "",
    organizers: hackathon?.organizers?.join(', ') || "",
    description: hackathon?.description || '',
    partners: hackathon?.partners?.join(', ') || "",
    prizes: hackathon?.prizes?.join(', ') || "",
    start_date: hackathon?.start_date || '',
    end_date: hackathon?.end_date || '',
    mode: hackathon?.mode || 'Online',
    phone: hackathon?.phone || '',
    email: hackathon?.email || '',
    max_users: hackathon?.max_users || '',
    eligibility: hackathon?.eligibility || '',
    start_time: hackathon?.start_time || '',
    end_time: hackathon?.end_time || '',
    location: hackathon?.location || '',
    conducted_by: user?.organization || "Google",
    isPrivate: hackathon?.isPrivate || false,
    client_id: user?._id
  });


  useEffect(() => {

    const fetchImage = async () => {
      if (hackathon?._id) {
        console.log("1")

        try {
          const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/' + fields.image);
          const blob = await response.blob(); // Step 1: Convert to Blob
          const file = new File([blob], 'previous_image.jpg', { type: blob.type }); // Step 2: Create File

          console.log("2")

          setFields({ ...fields, image: file })

        } catch (error) {
          console.error('Error fetching the image:', error);
        }
      }

    }


    fetchImage()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setFields({ ...fields, [name]: e.target.files[0] });
    } else {
      setFields({ ...fields, [name]: value });
    }

    console.log(fields.start_date)
  };

  const handleAboutChange = (value) => {
    setFields({
      ...fields, about: value
    })
  };

  const handleDescriptionChange = (value) => {
    setFields({
      ...fields, description: value
    })
  };

  // const handleArrayChange = (e, arrayName) => {
  //   const { value } = e.target;
  //   setFields({ ...fields, [arrayName]: value.split(',').map(item => item.trim()) });
  // };





  const validateFields = () => {
    const requiredFields = [
      'title',
      'team_size',
      'about',
      'description',
      'start_date',
      'end_date',
      'mode',
      'phone',
      'email',
      'max_users',
      'eligibility',
      'image', // Added image field
      'prizes' // Added prizes field
    ];

    let errors = "";

    requiredFields.forEach(field => {
      if (!fields[field] || (field === 'prizes' && fields.prizes.length === 0)) {
        errors = `${field} is required`;
      }
    });

    // Additional email format validation
    if (fields.email && !/\S+@\S+\.\S+/.test(fields.email)) {
      errors = 'Email format is invalid';
    }

    if (fields.mode == "Offline" && !fields.location) {
      errors = 'Location is required';
    }

    return errors;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateFields();

    if (errors) {
      // Handle errors (e.g., display error messages)
      toast.error(errors);
      return;
    }

    try {

      const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/hackathon/add', {
        title: fields.title,
        team_size: fields.team_size,
        about: fields.about,
        description: fields.description,
        start_date: fields.start_date,
        end_date: fields.end_date,
        mode: fields.mode,
        phone: fields.phone,
        email: fields.email,
        max_users: fields.max_users,
        eligibility: fields.eligibility,
        themes: fields.themes.split(',').map(item => item.trim()),
        judges: fields.judges.split(',').map(item => item.trim()),
        organizers: fields.organizers.split(',').map(item => item.trim()),
        partners: fields.partners.split(',').map(item => item.trim()),
        prizes: fields.prizes.split(',').map(item => item.trim()),
        location: fields.location,
        conducted_by: fields.conducted_by,
        isPrivate: fields.isPrivate,
        client_id: fields.client_id,
        image: fields.image,
        _id: hackathon?._id,
      }, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      if (res.data.res) {
        toast.success(res.data.msg)
        router.push('/hackathon/' + res.data.hackathon._id)
      }
      else {
        toast.success(res.data.msg)
      }

    }
    catch (err) {
      console.log(err)
      toast.error("Failed to host hackathon")
    }
  };





  // If user is not logged in or not verified
  if (!user?.name || user?.request_status != "verified") {
    
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Host a New Hackathon</h1>
            <p className="mt-2 text-sm text-gray-600">You need to be logged in and verified to host a hackathon</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            {hackathon?._id ? "Edit Hackathon" : "Host a New Hackathon"}
          </h1>
          <p className="mt-2 text-sm text-gray-600">Fill in the details to create your hackathon event</p>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="divide-y divide-gray-100">
            {/* Basic Details Section */}
            <div className="p-6">
              <h2 className="text-sm font-medium text-gray-900 mb-4">Basic Details</h2>
              <div className="space-y-6">
                {/* Title Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hackathon Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={fields.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter a catchy title for your hackathon"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Image
                  </label>
                  <div 
                    onClick={() => fileRef.current.click()}
                    className="relative group cursor-pointer"
                  >
                    <div className="flex items-center justify-center h-32 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                      <input
                        ref={fileRef}
                        type="file"
                        name="image"
                        onChange={handleChange}
                        className="hidden"
                        accept="image/*"
                      />
                      <div className="text-center">
                        <div className="flex justify-center">
                          <Upload className="h-6 w-6 text-gray-400" />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          {fields?.image?.name || "Click to upload or drag and drop"}
                        </p>
                        <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="p-6">
              <h2 className="text-sm font-medium text-gray-900 mb-4">Description & Details</h2>
              <div className="space-y-6">
                {/* About Editor */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Info className="w-4 h-4 text-gray-400" />
                    <label className="block text-sm font-medium text-gray-700">
                      Brief Overview
                    </label>
                  </div>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <ReactQuill
                      value={fields.about}
                      onChange={handleAboutChange}
                      modules={quillModules}
                      formats={quillFormats}
                      theme="snow"
                      placeholder="Write a brief overview of your hackathon..."
                      className="bg-white [&_.ql-container]:!min-h-[100px] [&_.ql-toolbar]:!border-0 [&_.ql-toolbar]:border-b [&_.ql-toolbar]:!bg-gray-50 [&_.ql-toolbar]:!px-3 [&_.ql-container]:!border-0 [&_.ql-editor]:!px-3 [&_.ql-editor]:!py-2 [&_.ql-editor]:min-h-[100px]"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    A short summary that appears in hackathon listings
                  </p>
                </div>

                {/* Description Editor */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <label className="block text-sm font-medium text-gray-700">
                      Detailed Description
                    </label>
                  </div>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <ReactQuill
                      value={fields.description}
                      onChange={handleDescriptionChange}
                      modules={quillModules}
                      formats={quillFormats}
                      theme="snow"
                      placeholder="Provide detailed information about rules, requirements, and guidelines..."
                      className="bg-white [&_.ql-container]:!min-h-[200px] [&_.ql-toolbar]:!border-0 [&_.ql-toolbar]:border-b [&_.ql-toolbar]:!bg-gray-50 [&_.ql-toolbar]:!px-3 [&_.ql-container]:!border-0 [&_.ql-editor]:!px-3 [&_.ql-editor]:!py-2 [&_.ql-editor]:min-h-[200px]"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Detailed information about your hackathon, including rules and guidelines
                  </p>
                </div>
              </div>
            </div>

            {/* Event Details Section */}
            <div className="p-6">
              <h2 className="text-sm font-medium text-gray-900 mb-4">Event Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Date Inputs */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    name="start_date"
                    value={fields.start_date && formatDateTime(fields.start_date)}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    name="end_date"
                    value={fields.end_date && formatDateTime(fields.end_date)}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Other Fields */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Team Size
                  </label>
                  <input
                    type="number"
                    name="team_size"
                    value={fields.team_size}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={1}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Teams
                  </label>
                  <input
                    type="number"
                    name="max_users"
                    value={fields.max_users}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={1}
                  />
                </div>

                <div className="col-span-full">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <label className="block text-sm font-medium text-gray-700">
                      Eligibility Requirements
                    </label>
                  </div>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="eligibility"
                      value={fields.eligibility}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Open to all college students, Age 18-25, etc."
                    />
                    
                    {/* Mode Selection */}
                    <div className="flex items-center space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="mode"
                          value="Online"
                          checked={fields.mode === "Online"}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Online</span>
                      </label>
                      
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="mode"
                          value="Offline"
                          checked={fields.mode === "Offline"}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Offline</span>
                      </label>
                    </div>

                    {/* Location input - shows only when mode is Offline */}
                    {fields.mode === "Offline" && (
                      <div className="mt-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Building className="w-4 h-4 text-gray-400" />
                          <label className="block text-sm font-medium text-gray-700">
                            Event Location
                          </label>
                        </div>
                        <input
                          type="text"
                          name="location"
                          value={fields.location}
                          onChange={handleChange}
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter the venue address"
                        />
                      </div>
                    )}

                    {/* Private/Public Selection */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Event Visibility</h3>
                        <p className="text-xs text-gray-500 mt-0.5">Control who can view and register for your event</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={fields.isPrivate}
                          onChange={(e) => setFields({ ...fields, isPrivate: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        <span className="ml-2 text-sm text-gray-700">
                          {fields.isPrivate ? 'Private' : 'Public'}
                        </span>
                      </label>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Specify who can participate and how the event will be conducted
                  </p>
                </div>
              </div>
            </div>

            {/* Contact & Additional Info */}
            <div className="p-6">
              <h2 className="text-sm font-medium text-gray-900 mb-4">Additional Information</h2>
              <div className="space-y-6">
                {/* Array Inputs */}
                {[
                  { label: "Themes", name: "themes", icon: Tag, placeholder: "AI, Blockchain, IoT..." },
                  { label: "Prizes", name: "prizes", icon: Trophy, placeholder: "1st Prize: $1000, 2nd Prize: $500..." },
                  { label: "Judges", name: "judges", icon: UserCheck, placeholder: "John Doe, Jane Smith..." },
                  { label: "Organizers", name: "organizers", icon: Users, placeholder: "Tech Club, Innovation Lab..." },
                  { label: "Partners", name: "partners", icon: Building, placeholder: "Google, Microsoft, AWS..." }
                ].map((field) => (
                  <div key={field.name}>
                    <div className="flex items-center gap-2 mb-1">
                      <field.icon className="w-4 h-4 text-gray-400" />
                      <label className="block text-sm font-medium text-gray-700">
                        {field.label}
                      </label>
                    </div>
                    <input
                      type="text"
                      name={field.name}
                      value={fields[field.name]}
                      onChange={(e) => setFields({ ...fields, [field.name]: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={field.placeholder}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Separate multiple entries with commas
                    </p>
                  </div>
                ))}

                {/* Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={fields.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={fields.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="px-6 py-4 bg-gray-50">
              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {hackathon?._id ? "Update Hackathon" : "Create Hackathon"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HostHackathon;
