import Card from 'components/card';
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';

interface ToolkitCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const ToolkitCard = ({ title, description, image, link }: ToolkitCardProps) => {
  const handleNavigation = () => {
    // Navigate to the actual link instead of showing alert
    window.location.href = link;
  };

  return (
    <Card extra="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border border-gray-100 dark:border-gray-700 overflow-hidden h-full flex flex-col bg-white dark:bg-navy-800">
      {/* Image Section */}
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-navy-700 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors duration-200">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">
            {description}
          </p>
        </div>

        {/* Action Button */}
        <button 
          onClick={handleNavigation}
          className="w-full flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-700 hover:bg-brand-500 text-gray-700 dark:text-gray-300 hover:text-white px-3 py-2 rounded-lg font-medium transition-all duration-200 text-xs group-hover:bg-brand-500 group-hover:text-white"
        >
          <span>Open</span>
          <FiArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform duration-200" />
        </button>
      </div>
    </Card>
  );
};

export default ToolkitCard;