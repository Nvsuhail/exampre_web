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
    <Card extra="group cursor-pointer transition-all duration-200 hover:shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden h-full flex flex-col">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed flex-1">
          {description}
        </p>

        <button 
          onClick={handleNavigation}
          className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 text-sm mt-auto"
        >
          Open Now
          <FiArrowRight className="h-4 w-4" />
        </button>
      </div>
    </Card>
  );
};

export default ToolkitCard;