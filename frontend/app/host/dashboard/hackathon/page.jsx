'use client';

import { useContext, useState } from 'react';
import { LucideUser, LucideSend, LucideEdit, LucideTrash, LucideDownload, LucideEye, LucideChevronDown, LucideChevronUp, LucideCheck, LucideBell, LucideUsers, LucideUserCheck } from 'lucide-react';
import { globalContext } from '@/context_api/globalContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const HackathonManagePage = () => {
  const [notification, setNotification] = useState('');
  const { hackathon, setHackathon, user } = useContext(globalContext);
  const [users, setUsers] = useState(hackathon?.registered_users?.filter(user => user.status !== true) || []);
  const [approvedUsers, setApprovedUsers] = useState(hackathon?.registered_users?.filter(user => user.status === true) || []);
  const [expandedTeam, setExpandedTeam] = useState(null);
  const [activeSection, setActiveSection] = useState('registered');
  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState(hackathon?.notifications || []);
  const router = useRouter();

  const toggleExpand = (section, teamId) => {
    setExpandedTeam(expandedTeam === `${section}-${teamId}` ? null : `${section}-${teamId}`);
  };

  const sendNotification = async () => {
    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/hackathon/notify', {
        hackathon_id: hackathon._id,
        message: user.organization + ": " + notification,
        client_id: hackathon.client_id
      }, {
        headers: { "Content-Type": "application/json" }
      });

      if (res.data.res) {
        toast.success(res.data.msg);
        setNotifications([...notifications, { message: notification, date: new Date().toLocaleString() }]);
      } else {
        toast.error(res.data.msg);
      }
    } catch (err) {
      toast.error("Error Occurred");
      console.log(err)
    }
    setNotification('');
  };

  const handleEdit = () => router.push('/host/hosthackathon');

  const handleDelete = async (id) => {
    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/hackathon/delete', { id }, {
        headers: { "Content-Type": "application/json" }
      });
      res.data.res ? toast.success(res.data.msg) : toast.error(res.data.msg);
      router.push('/host/dashboard');
    } catch {
      toast.error("Error occurred");
    }
  };

  const handleView = (id) => router.push('/hackathon/' + id);

  const exportUsersToCSV = () => {
    if (approvedUsers.length === 0) {
      toast.error("No Approved users");
      return;
    }

    const header = ["Team Name", "Idea", "Member Name", "Member Email"];
    const rows = approvedUsers.flatMap(team =>
      team.teamMembers.map(member => [
        team.teamName,
        `"${team.idea.replace(/"/g, '""')}"`,
        member.name,
        member.email
      ])
    );

    const csvContent = [
      header.join(","),
      ...rows.map(e => e.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'registered_users.csv';
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleApproveIdea = async (hackathon_id, teamName) => {
    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + '/hackathon/teamidea', {
        hackathon_id, teamName, status: true,
        client_id: hackathon.client_id
      }, {
        headers: { "Content-Type": "application/json" }
      });

      if (res.data.res) {
        toast.success(res.data.msg);
        setHackathon(res.data.hackathon);
        setUsers(users.filter((team) => team.teamName !== teamName));
        setApprovedUsers([...approvedUsers, users.find((team) => team.teamName === teamName)]);
        setExpandedTeam(null);
      } else {
        toast.error(res.data.msg);
      }
    } catch (err) {
      toast.error("Error occurred");
      console.log(err)
    }
  }

  if (!hackathon?.title) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">{hackathon.title}</h1>
          <div className="flex flex-wrap gap-2">
            <button onClick={handleEdit} className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <LucideEdit className="w-4 h-4 mr-2" /> Edit
            </button>
            <button onClick={() => handleDelete(hackathon._id)} className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
              <LucideTrash className="w-4 h-4 mr-2" /> Delete
            </button>
            <button onClick={() => handleView(hackathon._id)} className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <LucideEye className="w-4 h-4 mr-2" /> View
            </button>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="mb-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900 mb-2">Send Notification</h2>
            <div className="mt-1 relative rounded-md shadow-sm">
              <textarea
                value={notification}
                onChange={(e) => setNotification(e.target.value)}
                placeholder="Write a message to all participants..."
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 outline-none"
                rows="3"
              />
            </div>
            <div className="mt-2 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <button 
                onClick={sendNotification}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-2 sm:mb-0"
              >
                <LucideSend className="w-4 h-4 mr-2" /> Send
              </button>
              <button 
                onClick={() => setShowNotification(!showNotification)}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                {showNotification ? "Hide Notifications" : "View All Notifications"}
              </button>
            </div>
          </div>

          {showNotification && (
            <div className="mt-4 space-y-4">
              {notifications.map((notif, i) => (
                <div key={i} className="bg-gray-50 px-4 py-3 sm:px-6 rounded-md">
                  <p className="text-sm text-gray-700">{notif.message}</p>
                  <p className="mt-1 text-xs text-gray-500">{new Date(notif.date).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">Select a tab</label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            onChange={(e) => setActiveSection(e.target.value)}
            value={activeSection}
          >
            <option value="registered">Registered Teams</option>
            <option value="approved">Approved Teams</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {['registered', 'approved'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSection(tab)}
                  className={`${
                    activeSection === tab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  {tab === 'registered' ? (
                    <LucideUsers className="w-5 h-5 inline-block mr-2" />
                  ) : (
                    <LucideUserCheck className="w-5 h-5 inline-block mr-2" />
                  )}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Teams
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {(activeSection === 'approved' ? approvedUsers : users).map((team, i) => (
            <li key={i}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">
                    <span className="text-indigo-600 mr-2">{i + 1}.</span> {team.teamName}
                  </h3>
                  <button
                    onClick={() => toggleExpand(activeSection, activeSection === 'registered' ? i : team.teamName)}
                    className="ml-2 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {expandedTeam === `${activeSection}-${activeSection === 'registered' ? i : team.teamName}` 
                      ? <LucideChevronUp className="h-5 w-5" />
                      : <LucideChevronDown className="h-5 w-5" />
                    }
                  </button>
                </div>

                {expandedTeam === `${activeSection}-${activeSection === 'registered' ? i : team.teamName}` && (
                  <div className="mt-4 border-t border-gray-200 pt-4">
                    <div className="bg-gray-50 rounded-md p-4 mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Project Idea:</h4>
                      <p className="text-sm text-gray-600">{team.idea}</p>
                    </div>

                    <h4 className="text-sm font-medium text-gray-900 mb-2">Team Members:</h4>
                    <ul className="divide-y divide-gray-200">
                      {team.teamMembers?.map((member, j) => (
                        <li key={j} className="py-3 flex items-center">
                          <div className="flex-shrink-0">
                            <LucideUser className="h-6 w-6 rounded-full text-indigo-600" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-500">{member.email}</p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {activeSection === 'registered' && (
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() => handleApproveIdea(hackathon._id, team.teamName)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <LucideCheck className="w-4 h-4 mr-2" /> Approve Team
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex justify-center">
        <button 
          onClick={exportUsersToCSV}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <LucideDownload className="w-4 h-4 mr-2" /> Export to CSV
        </button>
      </div>
    </div>
  );
};

export default HackathonManagePage;
