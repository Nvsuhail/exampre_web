'use client';
import { useState } from 'react';
import Card from 'components/card';
import { FiArrowLeft, FiPlus, FiEdit2, FiTrash2, FiBookOpen, FiTarget, FiTrendingUp } from 'react-icons/fi';
import { MdCheckCircle, MdRadioButtonUnchecked, MdAccessTime, MdBook } from 'react-icons/md';

interface Module {
  id: string;
  name: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'revision';
  priority: 'high' | 'medium' | 'low';
  notes: string;
  dateAdded: string;
  lastUpdated: string;
}

interface Subject {
  id: string;
  name: string;
  modules: Module[];
  totalModules: number;
  completedModules: number;
  revisionModules: number;
}

const SyllabusTrackerPage = () => {
  const [activeTab, setActiveTab] = useState<'prelims' | 'mains'>('prelims');
  const [showAddModule, setShowAddModule] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [editingModule, setEditingModule] = useState<Module | null>(null);

  // Initial data structure
  const [prelimsSubjects, setPrelimsSubjects] = useState<Subject[]>([
    {
      id: 'history',
      name: 'History of India and Indian National Movement',
      modules: [
        {
          id: '1',
          name: 'Ancient India - Indus Valley Civilization',
          status: 'completed',
          priority: 'high',
          notes: 'Completed with NCERT and additional sources',
          dateAdded: '2024-01-15',
          lastUpdated: '2024-01-20'
        },
        {
          id: '2',
          name: 'Vedic Period and Early Kingdoms',
          status: 'in-progress',
          priority: 'high',
          notes: 'Need to complete Mauryan Empire section',
          dateAdded: '2024-01-21',
          lastUpdated: '2024-01-25'
        }
      ],
      totalModules: 2,
      completedModules: 1,
      revisionModules: 0
    },
    {
      id: 'geography',
      name: 'Indian and World Geography',
      modules: [
        {
          id: '3',
          name: 'Physical Geography - Earth and Universe',
          status: 'not-started',
          priority: 'medium',
          notes: '',
          dateAdded: '2024-01-10',
          lastUpdated: '2024-01-10'
        }
      ],
      totalModules: 1,
      completedModules: 0,
      revisionModules: 0
    },
    {
      id: 'polity',
      name: 'Indian Polity and Governance',
      modules: [],
      totalModules: 0,
      completedModules: 0,
      revisionModules: 0
    },
    {
      id: 'economics',
      name: 'Economic and Social Development',
      modules: [],
      totalModules: 0,
      completedModules: 0,
      revisionModules: 0
    },
    {
      id: 'environment',
      name: 'Environmental Ecology and Climate Change',
      modules: [],
      totalModules: 0,
      completedModules: 0,
      revisionModules: 0
    },
    {
      id: 'science',
      name: 'General Science',
      modules: [],
      totalModules: 0,
      completedModules: 0,
      revisionModules: 0
    }
  ]);

  const [mainsSubjects, setMainsSubjects] = useState<Subject[]>([
    {
      id: 'gs1',
      name: 'GS Paper 1 - History, Geography, Society',
      modules: [],
      totalModules: 0,
      completedModules: 0,
      revisionModules: 0
    },
    {
      id: 'gs2',
      name: 'GS Paper 2 - Polity, Governance, International Relations',
      modules: [],
      totalModules: 0,
      completedModules: 0,
      revisionModules: 0
    },
    {
      id: 'gs3',
      name: 'GS Paper 3 - Economics, Environment, Technology',
      modules: [],
      totalModules: 0,
      completedModules: 0,
      revisionModules: 0
    },
    {
      id: 'gs4',
      name: 'GS Paper 4 - Ethics, Integrity, Aptitude',
      modules: [],
      totalModules: 0,
      completedModules: 0,
      revisionModules: 0
    },
    {
      id: 'essay',
      name: 'Essay Paper',
      modules: [],
      totalModules: 0,
      completedModules: 0,
      revisionModules: 0
    },
    {
      id: 'optional',
      name: 'Optional Subject',
      modules: [],
      totalModules: 0,
      completedModules: 0,
      revisionModules: 0
    }
  ]);

  const [newModule, setNewModule] = useState<Partial<Module>>({
    name: '',
    status: 'not-started',
    priority: 'medium',
    notes: ''
  });

  const currentSubjects = activeTab === 'prelims' ? prelimsSubjects : mainsSubjects;
  const setCurrentSubjects = activeTab === 'prelims' ? setPrelimsSubjects : setMainsSubjects;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'revision': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      default: return 'border-l-green-500';
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
    if (!newModule.name || !selectedSubject) return;

    const moduleToAdd: Module = {
      id: Date.now().toString(),
      name: newModule.name,
      status: newModule.status || 'not-started',
      priority: newModule.priority || 'medium',
      notes: newModule.notes || '',
      dateAdded: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    const updatedSubjects = currentSubjects.map(subject => {
      if (subject.id === selectedSubject) {
        const updatedModules = [...subject.modules, moduleToAdd];
        return {
          ...subject,
          modules: updatedModules,
          totalModules: updatedModules.length,
          completedModules: updatedModules.filter(m => m.status === 'completed').length,
          revisionModules: updatedModules.filter(m => m.status === 'revision').length
        };
      }
      return subject;
    });

    setCurrentSubjects(updatedSubjects);
    setNewModule({
      name: '',
      status: 'not-started',
      priority: 'medium',
      notes: ''
    });
    setShowAddModule(false);
    setSelectedSubject('');
  };

  const updateModuleStatus = (subjectId: string, moduleId: string, newStatus: string) => {
    const updatedSubjects = currentSubjects.map(subject => {
      if (subject.id === subjectId) {
        const updatedModules = subject.modules.map(module => {
          if (module.id === moduleId) {
            return {
              ...module,
              status: newStatus as any,
              lastUpdated: new Date().toISOString().split('T')[0]
            };
          }
          return module;
        });
        return {
          ...subject,
          modules: updatedModules,
          completedModules: updatedModules.filter(m => m.status === 'completed').length,
          revisionModules: updatedModules.filter(m => m.status === 'revision').length
        };
      }
      return subject;
    });

    setCurrentSubjects(updatedSubjects);
  };

  const deleteModule = (subjectId: string, moduleId: string) => {
    const updatedSubjects = currentSubjects.map(subject => {
      if (subject.id === subjectId) {
        const updatedModules = subject.modules.filter(module => module.id !== moduleId);
        return {
          ...subject,
          modules: updatedModules,
          totalModules: updatedModules.length,
          completedModules: updatedModules.filter(m => m.status === 'completed').length,
          revisionModules: updatedModules.filter(m => m.status === 'revision').length
        };
      }
      return subject;
    });

    setCurrentSubjects(updatedSubjects);
  };

  const calculateProgress = () => {
    const totalModules = currentSubjects.reduce((sum, subject) => sum + subject.totalModules, 0);
    const completedModules = currentSubjects.reduce((sum, subject) => sum + subject.completedModules, 0);
    const revisionModules = currentSubjects.reduce((sum, subject) => sum + subject.revisionModules, 0);

    return {
      subjectProgress: totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0,
      revisionProgress: totalModules > 0 ? Math.round((revisionModules / totalModules) * 100) : 0,
      totalModules,
      completedModules,
      revisionModules
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
              UPSC Syllabus Tracker - Prelims & Mains
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track your preparation progress for both Prelims and Mains syllabus
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

      {/* Tab Navigation */}
      <Card extra="p-6">
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('prelims')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'prelims'
                ? 'bg-white dark:bg-navy-700 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            📚 Prelims Syllabus
          </button>
          <button
            onClick={() => setActiveTab('mains')}
            className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'mains'
                ? 'bg-white dark:bg-navy-700 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            📝 Mains Syllabus
          </button>
        </div>
      </Card>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Subject Progress */}
        <Card extra="p-6">
          <h2 className="text-xl font-bold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
            <FiTarget className="h-5 w-5 text-brand-500" />
            Subject Progress
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Completed Modules</span>
              <span className="text-sm font-medium text-brand-500">{progress.subjectProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
              <div 
                className="bg-gradient-to-r from-brand-500 to-brand-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress.subjectProgress}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-navy-700 dark:text-white">{progress.completedModules}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-navy-700 dark:text-white">{progress.totalModules}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Total Modules</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Revision Progress */}
        <Card extra="p-6">
          <h2 className="text-xl font-bold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
            <FiTrendingUp className="h-5 w-5 text-purple-500" />
            Revision Progress
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Modules in Revision</span>
              <span className="text-sm font-medium text-purple-500">{progress.revisionProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
              <div 
                className="bg-gradient-to-r from-purple-500 to-purple-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress.revisionProgress}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-navy-700 dark:text-white">{progress.revisionModules}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">In Revision</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-navy-700 dark:text-white">
                  {progress.totalModules - progress.completedModules - progress.revisionModules}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Pending</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Subjects and Modules */}
      <div className="space-y-6">
        {currentSubjects.map((subject) => (
          <Card key={subject.id} extra="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-navy-700 dark:text-white">
                  {subject.name}
                </h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                  <span>{subject.totalModules} modules</span>
                  <span>•</span>
                  <span>{subject.completedModules} completed</span>
                  <span>•</span>
                  <span>{subject.revisionModules} in revision</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedSubject(subject.id);
                  setShowAddModule(true);
                }}
                className="flex items-center gap-2 bg-brand-500 text-white px-3 py-2 rounded-lg hover:bg-brand-600 transition-colors text-sm"
              >
                <FiPlus className="h-4 w-4" />
                Add Module
              </button>
            </div>

            {/* Progress Bar */}
            {subject.totalModules > 0 && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                  <span className="text-sm font-medium text-brand-500">
                    {Math.round((subject.completedModules / subject.totalModules) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div 
                    className="bg-gradient-to-r from-brand-500 to-brand-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(subject.completedModules / subject.totalModules) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Modules */}
            {subject.modules.length > 0 ? (
              <div className="space-y-3">
                {subject.modules.map((module) => (
                  <div
                    key={module.id}
                    className={`bg-white dark:bg-navy-800 rounded-xl p-4 border-l-4 ${getPriorityColor(module.priority)} border border-gray-100 dark:border-gray-700`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          {getStatusIcon(module.status)}
                          <h4 className="font-semibold text-navy-700 dark:text-white truncate">
                            {module.name}
                          </h4>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(module.status)}`}>
                            {module.status.replace('-', ' ')}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Priority:</span>
                            <span className={`ml-1 font-medium ${
                              module.priority === 'high' ? 'text-red-600' :
                              module.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                            }`}>
                              {module.priority}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Added:</span>
                            <span className="ml-1 font-medium text-navy-700 dark:text-white">
                              {new Date(module.dateAdded).toLocaleDateString()}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Updated:</span>
                            <span className="ml-1 font-medium text-navy-700 dark:text-white">
                              {new Date(module.lastUpdated).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {module.notes && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            <strong>Notes:</strong> {module.notes}
                          </p>
                        )}

                        <div className="flex items-center gap-2">
                          <select
                            value={module.status}
                            onChange={(e) => updateModuleStatus(subject.id, module.id, e.target.value)}
                            className="text-xs px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-navy-700 text-navy-700 dark:text-white"
                          >
                            <option value="not-started">Not Started</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="revision">Revision</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => setEditingModule(module)}
                          className="p-2 text-gray-400 hover:text-brand-500 transition-colors"
                        >
                          <FiEdit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteModule(subject.id, module.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <FiBookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No modules added yet</p>
                <p className="text-sm">Click "Add Module" to start tracking your progress</p>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Add Module Modal */}
      {showAddModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-navy-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-4">
              Add New Module
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-navy-700 text-navy-700 dark:text-white"
                >
                  <option value="">Select Subject</option>
                  {currentSubjects.map((subject) => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Module Name
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
                disabled={!newModule.name || !selectedSubject}
                className="flex-1 bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Module
              </button>
              <button
                onClick={() => {
                  setShowAddModule(false);
                  setSelectedSubject('');
                  setNewModule({
                    name: '',
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
    </div>
  );
};

export default SyllabusTrackerPage;