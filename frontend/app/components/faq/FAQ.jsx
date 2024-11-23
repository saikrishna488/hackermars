"use client";
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqData = [
  {
    question: "What is HackerMars?",
    answer: "HackerMars is a platform for tech enthusiasts to participate in hackathons, connect with like-minded individuals, and explore innovative tech solutions. <a href='#' class='text-blue-500 hover:underline'>Visit full article</a>.",
  },
  {
    question: "How can I participate in a hackathon?",
    answer: "You can join our hackathons by registering on our website. Make sure to check the requirements and deadlines for each event. <a href='#' class='text-blue-500 hover:underline'>Visit full article</a>.",
  },
  {
    question: "Are there any fees for participation?",
    answer: "Participation fees vary depending on the hackathon. Some events are free, while others may have a fee. Details are provided on the event page. <a href='#' class='text-blue-500 hover:underline'>Visit full article</a>.",
  },
  {
    question: "Can I host my own hackathon?",
    answer: "Yes, you can host your own hackathon through our platform. Contact us for more information on how to get started. <a href='#' class='text-blue-500 hover:underline'>Visit full article</a>.",
  },
];

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className='w-full py-12 mt-24'>
      <div className='w-[80%] mx-auto'>
        <h2 className='text-3xl font-bold mb-8 text-gray-800'>Frequently Asked Questions</h2>
        <div className='space-y-4'>
          {faqData.map((item, index) => (
            <div key={index} className='bg-white shadow-md rounded-lg overflow-hidden'>
              <div
                className='flex justify-between items-center p-4 cursor-pointer'
                onClick={() => handleToggle(index)}
              >
                <h3 className='text-xl font-semibold text-gray-800'>{item.question}</h3>
                <div className='text-gray-600'>
                  {expandedIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
              {expandedIndex === index && (
                <div className='p-4 text-gray-700' dangerouslySetInnerHTML={{ __html: item.answer }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
