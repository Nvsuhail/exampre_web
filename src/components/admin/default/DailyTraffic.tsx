import { MdArrowDropUp, MdQuiz, MdArticle, MdForum, MdNewspaper, MdTrendingUp } from 'react-icons/md';
import { FiExternalLink, FiUsers, FiMessageCircle, FiClock } from 'react-icons/fi';
import Card from 'components/card';

const TodaysHappenings = () => {
  const happenings = [
    {
      id: 1,
      type: 'quiz',
      title: 'Daily Current Affairs Quiz',
      description: 'Test your knowledge with today\'s current affairs',
      participants: 1247,
      status: 'Live',
      time: '2 hours left',
      icon: <MdQuiz className="h-5 w-5" />,
      color: 'bg-blue-500',
      link: '/quiz/current-affairs'
    },
    {
      id: 2,
      type: 'editorial',
      title: 'Economic Survey Analysis',
      description: 'Detailed breakdown of key economic indicators',
      participants: 892,
      status: 'New',
      time: '5 min read',
      icon: <MdArticle className="h-5 w-5" />,
      color: 'bg-green-500',
      link: '/editorials/economic-survey'
    },
    {
      id: 3,
      type: 'discussion',
      title: 'UPSC Strategy Discussion',
      description: 'Share and discuss preparation strategies',
      participants: 456,
      status: 'Active',
      time: '23 replies',
      icon: <MdForum className="h-5 w-5" />,
      color: 'bg-purple-500',
      link: '/discussions/upsc-strategy'
    },
    {
      id: 4,
      type: 'news',
      title: 'Today\'s Current Affairs',
      description: 'Latest news and updates for UPSC preparation',
      participants: 2156,
      status: 'Updated',
      time: 'Just now',
      icon: <MdNewspaper className="h-5 w-5" />,
      color: 'bg-orange-500',
      link: '/current-affairs/today'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'New':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Updated':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const handleNavigation = (link: string) => {
    // In a real app, you would use Next.js router or your routing solution
    console.log(`Navigating to: ${link}`);
    // For demo purposes, we'll show an alert
    alert(`Would navigate to: ${link}`);
  };

  return (
    <Card extra="pb-7 p-[20px]">
      <div className="flex flex-row justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-navy-700 dark:text-white">
            Today's Happenings
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Live updates and activities
          </p>
        </div>
        <div className="flex items-center text-sm text-green-500">
          <MdTrendingUp className="h-5 w-5 mr-1" />
          <p className="font-bold">+15.2%</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">4.8k</p>
              <p className="text-sm text-blue-600/70 dark:text-blue-400/70">Active Users</p>
            </div>
            <FiUsers className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">127</p>
              <p className="text-sm text-green-600/70 dark:text-green-400/70">Live Sessions</p>
            </div>
            <FiMessageCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Happenings List */}
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {happenings.map((item) => (
          <div
            key={item.id}
            onClick={() => handleNavigation(item.link)}
            className="group relative bg-white dark:bg-navy-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-brand-500/30 transition-all duration-300 cursor-pointer"
          >
            {/* Status Badge */}
            <div className="absolute top-3 right-3">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                {item.status}
              </span>
            </div>

            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`${item.color} rounded-lg p-3 text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                {item.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-semibold text-navy-700 dark:text-white group-hover:text-brand-500 transition-colors duration-200 truncate">
                    {item.title}
                  </h4>
                  <FiExternalLink className="h-4 w-4 text-gray-400 group-hover:text-brand-500 transition-colors duration-200 flex-shrink-0" />
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                  {item.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <FiUsers className="h-3 w-3" />
                      <span>{item.participants.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiClock className="h-3 w-3" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={() => handleNavigation('/dashboard/all-activities')}
          className="w-full bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group"
        >
          <span>View All Activities</span>
          <FiExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </Card>
  );
};

export default TodaysHappenings;