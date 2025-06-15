import Card from 'components/card';

interface ToolkitCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  link: string;
}

const ToolkitCard = ({ title, description, icon, color, link }: ToolkitCardProps) => {
  const handleNavigation = () => {
    console.log(`Navigating to: ${link}`);
    alert(`Would navigate to: ${link}`);
  };

  return (
    <Card extra="flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white cursor-pointer hover:shadow-lg transition-all duration-200">
      <div className="h-full w-full">
        <div className="relative w-full mb-3">
          <div className={`flex h-20 w-full items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white`}>
            {icon}
          </div>
        </div>

        <div className="mb-3 flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className="mb-2">
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              {title}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 md:mt-2">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col 2xl:items-start 3xl:flex-row 3xl:items-center 3xl:justify-between">
          <button 
            onClick={handleNavigation}
            className="linear rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
          >
            Explore
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ToolkitCard;