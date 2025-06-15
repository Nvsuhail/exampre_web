'use client';
import PrelimsHero from 'components/admin/prelims/PrelimsHero';
import ToolkitCard from 'components/admin/prelims/ToolkitCard';

const PrelimsPage = () => {
  const toolkits = [
    {
      id: 1,
      title: 'Previous Year Questions',
      description: 'Solve 45+ years of UPSC Prelims questions with detailed explanations and trend analysis.',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/admin/pyqs'
    },
    {
      id: 2,
      title: 'MCQ Practice',
      description: 'Daily practice sessions with adaptive difficulty and instant feedback.',
      image: 'https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/admin/mcq-practice'
    },
    {
      id: 3,
      title: 'Mock Tests',
      description: 'Full-length tests simulating actual exam conditions with detailed performance analysis.',
      image: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/admin/test-series'
    },
    {
      id: 4,
      title: 'Smart Notes',
      description: 'Concise, exam-focused notes covering the entire UPSC Prelims syllabus.',
      image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/admin/notes'
    },
    {
      id: 5,
      title: 'Flashcards',
      description: 'AI-powered spaced repetition system for effective memorization.',
      image: 'https://images.pexels.com/photos/6238302/pexels-photo-6238302.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/admin/flashcards'
    },
    {
      id: 6,
      title: 'Trend Analysis',
      description: 'Data-driven insights on question patterns and important topics.',
      image: 'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/admin/trends'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <PrelimsHero />

      {/* Toolkit Section */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-navy-700 dark:text-white mb-4">
            Preparation Toolkit
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Everything you need to ace UPSC Prelims in one place
          </p>
        </div>

        {/* Toolkit Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Quick Stats */}
      <div className="bg-gray-50 dark:bg-navy-800 rounded-2xl p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-brand-500 mb-2">45+</div>
            <div className="text-gray-600 dark:text-gray-400">Years of PYQs</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-500 mb-2">10K+</div>
            <div className="text-gray-600 dark:text-gray-400">Practice Questions</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-500 mb-2">500+</div>
            <div className="text-gray-600 dark:text-gray-400">Mock Tests</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-500 mb-2">95%</div>
            <div className="text-gray-600 dark:text-gray-400">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrelimsPage;