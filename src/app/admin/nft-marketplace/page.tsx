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
  FiBookOpen
} from 'react-icons/fi';

const PrelimsPage = () => {
  const toolkits = [
    {
      id: 1,
      title: 'Previous Year Questions',
      description: 'Comprehensive collection of UPSC Prelims PYQs from 1979-2024',
      icon: <MdLibraryBooks className="h-8 w-8" />,
      color: 'from-blue-500 to-blue-600',
      link: '/admin/pyqs'
    },
    {
      id: 2,
      title: 'MCQ Practice',
      description: 'Daily practice with curated multiple choice questions',
      icon: <MdQuiz className="h-8 w-8" />,
      color: 'from-green-500 to-green-600',
      link: '/admin/mcq-practice'
    },
    {
      id: 3,
      title: 'Test Series',
      description: 'Full-length mock tests simulating actual UPSC Prelims',
      icon: <MdAssignment className="h-8 w-8" />,
      color: 'from-purple-500 to-purple-600',
      link: '/admin/test-series'
    },
    {
      id: 4,
      title: 'Smart Flashcards',
      description: 'AI-powered flashcards for quick revision and memory retention',
      icon: <MdFlashOn className="h-8 w-8" />,
      color: 'from-yellow-500 to-orange-500',
      link: '/admin/flashcards'
    },
    {
      id: 5,
      title: 'Study Notes',
      description: 'Comprehensive notes covering entire UPSC Prelims syllabus',
      icon: <FiBookOpen className="h-8 w-8" />,
      color: 'from-indigo-500 to-indigo-600',
      link: '/admin/notes'
    },
    {
      id: 6,
      title: 'MCQ Decoder',
      description: 'Advanced analysis tool to decode MCQ patterns and strategies',
      icon: <MdPsychology className="h-8 w-8" />,
      color: 'from-pink-500 to-rose-500',
      link: '/admin/mcq-decoder'
    },
    {
      id: 7,
      title: 'Trends Analysis',
      description: 'Data-driven insights on UPSC question trends and patterns',
      icon: <MdAnalytics className="h-8 w-8" />,
      color: 'from-teal-500 to-cyan-500',
      link: '/admin/trends'
    },
    {
      id: 8,
      title: 'AI Mentor',
      description: 'Personalized AI guidance for your UPSC preparation journey',
      icon: <MdSmartToy className="h-8 w-8" />,
      color: 'from-violet-500 to-purple-500',
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
      <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {toolkits.map((toolkit) => (
          <ToolkitCard
            key={toolkit.id}
            title={toolkit.title}
            description={toolkit.description}
            icon={toolkit.icon}
            color={toolkit.color}
            link={toolkit.link}
          />
        ))}
      </div>
    </div>
  );
};

export default PrelimsPage;