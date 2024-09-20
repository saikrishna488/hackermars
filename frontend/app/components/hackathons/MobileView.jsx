"use client";
import { Clock, Users, Calendar, DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';

const MobileView = ({ hackathons, setSelectedHackathon }) => {


    const router = useRouter();
  const calculateDaysLeft = (date) => {
    const today = new Date();
    const eventDate = new Date(date);
    const diffTime = eventDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };


  const handleClick = (id)=>{
    router.push('/hackathon/'+id)
  }

  return (
    <div className="lg:hidden flex w-full h-full overflow-y-auto flex-col gap-4 p-4">
      {hackathons.map((hackathon) => (
        <div
          key={hackathon.id}
          onClick={() => handleClick(hackathon._id)}
          className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-200 flex flex-col"
        >
          {/* Image */}
          <div className="w-full h-[150px] bg-gray-200 rounded-lg overflow-hidden mb-4">
            <img src={hackathon.image_url} alt={hackathon.title} className="object-cover w-full h-full" />
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{hackathon.title}</h3>

          {/* Info */}
          <div className="flex flex-col text-sm text-gray-700">
            <div className="flex items-center mb-1">
              <Clock className="mr-2 text-blue-600" />
              <span>{calculateDaysLeft(hackathon.date)} days left</span>
            </div>
            <div className="flex items-center mb-1">
              <Calendar className="mr-2 text-red-600" />
              <span>{new Date(hackathon.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center mb-1">
              <DollarSign className="mr-2 text-yellow-500" />
              <span>Fee: {hackathon.fee}</span>
            </div>
            <div className="flex items-center">
              <Users className="mr-2 text-green-600" />
              <span>{hackathon.applied || '0'} applied</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileView;
