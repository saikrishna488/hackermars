"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const HostHackathon = () => {
  const router = useRouter();
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setFields({ ...fields, [name]: e.target.files[0] });
    } else {
      setFields({ ...fields, [name]: value });
    }
  };

  const handleArrayChange = (e, arrayName) => {
    const { value } = e.target;
    setFields({ ...fields, [arrayName]: value.split(',').map(item => item.trim()) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(fields);
  };

  return (
    <div className="container mx-auto p-6 mt-10">
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8">
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
                type="file"
                name="image"
                onChange={handleChange}
                className="hidden"
                accept="image/*"
                required
                id='file-upload'
              />
              <div onClick={() => document.getElementById('file-upload').click()} className="flex-1 text-center">
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

          <div className="mb-4">
            <label className="block font-medium mb-1">Team Size</label>
            <select
              name="team_size"
              value={fields.team_size}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            >
              <option value="">Select Team Size</option>
              <option value="1-2">1-2</option>
              <option value="1-3">1-3</option>
              <option value="1-4">1-4</option>
            </select>
            <p className="text-sm text-gray-500">Select the maximum team size allowed.</p>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">About</label>
            <textarea
              name="about"
              value={fields.about}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
            <p className="text-sm text-gray-500">Write a brief description of the hackathon.</p>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Themes</label>
            <input
              type="text"
              name="themes"
              onChange={(e) => handleArrayChange(e, 'themes')}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            <p className="text-sm text-gray-500">Enter relevant themes (comma-separated).</p>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Judges</label>
            <input
              type="text"
              name="judges"
              onChange={(e) => handleArrayChange(e, 'judges')}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            <p className="text-sm text-gray-500">List the judges (comma-separated).</p>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Organizers</label>
            <input
              type="text"
              name="organizers"
              onChange={(e) => handleArrayChange(e, 'organizers')}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            <p className="text-sm text-gray-500">List the organizers (comma-separated).</p>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Partners</label>
            <input
              type="text"
              name="partners"
              onChange={(e) => handleArrayChange(e, 'partners')}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            <p className="text-sm text-gray-500">List partners involved (comma-separated).</p>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Prizes</label>
            <input
              type="text"
              name="prizes"
              onChange={(e) => handleArrayChange(e, 'prizes')}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            <p className="text-sm text-gray-500">List the prizes for the winners (comma-separated).</p>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={fields.date}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
            <p className="text-sm text-gray-500">Select the date of the hackathon.</p>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Start Time</label>
            <input
              type="time"
              name="start_time"
              value={fields.start_time}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
            <p className="text-sm text-gray-500">Select the start time of the hackathon.</p>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">End Time</label>
            <input
              type="time"
              name="end_time"
              value={fields.end_time}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
            <p className="text-sm text-gray-500">Select the end time of the hackathon.</p>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Contact Phone</label>
            <input
              type="text"
              name="phone"
              value={fields.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            <p className="text-sm text-gray-500">Provide a contact number for participants.</p>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Contact Email</label>
            <input
              type="email"
              name="email"
              value={fields.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
            <p className="text-sm text-gray-500">Provide an email for participants to reach out.</p>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Eligibility</label>
            <input
              type="text"
              name="eligibility"
              value={fields.eligibility}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
            <p className="text-sm text-gray-500">Specify who is eligible to participate.</p>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Visibility</label>
            <select
              name="mode"
              value={fields.mode}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
            <p className="text-sm text-gray-500">Choose whether the hackathon is public or private.</p>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Maximum Users</label>
            <input
              type="number"
              name="max_users"
              value={fields.max_users}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
              required
            />
            <p className="text-sm text-gray-500">Enter the maximum number of participants allowed.</p>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
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

