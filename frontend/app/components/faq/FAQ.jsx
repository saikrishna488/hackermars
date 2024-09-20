"use client";
import React from 'react';
import { FaLink } from 'react-icons/fa'; // Import link icon from react-icons

const faqData = [
  {
    question: "What is HackerMars?",
    answer: "HackerMars is a platform for tech enthusiasts to participate in hackathons, connect with like-minded individuals, and explore innovative tech solutions.",
    link: "#",
  },
  {
    question: "How can I participate in a hackathon?",
    answer: "You can join our hackathons by registering on our website. Make sure to check the requirements and deadlines for each event.",
    link: "#",
  },
  {
    question: "Are there any fees for participation?",
    answer: "Participation fees vary depending on the hackathon. Some events are free, while others may have a fee. Details are provided on the event page.",
    link: "#",
  },
];

const FAQ = () => {
  return (
    <div className='w-full py-12 mt-24'>
      <div className='w-[80%] mx-auto'>
        <h2 className='text-3xl font-bold mb-8 text-gray-800 text-center'>Frequently Asked Questions</h2>
        <div className='flex flex-wrap gap-6'>
          {faqData.map((item, index) => (
            <div
              key={index}
              className='bg-white shadow-md rounded-lg overflow-hidden flex-1 min-w-[300px] max-w-[400px] flex flex-col'
            >
              <div className='p-4 flex-1'>
                <h3 className='text-xl font-semibold text-gray-800 mb-2'>{item.question}</h3>
                <p className='text-gray-700'>{item.answer}</p>
              </div>
              <div className='p-4 border-t border-gray-200'>
                <a href={item.link} className='text-blue-500 hover:underline text-lg flex items-center'>
                  <FaLink className='mr-2' /> Read more
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
