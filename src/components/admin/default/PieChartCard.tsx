import { MdTrendingUp, MdCheckCircle, MdTarget, MdSchool } from 'react-icons/md';
import { FiTarget, FiBrain, FiEdit3 } from 'react-icons/fi';
import Card from 'components/card';

const TodaysProgress = () => {
  const progressData = [
    {
      label: 'Correct Answers',
      value: 18,
      total: 25,
      percentage: 72,
      color: 'bg-green-500',
      icon: <MdCheckCircle className="h-5 w-5" />,
      trend: '+12%'
    },
    {
      label: 'Quiz Accuracy',
      value: 85,
      total: 100,
      percentage: 85,
      color: 'bg-blue-500',
      icon: <FiTarget className="h-5 w-5" />,
      trend: '+8%'
    },
    {
      label: 'Mains Average',
      value: 78,
      total: 100,
      percentage: 78,
      color: 'bg-purple-500',
      icon: <FiEdit3 className="h-5 w-5" />,
      trend: '+15%'
    }
  ];

  const overallScore = Math.round((progressData.reduce((acc, item) => acc + item.percentage, 0) / progressData.length));

  return (
    <Card extra="rounded-[20px] p-6">
      <div className="flex flex-row justify-between items-center mb-6">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Today's Progress
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Performance overview
          </p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
          <MdTrendingUp className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium text-green-600 dark:text-green-400">+11.7%</span>
        </div>
      </div>

      {/* Overall Score Circle */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200 dark:text-gray-700"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - overallScore / 100)}`}
              className="transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4318FF" />
                <stop offset="100%" stopColor="#6AD2FF" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-navy-700 dark:text-white">{overallScore}%</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Overall</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Items */}
      <div className="space-y-4">
        {progressData.map((item, index) => (
          <div key={index} className="bg-gray-50 dark:bg-navy-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`${item.color} rounded-lg p-2 text-white`}>
                  {item.icon}
                </div>
                <div>
                  <h5 className="font-semibold text-navy-700 dark:text-white text-sm">
                    {item.label}
                  </h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {item.value}/{item.total}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-navy-700 dark:text-white">
                  {item.percentage}%
                </div>
                <div className="text-xs text-green-500 font-medium">
                  {item.trend}
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-1000 ease-out ${item.color}`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <FiBrain className="h-4 w-4 text-brand-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Study Streak</span>
            </div>
            <p className="text-xl font-bold text-navy-700 dark:text-white">42 days</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <MdSchool className="h-4 w-4 text-brand-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Rank</span>
            </div>
            <p className="text-xl font-bold text-navy-700 dark:text-white">#127</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TodaysProgress;