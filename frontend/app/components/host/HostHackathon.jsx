"use client";
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false, // This ensures the component is only rendered on the client side
});

import 'react-quill/dist/quill.snow.css';

const HostHackathon = () => {
  const router = useRouter();
  const fileRef = useRef()

  const [fields, setFields] = useState({
    title: '',
    image: null,
    team_size: '',
    about: '',
    themes: [],
    judges: [],
    organizers: [],
    description: '',
    partners: [],
    prizes: [],
    date: '',
    mode: 'public',
    phone: '',
    email: '',
    max_users: '',
    eligibility: '',
    start_time: '',
    end_time: '',
    social_links: [],
    location: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setFields({ ...fields, [name]: e.target.files[0] });
    } else {
      setFields({ ...fields, [name]: value });
    }
  };

  const handleAboutChange = (value) => {
    console.log(value)
    setFields({
      ...fields, about: value
    })
  };

  const handleDescriptionChange = (value) => {
    console.log(value)
    setFields({
      ...fields, description: value
    })
  };

  const handleArrayChange = (e, arrayName) => {
    const { value } = e.target;
    setFields({ ...fields, [arrayName]: value.split(',').map(item => item.trim()) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(fields);
  };

  return (
    <div className="container mx-auto lg:p-6 pt-24 mt-10">
      <div className="lg:w-[60%] w-full mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-center mb-6">Host Your Hackathon</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block font-semibold text-lg mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={fields.title}
              onChange={handleChange}
              className="w-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 rounded-md p-3 transition duration-150 ease-in-out"
              placeholder="Enter the title of your hackathon"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Enter the title of your hackathon.</p>
          </div>

          <div className="mb-6">
            <label className="block font-semibold text-lg mb-1">Upload Image</label>
            <div className="flex items-center justify-between border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 transition duration-150 ease-in-out hover:bg-gray-100">
              <input
              ref={fileRef}
                type="file"
                name="image"
                onChange={handleChange}
                className="hidden"
                accept="image/*"
                required
                id='file-upload'
              />
              <div onClick={() => fileRef.current.click()} className="flex-1 text-center">
                {
                  fields?.image ? (
                    <span className="text-gray-600">{fields?.image?.name}</span>
                  ) : (
                    <>
                      <span className="text-gray-600">Drag & drop your image here or </span>
                      <span className="text-blue-600 cursor-pointer">browse</span>
                    </>
                  )
                }
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-1">Upload an image or logo for the hackathon.</p>
          </div>

          <div className="mb-6">
            <label className="block font-semibold text-gray-700 mb-2">Team Size</label>
            <select
              name="team_size"
              value={fields.team_size}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              required
            >
              <option value="" disabled>Select Team Size</option>
              <option value="1-2">1-2</option>
              <option value="1-3">1-3</option>
              <option value="1-4">1-4</option>
              <option value="1">1</option>
            </select>
            <p className="text-sm text-gray-500 mt-2">Select the maximum team size allowed.</p>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">Mode</label>
            <select
              name="mode"
              value={fields.mode}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
              required
            >
              <option value="" disabled>Select Mode</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
            <p className="text-sm text-gray-500 mt-1">Choose whether the hackathon is online or offline.</p>
          </div>

          {fields.mode === 'offline' && (
            <div className="mb-4">
              <label className="block font-medium mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={fields.location}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 1234 Main St, Hyderabad, Telangana"
                required={fields.mode === 'offline'}
              />
              <p className="text-sm text-gray-500">Provide the physical location for the event. Example: 1234 Main St, Hyderabad, Telangana</p>
            </div>
          )}


          <div className="mb-6">
            <label className="block font-semibold text-gray-700 mb-2">About</label>
            <ReactQuill
              name="about"
              value={fields.about}
              onChange={handleAboutChange}
              rows="4"
              className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out resize-none"
              placeholder="Write a brief description of the hackathon..."
              required
            />
            <p className="text-sm text-gray-500 mt-2">Write a brief description of the hackathon.</p>
          </div>

          <div className="mb-6">
            <label className="block font-semibold text-gray-700 mb-2">Description</label>
            <ReactQuill
              theme="snow"
              value={fields.description}
              onChange={handleDescriptionChange}
              className="rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Provide a detailed description of the hackathon..."
            />
            <p className="text-sm text-gray-500 mt-2">You can format the description using bold, italic, lists, and more.</p>
          </div>


          <div className="mb-6">
            <label className="block font-semibold text-gray-700 mb-2">Themes</label>
            <input
              type="text"
              name="themes"
              onChange={(e) => handleArrayChange(e, 'themes')}
              className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              placeholder="Enter relevant themes (comma-separated)"
            />
            <p className="text-sm text-gray-500 mt-2">Enter relevant themes (comma-separated).</p>
          </div>

          <div className="mb-6">
            <label className="block font-semibold text-gray-700 mb-2">Judges</label>
            <input
              type="text"
              name="judges"
              onChange={(e) => handleArrayChange(e, 'judges')}
              className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              placeholder="List the judges (comma-separated)"
            />
            <p className="text-sm text-gray-500 mt-2">List the judges (comma-separated).</p>
          </div>

          <div className="mb-6">
            <label className="block font-semibold text-gray-700 mb-2">Organizers</label>
            <input
              type="text"
              name="organizers"
              onChange={(e) => handleArrayChange(e, 'organizers')}
              className="w-full border border-gray-300 p-3 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
              placeholder="List the organizers (comma-separated)"
            />
            <p className="text-sm text-gray-500 mt-2">List the organizers (comma-separated).</p>
          </div>


          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">Partners</label>
            <input
              type="text"
              name="partners"
              onChange={(e) => handleArrayChange(e, 'partners')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
              placeholder="List partners involved (comma-separated)"
            />
            <p className="text-sm text-gray-500 mt-1">List partners involved (comma-separated).</p>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">Prizes</label>
            <input
              type="text"
              name="prizes"
              onChange={(e) => handleArrayChange(e, 'prizes')}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
              placeholder="List the prizes for the winners (comma-separated)"
            />
            <p className="text-sm text-gray-500 mt-1">List the prizes for the winners (comma-separated).</p>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={fields.date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Select the date of the hackathon.</p>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">Start Time</label>
            <input
              type="time"
              name="start_time"
              value={fields.start_time}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Select the start time of the hackathon.</p>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">End Time</label>
            <input
              type="time"
              name="end_time"
              value={fields.end_time}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Select the end time of the hackathon.</p>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">Contact Phone</label>
            <input
              type="text"
              name="phone"
              value={fields.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
              placeholder="Enter contact number"
            />
            <p className="text-sm text-gray-500 mt-1">Provide a contact number for participants.</p>
          </div>


          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">Contact Email</label>
            <input
              type="email"
              name="email"
              value={fields.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
              placeholder="Enter contact email"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Provide an email for participants to reach out.</p>
          </div>


          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">Eligibility</label>
            <input
              type="text"
              name="eligibility"
              value={fields.eligibility}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
            />
            <p className="text-sm text-gray-500 mt-1">Specify who is eligible to participate.</p>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">Visibility</label>
            <select
              name="mode"
              value={fields.mode}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
              required
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
            <p className="text-sm text-gray-500 mt-1">Choose whether the hackathon is public or private.</p>
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">Maximum Users</label>
            <input
              type="number"
              name="max_users"
              value={fields.max_users}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all"
              required
              min={1}
            />
            <p className="text-sm text-gray-500 mt-1">Enter the maximum number of participants allowed.</p>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Social Links</label>
            <input
              type="text"
              name="social_links"
              onChange={(e) => handleArrayChange(e, 'social_links')}
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter social media links (comma-separated)"
            />
            <p className="text-sm text-gray-500">Provide social media links (comma-separated) for participants to follow.</p>
          </div>


          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 shadow-md"
            >
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default HostHackathon;

