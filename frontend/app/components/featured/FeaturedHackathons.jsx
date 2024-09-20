"use client";
import React, { useEffect, useRef } from 'react';
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";

const demoHackathons = [
  { img: "https://d8it4huxumps7.cloudfront.net/images/home-page-banner/66c48fe829580_Alchemy-HP.jpg?d=1266x494", title: "Hackathon 2024" },
  { img: "https://d8it4huxumps7.cloudfront.net/images/home-page-banner/66d037c2686e7_devan-bhalla-rb-blue.jpg?d=1266x494", title: "Innovators' Challenge" },
  { img: "https://d8it4huxumps7.cloudfront.net/images/home-page-banner/66d1b6056b2d5_Featured_Homepage_Banner_Image.jpg?d=1266x494", title: "Code Fest" },
  { img: "https://d8it4huxumps7.cloudfront.net/images/home-page-banner/66e436cbe90de_homepage-banner-1280x500-v5.jpg?d=1266x494", title: "Tech Titans" },
  { img: "https://d8it4huxumps7.cloudfront.net/images/home-page-banner/66e3d372adf33_1_ingenious_homepage_banner_1280_x_500px.jpg?d=1266x494", title: "Startup Sprint" },
  { img: "https://d8it4huxumps7.cloudfront.net/images/home-page-banner/66e02fc9ac74b_Homepage-01-01.jpg?d=1266x494", title: "AI Challenge" },
  { img: "https://d8it4huxumps7.cloudfront.net/images/home-page-banner/66e28b1239614_Featured-Homepage-Banner-10-Sep-2024.jpg?d=1266x494", title: "Blockchain Bonanza" }
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
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-left '>Featured Hackathons</h2>
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
            className='flex gap-4 overflow-x-auto w-full scrollbar-hide rounded-3xl snap-x snap-mandatory'
            style={{ scrollBehavior: 'smooth' }}
          >
            {demoHackathons.map((hack, index) => (
              <div
                key={index}
                className='bg-white shadow-lg rounded-3xl overflow-hidden flex-shrink-0 snap-start lg:w-[640px] w-[100%]'
              >
                <img
                  src={hack.img}
                  alt={hack.title}
                  className='lg:h-[300px] h-[200px] w-[100%] object-cover'
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
