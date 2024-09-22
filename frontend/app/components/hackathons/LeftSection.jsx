"use client";
import { Clock, Users } from 'lucide-react';

const LeftSection = ({ hackathons, setSelectedHackathon }) => {



  const calculateDaysLeft = (date) => {
    const today = new Date();
    const eventDate = new Date(date);
    const diffTime = eventDate - today;

    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return days < 0 ? "Completed" : days+" days left";
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
            <img src={process.env.NEXT_PUBLIC_BACKEND_URL + "/" +hackathon.image_url} alt={hackathon.title} className="object-cover w-full h-full" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{hackathon.title}</h3>

          {/* Info */}
          <div className="flex items-center text-sm text-gray-700 mb-1">
            <Clock className="mr-2 text-blue-600" />
            <span>{calculateDaysLeft(hackathon.date)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Users className="mr-2 text-green-600" />
            <span>{hackathon.registered_users.length} Applied</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeftSection;
