"use client";
import React from 'react';
import { Mail, MessageCircle, Twitter, Github, Linkedin, ExternalLink } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const path = usePathname();

  if(path.includes("/admin")) {
    return null;
  }


  const footerLinks = [
    {
      title: "Platform",
      links: [
        { label: "Hackathons", href: "/hackathons" },
        { label: "Projects", href: "/projects" },
        { label: "Host Event", href: "/host" },
        { label: "Community", href: "/community" },
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "/docs" },
        { label: "Blog", href: "/blog" },
        { label: "Support", href: "/support" },
        { label: "Terms", href: "/terms" },
      ]
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12">
          {/* Brand Section */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                HackerMars
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Empowering innovators to build the future through hackathons and collaborative tech events.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-700" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {footerLinks.map((section, index) => (
            <div key={index} className="col-span-1 sm:col-span-1 lg:col-span-2 space-y-5">
              <h3 className="text-sm font-semibold text-gray-900 tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 text-sm flex items-center group transition-all duration-200 hover:translate-x-0.5"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3 ml-1.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Section */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-4 space-y-5">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wide">
              Stay Updated
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Subscribe to our newsletter for the latest updates and opportunities.
            </p>
            <form className="space-y-3">
              <div className="relative flex flex-col sm:flex-row max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl sm:rounded-r-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm placeholder:text-gray-400 text-gray-900"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto mt-2 sm:mt-0 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl sm:rounded-l-none hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 font-medium"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-500">
              {currentYear} HackerMars. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="/privacy" className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="/terms" className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;