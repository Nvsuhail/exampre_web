import Card from 'components/card';
import { FiArrowRight, FiBookOpen, FiList, FiTarget, FiTrendingUp } from 'react-icons/fi';
import { MdQuiz, MdLibraryBooks } from 'react-icons/md';

const PrelimsHero = () => {
  const handlePreparationGuide = () => {
    window.location.href = '/admin/preparation-guide';
  };

  const handleViewSyllabus = () => {
    window.location.href = '/admin/syllabus-tracker';
  };

  const stats = [
    { label: 'Study Days', value: '156', icon: <FiTarget className="h-5 w-5" /> },
    { label: 'Mock Tests', value: '24', icon: <MdQuiz className="h-5 w-5" /> },
    { label: 'Accuracy', value: '87%', icon: <FiTrendingUp className="h-5 w-5" /> },
    { label: 'Rank', value: '#127', icon: <MdLibraryBooks className="h-5 w-5" /> }
  ];

  return (
    <div className="space-y-6">
      {/* Main Hero Card */}
      <Card extra="w-full p-8 md:p-12 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 border-0 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24"></div>
        </div>

        <div className="relative z-10 max-w-4xl">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white/90 text-sm font-medium mb-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              UPSC Prelims 2025
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Master Your
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                UPSC Journey
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed">
              Complete preparation toolkit designed for UPSC Prelims success with AI-powered insights and comprehensive study materials.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button 
              onClick={handlePreparationGuide}
              className="group flex items-center justify-center gap-3 bg-white text-brand-600 px-8 py-4 rounded-xl font-semibold hover:bg-white/95 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <FiBookOpen className="h-5 w-5" />
              Preparation Guide
              <FiArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
            <button 
              onClick={handleViewSyllabus}
              className="group flex items-center justify-center gap-3 border-2 border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              <FiList className="h-5 w-5" />
              Syllabus Tracker
              <FiArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                <div className="flex justify-center mb-2 text-white/80">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card extra="p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer border border-gray-100 dark:border-gray-700">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <MdQuiz className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-2">Daily Practice</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Solve MCQs and track your progress</p>
          </div>
        </Card>

        <Card extra="p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer border border-gray-100 dark:border-gray-700">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <FiTarget className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-2">Mock Tests</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Full-length practice tests</p>
          </div>
        </Card>

        <Card extra="p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer border border-gray-100 dark:border-gray-700">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <FiTrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-2">Analytics</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Performance insights and trends</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PrelimsHero;