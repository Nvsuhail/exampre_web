'use client';
import PrelimsHero from 'components/admin/prelims/PrelimsHero';
import ToolkitCard from 'components/admin/prelims/ToolkitCard';
import { 
  MdQuiz, 
  MdAssignment, 
  MdTrendingUp, 
  MdPsychology,
  MdLibraryBooks,
  MdAnalytics,
  MdSmartToy,
  MdFlashOn
} from 'react-icons/md';
import { 
  FiBookOpen, 
  FiTarget, 
  FiTrendingUp, 
  FiUsers,
  FiClock,
  FiAward
} from 'react-icons/fi';

const PrelimsPage = () => {
  const toolkits = [
    {
      id: 1,
      title: 'Previous Year Questions',
      description: 'Comprehensive collection of UPSC Prelims PYQs from 1979-2024',
      icon: <MdLibraryBooks className="h-8 w-8" />,
      color: 'from-blue-500 to-blue-600',
      stats: '45+ Years',
      features: ['Topic-wise sorting', 'Year-wise analysis', 'Difficulty levels'],
      link: '/admin/pyqs'
    },
    {
      id: 2,
      title: 'MCQ Practice',
      description: 'Daily practice with 10,000+ curated multiple choice questions',
      icon: <MdQuiz className="h-8 w-8" />,
      color: 'from-green-500 to-green-600',
      stats: '10K+ MCQs',
      features: ['Subject-wise practice', 'Timed sessions', 'Instant feedback'],
      link: '/admin/mcq-practice'
    },
    {
      id: 3,
      title: 'Test Series',
      description: 'Full-length mock tests simulating actual UPSC Prelims',
      icon: <MdAssignment className="h-8 w-8" />,
      color: 'from-purple-500 to-purple-600',
      stats: '100+ Tests',
      features: ['All India ranking', 'Detailed analysis', 'Performance tracking'],
      link: '/admin/test-series'
    },
    {
      id: 4,
      title: 'Smart Flashcards',
      description: 'AI-powered flashcards for quick revision and memory retention',
      icon: <MdFlashOn className="h-8 w-8" />,
      color: 'from-yellow-500 to-orange-500',
      stats: '5K+ Cards',
      features: ['Spaced repetition', 'Visual learning', 'Custom decks'],
      link: '/admin/flashcards'
    },
    {
      id: 5,
      title: 'Study Notes',
      description: 'Comprehensive notes covering entire UPSC Prelims syllabus',
      icon: <FiBookOpen className="h-8 w-8" />,
      color: 'from-indigo-500 to-indigo-600',
      stats: '2000+ Pages',
      features: ['Topic summaries', 'Mind maps', 'Quick revision'],
      link: '/admin/notes'
    },
    {
      id: 6,
      title: 'MCQ Decoder',
      description: 'Advanced analysis tool to decode MCQ patterns and strategies',
      icon: <MdPsychology className="h-8 w-8" />,
      color: 'from-pink-500 to-rose-500',
      stats: 'AI Powered',
      features: ['Pattern recognition', 'Strategy tips', 'Elimination techniques'],
      link: '/admin/mcq-decoder'
    },
    {
      id: 7,
      title: 'Trends Analysis',
      description: 'Data-driven insights on UPSC question trends and patterns',
      icon: <MdAnalytics className="h-8 w-8" />,
      color: 'from-teal-500 to-cyan-500',
      stats: 'Live Data',
      features: ['Topic frequency', 'Difficulty trends', 'Predictive analysis'],
      link: '/admin/trends'
    },
    {
      id: 8,
      title: 'AI Mentor',
      description: 'Personalized AI guidance for your UPSC preparation journey',
      icon: <MdSmartToy className="h-8 w-8" />,
      color: 'from-violet-500 to-purple-500',
      stats: '24/7 Support',
      features: ['Doubt clearing', 'Study planning', 'Performance insights'],
      link: '/admin/ai-mentor'
    }
  ];

  const quickStats = [
    {
      label: 'Active Learners',
      value: '50K+',
      icon: <FiUsers className="h-5 w-5" />,
      color: 'text-blue-500'
    },
    {
      label: 'Success Rate',
      value: '78%',
      icon: <FiTarget className="h-5 w-5" />,
      color: 'text-green-500'
    },
    {
      label: 'Avg. Score Improvement',
      value: '+45%',
      icon: <FiTrendingUp className="h-5 w-5" />,
      color: 'text-purple-500'
    },
    {
      label: 'Study Hours Saved',
      value: '200+',
      icon: <FiClock className="h-5 w-5" />,
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5">
      {/* Hero Section */}
      <div className="col-span-1 h-fit w-full">
        <PrelimsHero />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-navy-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
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
      <div className="mb-4 flex flex-col justify-between px-4 md:flex-row md:items-center">
        <div>
          <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
            UPSC Prelims Toolkit
          </h4>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Comprehensive tools designed for effective UPSC Prelims preparation
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="linear rounded-xl bg-brand-500 px-6 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200">
            View All Tools
          </button>
        </div>
      </div>

      {/* Toolkit Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {toolkits.map((toolkit) => (
          <ToolkitCard
            key={toolkit.id}
            title={toolkit.title}
            description={toolkit.description}
            icon={toolkit.icon}
            color={toolkit.color}
            stats={toolkit.stats}
            features={toolkit.features}
            link={toolkit.link}
          />
        ))}
      </div>

      {/* Featured Section */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Today's Focus */}
        <div className="bg-white dark:bg-navy-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-brand-100 dark:bg-brand-900/20 rounded-lg">
              <FiTarget className="h-6 w-6 text-brand-500" />
            </div>
            <h3 className="text-xl font-bold text-navy-700 dark:text-white">Today's Focus</h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 dark:bg-navy-900 rounded-lg">
              <h4 className="font-semibold text-navy-700 dark:text-white">Modern Indian History</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Complete 50 MCQs on Freedom Struggle</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-brand-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <span className="text-xs text-brand-500 font-medium">60%</span>
              </div>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-navy-900 rounded-lg">
              <h4 className="font-semibold text-navy-700 dark:text-white">Geography</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Revise Physical Geography notes</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <span className="text-xs text-green-500 font-medium">Done</span>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Highlights */}
        <div className="bg-white dark:bg-navy-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
              <FiAward className="h-6 w-6 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold text-navy-700 dark:text-white">Recent Achievements</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <FiTarget className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-navy-700 dark:text-white">7-Day Streak!</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Consistent daily practice</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <MdQuiz className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-navy-700 dark:text-white">Top 10% Score</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Last mock test performance</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <MdTrendingUp className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-navy-700 dark:text-white">25% Improvement</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Score improvement this month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrelimsPage;