'use client';
import PrelimsHero from 'components/admin/prelims/PrelimsHero';
import ToolkitCard from 'components/admin/prelims/ToolkitCard';
import Card from 'components/card';
import { FiBookOpen, FiTarget, FiTrendingUp, FiUsers, FiCalendar, FiBrain } from 'react-icons/fi';
import { MdQuiz, MdLibraryBooks, MdAnalytics } from 'react-icons/md';

const PrelimsPage = () => {
  const toolkits = [
    {
      id: 1,
      title: 'Previous Year Questions',
      description: 'Comprehensive collection of 45+ years UPSC Prelims questions with detailed explanations and trend analysis.',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/admin/pyqs'
    },
    {
      id: 2,
      title: 'MCQ Practice',
      description: 'Daily adaptive practice sessions with instant feedback, difficulty progression, and personalized recommendations.',
      image: 'https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/admin/mcq-practice'
    },
    {
      id: 3,
      title: 'Mock Tests',
      description: 'Full-length tests simulating actual exam conditions with detailed performance analysis and ranking.',
      image: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/admin/test-series'
    },
    {
      id: 4,
      title: 'Smart Notes',
      description: 'Concise, exam-focused notes covering the entire syllabus with visual aids and memory techniques.',
      image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/admin/notes'
    },
    {
      id: 5,
      title: 'Flashcards',
      description: 'AI-powered spaced repetition system for effective memorization of facts, dates, and concepts.',
      image: 'https://images.pexels.com/photos/6238302/pexels-photo-6238302.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/admin/flashcards'
    },
    {
      id: 6,
      title: 'Trend Analysis',
      description: 'Data-driven insights on question patterns, topic weightage, and emerging trends in UPSC Prelims.',
      image: 'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/admin/trends'
    }
  ];

  const features = [
    {
      icon: <FiBrain className="h-6 w-6" />,
      title: 'AI-Powered Learning',
      description: 'Personalized study paths based on your performance'
    },
    {
      icon: <FiTarget className="h-6 w-6" />,
      title: 'Goal Tracking',
      description: 'Set and monitor your preparation milestones'
    },
    {
      icon: <MdAnalytics className="h-6 w-6" />,
      title: 'Performance Analytics',
      description: 'Detailed insights into your strengths and weaknesses'
    },
    {
      icon: <FiUsers className="h-6 w-6" />,
      title: 'Peer Comparison',
      description: 'Compare your progress with other aspirants'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <PrelimsHero />

      {/* Features Section */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-navy-700 dark:text-white mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Advanced features designed to accelerate your UPSC preparation with proven methodologies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} extra="p-6 text-center hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 group">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Toolkit Section */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-navy-700 dark:text-white mb-4">
            Complete Preparation Toolkit
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need for UPSC Prelims success, organized and optimized for efficient learning
          </p>
        </div>

        {/* Toolkit Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {toolkits.map((toolkit) => (
            <ToolkitCard
              key={toolkit.id}
              title={toolkit.title}
              description={toolkit.description}
              image={toolkit.image}
              link={toolkit.link}
            />
          ))}
        </div>
      </div>

      {/* Study Statistics */}
      <Card extra="p-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-navy-900 dark:to-navy-800 border-0">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-2">
            Join Thousands of Successful Aspirants
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Our platform has helped aspirants achieve their UPSC dreams
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-brand-600 mb-2">50k+</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">1.2M+</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Questions Solved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">95%</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">24/7</div>
            <div className="text-gray-600 dark:text-gray-400 text-sm">Support</div>
          </div>
        </div>
      </Card>

      {/* Call to Action */}
      <Card extra="p-8 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 border-0 text-center">
        <div className="max-w-2xl mx-auto text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Begin Your Success Journey?
          </h3>
          <p className="text-lg opacity-90 mb-8">
            Start with our comprehensive preparation guide and take the first step towards your UPSC success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/admin/preparation-guide'}
              className="bg-white text-brand-600 px-8 py-4 rounded-xl font-semibold hover:bg-white/95 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Start Preparation Guide
            </button>
            <button 
              onClick={() => window.location.href = '/admin/syllabus-tracker'}
              className="border-2 border-white/30 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              Track Your Progress
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PrelimsPage;