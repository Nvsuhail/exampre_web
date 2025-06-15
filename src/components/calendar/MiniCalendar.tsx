import { useState } from 'react';
import Calendar from 'react-calendar';
import Card from 'components/card';
import 'react-calendar/dist/Calendar.css';
import { MdChevronLeft, MdChevronRight, MdEvent, MdToday, MdSchedule } from 'react-icons/md';
import { FiCalendar, FiClock, FiTarget, FiTrendingUp } from 'react-icons/fi';
import 'styles/MiniCalendar.css';

const MiniCalendar = () => {
  const [value, onChange] = useState(new Date());

  // Sample events data
  const events = [
    {
      date: new Date().toDateString(),
      title: 'Mock Test Series',
      time: '10:00 AM',
      type: 'test',
      color: 'bg-blue-500'
    },
    {
      date: new Date(Date.now() + 86400000).toDateString(),
      title: 'Current Affairs Quiz',
      time: '2:00 PM',
      type: 'quiz',
      color: 'bg-green-500'
    },
    {
      date: new Date(Date.now() + 172800000).toDateString(),
      title: 'Essay Writing Practice',
      time: '4:00 PM',
      type: 'practice',
      color: 'bg-purple-500'
    }
  ];

  const todaysEvents = events.filter(event => event.date === new Date().toDateString());
  const upcomingEvents = events.filter(event => event.date !== new Date().toDateString());

  const stats = [
    { label: 'Study Days', value: '42', icon: <FiCalendar className="h-4 w-4" />, color: 'text-blue-500' },
    { label: 'Hours Today', value: '6.5', icon: <FiClock className="h-4 w-4" />, color: 'text-green-500' },
    { label: 'Target Met', value: '85%', icon: <FiTarget className="h-4 w-4" />, color: 'text-purple-500' },
    { label: 'Streak', value: '12', icon: <FiTrendingUp className="h-4 w-4" />, color: 'text-orange-500' }
  ];

  return (
    <Card extra="flex w-full h-full flex-col px-6 py-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-navy-700 dark:text-white flex items-center gap-2">
            <MdEvent className="h-6 w-6 text-brand-500" />
            Study Calendar
          </h3>
          <div className="flex items-center gap-2 bg-brand-50 dark:bg-brand-900/20 px-3 py-1 rounded-full">
            <MdToday className="h-4 w-4 text-brand-500" />
            <span className="text-sm font-medium text-brand-500">Today</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-50 dark:bg-navy-800 rounded-xl p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-lg font-bold text-navy-700 dark:text-white">{stat.value}</p>
                </div>
                <div className={`${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar */}
      <div className="mb-6">
        <Calendar
          onChange={onChange}
          value={value}
          prevLabel={<MdChevronLeft className="ml-1 h-6 w-6" />}
          nextLabel={<MdChevronRight className="ml-1 h-6 w-6" />}
          view={'month'}
          className="w-full"
        />
      </div>

      {/* Today's Events */}
      {todaysEvents.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-bold text-navy-700 dark:text-white mb-3 flex items-center gap-2">
            <MdSchedule className="h-4 w-4 text-brand-500" />
            Today's Schedule
          </h4>
          <div className="space-y-2">
            {todaysEvents.map((event, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white dark:bg-navy-800 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-navy-700 dark:text-white truncate">{event.title}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div>
          <h4 className="text-sm font-bold text-navy-700 dark:text-white mb-3">Upcoming Events</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-navy-900 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${event.color}`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-navy-700 dark:text-white truncate">{event.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Study Progress Indicator */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Daily Goal Progress</span>
          <span className="text-xs font-medium text-brand-500">85%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-brand-500 to-brand-400 h-2 rounded-full transition-all duration-500"
            style={{ width: '85%' }}
          ></div>
        </div>
      </div>
    </Card>
  );
};

export default MiniCalendar;