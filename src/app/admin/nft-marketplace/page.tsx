'use client';
import PrelimsHero from 'components/admin/prelims/PrelimsHero';
import ToolkitCard from 'components/admin/prelims/ToolkitCard';

const PrelimsPage = () => {
  const toolkits = [
    {
      id: 1,
      title: 'Previous Year Questions',
      description: 'Comprehensive collection of 45+ years UPSC Prelims questions with detailed explanations.',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/admin/pyqs'
    },
    {
      id: 2,
      title: 'MCQ Practice',
      description: 'Daily adaptive practice sessions with instant feedback and personalized recommendations.',
      image: 'https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/admin/mcq-practice'
    },
    {
      id: 3,
      title: 'YouTube Practice',
      description: 'Generate MCQ questions and study notes from YouTube videos with AI-powered analysis.',
      image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/admin/youtube-practice'
    },
    {
      id: 4,
      title: 'Mind Map Maker',
      description: 'Create interactive mind maps to visualize complex topics and their interconnections.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/admin/mind-map-maker'
    },
    {
      id: 5,
      title: 'Notes Summarizer',
      description: 'AI-powered tool to summarize lengthy notes into concise, exam-focused content.',
      image: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/admin/notes-summarizer'
    },
    {
      id: 6,
      title: 'History Visualizer',
      description: 'Interactive timeline and visual representation of historical events and periods.',
      image: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/admin/history-visualizer'
    },
    {
      id: 7,
      title: 'History Visuals Maker',
      description: 'Generate stunning AI-powered visual representations of any historical event.',
      image: 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/admin/history-visuals-maker'
    },
    {
      id: 8,
      title: 'Mock Tests',
      description: 'Full-length tests simulating actual exam conditions with detailed performance analysis.',
      image: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/admin/test-series'
    },
    {
      id: 9,
      title: 'Smart Notes',
      description: 'Concise, exam-focused notes covering the entire syllabus with visual aids.',
      image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
      link: '/admin/notes'
    },
    {
      id: 10,
      title: 'Trend Analysis',
      description: 'Data-driven insights on question patterns and emerging trends in UPSC Prelims.',
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
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy-700 dark:text-white mb-3">
            Complete Preparation Toolkit
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm">
            Advanced tools for comprehensive UPSC Prelims preparation
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
    </div>
  );
};

export default PrelimsPage;