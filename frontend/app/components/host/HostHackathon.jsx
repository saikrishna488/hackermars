"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const HostHackathon = () => {
  const router = useRouter();
  const [step, setStep] = useState(1); // Track current form page

  const [fields, setFields] = useState({
    title: '',
    image: null,
    team_size: '',
    about: '',
    themes: [],
    judges: [''],
    organizers: [''],
    description: '',
    partners: [''],
    prizes: [],
    date: '',
    mode: '',
    phone: '',
    email: '',
    max_users: '',
    eligibility: '',
    isPrivate: false,
    start_time: '',
    end_time: '',
    conducted_by: '',
    client_id: ''
  });

  const handleNext = () => {
    setStep(step + 1); // Go to next form page
  };

  const handlePrevious = () => {
    setStep(step - 1); // Go back to previous page
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  return (
    <div className="container mt-16 mx-auto p-6">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Host Your Hackathon
        </h2>

        {/* Step 1 - Basic Information */}
        {step === 1 && (
          <>
            <div className="mb-4">
              <label className="block font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={fields.title}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
              <p className="text-sm text-gray-500">Enter the title of your hackathon.</p>
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
              <p className="text-sm text-gray-500">Upload an image or logo for the hackathon.</p>
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Team Size</label>
              <input
                type="number"
                name="team_size"
                value={fields.team_size}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
              <p className="text-sm text-gray-500">Specify the maximum team size allowed.</p>
            </div>
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-md"
              onClick={handleNext}
            >
              Next
            </button>
          </>
        )}

        {/* Step 2 - Hackathon Details */}
        {step === 2 && (
          <>
            <div className="mb-4">
              <label className="block font-medium mb-1">About</label>
              <textarea
                name="about"
                value={fields.about}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
              <p className="text-sm text-gray-500">Write a brief description of the hackathon.</p>
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Themes</label>
              <input
                type="text"
                name="themes"
                value={fields.themes}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
              <p className="text-sm text-gray-500">Enter relevant themes (comma-separated).</p>
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Judges</label>
              <input
                type="text"
                name="judges"
                value={fields.judges}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
              <p className="text-sm text-gray-500">List the judges (comma-separated).</p>
            </div>
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-md mb-2"
              onClick={handleNext}
            >
              Next
            </button>
            <button
              className="w-full bg-gray-500 text-white py-2 rounded-md"
              onClick={handlePrevious}
            >
              Back
            </button>
          </>
        )}

        {/* Step 3 - Contact & Other Information */}
        {step === 3 && (
          <>
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
              <p className="text-sm text-gray-500">Specify who is eligible to participate (students, professionals, etc.).</p>
            </div>
            <button
              className="w-full bg-gray-500 text-white py-2 rounded-md mb-2"
              onClick={handlePrevious}
            >
              Back
            </button>
            <button
              className="w-full bg-green-500 text-white py-2 rounded-md"
            >
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default HostHackathon;
