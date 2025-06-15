'use client';
import PrelimsHero from 'components/admin/prelims/PrelimsHero';
import ToolkitCard from 'components/admin/prelims/ToolkitCard';

const PrelimsPage = () => {
  const toolkits = [
    {
      id: 1,
      title: 'Previous Year Questions',
      description: 'Comprehensive collection of UPSC Prelims PYQs from 1979-2024',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=500',
      link: '/admin/pyqs'
    },
    {
      id: 2,
      title: 'MCQ Practice',
      description: 'Daily practice with curated multiple choice questions',
      image: 'https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg?auto=compress&cs=tinysrgb&w=500',
      link: '/admin/mcq-practice'
    },
    {
      id: 3,
      title: 'Test Series',
      description: 'Full-length mock tests simulating actual UPSC Prelims',
      image: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg?auto=compress&cs=tinysrgb&w=500',
      link: '/admin/test-series'
    },
    {
      id: 4,
      title: 'Smart Flashcards',
      description: 'AI-powered flashcards for quick revision and memory retention',
      image: 'https://images.pexels.com/photos/6238302/pexels-photo-6238302.jpeg?auto=compress&cs=tinysrgb&w=500',
      link: '/admin/flashcards'
    },
    {
      id: 5,
      title: 'Study Notes',
      description: 'Comprehensive notes covering entire UPSC Prelims syllabus',
      image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=500',
      link: '/admin/notes'
    },
    {
      id: 6,
      title: 'MCQ Decoder',
      description: 'Advanced analysis tool to decode MCQ patterns and strategies',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=500',
      link: '/admin/mcq-decoder'
    },
    {
      id: 7,
      title: 'Trends Analysis',
      description: 'Data-driven insights on UPSC question trends and patterns',
      image: 'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=500',
      link: '/admin/trends'
    },
    {
      id: 8,
      title: 'AI Mentor',
      description: 'Personalized AI guidance for your UPSC preparation journey',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=500',
      link: '/admin/ai-mentor'
    }
  ];

  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5">
      {/* Hero Section */}
      <div className="col-span-1 h-fit w-full">
        <PrelimsHero />
      </div>

      {/* Toolkit Header */}
      <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
        <h4 className="ml-1 text-2xl font-bold text-navy-700 dark:text-white">
          UPSC Prelims Toolkit
        </h4>
      </div>

      {/* Toolkit Cards */}
      <div className="z-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
  );
};

export default PrelimsPage;