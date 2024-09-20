"use client";
import { Clock, Users } from 'lucide-react';

const LeftSection = ({ hackathons, setSelectedHackathon }) => {
  const calculateDaysLeft = (date) => {
    const today = new Date();
    const eventDate = new Date(date);
    const diffTime = eventDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="lg:flex hidden w-[30%] h-full overflow-y-auto flex-col gap-4 p-4">
      {hackathons.map((hackathon) => (
        <div
          key={hackathon.id}
          onClick={() => setSelectedHackathon(hackathon)}
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-200"
        >
          {/* Image */}
          <div className="w-full h-[200px] bg-gray-200 rounded-lg overflow-hidden mb-4">
            <img src={hackathon.image_url} alt={hackathon.title} className="object-cover w-full h-full" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{hackathon.title}</h3>

          {/* Info */}
          <div className="flex items-center text-sm text-gray-700 mb-1">
            <Clock className="mr-2 text-blue-600" />
            <span>{calculateDaysLeft(hackathon.date)} days left</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Users className="mr-2 text-green-600" />
            <span>100 applied</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeftSection;
