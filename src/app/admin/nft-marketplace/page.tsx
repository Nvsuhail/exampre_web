'use client';
import Banner from 'components/admin/nft-marketplace/Banner';
import { 
  MdQuiz, 
  MdLibraryBooks, 
  MdAssignment, 
  MdTrendingUp,
  MdPsychology,
  MdAnalytics,
  MdSmartToy,
  MdFlashOn
} from 'react-icons/md';
import { 
  FiBookOpen, 
  FiTarget, 
  FiTrendingUp, 
  FiClock,
  FiBrain,
  FiAward,
  FiUsers,
  FiBarChart3
} from 'react-icons/fi';
import ToolkitCard from 'components/admin/prelims/ToolkitCard';

const PrelimsPage = () => {
  const toolkits = [
    {
      id: 1,
      title: 'Previous Year Questions',
      description: 'Comprehensive collection of UPSC Prelims PYQs from 2010-2024',
      icon: <MdLibraryBooks className="h-8 w-8" />,
      color: 'from-blue-500 to-blue-600',
      stats: '15+ Years',
      features: ['Topic-wise sorting', 'Detailed solutions', 'Trend analysis'],
      link: '/admin/pyqs'
    },
    {
      id: 2,
      title: 'MCQ Practice',
      description: 'Smart MCQ practice with adaptive difficulty and instant feedback',
      icon: <MdQuiz className="h-8 w-8" />,
      color: 'from-green-500 to-green-600',
      stats: '10,000+ MCQs',
      features: ['Subject-wise practice', 'Timed sessions', 'Performance tracking'],
      link: '/admin/mcq-practice'
    },
    {
      id: 3,
      title: 'Test Series',
      description: 'Full-length mock tests simulating actual UPSC Prelims exam',
      icon: <MdAssignment className="h-8 w-8" />,
      color: 'from-purple-500 to-purple-600',
      stats: '50+ Tests',
      features: ['All India ranking', 'Detailed analysis', 'Time management'],
      link: '/admin/test-series'
    },
    {
      id: 4,
      title: 'Smart Flashcards',
      description: 'AI-powered flashcards for quick revision and memory retention',
      icon: <MdFlashOn className="h-8 w-8" />,
      color: 'from-yellow-500 to-orange-500',
      stats: '5,000+ Cards',
      features: ['Spaced repetition', 'Visual learning', 'Custom decks'],
      link: '/admin/flashcards'
    },
    {
      id: 5,
      title: 'Study Notes',
      description: 'Comprehensive notes covering entire UPSC Prelims syllabus',
      icon: <FiBookOpen className="h-8 w-8" />,
      color: 'from-indigo-500 to-indigo-600',
      stats: '25+ Subjects',
      features: ['Mind maps', 'Quick revision', 'Downloadable PDFs'],
      link: '/admin/notes'
    },
    {
      id: 6,
      title: 'MCQ Decoder',
      description: 'Advanced techniques and strategies to decode tricky MCQs',
      icon: <MdPsychology className="h-8 w-8" />,
      color: 'from-red-500 to-red-600',
      stats: '100+ Techniques',
      features: ['Elimination methods', 'Pattern recognition', 'Time-saving tips'],
      link: '/admin/mcq-decoder'
    },
    {
      id: 7,
      title: 'Trends Analysis',
      description: 'Data-driven insights into UPSC question patterns and trends',
      icon: <MdAnalytics className="h-8 w-8" />,
      color: 'from-teal-500 to-teal-600',
      stats: '15 Years Data',
      features: ['Topic weightage', 'Difficulty trends', 'Prediction models'],
      link: '/admin/trends'
    },
    {
      id: 8,
      title: 'AI Mentor',
      description: 'Personalized AI-powered guidance and doubt resolution',
      icon: <MdSmartToy className="h-8 w-8" />,
      color: 'from-pink-500 to-pink-600',
      stats: '24/7 Available',
      features: ['Instant doubt solving', 'Study planning', 'Performance insights'],
      link: '/admin/ai-mentor'
    },
    {
      id: 9,
      title: 'Performance Analytics',
      description: 'Detailed performance tracking and improvement suggestions',
      icon: <FiBarChart3 className="h-8 w-8" />,
      color: 'from-cyan-500 to-cyan-600',
      stats: 'Real-time',
      features: ['Strength analysis', 'Weakness identification', 'Progress tracking'],
      link: '/admin/analytics'
    }
  ];

  const quickStats = [
    { label: 'Active Users', value: '50K+', icon: <FiUsers className="h-5 w-5" />, color: 'text-blue-500' },
    { label: 'Success Rate', value: '85%', icon: <FiAward className="h-5 w-5" />, color: 'text-green-500' },
    { label: 'Questions Solved', value: '2M+', icon: <FiTarget className="h-5 w-5" />, color: 'text-purple-500' },
    { label: 'Study Hours', value: '1M+', icon: <FiClock className="h-5 w-5" />, color: 'text-orange-500' }
  ];

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5">
      {/* Enhanced Hero Banner */}
      <div className="w-full">
        <Banner />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-navy-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-navy-700 dark:text-white">{stat.value}</p>
              </div>
              <div className={`${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toolkit Header */}
      <div className="flex flex-col justify-between px-4 md:flex-row md:items-center">
        <div>
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white flex items-center gap-3">
            <FiBrain className="h-8 w-8 text-brand-500" />
            UPSC Prelims Toolkit
          </h4>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Comprehensive tools and resources for UPSC Prelims preparation
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="flex items-center gap-2 bg-brand-50 dark:bg-brand-900/20 px-4 py-2 rounded-full">
            <FiTrendingUp className="h-4 w-4 text-brand-500" />
            <span className="text-sm font-medium text-brand-500">Updated Daily</span>
          </div>
        </div>
      </div>

      {/* Toolkit Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {toolkits.map((toolkit) => (
          <ToolkitCard key={toolkit.id} toolkit={toolkit} />
        ))}
      </div>

      {/* Study Progress Section */}
      <div className="mt-8 bg-gradient-to-r from-brand-500 to-brand-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Your Study Progress</h3>
            <p className="text-brand-100">Keep up the momentum! You're doing great.</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">78%</div>
            <div className="text-sm text-brand-100">Syllabus Completed</div>
          </div>
        </div>
        <div className="mt-4 bg-white/20 rounded-full h-2">
          <div className="bg-white h-2 rounded-full transition-all duration-500" style={{ width: '78%' }}></div>
        </div>
      </div>

      {/* Recommended Study Plan */}
      <div className="bg-white dark:bg-navy-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
          <FiTarget className="h-5 w-5 text-brand-500" />
          Today's Recommended Study Plan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <MdQuiz className="h-5 w-5 text-blue-500" />
              <span className="font-medium text-blue-700 dark:text-blue-400">Morning Session</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">50 MCQs - History & Culture</p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">9:00 AM - 10:30 AM</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <FiBookOpen className="h-5 w-5 text-green-500" />
              <span className="font-medium text-green-700 dark:text-green-400">Afternoon Session</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Geography Notes Review</p>
            <p className="text-xs text-green-600 dark:text-green-400 mt-1">2:00 PM - 3:30 PM</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <MdAssignment className="h-5 w-5 text-purple-500" />
              <span className="font-medium text-purple-700 dark:text-purple-400">Evening Session</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Mock Test - Environment</p>
            <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">6:00 PM - 8:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrelimsPage;