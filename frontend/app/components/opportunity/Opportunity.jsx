"use client";
import React from 'react';
import { ArrowRight, Calendar, Users, Trophy, Target } from 'lucide-react';
import { useRouter } from 'next/navigation';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 hover:border-blue-100 transition-colors duration-200">
    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

const Opportunity = () => {

  const router = useRouter();
  const features = [
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Choose your own dates and duration for events that fit your timeline."
    },
    {
      icon: Users,
      title: "Global Reach",
      description: "Connect with participants from around the world and diverse backgrounds."
    },
    {
      icon: Trophy,
      title: "Custom Challenges",
      description: "Design unique problem statements and reward structures for participants."
    },
    {
      icon: Target,
      title: "Targeted Audience",
      description: "Reach specific developer communities and skill sets for your event."
    }
  ];

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-medium text-sm uppercase tracking-wider">
            Opportunities
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Host Your Own Event
          </h2>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed">
            Unlock the potential of your ideas by organizing hackathons, workshops, 
            or tech events. Create impactful experiences.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-blue-50 rounded-2xl p-8 border border-blue-100">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Ready to Create Your Event?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of organizers who have successfully hosted events on our platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={()=>router.push('/host')} className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm">
              Start Hosting Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            
            <button className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              Learn More
            </button>
          </div>
        </div>

        {/* Optional: Success Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "500+", label: "Events Hosted" },
            { value: "50k+", label: "Participants" },
            { value: "100+", label: "Countries" },
            { value: "95%", label: "Success Rate" }
          ].map((stat, index) => (
            <div key={index}>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Opportunity;