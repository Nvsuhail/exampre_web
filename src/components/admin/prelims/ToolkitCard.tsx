import Card from 'components/card';
import Image from 'next/image';
import { FiArrowRight, FiClock, FiUsers } from 'react-icons/fi';

interface ToolkitCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const ToolkitCard = ({ title, description, image, link }: ToolkitCardProps) => {
  const handleNavigation = () => {
    console.log(`Navigating to: ${link}`);
    alert(`Would navigate to: ${link}`);
  };

  // Sample data for each card
  const getCardData = (title: string) => {
    const data = {
      'Previous Year Questions': { users: '12.5k', time: '45+ years' },
      'MCQ Practice': { users: '8.2k', time: 'Daily' },
      'Mock Tests': { users: '15.3k', time: '3 hours' },
      'Smart Notes': { users: '9.8k', time: 'Quick read' },
      'Flashcards': { users: '6.7k', time: '15 min' },
      'Trend Analysis': { users: '4.2k', time: 'Weekly' }
    };
    return data[title as keyof typeof data] || { users: '1k+', time: 'Varies' };
  };

  const cardData = getCardData(title);

  return (
    <Card extra="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden h-full flex flex-col bg-white dark:bg-navy-800">
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Overlay Stats */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center justify-between text-white text-sm">
            <div className="flex items-center gap-1">
              <FiUsers className="h-4 w-4" />
              <span>{cardData.users} users</span>
            </div>
            <div className="flex items-center gap-1">
              <FiClock className="h-4 w-4" />
              <span>{cardData.time}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-200">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
            {description}
          </p>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleNavigation}
          className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-brand-500 text-gray-700 dark:text-gray-300 hover:text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 text-sm group-hover:bg-brand-500 group-hover:text-white transform group-hover:scale-105"
        >
          <span>Open Now</span>
          <FiArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>

      {/* Subtle Border Animation */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-500/20 rounded-[20px] transition-colors duration-300 pointer-events-none" />
    </Card>
  );
};

export default ToolkitCard;