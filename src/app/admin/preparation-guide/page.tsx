'use client';
import Card from 'components/card';
import { FiArrowLeft, FiClock, FiTarget, FiBookOpen, FiCheckCircle } from 'react-icons/fi';
import { MdTimeline, MdLibraryBooks, MdQuiz, MdTrendingUp } from 'react-icons/md';

const PreparationGuidePage = () => {
  const phases = [
    {
      phase: 'Foundation Phase',
      duration: '3-4 Months',
      description: 'Build strong conceptual foundation',
      tasks: [
        'Complete NCERT books (6th-12th)',
        'Basic current affairs reading',
        'Newspaper reading habit',
        'Subject-wise note making'
      ],
      color: 'bg-blue-500'
    },
    {
      phase: 'Intensive Phase',
      duration: '4-5 Months',
      description: 'Deep dive into advanced topics',
      tasks: [
        'Standard reference books',
        'Previous year questions analysis',
        'Mock test series',
        'Revision and practice'
      ],
      color: 'bg-green-500'
    },
    {
      phase: 'Revision Phase',
      duration: '2-3 Months',
      description: 'Consolidate and practice',
      tasks: [
        'Intensive revision',
        'Daily mock tests',
        'Current affairs compilation',
        'Weak area improvement'
      ],
      color: 'bg-purple-500'
    }
  ];

  const subjects = [
    {
      name: 'History',
      weightage: '15-20%',
      topics: ['Ancient India', 'Medieval India', 'Modern India', 'Art & Culture'],
      strategy: 'Focus on NCERT and standard books. Practice chronology.'
    },
    {
      name: 'Geography',
      weightage: '15-20%',
      topics: ['Physical Geography', 'Human Geography', 'Indian Geography', 'World Geography'],
      strategy: 'Map-based learning. Current events integration.'
    },
    {
      name: 'Polity',
      weightage: '15-20%',
      topics: ['Constitution', 'Governance', 'Rights & Duties', 'Institutions'],
      strategy: 'Constitutional provisions. Current political developments.'
    },
    {
      name: 'Economics',
      weightage: '10-15%',
      topics: ['Basic Economics', 'Indian Economy', 'Economic Survey', 'Budget'],
      strategy: 'Conceptual clarity. Economic survey and budget analysis.'
    },
    {
      name: 'Environment',
      weightage: '10-15%',
      topics: ['Ecology', 'Climate Change', 'Biodiversity', 'Environmental Issues'],
      strategy: 'Current environmental issues. Government initiatives.'
    },
    {
      name: 'Science & Technology',
      weightage: '10-15%',
      topics: ['Basic Science', 'Technology', 'Space', 'Defense'],
      strategy: 'Recent developments. Government programs.'
    }
  ];

  const tips = [
    {
      title: 'Daily Schedule',
      description: 'Maintain 8-10 hours of focused study with regular breaks',
      icon: <FiClock className="h-5 w-5" />
    },
    {
      title: 'Target Setting',
      description: 'Set weekly and monthly targets for each subject',
      icon: <FiTarget className="h-5 w-5" />
    },
    {
      title: 'Reading Strategy',
      description: 'Read newspaper daily and make current affairs notes',
      icon: <FiBookOpen className="h-5 w-5" />
    },
    {
      title: 'Practice Tests',
      description: 'Take at least 3-4 mock tests per week in final months',
      icon: <FiCheckCircle className="h-5 w-5" />
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card extra="p-6">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-brand-500 hover:text-brand-600 transition-colors"
          >
            <FiArrowLeft className="h-5 w-5" />
            Back to Prelims
          </button>
        </div>
        <h1 className="text-3xl font-bold text-navy-700 dark:text-white mb-2">
          UPSC Prelims Preparation Guide
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Complete roadmap for UPSC Prelims success
        </p>
      </Card>

      {/* Preparation Phases */}
      <Card extra="p-6">
        <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-6 flex items-center gap-2">
          <MdTimeline className="h-6 w-6 text-brand-500" />
          Preparation Timeline
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {phases.map((phase, index) => (
            <div key={index} className="relative">
              <div className="bg-white dark:bg-navy-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                <div className={`w-4 h-4 ${phase.color} rounded-full mb-4`}></div>
                <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-2">
                  {phase.phase}
                </h3>
                <p className="text-sm text-brand-500 font-medium mb-2">{phase.duration}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{phase.description}</p>
                <ul className="space-y-2">
                  {phase.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-start gap-2 text-sm">
                      <FiCheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Subject-wise Strategy */}
      <Card extra="p-6">
        <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-6 flex items-center gap-2">
          <MdLibraryBooks className="h-6 w-6 text-brand-500" />
          Subject-wise Strategy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjects.map((subject, index) => (
            <div key={index} className="bg-white dark:bg-navy-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-navy-700 dark:text-white">
                  {subject.name}
                </h3>
                <span className="bg-brand-100 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 px-3 py-1 rounded-full text-sm font-medium">
                  {subject.weightage}
                </span>
              </div>
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Key Topics:</h4>
                <div className="flex flex-wrap gap-2">
                  {subject.topics.map((topic, topicIndex) => (
                    <span key={topicIndex} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded text-xs">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Strategy:</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{subject.strategy}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Study Tips */}
      <Card extra="p-6">
        <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-6 flex items-center gap-2">
          <MdTrendingUp className="h-6 w-6 text-brand-500" />
          Essential Study Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white dark:bg-navy-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-brand-100 dark:bg-brand-900/20 p-3 rounded-full text-brand-500">
                  {tip.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-2">
                {tip.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Action */}
      <Card extra="p-6 bg-gradient-to-r from-brand-500 to-brand-600 border-0">
        <div className="text-center text-white">
          <h3 className="text-xl font-bold mb-2">Ready to Start Your Journey?</h3>
          <p className="mb-6 opacity-90">Begin with our comprehensive toolkit</p>
          <button 
            onClick={() => window.location.href = '/admin/nft-marketplace'}
            className="bg-white text-brand-600 px-6 py-3 rounded-lg font-medium hover:bg-white/95 transition-colors"
          >
            Go to Toolkit
          </button>
        </div>
      </Card>
    </div>
  );
};

export default PreparationGuidePage;