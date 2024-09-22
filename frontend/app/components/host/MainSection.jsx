"use client";
import React, { useState, useRef } from 'react';
import { Upload, Users, Info, Calendar, Phone, Mail, Clock, Bold, Italic, Trophy, Gavel } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const MainSection = ({ client, fields, setFields }) => {
  const [aboutFormat, setAboutFormat] = useState('');
  const [descriptionFormat, setDescriptionFormat] = useState('');
  const textareaRefAbout = useRef(null);
  const textareaRefDescription = useRef(null);
  const router = useRouter()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const handleFileChange = (e) => {
    setFields({ ...fields, image: e.target.files[0] });
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    setFields((prev) => ({
      ...prev,
      themes: prev.themes.includes(value)
        ? prev.themes.filter((theme) => theme !== value)
        : [...prev.themes, value],
    }));
  };










  // validate form
  const validateFields = () => {
    if (fields.title.length < 6) {
      return { valid: false, message: "Title must be at least 6 characters." };
    }
    
    if (!fields.image) {
      return { valid: false, message: "Image is required." };
    }
    
    if (fields.team_size === '') {
      return { valid: false, message: "Team size must be a number." };
    }
    
    if (fields.about.length < 1) {
      return { valid: false, message: "About section cannot be empty." };
    }
  
    if (fields.themes.length === 0) {
      return { valid: false, message: "At least one theme is required." };
    }
  
    if (fields.judges.some(judge => judge === '')) {
      return { valid: false, message: "All judges must be filled in." };
    }
  
    if (fields.organizers.some(organizer => organizer === '')) {
      return { valid: false, message: "All organizers must be filled in." };
    }
  
    if (fields.description.length < 1) {
      return { valid: false, message: "Description is required." };
    }
  
    if (fields.partners.some(partner => partner === '')) {
      return { valid: false, message: "All partners must be filled in." };
    }
  
    if (fields.prizes.length === 0) {
      return { valid: false, message: "At least one prize is required." };
    }
  
    if (fields.date === '') {
      return { valid: false, message: "Date is required." };
    }
  
    if (fields.mode === '') {
      return { valid: false, message: "Mode is required." };
    }
  
    if (!/^\d{10}$/.test(fields.phone)) {
      return { valid: false, message: "Phone must be a valid 10-digit number." };
    }
  
    if (!/^\S+@\S+\.\S+$/.test(fields.email)) {
      return { valid: false, message: "Email must be valid." };
    }
  
    if (!/^\d+$/.test(fields.max_users) || fields.max_users === '') {
      return { valid: false, message: "Max users must be a number." };
    }
  
    if (!/^\d+$/.test(fields.fee) && fields.fee !== '') {
      return { valid: false, message: "Fee must be a valid number or 0." };
    }
  
    if (fields.eligibility === '') {
      return { valid: false, message: "Eligibility is required." };
    }
  
    if (fields.start_time === '') {
      return { valid: false, message: "Start time is required." };
    }
  
    if (fields.end_time === '') {
      return { valid: false, message: "End time is required." };
    }
  
    if (fields.conducted_by === '') {
      return { valid: false, message: "Conducted by field is required." };
    }
  
    // If all validations pass
    return { valid: true };
  };
  

  const handlePublish = async () => {

    const validate = validateFields()
    if(!validate.valid){
      toast.error(validate.message)
      console.log(validate)
      return null
    }

    
    try{

      const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + "/hackathon/add",fields,{
        headers :{
          "Content-Type" : "multipart/form-data"
        }
      });

      const data = res.data;

      if(data.res){
        toast.success("Hackathon added")
        router.push("/hackathon/"+data.hackathon._id)
      }
      else{
        toast.error(data.msg)
      }

    }
    catch(err){
      console.log(err);
      toast.error("Error occured")
    }
  };

  const handleVisibility = (e)=>{
    const {name,value} = e.target
    setFields({...fields, isPrivate : value == "public" ? false : true})
  }




  const formatText = (textareaRef, format) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    if (selectedText) {
      const formattedText = format === 'bold' ? `**${selectedText}**` : `*${selectedText}*`;
      textarea.setRangeText(formattedText, start, end, 'end');
      textarea.focus();
    }
  };

  return (
    <main className="lg:w-3/4 p-4 overflow-y-auto">
      <h4 className="text-center mb-6 text-3xl font-bold text-gray-900">Hackathon Details</h4>

      {/* Title Field */}
      <div id="title" className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200 transition duration-200 hover:shadow-lg">
        <label className="block font-semibold mb-2 flex items-center">
          <Info className="mr-2 text-blue-600" /> Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={fields.title}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 hover:border-blue-500"
          placeholder="Enter hackathon title"
        />
        <small className="text-gray-500 mt-2">Please provide a descriptive title for the hackathon.</small>
      </div>


      <div id="conducted_by" className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200 transition duration-200 hover:shadow-lg">
        <label className="block font-semibold mb-2 flex items-center">
          <Info className="mr-2 text-blue-600" /> Conducted By <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          disabled={true}
          value={fields.conducted_by}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 hover:border-blue-500"
          placeholder="Enter hackathon title"
        />
        <small className="text-gray-500 mt-2">Users will see this name</small>
      </div>


      {/* Maximum Users Field */}
      <div id="max_users" className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200 transition duration-200 hover:shadow-lg">
        <label className="block font-semibold mb-2 flex items-center">
          <Users className="mr-2 text-blue-600" /> Maximum Users to be Registered <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="max_users"
          value={fields.max_users}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 hover:border-blue-500"
          placeholder="Enter maximum number of users"
        />
        <small className="text-gray-500 mt-2">Specify the maximum number of users that can register.</small>
      </div>


      {/* Image Upload Field */}
      <div id="image" className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200 transition duration-200 hover:shadow-lg">
        <label className="font-semibold mb-2 flex items-center">
          <Upload className="mr-2 text-blue-600" /> Upload Poster <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 hover:border-blue-500"
        />
        <small className="text-gray-500 mt-2">Upload a representative image for the hackathon.</small>
      </div>


      {/* Team Size Dropdown */}
      <div id="team_size" className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200 transition duration-200 hover:shadow-lg">
        <label className="font-semibold mb-2 flex items-center">
          <Users className="mr-2 text-blue-600" /> Team Size <span className="text-red-500">*</span>
        </label>
        <select
          name="team_size"
          value={fields.team_size}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 hover:border-blue-500"
        >
          <option value="">Select team size</option>
          <option value="1-4">1-4</option>
          <option value="2-4">2-4</option>
          <option value="4">4</option>
        </select>
        <small className="text-gray-500 mt-2">Choose the size of the team for the hackathon.</small>
      </div>



      {/* Mode Dropdown */}
      <div id="mode" className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200 transition duration-200 hover:shadow-lg">
        <label className="font-semibold mb-2 flex items-center">
          <Info className="mr-2 text-blue-600" /> Mode <span className="text-red-500">*</span>
        </label>
        <select
          name="mode"
          value={fields.mode}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 hover:border-blue-500"
        >
          <option value="">Select mode</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
        <small className="text-gray-500 mt-2">Choose the format of the hackathon (e.g., Online or Offline).</small>
      </div>


      {/* About Section */}
      <div id="about" className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200 transition duration-200 hover:shadow-lg">
        <label className="block font-semibold mb-2 flex items-center">
          <Info className="mr-2 text-blue-600" /> About <span className="text-red-500">*</span>
        </label>
        <div className="mb-2 flex space-x-4">
          <button onClick={() => formatText(textareaRefAbout, 'bold')} className="flex items-center text-blue-600 hover:underline">
            <Bold className="mr-1" /> Bold
          </button>
          <button onClick={() => formatText(textareaRefAbout, 'italic')} className="flex items-center text-blue-600 hover:underline">
            <Italic className="mr-1" /> Italic
          </button>
        </div>
        <textarea
          ref={textareaRefAbout}
          name="about"
          value={fields.about}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md w-full p-3 h-48 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 hover:border-blue-500"
          placeholder="Write about the hackathon"
        />
        <small className="text-gray-500 mt-2">Select text to make it bold or italic. Provide details about the hackathon, including themes and goals.</small>
      </div>


      {/* Description Section */}
      <div id="description" className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200 transition duration-200 hover:shadow-lg">
        <label className="block font-semibold mb-2 flex items-center">
          <Info className="mr-2 text-blue-600" /> Description <span className="text-red-500">*</span>
        </label>
        <div className="mb-2 flex space-x-4">
          <button onClick={() => formatText(textareaRefDescription, 'bold')} className="flex items-center text-blue-600 hover:underline">
            <Bold className="mr-1" /> Bold
          </button>
          <button onClick={() => formatText(textareaRefDescription, 'italic')} className="flex items-center text-blue-600 hover:underline">
            <Italic className="mr-1" /> Italic
          </button>
        </div>
        <textarea
          ref={textareaRefDescription}
          name="description"
          value={fields.description}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md w-full p-3 h-48 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 hover:border-blue-500"
          placeholder="Detailed description of the hackathon"
        />
        <small className="text-gray-500 mt-2">Select text to make it bold or italic. Provide a thorough description of the hackathon, including rules and expectations.</small>
      </div>

      {/* Eligibility Field */}
      <div id='eligibility' className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200 transition duration-200 hover:shadow-lg">
        <label className="block font-semibold mb-2 flex items-center">
          <Users className="mr-2 text-blue-500" /> Eligibility <span className="text-red-500">*</span>
        </label>
        <select
          name="eligibility"
          value={fields.eligibility}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 hover:border-blue-500"
        >
          <option value="">Select eligibility</option>
          <option value="students">Students</option>
          <option value="anyone">Anyone</option>
        </select>
        <small className="text-gray-500 mt-2">Choose who can participate in the hackathon.</small>
      </div>




      {/* Prizes Field */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <label className="block font-semibold mb-2 flex items-center">
          <Trophy className="mr-2 text-blue-600" /> Prizes <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="prizes"
          value={fields.prizes.join(', ')}
          onChange={(e) => setFields({ ...fields, prizes: e.target.value.split(',').map(prize => prize.trim()) })}
          className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Add prizes separated by commas"
        />
        <small className="text-gray-500">e.g., "First: $1000, Second: $500"</small>
        <small className="text-gray-500 mt-2">Select text to remove prizes.</small>
      </div>


      {/* Themes Section */}
      <div id="themes" className="bg-white shadow-md rounded-lg p-6 mb-6">
        <label className="block font-semibold mb-2 flex items-center">
          <Info className="mr-2 text-blue-600" /> Themes <span className="text-red-500">*</span>
        </label>
        <div className="mb-2">
          {['AI', 'Blockchain', 'Web Development', 'Mobile Apps'].map((theme) => (
            <label key={theme} className="block">
              <input
                type="checkbox"
                value={theme}
                checked={fields.themes.includes(theme)}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              {theme}
            </label>
          ))}
        </div>
        <small className="text-gray-500">Select the themes relevant to the hackathon.</small>
      </div>


      {/* Partners Field */}
      <div id='partners' className="bg-white shadow-md rounded-lg p-6 mb-6">
        <label className="block font-semibold mb-2 flex items-center">
          <Info className="mr-2 text-blue-600" /> Partners <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="partners"
          value={fields.partners.join(', ')}
          onChange={(e) => setFields({ ...fields, partners: e.target.value.split(', ') })}
          className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Add partners separated by commas"
        />
        <small className="text-gray-500">e.g., "Company A, Company B"</small>
        <small className="text-gray-500 mt-2">Select text to remove partners.</small>
      </div>

      <div id='judges' className="bg-white shadow-md rounded-lg p-6 mb-6">
        <label className="block font-semibold mb-2 flex items-center">
          <Gavel className="mr-2" /> {/* Lucide Gavel icon */}
          Judges <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="judges"
          value={fields.judges.join(', ')}
          onChange={(e) => setFields({ ...fields, judges: e.target.value.split(', ') })}
          className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Add judges separated by commas"
        />
        <small className="text-gray-500">e.g., "Judge A, Judge B"</small>
        <small className="text-gray-500 mt-2">Select text to remove judges.</small>
      </div>




      {/* Organisers Field */}
      <div id='organizers' className="bg-white shadow-md rounded-lg p-6 mb-6">
        <label className="block font-semibold mb-2 flex items-center">
          <Info className="mr-2 text-blue-600" /> Organisers <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="organisers"
          value={fields.organizers.join(', ')}
          onChange={(e) => setFields({ ...fields, organizers: e.target.value.split(', ') })}
          className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Add organisers separated by commas"
        />
        <small className="text-gray-500">e.g., "Org A, Org B"</small>
        <small className="text-gray-500 mt-2">Select text to remove organisers.</small>
      </div>

      {/* Contact Field */}
      <div id="phone" className="bg-white shadow-md rounded-lg p-6 mb-6">
        <label className=" font-semibold mb-2 flex items-center">
          <Phone className="mr-2" /> Contact <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={fields.phone}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter contact number"
        />
        <small className="text-gray-500">e.g., "+1234567890"</small>
      </div>

      {/* Email Field */}
      <div id='email' className="bg-white shadow-md rounded-lg p-6 mb-6">
        <label className="block font-semibold mb-2 flex items-center">
          <Mail className="mr-2" /> Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={fields.email}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter email"
        />
        <small className="text-gray-500">e.g., "example@domain.com"</small>
      </div>

      {/* Date Field */}
      <div id="date" className="bg-white shadow-md rounded-lg p-6 mb-6">
        <label className="block font-semibold mb-2 flex items-center">
          <Calendar className="mr-2" /> Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="date"
          value={fields.date}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <small className="text-gray-500">Select the hackathon date</small>

      </div>

      {/* Start Time Field */}
      <div id='start_time' className="bg-white shadow-md rounded-lg p-6 mb-6">
        <label className="block font-semibold mb-2 flex items-center">
          <Clock className="w-5 h-5 mr-2" /> Start Time <span className="text-red-500">*</span>
        </label>
        <input
          type="datetime-local"
          name="start_time"
          value={fields.start_time}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <small className="text-gray-500 mt-2">e.g., "2024-09-22T10:00"</small> {/* Example note */}
      </div>

      {/* End Time Field */}
      <div id="end_time" className="bg-white shadow-md rounded-lg p-6 mb-6">
        <label className="block font-semibold mb-2 flex items-center">
          <Clock className="w-5 h-5 mr-2" /> End Time <span className="text-red-500">*</span>
        </label>
        <input
          type="datetime-local"
          name="end_time"
          value={fields.end_time}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <small className="text-gray-500 mt-2">e.g., "2024-09-22T18:00"</small> {/* Example note */}
      </div>


      <div id="visibility" className="bg-white shadow-md rounded-lg p-6 mb-6">
        <label className="block font-semibold mb-2 flex items-center">
          <Info className="mr-2 text-blue-600" /> Visibility <span className="text-red-500">*</span>
        </label>
        <select
          name="isPrivate"
          value={fields.isPrivate ? "private" : "public"}
          onChange={handleVisibility}
          className="border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select visibility</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>


      {/* Publish Button */}
      <button
        onClick={handlePublish}
        className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700"
      >
        Publish Hackathon
      </button>
      <p className="text-gray-500 mt-2">
        Note: You can edit or delete this hackathon later. After publishing, you will lose 1 credit.
      </p>

    </main>
  );
};

export default MainSection;
