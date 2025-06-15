import Card from 'components/card';
import Image from 'next/image';

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
    <Card extra="flex flex-col w-full h-full !p-4 bg-white cursor-pointer hover:shadow-lg transition-all duration-200 group">
      <div className="h-full w-full">
        <div className="relative w-full mb-4">
          <div className="relative h-32 w-full rounded-xl overflow-hidden bg-gray-100 dark:bg-navy-800">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="mb-4 flex flex-col">
          <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
        </div>

        <div className="mt-auto">
          <button 
            onClick={handleNavigation}
            className="w-full linear rounded-xl bg-brand-500 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300"
          >
            Open Now
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ToolkitCard;