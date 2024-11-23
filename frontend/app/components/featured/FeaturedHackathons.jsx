"use client";
import React, { useEffect, useRef } from 'react';
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";

const demoHackathons = [
  { img: "https://devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fcontent%2F030b041535514a4db9321a346b6551d0%2F8c72122e-16c0-4a5b-9b5a-24ea065e2961.png&w=1440&q=75", title: "Hackathon 2024" },
  { img: "https://hack-synthesis.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fa485a56b617a4864844f9ae238cfe38d%2Fassets%2Fcover%2F677.png&w=1440&q=100", title: "Innovators' Challenge" },
  { img: "https://tictechtoe24.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fba6317ea5a2d40ffb5605600562b4857%2Fassets%2Fcover%2F200.png&w=1440&q=100", title: "Code Fest" },
  { img: "https://thacks-7.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F99b20414637c4111923d3b4e4c26b0ec%2Fassets%2Fcover%2F545.jpeg&w=1440&q=100", title: "Tech Titans" },
  { img: "https://pitch-a-thon.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F039ee018058642088f2b7002f67f85cd%2Fassets%2Fcover%2F980.png&w=1440&q=100", title: "Startup Sprint" },
  { img: "https://techtrek.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fda1b3a9a329d4e3c952d6127f6cd5081%2Fassets%2Fcover%2F438.png&w=1440&q=100", title: "AI Challenge" },
  { img: "https://frosthacks-s01.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fcbfa188e2b274347bd8004200c4b43d9%2Fassets%2Fcover%2F588.jpeg&w=1440&q=100", title: "Blockchain Bonanza" }
];

const FeaturedHackathons = () => {
  const scrollContainerRef = useRef(null);

  useEffect(()=>{

    const scrollContainer = scrollContainerRef.current
    if(scrollContainer){
      const maxScrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth
      const clientWidth = scrollContainer.clientWidth

      const autoScroll = setInterval(()=>{
        const scrollLeft = scrollContainer.scrollLeft
        console.log(scrollLeft, maxScrollWidth)

        if(scrollLeft >= maxScrollWidth-1){
          scrollContainer.scrollTo({left:0,scrollBehavior: 'smooth'})
          
        }
        else{
          scrollContainer.scrollBy({left:clientWidth,scrollBehavior: 'smooth'})
        }
      },2000)

      return ()=> clearInterval(autoScroll)
    }
  })

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = container.clientWidth // Width of a single card
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className='relative flex justify-center mt-20 w-full py-12 select-none'>
      <div className='w-full max-w-screen-xl relative'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-left px-4'>Featured Hackathons</h2>
        <div className='relative flex w-full px-4 items-center'>

          {/* Left Arrow (hidden on small screens) */}
          <button
            onClick={() => scroll('left')}
            className='hidden md:block absolute left-0 rounded-full p-2 hover:bg-blue-600 bg-gray-200'
          >
            <IoIosArrowBack className='' />
          </button>

          {/* Hackathon Cards Container */}
          <div
            ref={scrollContainerRef}
            className='flex gap-4 overflow-x-auto w-full scrollbar-hide rounded snap-x snap-mandatory'
            style={{ scrollBehavior: 'smooth' }}
          >
            {demoHackathons.map((hack, index) => (
              <div
                key={index}
                className='bg-white shadow-lg lg:rounded-3xl rounded-lg overflow-hidden flex-shrink-0 snap-start lg:w-[610px] w-[100%]'
              >
                <img
                  src={hack.img}
                  alt={hack.title}
                  className='lg:h-[300px] h-[200px]  w-[100%] '
                  style={{ aspectRatio: '16/9' }} // Maintaining 16:9 aspect ratio
                />
              </div>
            ))}
          </div>

          {/* Right Arrow (hidden on small screens) */}
          <button
            onClick={() => scroll('right')}
            className='hidden md:block absolute right-0 hover:bg-blue-600 rounded-full p-2 bg-gray-200'
          >
            <IoIosArrowForward className=' t'/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedHackathons;
