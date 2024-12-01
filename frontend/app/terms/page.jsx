"use client"
import { Check, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const HostTermsAndConditions = () => {


    const router = useRouter();
  const sections = [
    {
      title: "Host Responsibilities",
      items: [
        "Provide accurate and complete information about the hackathon event",
        "Maintain clear communication with participants",
        "Ensure fair judging and evaluation processes",
        "Respect participant privacy and data protection",
        "Deliver promised prizes and rewards as stated"
      ]
    },
    {
      title: "Event Guidelines",
      items: [
        "Clearly define hackathon rules and requirements",
        "Establish and communicate timeline and deadlines",
        "Provide necessary resources and support to participants",
        "Maintain professional conduct throughout the event",
        "Handle disputes and issues promptly and fairly"
      ]
    },
    {
      title: "Platform Usage",
      items: [
        "Use the platform features responsibly and as intended",
        "Not misuse or attempt to manipulate platform functionality",
        "Respect intellectual property rights and licensing",
        "Maintain security of account credentials",
        "Report any technical issues or vulnerabilities discovered"
      ]
    },
    {
      title: "Content Standards",
      items: [
        "No discriminatory or offensive content",
        "No misleading or fraudulent information",
        "Respect copyright and intellectual property laws",
        "Maintain professional and appropriate communication",
        "No promotion of illegal activities or content"
      ]
    }
  ];

  const importantNotes = [
    "Platform reserves the right to remove events that violate terms",
    "Hosts are responsible for their event's compliance with local laws",
    "Platform may modify these terms with notice to hosts",
    "Violation may result in account suspension or termination"
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Terms and Conditions for Hackathon Hosts
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Please review these terms carefully before hosting a hackathon on our platform. 
            By submitting a hosting application, you agree to comply with these terms.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          {sections.map((section, index) => (
            <div 
              key={section.title}
              className={`${index !== 0 ? 'mt-10' : ''}`}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Important Notes */}
          <div className="mt-12 bg-blue-50 rounded-xl p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-blue-900 mb-4">
              <AlertCircle className="w-5 h-5" />
              Important Notes
            </h2>
            <ul className="space-y-3">
              {importantNotes.map((note, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
                  <span className="text-blue-900">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Agreement Section */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-6">
            By proceeding with your host application, you acknowledge that you have read, 
            understood, and agree to these terms and conditions.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => router.replace('/host')}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg
                hover:bg-gray-50 transition-colors duration-200"
            >
              Go Back
            </button>
            <button 
              onClick={() => router.replace('/host')}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 
                text-white rounded-lg hover:from-blue-700 hover:to-blue-800 
                transition-colors duration-200 shadow-lg shadow-blue-500/20"
            >
              I Agree & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostTermsAndConditions;