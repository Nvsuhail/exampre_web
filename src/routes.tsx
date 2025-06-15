import React from 'react';

// Icon Imports
import {
  MdHome,
  MdQuiz,
  MdEdit,
  MdPerson,
  MdLock,
  MdTrendingUp,
  MdPeople,
  MdLibraryBooks,
  MdAssignment,
  MdSchedule,
  MdSettings,
} from 'react-icons/md';
import { FiTarget, FiBookOpen, FiUsers, FiCalendar } from 'react-icons/fi';

const routes = [
  {
    name: 'Dashboard',
    layout: '/admin',
    path: 'default',
    icon: <MdHome className="h-6 w-6" />,
  },
  {
    name: 'Prelims',
    layout: '/admin',
    path: 'nft-marketplace',
    icon: <MdQuiz className="h-6 w-6" />,
    secondary: true,
  },
  {
    name: 'Mains',
    layout: '/admin',
    icon: <MdEdit className="h-6 w-6" />,
    path: 'data-tables',
  },
  {
    name: 'Current Affairs',
    layout: '/admin',
    path: 'current-affairs',
    icon: <MdLibraryBooks className="h-6 w-6" />,
  },
  {
    name: 'Test Series',
    layout: '/admin',
    path: 'test-series',
    icon: <MdAssignment className="h-6 w-6" />,
  },
  {
    name: 'Performance',
    layout: '/admin',
    path: 'performance',
    icon: <MdTrendingUp className="h-6 w-6" />,
  },
  {
    name: 'Study Planner',
    layout: '/admin',
    path: 'study-planner',
    icon: <FiCalendar className="h-6 w-6" />,
  },
  {
    name: 'Connect with Mentor',
    layout: '/admin',
    path: 'mentor',
    icon: <FiUsers className="h-6 w-6" />,
  },
  {
    name: 'Discussion Forum',
    layout: '/admin',
    path: 'forum',
    icon: <MdPeople className="h-6 w-6" />,
  },
  {
    name: 'Study Materials',
    layout: '/admin',
    path: 'materials',
    icon: <FiBookOpen className="h-6 w-6" />,
  },
  {
    name: 'Mock Interviews',
    layout: '/admin',
    path: 'interviews',
    icon: <MdSchedule className="h-6 w-6" />,
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: 'profile',
    icon: <MdPerson className="h-6 w-6" />,
  },
  {
    name: 'Settings',
    layout: '/admin',
    path: 'settings',
    icon: <MdSettings className="h-6 w-6" />,
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: 'sign-in',
    icon: <MdLock className="h-6 w-6" />,
  },
  {
    name: 'RTL Admin',
    layout: '/rtl',
    path: 'rtl-default',
    icon: <MdHome className="h-6 w-6" />,
  },
];
export default routes;