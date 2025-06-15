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
    console.log(`Navigating to: ${link}`);
    alert(`Would navigate to: ${link}`);
  };

  return (
    <Card extra="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-navy-700 dark:text-white mb-3 group-hover:text-brand-500 transition-colors duration-200">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
          {description}
        </p>

        <button 
          onClick={handleNavigation}
          className="group/btn w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
        >
          Start Now
          <FiArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </Card>
  );
};

export default ToolkitCard;