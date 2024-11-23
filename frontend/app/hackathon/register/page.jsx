"use client";
import { globalContext } from '@/context_api/globalContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { 
  PlusCircle, 
  MinusCircle, 
  Users, 
  Lightbulb, 
  Flag, 
  Mail, 
  User,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

const RegisterPage = () => {
    const { hackathon, setUser, user } = useContext(globalContext);
    const router = useRouter();
    const [team, setTeam] = useState({
        teamName: '',
        idea: '',
        teamMembers: [
            { name: user.name, email: user.email },
        ],
    });

    const handleParticipantChange = (index, field, value) => {
        setTeam({
            ...team,
            teamMembers: team.teamMembers.map((p, i) => 
                i === index ? {...p, [field]: value} : p
            )
        });
    };

    const addParticipant = () => {
        setTeam({
            ...team,
            teamMembers: [...team.teamMembers, { name: '', email: '' }]
        });
    };

    const removeParticipant = (index) => {
        if (team.teamMembers.length > 1) {
            setTeam({
                ...team,
                teamMembers: team.teamMembers.filter((_, i) => i !== index)
            });
        } else {
            toast.error('Team must have at least one participant');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const teamsize = hackathon.teamSize;

        if (team.teamMembers.length > teamsize) {
            toast.error('Team size cannot be greater than ' + teamsize);
            return;
        }

        if (team.teamName.length < 5) {
            toast.error('Team name must be at least 5 characters long');
            return;
        }

        if (team.idea.length < 10) {
            toast.error('Idea must be at least 10 characters long');
            return;
        }

        try {
            const res = await axios.post(
                process.env.NEXT_PUBLIC_BACKEND_URL + '/hackathon/register',
                {
                    teamName: team.teamName,
                    idea: team.idea,
                    teamMembers: team.teamMembers,
                    hackathon_id: hackathon._id
                }
            );

            if (res.data.res) {
                toast.success(res.data.msg);
                setUser(res.data.user);
                router.push('/hackathon/' + hackathon._id);
            } else {
                toast.error(res.data.msg);
            }
        } catch (err) {
            console.log(err);
            toast.error('Error occurred ...');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Join {hackathon.title}
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 w-fit mx-auto">
                        <Users className="w-4 h-4" />
                        <span>Team size: 1-{hackathon.team_size} members</span>
                    </div>
                </div>

                {/* Main Form */}
                <div className="bg-white shadow-lg border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-xl">
                    <form onSubmit={handleSubmit} className="divide-y divide-gray-100">
                        {/* Team Info Section */}
                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <Flag className="w-5 h-5 text-blue-600" />
                                </div>
                                <h2 className="text-lg font-semibold text-gray-900">Team Information</h2>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Team Name
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                                        placeholder="Enter a creative team name"
                                        value={team.teamName}
                                        onChange={(e) => setTeam({...team, teamName: e.target.value})}
                                    />
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Project Idea
                                        </label>
                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                            team.idea.length >= 400 ? 'bg-yellow-50 text-yellow-700' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            {team.idea.length}/500
                                        </span>
                                    </div>
                                    <textarea
                                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                                        rows="4"
                                        placeholder="Describe your innovative idea..."
                                        value={team.idea}
                                        onChange={(e) => setTeam({...team, idea: e.target.value})}
                                        maxLength={500}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Team Members Section */}
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <Users className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <h2 className="text-lg font-semibold text-gray-900">Team Members</h2>
                                </div>
                                <button
                                    type="button"
                                    onClick={addParticipant}
                                    disabled={team.teamMembers.length >= hackathon.team_size}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-xl text-blue-600 bg-blue-50 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    <PlusCircle className="w-4 h-4 mr-2" />
                                    Add Member
                                </button>
                            </div>

                            <div className="space-y-4">
                                {team.teamMembers.map((participant, index) => (
                                    <div 
                                        key={index} 
                                        className="bg-gray-50 rounded-xl p-5 border border-gray-100 transition-all duration-200 hover:border-gray-200"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-sm font-medium px-3 py-1 bg-white rounded-full border border-gray-200 text-gray-700">
                                                {index === 0 ? '👑 Team Leader' : `👤 Member ${index + 1}`}
                                            </span>
                                            {index !== 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeParticipant(index)}
                                                    className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1.5 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors duration-200"
                                                >
                                                    <MinusCircle className="w-4 h-4" />
                                                    Remove
                                                </button>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="relative group">
                                                <User className="absolute left-4 top-3 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                                                <input
                                                    type="text"
                                                    className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                    placeholder="Full Name"
                                                    value={participant.name}
                                                    onChange={(e) => handleParticipantChange(index, 'name', e.target.value)}
                                                />
                                            </div>
                                            <div className="relative group">
                                                <Mail className="absolute left-4 top-3 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                                                <input
                                                    type="email"
                                                    className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                    placeholder="Email Address"
                                                    value={participant.email}
                                                    onChange={(e) => handleParticipantChange(index, 'email', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit Section */}
                        <div className="px-8 py-6 bg-gray-50">
                            <button
                                type="submit"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 hover:shadow-lg"
                            >
                                Register Team
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;