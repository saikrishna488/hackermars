"use client";
import React from 'react';
import { FaTasks, FaUserCheck, FaClipboardList } from 'react-icons/fa';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Demo data
const practiceData = [
    {
        title: "Binary Search",
        description: "Learn and practice problems on Binary Search.",
        attempts: 120,
        tests: 15,
        progress: 70,
    },
    {
        title: "Dynamic Programming",
        description: "Improve your problem-solving skills with DP problems.",
        attempts: 85,
        tests: 10,
        progress: 50,
    },
    {
        title: "Graph Algorithms",
        description: "Practice Graph traversal and path-finding algorithms.",
        attempts: 200,
        tests: 25,
        progress: 90,
    },
    {
        title: "Sorting Techniques",
        description: "Understand and implement various sorting algorithms.",
        attempts: 180,
        tests: 20,
        progress: 80,
    },
];

const Practice = () => {
    return (
        <div className="relative pt-24 flex flex-wrap lg:flex-nowrap gap-4 w-full p-6">
            {/* Cards Section (70% Width) */}
            <div className="lg:w-[70%] w-full space-y-6 h-[500px] overflow-y-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Practice Problems</h2>
                <div className="flex flex-wrap gap-4">
                    {practiceData.map((problem, index) => (
                        <div key={index} className="w-[250px] bg-white rounded-lg shadow-md p-3 flex flex-col space-y-2 border hover:border-blue-400 transition duration-300">
                            <div className="flex items-center space-x-3">
                                <div className="w-[40px] h-[40px]">
                                    <CircularProgressbar
                                        value={problem.progress}
                                        text={`${problem.progress}%`}
                                        styles={buildStyles({
                                            pathColor: `rgba(62, 152, 199, ${problem.progress / 100})`,
                                            textColor: '#4a5568',
                                            trailColor: '#d6d6d6',
                                            textSize: '24px',
                                        })}
                                    />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">{problem.title}</h3>
                            </div>
                            <p className="text-sm text-gray-600">{problem.description}</p>
                            <div className="flex justify-between items-center mt-2">
                                <div className="text-gray-600 flex items-center space-x-2">
                                    <FaUserCheck className="text-blue-500" />
                                    <span className="text-sm">{problem.attempts} Attempts</span>
                                </div>
                                <div className="text-gray-600 flex items-center space-x-2">
                                    <FaClipboardList className="text-green-500" />
                                    <span className="text-sm">{problem.tests} Tests</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats Section (30% Width) */}
            <div className="lg:w-[30%] w-full">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Stats</h3>
                    <ul className="space-y-4">
                        <li className="flex items-center justify-between">
                            <span className="text-gray-600">Total Problems</span>
                            <span className="text-gray-800 font-bold">50</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-gray-600">Solved Problems</span>
                            <span className="text-gray-800 font-bold">30</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-gray-600">Pending Problems</span>
                            <span className="text-gray-800 font-bold">20</span>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-gray-600">Total Tests Taken</span>
                            <span className="text-gray-800 font-bold">60</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Practice;
