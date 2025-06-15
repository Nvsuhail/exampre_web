'use client';
import { useState } from 'react';
import Card from 'components/card';
import { FiExternalLink, FiChevronRight, FiStar } from 'react-icons/fi';
import { MdTrendingUp } from 'react-icons/md';

interface ToolkitProps {
  toolkit: {
    id: number;
    title: string;
    description: string;
    icon: JSX.Element;
    color: string;
    stats: string;
    features: string[];
    link: string;
  };
}

const ToolkitCard = ({ toolkit }: ToolkitProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleNavigation = (link: string) => {
    // In a real app, you would use Next.js router
    console.log(`Navigating to: ${link}`);
    alert(`Would navigate to: ${link}`);
  };

  return (
    <Card 
      extra={`group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer ${
        isHovered ? 'shadow-2xl' : 'shadow-lg'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleNavigation(toolkit.link)}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${toolkit.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
      
      {/* Content */}
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`bg-gradient-to-br ${toolkit.color} rounded-xl p-3 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {toolkit.icon}
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-1">
              <FiStar className="h-3 w-3 text-yellow-500" />
            </div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Popular</span>
          </div>
        </div>

        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-2 group-hover:text-brand-500 transition-colors duration-200">
            {toolkit.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {toolkit.description}
          </p>
        </div>

        {/* Stats */}
        <div className="mb-4">
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-navy-900 rounded-lg p-3">
            <MdTrendingUp className="h-4 w-4 text-brand-500" />
            <span className="text-sm font-semibold text-navy-700 dark:text-white">{toolkit.stats}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">available</span>
          </div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
            Key Features
          </h4>
          <div className="space-y-1">
            {toolkit.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
                <span className="text-xs text-gray-600 dark:text-gray-400">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between">
          <button 
            className={`flex items-center gap-2 bg-gradient-to-r ${toolkit.color} text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-lg group-hover:scale-105`}
            onClick={(e) => {
              e.stopPropagation();
              handleNavigation(toolkit.link);
            }}
          >
            <span>Explore</span>
            <FiChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
          
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <FiExternalLink className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600 dark:text-gray-400">Your Progress</span>
            <span className="text-xs font-medium text-brand-500">
              {Math.floor(Math.random() * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div 
              className={`bg-gradient-to-r ${toolkit.color} h-1.5 rounded-full transition-all duration-1000`}
              style={{ width: `${Math.floor(Math.random() * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>
  );
};

export default ToolkitCard;