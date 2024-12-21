"use client";
import { useContext, useState } from 'react';
import { 
  Edit, Trash, Eye, Send, Download,
  ChevronDown, ChevronUp, Check, User,
  ChevronLeft
} from 'lucide-react';
import { globalContext } from '@/context_api/globalContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const HeaderActions = ({ onEdit, onDelete, onView }) => (
  <div className="flex gap-2">
    <button 
      onClick={onEdit} 
      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
    >
      <Edit className="w-4 h-4" /> <span>Edit</span>
    </button>
    <button 
      onClick={onView} 
      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
    >
      <Eye className="w-4 h-4" /> <span>View</span>
    </button>
    <button 
      onClick={onDelete} 
      className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
    >
      <Trash className="w-4 h-4" /> <span>Delete</span>
    </button>
  </div>
);

const NotificationSection = ({ 
  notification, 
  setNotification, 
  onSend, 
  notifications, 
  showNotifications, 
  toggleNotifications 
}) => (
  <div className="space-y-4">
    <div className="flex flex-col gap-3">
      <textarea
        value={notification}
        onChange={(e) => setNotification(e.target.value)}
        placeholder="Write a message to all participants..."
        className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows="3"
      />
      <div className="flex justify-between items-center">
        <button 
          onClick={onSend} 
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Send className="w-4 h-4" /> Send Notification
        </button>
        <button 
          onClick={toggleNotifications}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          {showNotifications ? "Hide Notifications" : "View All Notifications"}
        </button>
      </div>
    </div>

    {showNotifications && notifications.length > 0 && (
      <div className="space-y-3 mt-4">
        {notifications.map((notif, i) => (
          <div key={i} className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-800 text-sm">{notif.message}</p>
            <time className="text-xs text-gray-500 mt-1 block">
              {new Date(notif.date).toLocaleString()}
            </time>
          </div>
        ))}
      </div>
    )}
  </div>
);

const TeamCard = ({ team, index, isExpanded, onToggle, onApprove, isApproved }) => (
  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-blue-600">#{index + 1}</span>
          <h3 className="text-base font-medium text-gray-900">{team.teamName}</h3>
        </div>
        <button
          onClick={onToggle}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Project Idea</h4>
            <p className="text-sm text-gray-600">{team.idea}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-3">Team Members</h4>
            <div className="space-y-3">
              {team.teamMembers?.map((member, j) => (
                <div key={j} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!isApproved && (
            <div className="flex justify-end pt-2">
              <button 
                onClick={onApprove}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                <Check className="w-4 h-4" /> Approve Team
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/10 py-4 pt-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => router.push('/host/dashboard')}
          className="group mb-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 
                    bg-white/80 rounded-lg border border-gray-200 hover:bg-gray-50
                    transition-all duration-200"
        >
          <ChevronLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-100 mb-6">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{hackathon?.title}</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your hackathon event</p>
          </div>
          <HeaderActions
            onEdit={handleEdit}
            onDelete={() => handleDelete(hackathon._id)}
            onView={() => handleView(hackathon._id)}
          />
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Notifications
          </h2>
          <NotificationSection 
            notification={notification}
            setNotification={setNotification}
            onSend={sendNotification}
            notifications={notifications}
            showNotifications={showNotification}
            toggleNotifications={() => setShowNotification(!showNotification)}
          />
        </div>

        {/* Teams Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {activeSection === 'approved' ? 'Approved Teams' : 'Registered Teams'}
            </h2>
            <div className="flex gap-4">
              <button
                onClick={() => setActiveSection('registered')}
                className={`text-sm font-medium ${
                  activeSection === 'registered' 
                    ? 'text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Registered
              </button>
              <button
                onClick={() => setActiveSection('approved')}
                className={`text-sm font-medium ${
                  activeSection === 'approved' 
                    ? 'text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Approved
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {(activeSection === 'approved' ? approvedUsers : users).map((team, i) => (
              <TeamCard
                key={i}
                team={team}
                index={i}
                isExpanded={expandedTeam === `${activeSection}-${i}`}
                onToggle={() => toggleExpand(activeSection, i)}
                onApprove={() => handleApproveIdea(hackathon._id, team.teamName)}
                isApproved={activeSection === 'approved'}
              />
            ))}
          </div>

          {/* Export Button */}
          <div className="mt-8 flex justify-center">
            <button 
              onClick={exportUsersToCSV}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Download className="w-4 h-4" /> Export to CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonManagePage;
