"use client";

import React from 'react';
import { PlusCircle } from 'lucide-react'; // Importing the PlusCircle icon

const demoUser = {
  events: [
    {
      title: 'Hackathon 2024',
      description: 'A 48-hour coding competition.',
      date: '2024-12-01',
      status: 'Upcoming',
    },
    {
      title: 'AI Summit 2023',
      description: 'A conference on AI advancements.',
      date: '2023-11-15',
      status: 'Completed',
    },
    {
      title: 'Web Dev Workshop',
      description: 'A workshop for beginners in web development.',
      date: '2023-10-20',
      status: 'Ongoing',
    },
  ],
};

const Dashboard = () => {
  const user = demoUser; // Replace with actual user context when ready

  return (
    <div className="p-6 bg-gray-100 min-h-screen pt-24">
      <h1 className="text-2xl font-bold text-center mb-8">Hosted Hackathons</h1> {/* Reduced text size */}

      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">My Organized Events</h2> {/* Reduced text size */}
          <button className="flex items-center bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-500 transition duration-300">
            <PlusCircle className="w-4 h-4 mr-2" /> {/* Slightly reduced icon size */}
            Host New Hackathon
          </button>
        </div>

        {user?.events?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.events.map((event, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 rounded-lg shadow-md bg-white hover:bg-gray-50 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <h3 className="text-lg font-semibold text-blue-600">
                  {event.title}
                </h3>{" "}
                {/* Reduced text size */}
                <p className="mt-1 text-sm text-gray-700">
                  <strong>Description:</strong> {event.description}
                </p>{" "}
                {/* Reduced text size */}
                <p className="mt-1 text-sm text-gray-700">
                  <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                </p>{" "}
                {/* Reduced text size */}
                <p
                  className={`mt-1 text-sm font-semibold ${
                    event.status === "Upcoming"
                      ? "text-green-600"
                      : event.status === "Ongoing"
                      ? "text-yellow-600"
                      : "text-gray-600"
                  }`}
                >
                  <strong>Status:</strong> {event.status}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-600">No events organized yet.</p> // Reduced text size
        )}
      </div>
    </div>
  );
};

export default Dashboard;
