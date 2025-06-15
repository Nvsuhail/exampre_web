import Card from 'components/card';
import { FiArrowRight, FiBookOpen, FiList } from 'react-icons/fi';

const PrelimsHero = () => {
  const handlePreparationGuide = () => {
    window.location.href = '/admin/preparation-guide';
  };

  const handleViewSyllabus = () => {
    window.location.href = '/admin/syllabus-tracker';
  };

  return (
    <Card extra="w-full p-6 md:p-8 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 border-0 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full -translate-y-24 translate-x-24"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-16 -translate-x-16"></div>
      </div>

      <div className="relative z-10 max-w-3xl">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-white/90 text-xs font-medium mb-3">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            UPSC Prelims 2025
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Master Your
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              UPSC Journey
            </span>
          </h1>
          
          <p className="text-lg text-white/90 max-w-2xl leading-relaxed">
            Complete preparation toolkit designed for UPSC Prelims success with comprehensive study materials.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={handlePreparationGuide}
            className="group flex items-center justify-center gap-2 bg-white text-brand-600 px-6 py-3 rounded-lg font-medium hover:bg-white/95 transition-all duration-200"
          >
            <FiBookOpen className="h-4 w-4" />
            Preparation Guide
            <FiArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform duration-200" />
          </button>
          
          <button 
            onClick={handleViewSyllabus}
            className="group flex items-center justify-center gap-2 border border-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-all duration-200"
          >
            <FiList className="h-4 w-4" />
            Syllabus Tracker
            <FiArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default PrelimsHero;