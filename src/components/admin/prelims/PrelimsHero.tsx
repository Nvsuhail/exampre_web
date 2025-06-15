import Card from 'components/card';
import { FiArrowRight, FiBookOpen, FiList } from 'react-icons/fi';

const PrelimsHero = () => {
  const handlePreparationGuide = () => {
    window.location.href = '/admin/preparation-guide';
  };

  const handleViewSyllabus = () => {
    window.location.href = '/admin/view-syllabus';
  };

  return (
    <Card extra="w-full p-8 md:p-10 bg-gradient-to-br from-brand-500 to-brand-600 border-0">
      <div className="max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            UPSC Prelims 2025
          </h1>
          <p className="text-lg text-white/90 max-w-2xl">
            Complete preparation toolkit for UPSC Prelims success
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={handlePreparationGuide}
            className="flex items-center justify-center gap-3 bg-white text-brand-600 px-6 py-3 rounded-lg font-medium hover:bg-white/95 transition-colors duration-200"
          >
            <FiBookOpen className="h-5 w-5" />
            Preparation Guide
          </button>
          
          <button 
            onClick={handleViewSyllabus}
            className="flex items-center justify-center gap-3 border-2 border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors duration-200"
          >
            <FiList className="h-5 w-5" />
            View Syllabus
          </button>
        </div>
      </div>
    </Card>
  );
};

export default PrelimsHero;