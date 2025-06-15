import { useState } from 'react';
import Card from 'components/card';
import { MdArrowForward, MdCheck } from 'react-icons/md';
import { FiExternalLink } from 'react-icons/fi';

interface ToolkitCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  stats: string;
  features: string[];
  link: string;
}

const ToolkitCard = ({ title, description, icon, color, stats, features, link }: ToolkitCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleNavigation = () => {
    // In a real app, you would use Next.js router or your routing solution
    console.log(`Navigating to: ${link}`);
    // For demo purposes, we'll show an alert
    alert(`Would navigate to: ${link}`);
  };

  return (
    <Card 
      extra="group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleNavigation}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      {/* Content */}
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          <div className="text-right">
            <div className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${color} text-white`}>
              {stats}
            </div>
          </div>
        </div>

        {/* Title and Description */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-2 group-hover:text-brand-500 transition-colors duration-200">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Features */}
        <div className="mb-4">
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <MdCheck className="h-3 w-3 text-green-500" />
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 text-sm font-medium text-brand-500 hover:text-brand-600 transition-colors duration-200">
            <span>Explore</span>
            <MdArrowForward className={`h-4 w-4 transition-transform duration-200 ${isHovered ? 'translate-x-1' : ''}`} />
          </button>
          <FiExternalLink className="h-4 w-4 text-gray-400 group-hover:text-brand-500 transition-colors duration-200" />
        </div>

        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Progress Indicator (if applicable) */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
        <div 
          className={`h-full bg-gradient-to-r ${color} transition-all duration-500 ${isHovered ? 'w-full' : 'w-0'}`}
        />
      </div>
    </Card>
  );
};

export default ToolkitCard;