"use client";

import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  Search,
  Star,
  Trash2,
  Edit2,
  Calendar,
  Users,
  MapPin,
  Phone,
  Mail,
  Award,
  Building,
  Info,
  Tag,
  User,
  Bell,
  Loader2,
  ChevronDown,
  ChevronUp,
  Globe,
  Lock
} from 'lucide-react';
import { globalContext } from '@/context_api/globalContext';



// essesntial 1
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

const Hackathons = () => {
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(false);
  const [hackathon, setHackathon] = useState(null);
  const [featuredHackathons, setFeaturedHackathons] = useState([]);
  const [expandedSection, setExpandedSection] = useState('');
  const {admin} = useContext(globalContext);

  useEffect(() => {
    fetchFeaturedHackathons();
  }, []);


  // fetching featured hackathons
  const fetchFeaturedHackathons = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/featured`);
      if (res.data.res) {
        setFeaturedHackathons(res.data.hackathons);
      }
    } catch (error) {
      console.error('Error fetching featured hackathons:', error);
    }
  };



// fetching hackathon by id
  const fetchHackathon = async () => {
    if (!searchId.trim()) {
      toast.error('Please enter a hackathon ID'); 
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/hackathon/one?id=${searchId}`);
      if (res.data.res) {
        console.log(res.data.hackathon);
        setHackathon(res.data.hackathon);
      } else {
        toast.error(res.data.message || 'Hackathon not found');
      }
    } catch (error) {
      console.error('Error fetching hackathon:', error);
      toast.error('Failed to fetch hackathon details');
    } finally {
      setLoading(false);
    }
  };


  // deleting hackathon
  const handleDelete = async () => {
    if (!hackathon?._id) return;
    
    if (!confirm('Are you sure you want to delete this hackathon?')) return;

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/deleteHackathon/`,{
        adminId : admin._id, hackathonId: hackathon._id
      }); 
      if (res.data.res) {
        toast.success('Hackathon deleted successfully');
        setHackathon(null);
        fetchFeaturedHackathons();
      }
    } catch (error) {
      console.error('Error deleting hackathon:', error);
      toast.error('Failed to delete hackathon');
    }
  };


  // handle submit
  const handleSubmit = async (e)=>{
    e.preventDefault();

    try{

      if(!admin._id || !hackathon._id){
        toast.error("Invalid request");
        return;
      }

      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/updatehackathon`,{
        hackathonId: hackathon._id, adminId: admin._id, updatedObject: hackathon
      })

      if(res.data.res){
        toast.success("Hackathon updated successfully");
        setHackathon(res.data.hackathon);
      }else{
        toast.error(res.data.msg || "Failed to update hackathon");
      }


    }
    catch(err){
      console.log(err);
      toast.error("Error occurred");
    }
  }



  // access check
  if(!admin?.hasHackathonsAccess){
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg
          p-6 space-y-4 max-w-lg text-center">
          <h1 className="text-xl font-semibold text-gray-900">Access Denied</h1>
          <p className="text-gray-600">You do not have access to this page</p>
        </div>
      </div>
    );
  }


  return (
    <div className="space-y-6">
      {/* Search Section */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex-grow w-full sm:w-auto">
            <div className="relative">
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter Hackathon ID"
                className="w-full px-4 py-2 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
          <button
            onClick={fetchHackathon}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Search</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Featured Hackathons Section */}
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <span>Featured Hackathons</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredHackathons.map((hack) => (
            <div key={hack._id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <h3 className="font-medium text-gray-900 text-sm">{hack.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(hack.start_date).toDateString()} - {new Date(hack.end_date).toDateString()}
              </p>
              <p><small>Organized By - {hack.conducted_by}</small></p>
              <small>ID : {hack._id}</small>
            </div>
          ))}
          {
            featuredHackathons.length === 0 && <p className="text-gray-500 text-sm">No featured hackathons found</p>
          }
        </div>
      </div>

      {/* Hackathon Details Form */}
      {hackathon && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Edit Hackathon</h2>
                <p className="text-gray-500 mt-1">Update hackathon information</p>
              </div>
            </div>
          </div>

          <form className="p-6 space-y-6" >
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={hackathon.title}
                    onChange={(e) => setHackathon({ ...hackathon, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
                  <input
                    type="text"
                    value={hackathon.team_size}
                    onChange={(e) => setHackathon({ ...hackathon, team_size: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="datetime-local"
                    value={hackathon.start_date && formatDateTime(hackathon.start_date)}
                    onChange={(e) => setHackathon({ ...hackathon, start_date: new Date(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="datetime-local"
                    value={hackathon.end_date && formatDateTime(hackathon.end_date)}
                    onChange={(e) => setHackathon({ ...hackathon, end_date: new Date(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
                  <select
                    value={hackathon.mode}
                    onChange={(e) => setHackathon({ ...hackathon, mode: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={hackathon.location || ''}
                    onChange={(e) => setHackathon({ ...hackathon, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Participants</label>
                  <input
                    type="number"
                    value={hackathon.max_users}
                    onChange={(e) => setHackathon({ ...hackathon, max_users: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Access Type</label>
                  <select
                    value={hackathon.isPrivate ? 'private' : 'public'}
                    onChange={(e) => setHackathon({ ...hackathon, isPrivate: e.target.value === 'private' })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>

                {/* featured or not*/}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Featured</label>
                  <select
                    value={hackathon.featured ? 'featured' : 'not-featured'}
                    onChange={(e) => setHackathon({ ...hackathon, featured: e.target.value === 'featured' })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="not-featured">Not Featured</option>
                    <option value="featured">Featured</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={hackathon.phone}
                    onChange={(e) => setHackathon({ ...hackathon, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={hackathon.email}
                    onChange={(e) => setHackathon({ ...hackathon, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Description</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
                  <textarea
                    value={hackathon.about}
                    onChange={(e) => setHackathon({ ...hackathon, about: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
                  <textarea
                    value={hackathon.description}
                    onChange={(e) => setHackathon({ ...hackathon, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility</label>
                  <textarea
                    value={hackathon.eligibility || ''}
                    onChange={(e) => setHackathon({ ...hackathon, eligibility: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Lists */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Themes (comma-separated)</label>
                  <textarea
                    value={hackathon.themes.join(', ')}
                    onChange={(e) => setHackathon({ ...hackathon, themes: e.target.value.split(',').map(item => item.trim()) })}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prizes (comma-separated)</label>
                  <textarea
                    value={hackathon.prizes.join(', ')}
                    onChange={(e) => setHackathon({ ...hackathon, prizes: e.target.value.split(',').map(item => item.trim()) })}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Judges (comma-separated)</label>
                  <textarea
                    value={hackathon.judges.join(', ')}
                    onChange={(e) => setHackathon({ ...hackathon, judges: e.target.value.split(',').map(item => item.trim()) })}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organizers (comma-separated)</label>
                  <textarea
                    value={hackathon.organizers.join(', ')}
                    onChange={(e) => setHackathon({ ...hackathon, organizers: e.target.value.split(',').map(item => item.trim()) })}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Partners (comma-separated)</label>
                  <textarea
                    value={hackathon.partners.join(', ')}
                    onChange={(e) => setHackathon({ ...hackathon, partners: e.target.value.split(',').map(item => item.trim()) })}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Conducted By</label>
                  <input
                    type="text"
                    value={hackathon.conducted_by}
                    onChange={(e) => setHackathon({ ...hackathon, conducted_by: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleDelete}
                className="px-6 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 flex items-center gap-2"
              >
                <Trash2 className="h-5 w-5" />
                Delete Hackathon
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
              >
                <Edit2 className="h-5 w-5" />
                Update Hackathon
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

// Helper Components
const Section = ({ icon: Icon, title, children, isExpanded, onToggle }) => (
  <div className="border-t border-gray-200">
    <button
      onClick={onToggle}
      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-gray-400" />
        <span className="font-medium text-gray-900">{title}</span>
      </div>
      {isExpanded ? (
        <ChevronUp className="h-5 w-5 text-gray-400" />
      ) : (
        <ChevronDown className="h-5 w-5 text-gray-400" />
      )}
    </button>
    {isExpanded && <div className="px-6 py-4">{children}</div>}
  </div>
);

const InfoItem = ({ icon: Icon, label, children }) => (
  <div className="flex items-start gap-3">
    <Icon className="h-5 w-5 text-gray-400 mt-0.5" />
    <div>
      <span className="text-sm text-gray-500 block">{label}</span>
      <span className="text-gray-900">{children}</span>
    </div>
  </div>
);

export default Hackathons;