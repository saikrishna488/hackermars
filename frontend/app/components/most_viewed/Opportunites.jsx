"use client";
import React, { useRef, useEffect } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";

const mostViewedHackathons = [
  {
    id: 1,
    img: 'https://d8it4huxumps7.cloudfront.net/uploads/competition-sharable/66dfd830de38f_SEO_Image_]-01.jpg?d=700x400',
    title: 'AI Challenge 2024',
    description: 'Compete with the best AI enthusiasts.',
  },
  {
    id: 2,
    img: 'https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/mobile_banner/66b5aaaaea13d_asian-paints-alchemy-2024.webp?d=413x236',
    title: 'Blockchain Innovation',
    description: 'Develop decentralized solutions.',
  },
  {
    id: 3,
    img: 'https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/mobile_banner/66cc636f89a1a_juspay-hiring-challenge.webp?d=413x236',
    title: 'Cybersecurity Hackfest',
    description: 'Solve real-world security challenges.',
  },
  {
    id: 4,
    img: 'https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/mobile_banner/66e3d3167b3ca_infosys-ingenious-the-grand-finale.webp?d=413x236',
    title: 'Green Tech Challenge',
    description: 'Innovate for a sustainable future.',
  },
  {
    id: 5,
    img: 'https://d8it4huxumps7.cloudfront.net/uploads/images/opportunity/mobile_banner/66cd7d58804b7_building-your-power-brand.webp?d=413x236',
    title: 'AR/VR Hackathon',
    description: 'Build immersive AR/VR experiences.',
  },
];

const MostViewedHackathons = () => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (container) {
      const cardWidth = container.firstChild?.clientWidth || 400; // Width of a single card
      const gap = 24; // Gap between cards
      const scrollAmount = container.clientWidth //cardWidth + gap; // Total amount to scroll per step

      const autoScroll = setInterval(() => {
        const currentScrollLeft = container.scrollLeft;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        const tolerance = 1; // Tolerance for rounding errors

        if (currentScrollLeft >= maxScrollLeft - tolerance) {
          container.scrollTo({ left: 0, behavior: 'smooth' }); // Reset to start
        } else {
          container.scrollBy({ left: scrollAmount, behavior: 'smooth' }); // Scroll right
        }
      }, 2000); // Adjust scroll speed here

      return () => clearInterval(autoScroll);
    }
  }, []);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = container.clientWidth // Width of a single card
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className='relative w-full py-8 select-none mt-28'>
      <div className='md:w-full lg:w-[80%] mx-auto'>
        <h2 className='text-3xl font-bold mb-6 text-center'>Most Viewed Hackathons</h2>

        <div className='relative flex items-center px-4'>
          {/* Left Arrow (hidden on small screens) */}
          <button
            onClick={() => scroll('left')}
            className='hidden md:block absolute hover:bg-blue-600 left-0 rounded-full p-2 bg-gray-200'
          >
            <IoIosArrowBack className='' />
          </button>

          {/* Hackathon Cards */}
          <div
            ref={scrollContainerRef}
            className='flex gap-6 overflow-x-auto w-full snap-x rounded-lg snap-mandatory scrollbar-hide scroll-smooth'
          >
            {mostViewedHackathons.map((hackathon) => (
              <div
                key={hackathon.id}
                className='flex-shrink-0 w-full lg:w-[350px] bg-white shadow-md rounded-lg p-4 border flex flex-col justify-between snap-start'
              >
                <img
                  src={hackathon.img}
                  alt={hackathon.title}
                  className=' w-full object-cover rounded-md mb-4'
                />
                <div className='flex flex-col flex-grow'>
                  <h3 className='text-xl font-bold mb-2 truncate'>{hackathon.title}</h3>
                  <p className='text-gray-600'>{hackathon.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow (hidden on small screens) */}
          <button
            onClick={() => scroll('right')}
            className='hidden md:block absolute hover:bg-blue-600 right-0 rounded-full p-2 bg-gray-200'
          >
            <IoIosArrowForward className=' t'/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MostViewedHackathons;
