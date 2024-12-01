"use client";
import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

const faqData = [
  {
    category: "General",
    questions: [
      {
        question: "What is HackerMars?",
        answer: "HackerMars is a platform for tech enthusiasts to participate in hackathons, connect with like-minded individuals, and explore innovative tech solutions. <a href='#' class='text-blue-600 hover:text-blue-700 font-medium'>Learn more →</a>",
      },
      {
        question: "How can I participate in a hackathon?",
        answer: "You can join our hackathons by registering on our website. Make sure to check the requirements and deadlines for each event. <a href='#' class='text-blue-600 hover:text-blue-700 font-medium'>View hackathons →</a>",
      },
    ]
  },
  {
    category: "Participation",
    questions: [
      {
        question: "Are there any fees for participation?",
        answer: "No, participation in hackathons on HackerMars is completely free. We believe in making innovation accessible to everyone.",
      },
      {
        question: "Can I host my own hackathon?",
        answer: "Yes, you can host your own hackathon through our platform. While hosting is free, you'll need to submit an application for review to ensure quality and relevance. <a href='#' class='text-blue-600 hover:text-blue-700 font-medium'>Start hosting →</a>",
      },
    ]
  }
];

const FAQItem = ({ question, answer, isOpen, onToggle }) => (
  <div className="border-b p-2 border-gray-100 last:border-0">
    <button
      className="w-full flex items-center justify-between py-5 text-left"
      onClick={onToggle}
    >
      <span className="text-base font-medium text-gray-900">{question}</span>
      <ChevronDown 
        className={`w-5 h-5 text-gray-500 transition-transform duration-200 
          ${isOpen ? 'transform rotate-180' : ''}`}
      />
    </button>
    {isOpen && (
      <div 
        className="pb-5 text-gray-600 prose prose-a:no-underline"
        dangerouslySetInnerHTML={{ __html: answer }}
      />
    )}
  </div>
);

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const filteredFAQs = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(item =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about HackerMars
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        {/* FAQ Categories */}
        {filteredFAQs.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-8 last:mb-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {category.category}
            </h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100 overflow-hidden">
              {category.questions.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={expandedIndex === `${categoryIndex}-${index}`}
                  onToggle={() => handleToggle(`${categoryIndex}-${index}`)}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Support Link */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Still have questions?{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              Contact our support team →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;