import React, { useState } from 'react';
import CardMenu from 'components/card/CardMenu';
import Card from 'components/card';
import { MdAccessTime, MdCheckCircle, MdRadioButtonUnchecked } from 'react-icons/md';
import { FiClock, FiUser, FiBookOpen, FiTarget } from 'react-icons/fi';

type TaskStatus = 'pending' | 'in-progress' | 'completed';

type Task = {
  id: number;
  name: string;
  category: string;
  status: TaskStatus;
  dueTime: string;
  priority: 'high' | 'medium' | 'low';
};

const initialTasks: Task[] = [
  {
    id: 1,
    name: 'Complete Mock Test Series 1',
    category: 'Practice Tests',
    status: 'pending',
    dueTime: '2 hours',
    priority: 'high'
  },
  {
    id: 2,
    name: 'Review Constitutional Law',
    category: 'Study',
    status: 'in-progress',
    dueTime: '4 hours',
    priority: 'medium'
  },
  {
    id: 3,
    name: 'Write Essay on Governance',
    category: 'Mains Practice',
    status: 'pending',
    dueTime: '1 day',
    priority: 'high'
  },
  {
    id: 4,
    name: 'Current Affairs Reading',
    category: 'Daily Tasks',
    status: 'completed',
    dueTime: 'Completed',
    priority: 'medium'
  },
  {
    id: 5,
    name: 'Solve Previous Year MCQs',
    category: 'Practice Tests',
    status: 'pending',
    dueTime: '6 hours',
    priority: 'low'
  }
];

function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleStatusChange = (taskId: number, newStatus: TaskStatus) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return <MdCheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <MdAccessTime className="h-5 w-5 text-blue-500" />;
      default:
        return <MdRadioButtonUnchecked className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Practice Tests':
        return <FiTarget className="h-4 w-4" />;
      case 'Study':
        return <FiBookOpen className="h-4 w-4" />;
      case 'Mains Practice':
        return <FiUser className="h-4 w-4" />;
      default:
        return <FiClock className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      default:
        return 'border-l-green-500';
    }
  };

  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const totalTasks = tasks.length;

  return (
    <Card extra={'w-full h-full px-6 pb-6'}>
      <header className="relative flex items-center justify-between pt-4 pb-2">
        <div>
          <h3 className="text-xl font-bold text-navy-700 dark:text-white">
            Task Management
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {completedTasks} of {totalTasks} tasks completed
          </p>
        </div>
        <CardMenu />
      </header>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
          <span className="text-sm font-medium text-brand-500">{Math.round((completedTasks / totalTasks) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
          <div 
            className="bg-gradient-to-r from-brand-500 to-brand-400 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`group relative bg-white dark:bg-navy-800 rounded-xl p-4 border-l-4 ${getPriorityColor(task.priority)} shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                {/* Task Name */}
                <div className="flex items-center gap-3 mb-2">
                  <button
                    onClick={() => {
                      const nextStatus: TaskStatus = 
                        task.status === 'pending' ? 'in-progress' :
                        task.status === 'in-progress' ? 'completed' : 'pending';
                      handleStatusChange(task.id, nextStatus);
                    }}
                    className="flex-shrink-0 hover:scale-110 transition-transform duration-200"
                  >
                    {getStatusIcon(task.status)}
                  </button>
                  <h4 className={`font-semibold text-navy-700 dark:text-white truncate ${
                    task.status === 'completed' ? 'line-through opacity-60' : ''
                  }`}>
                    {task.name}
                  </h4>
                </div>

                {/* Category and Status Row */}
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    {getCategoryIcon(task.category)}
                    <span className="truncate">{task.category}</span>
                  </div>
                  
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value as TaskStatus)}
                    className={`text-xs px-2 py-1 rounded-full border-0 font-medium cursor-pointer transition-colors duration-200 ${getStatusColor(task.status)}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Due Time */}
                <div className="flex items-center gap-2 text-sm">
                  <FiClock className="h-4 w-4 text-gray-400" />
                  <span className={`font-medium ${
                    task.status === 'completed' 
                      ? 'text-green-600 dark:text-green-400' 
                      : task.dueTime.includes('hour') && parseInt(task.dueTime) <= 2
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {task.status === 'completed' ? 'Completed' : `Due in ${task.dueTime}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-navy-700 dark:text-white">
              {tasks.filter(t => t.status === 'pending').length}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Pending</p>
          </div>
          <div>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {tasks.filter(t => t.status === 'in-progress').length}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">In Progress</p>
          </div>
          <div>
            <p className="text-lg font-bold text-green-600 dark:text-green-400">
              {completedTasks}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Completed</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default TaskManagement;