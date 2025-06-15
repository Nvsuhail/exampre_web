'use client';
import { useState } from 'react';
import Card from 'components/card';
import { FiArrowLeft, FiPlus, FiEdit2, FiTrash2, FiBookOpen, FiTarget, FiTrendingUp, FiFilter } from 'react-icons/fi';
import { MdCheckCircle, MdRadioButtonUnchecked, MdAccessTime, MdBook, MdSort } from 'react-icons/md';

interface Module {
  id: string;
  name: string;
  category: 'Prelims' | 'Mains' | 'Both';
  subject: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'revision';
  priority: 'high' | 'medium' | 'low';
  notes: string;
  dateAdded: string;
  lastUpdated: string;
}

const SyllabusTrackerPage = () => {
  const [showAddModule, setShowAddModule] = useState(false);
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [filterCategory, setFilterCategory] = useState<'All' | 'Prelims' | 'Mains' | 'Both'>('All');
  const [filterStatus, setFilterStatus] = useState<'All' | 'not-started' | 'in-progress' | 'completed' | 'revision'>('All');
  const [sortBy, setSortBy] = useState<'name' | 'category' | 'status' | 'priority' | 'dateAdded'>('dateAdded');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Unified modules data
  const [modules, setModules] = useState<Module[]>([
    {
      id: '1',
      name: 'Ancient India - Indus Valley Civilization',
      category: 'Both',
      subject: 'History',
      status: 'completed',
      priority: 'high',
      notes: 'Completed with NCERT and additional sources',
      dateAdded: '2024-01-15',
      lastUpdated: '2024-01-20'
    },
    {
      id: '2',
      name: 'Vedic Period and Early Kingdoms',
      category: 'Both',
      subject: 'History',
      status: 'in-progress',
      priority: 'high',
      notes: 'Need to complete Mauryan Empire section',
      dateAdded: '2024-01-21',
      lastUpdated: '2024-01-25'
    },
    {
      id: '3',
      name: 'Physical Geography - Earth and Universe',
      category: 'Prelims',
      subject: 'Geography',
      status: 'not-started',
      priority: 'medium',
      notes: '',
      dateAdded: '2024-01-10',
      lastUpdated: '2024-01-10'
    },
    {
      id: '4',
      name: 'Essay Writing Techniques',
      category: 'Mains',
      subject: 'Essay',
      status: 'in-progress',
      priority: 'high',
      notes: 'Practice different essay formats',
      dateAdded: '2024-01-12',
      lastUpdated: '2024-01-22'
    },
    {
      id: '5',
      name: 'Constitutional Framework',
      category: 'Both',
      subject: 'Polity',
      status: 'revision',
      priority: 'high',
      notes: 'Important for both prelims and mains',
      dateAdded: '2024-01-08',
      lastUpdated: '2024-01-24'
    }
  ]);

  const [newModule, setNewModule] = useState<Partial<Module>>({
    name: '',
    category: 'Both',
    subject: '',
    status: 'not-started',
    priority: 'medium',
    notes: ''
  });

  const subjects = [
    'History', 'Geography', 'Polity', 'Economics', 'Environment', 'Science & Technology',
    'Current Affairs', 'Ethics', 'Essay', 'Optional Subject', 'General Studies'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'revision': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Prelims': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Mains': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'Both': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 dark:text-red-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-green-600 dark:text-green-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <MdCheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress': return <MdAccessTime className="h-5 w-5 text-blue-500" />;
      case 'revision': return <MdBook className="h-5 w-5 text-purple-500" />;
      default: return <MdRadioButtonUnchecked className="h-5 w-5 text-gray-400" />;
    }
  };

  const addModule = () => {
    if (!newModule.name || !newModule.subject) return;

    const moduleToAdd: Module = {
      id: Date.now().toString(),
      name: newModule.name,
      category: newModule.category || 'Both',
      subject: newModule.subject,
      status: newModule.status || 'not-started',
      priority: newModule.priority || 'medium',
      notes: newModule.notes || '',
      dateAdded: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setModules([...modules, moduleToAdd]);
    setNewModule({
      name: '',
      category: 'Both',
      subject: '',
      status: 'not-started',
      priority: 'medium',
      notes: ''
    });
    setShowAddModule(false);
  };

  const updateModule = (moduleId: string, updates: Partial<Module>) => {
    setModules(modules.map(module => {
      if (module.id === moduleId) {
        return {
          ...module,
          ...updates,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return module;
    }));
  };

  const deleteModule = (moduleId: string) => {
    setModules(modules.filter(module => module.id !== moduleId));
  };

  const filteredAndSortedModules = modules
    .filter(module => {
      if (filterCategory !== 'All' && module.category !== filterCategory) return false;
      if (filterStatus !== 'All' && module.status !== filterStatus) return false;
      return true;
    })
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'priority') {
        const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
        aValue = priorityOrder[a.priority as keyof typeof priorityOrder];
        bValue = priorityOrder[b.priority as keyof typeof priorityOrder];
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const calculateProgress = () => {
    const totalModules = modules.length;
    const completedModules = modules.filter(m => m.status === 'completed').length;
    const revisionModules = modules.filter(m => m.status === 'revision').length;
    const inProgressModules = modules.filter(m => m.status === 'in-progress').length;

    const prelimsModules = modules.filter(m => m.category === 'Prelims' || m.category === 'Both');
    const mainsModules = modules.filter(m => m.category === 'Mains' || m.category === 'Both');

    return {
      subjectProgress: totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0,
      revisionProgress: totalModules > 0 ? Math.round((revisionModules / totalModules) * 100) : 0,
      totalModules,
      completedModules,
      revisionModules,
      inProgressModules,
      prelimsCount: prelimsModules.length,
      mainsCount: mainsModules.length
    };
  };

  const progress = calculateProgress();

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card extra="p-6">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-brand-500 hover:text-brand-600 transition-colors"
          >
            <FiArrowLeft className="h-5 w-5" />
            Back
          </button>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-navy-700 dark:text-white mb-2">
              UPSC Syllabus Tracker
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Unified tracking for Prelims and Mains preparation
            </p>
          </div>
          <button
            onClick={() => setShowAddModule(true)}
            className="flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors"
          >
            <FiPlus className="h-4 w-4" />
            Add Module
          </button>
        </div>
      </Card>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Subject Progress */}
        <Card extra="p-6">
          <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
            <FiTarget className="h-5 w-5 text-brand-500" />
            Overall Progress
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Completed</span>
              <span className="text-sm font-medium text-brand-500">{progress.subjectProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
              <div 
                className="bg-gradient-to-r from-brand-500 to-brand-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress.subjectProgress}%` }}
              ></div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-navy-700 dark:text-white">{progress.completedModules}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">of {progress.totalModules} modules</div>
            </div>
          </div>
        </Card>

        {/* Revision Progress */}
        <Card extra="p-6">
          <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
            <FiTrendingUp className="h-5 w-5 text-purple-500" />
            Revision
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">In Revision</span>
              <span className="text-sm font-medium text-purple-500">{progress.revisionProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
              <div 
                className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress.revisionProgress}%` }}
              ></div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-navy-700 dark:text-white">{progress.revisionModules}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">modules</div>
            </div>
          </div>
        </Card>

        {/* Prelims Count */}
        <Card extra="p-6">
          <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
            <FiBookOpen className="h-5 w-5 text-blue-500" />
            Prelims
          </h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{progress.prelimsCount}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">modules</div>
          </div>
        </Card>

        {/* Mains Count */}
        <Card extra="p-6">
          <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
            <FiBookOpen className="h-5 w-5 text-orange-500" />
            Mains
          </h3>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">{progress.mainsCount}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">modules</div>
          </div>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card extra="p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <FiFilter className="h-4 w-4 text-gray-500" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-navy-700 text-navy-700 dark:text-white text-sm"
              >
                <option value="All">All Categories</option>
                <option value="Prelims">Prelims Only</option>
                <option value="Mains">Mains Only</option>
                <option value="Both">Both</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-navy-700 text-navy-700 dark:text-white text-sm"
              >
                <option value="All">All Status</option>
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="revision">Revision</option>
              </select>
            </div>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-2">
            <MdSort className="h-4 w-4 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-navy-700 text-navy-700 dark:text-white text-sm"
            >
              <option value="dateAdded">Date Added</option>
              <option value="name">Name</option>
              <option value="category">Category</option>
              <option value="status">Status</option>
              <option value="priority">Priority</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-navy-700 text-navy-700 dark:text-white text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </Card>

      {/* Modules Table */}
      <Card extra="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Module</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Subject</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Priority</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Updated</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedModules.length > 0 ? (
                filteredAndSortedModules.map((module) => (
                  <tr key={module.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(module.status)}
                        <div>
                          <div className="font-medium text-navy-700 dark:text-white">{module.name}</div>
                          {module.notes && (
                            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 max-w-xs truncate">
                              {module.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(module.category)}`}>
                        {module.category}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium text-navy-700 dark:text-white">{module.subject}</span>
                    </td>
                    <td className="py-4 px-4">
                      <select
                        value={module.status}
                        onChange={(e) => updateModule(module.id, { status: e.target.value as any })}
                        className={`px-2 py-1 text-xs font-medium rounded-full border-0 cursor-pointer ${getStatusColor(module.status)}`}
                      >
                        <option value="not-started">Not Started</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="revision">Revision</option>
                      </select>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`text-sm font-medium ${getPriorityColor(module.priority)}`}>
                        {module.priority.charAt(0).toUpperCase() + module.priority.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(module.lastUpdated).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingModule(module)}
                          className="p-2 text-gray-400 hover:text-brand-500 transition-colors"
                        >
                          <FiEdit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteModule(module.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <FiBookOpen className="h-12 w-12 mx-auto mb-3 opacity-50 text-gray-400" />
                    <p className="text-gray-500 dark:text-gray-400">No modules found</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">Add modules to start tracking your progress</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Module Modal */}
      {showAddModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-navy-800 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-4">
              Add New Module
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Module Name *
                </label>
                <input
                  type="text"
                  value={newModule.name}
                  onChange={(e) => setNewModule({...newModule, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-navy-700 text-navy-700 dark:text-white"
                  placeholder="Enter module name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category *
                </label>
                <select
                  value={newModule.category}
                  onChange={(e) => setNewModule({...newModule, category: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-navy-700 text-navy-700 dark:text-white"
                >
                  <option value="Prelims">Prelims Only</option>
                  <option value="Mains">Mains Only</option>
                  <option value="Both">Both Prelims & Mains</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subject *
                </label>
                <select
                  value={newModule.subject}
                  onChange={(e) => setNewModule({...newModule, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-navy-700 text-navy-700 dark:text-white"
                >
                  <option value="">Select Subject</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Priority
                </label>
                <select
                  value={newModule.priority}
                  onChange={(e) => setNewModule({...newModule, priority: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-navy-700 text-navy-700 dark:text-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  value={newModule.notes}
                  onChange={(e) => setNewModule({...newModule, notes: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-navy-700 text-navy-700 dark:text-white"
                  rows={3}
                  placeholder="Add any notes or study plan"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={addModule}
                disabled={!newModule.name || !newModule.subject}
                className="flex-1 bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Module
              </button>
              <button
                onClick={() => {
                  setShowAddModule(false);
                  setNewModule({
                    name: '',
                    category: 'Both',
                    subject: '',
                    status: 'not-started',
                    priority: 'medium',
                    notes: ''
                  });
                }}
                className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Module Modal */}
      {editingModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-navy-800 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-4">
              Edit Module
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Module Name *
                </label>
                <input
                  type="text"
                  value={editingModule.name}
                  onChange={(e) => setEditingModule({...editingModule, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-navy-700 text-navy-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category *
                </label>
                <select
                  value={editingModule.category}
                  onChange={(e) => setEditingModule({...editingModule, category: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-navy-700 text-navy-700 dark:text-white"
                >
                  <option value="Prelims">Prelims Only</option>
                  <option value="Mains">Mains Only</option>
                  <option value="Both">Both Prelims & Mains</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subject *
                </label>
                <select
                  value={editingModule.subject}
                  onChange={(e) => setEditingModule({...editingModule, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-navy-700 text-navy-700 dark:text-white"
                >
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Priority
                </label>
                <select
                  value={editingModule.priority}
                  onChange={(e) => setEditingModule({...editingModule, priority: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-navy-700 text-navy-700 dark:text-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notes
                </label>
                <textarea
                  value={editingModule.notes}
                  onChange={(e) => setEditingModule({...editingModule, notes: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-navy-700 text-navy-700 dark:text-white"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  updateModule(editingModule.id, editingModule);
                  setEditingModule(null);
                }}
                className="flex-1 bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingModule(null)}
                className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SyllabusTrackerPage;