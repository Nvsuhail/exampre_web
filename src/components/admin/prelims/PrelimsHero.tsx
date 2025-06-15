import Card from 'components/card';
import { FiArrowRight, FiBookOpen } from 'react-icons/fi';

const PrelimsHero = () => {
  return (
    <Card extra="w-full p-8 md:p-12 bg-gradient-to-br from-brand-500 to-brand-600 border-0">
      <div className="max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            UPSC Prelims 2025
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl">
            Your complete preparation toolkit for UPSC Prelims success
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="group flex items-center justify-center gap-3 bg-white text-brand-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/95 transition-all duration-200 hover:scale-105 shadow-lg">
            <FiBookOpen className="h-5 w-5" />
            Preparation Guide
            <FiArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="flex items-center justify-center gap-3 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-200">
            View Syllabus
          </button>
        </div>
      </div>
    </Card>
  );
};

export default PrelimsHero;