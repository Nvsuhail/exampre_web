'use client';
import { useState } from 'react';
import Card from 'components/card';
import { FiArrowLeft, FiPlus, FiEdit2, FiTrash2, FiBookOpen, FiTarget, FiTrendingUp, FiFilter, FiChevronDown, FiChevronRight, FiCalendar, FiClock, FiRefreshCw, FiAlertCircle } from 'react-icons/fi';
import { MdCheckCircle, MdRadioButtonUnchecked, MdAccessTime, MdBook, MdSort, MdExpandMore, MdExpandLess, MdSchedule, MdNotifications } from 'react-icons/md';

interface Subtopic {
  id: string;
  name: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'revision';
  priority: 'high' | 'medium' | 'low';
  notes: string;
  dateAdded: string;
  lastUpdated: string;
  estimatedHours?: number;
  actualHours?: number;
  completedDate?: string;
  revisionDueDate?: string;
  revisionCount?: number;
  lastRevisionDate?: string;
  revisionInterval?: number; // days
}

interface Subject {
  id: string;
  name: string;
  category: 'Prelims' | 'Mains' | 'Both';
  description: string;
  subtopics: Subtopic[];
  isExpanded: boolean;
  totalTopics: number;
  completedTopics: number;
}

const SyllabusTrackerPage = () => {
  const [activeTab, setActiveTab] = useState<'tracker' | 'revision'>('tracker');
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [showAddSubtopic, setShowAddSubtopic] = useState<string | null>(null);
  const [editingSubtopic, setEditingSubtopic] = useState<{ subjectId: string; subtopic: Subtopic } | null>(null);
  const [filterCategory, setFilterCategory] = useState<'All' | 'Prelims' | 'Mains' | 'Both'>('All');
  const [filterStatus, setFilterStatus] = useState<'All' | 'not-started' | 'in-progress' | 'completed' | 'revision'>('All');
  const [revisionFilter, setRevisionFilter] = useState<'All' | 'Due Today' | 'Overdue' | 'This Week'>('All');

  // Sample subjects data with subtopics
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: '1',
      name: 'History',
      category: 'Both',
      description: 'Ancient, Medieval, and Modern Indian History',
      isExpanded: true,
      totalTopics: 0,
      completedTopics: 0,
      subtopics: [
        {
          id: '1-1',
          name: 'Indus Valley Civilization',
          status: 'completed',
          priority: 'high',
          notes: 'Completed with NCERT and additional sources',
          dateAdded: '2024-01-15',
          lastUpdated: '2024-01-20',
          estimatedHours: 8,
          actualHours: 10,
          completedDate: '2024-01-20',
          revisionDueDate: '2024-01-27',
          revisionCount: 2,
          lastRevisionDate: '2024-01-25',
          revisionInterval: 7
        },
        {
          id: '1-2',
          name: 'Vedic Period',
          status: 'in-progress',
          priority: 'high',
          notes: 'Need to complete Rig Vedic period',
          dateAdded: '2024-01-21',
          lastUpdated: '2024-01-25',
          estimatedHours: 12,
          actualHours: 6
        },
        {
          id: '1-3',
          name: 'Mauryan Empire',
          status: 'not-started',
          priority: 'medium',
          notes: '',
          dateAdded: '2024-01-10',
          lastUpdated: '2024-01-10',
          estimatedHours: 10
        },
        {
          id: '1-4',
          name: 'Gupta Period',
          status: 'completed',
          priority: 'high',
          notes: 'Golden age topics important for both prelims and mains',
          dateAdded: '2024-01-08',
          lastUpdated: '2024-01-24',
          estimatedHours: 8,
          actualHours: 8,
          completedDate: '2024-01-18',
          revisionDueDate: '2024-01-30',
          revisionCount: 1,
          lastRevisionDate: '2024-01-22',
          revisionInterval: 14
        },
        {
          id: '1-5',
          name: 'Mughal Empire',
          status: 'completed',
          priority: 'high',
          notes: 'Administrative system and cultural aspects covered',
          dateAdded: '2024-01-05',
          lastUpdated: '2024-01-15',
          estimatedHours: 10,
          actualHours: 12,
          completedDate: '2024-01-15',
          revisionDueDate: '2024-01-29',
          revisionCount: 3,
          lastRevisionDate: '2024-01-26',
          revisionInterval: 10
        }
      ]
    },
    {
      id: '2',
      name: 'Geography',
      category: 'Prelims',
      description: 'Physical and Human Geography',
      isExpanded: false,
      totalTopics: 0,
      completedTopics: 0,
      subtopics: [
        {
          id: '2-1',
          name: 'Earth and Universe',
          status: 'not-started',
          priority: 'medium',
          notes: '',
          dateAdded: '2024-01-10',
          lastUpdated: '2024-01-10',
          estimatedHours: 6
        },
        {
          id: '2-2',
          name: 'Atmosphere',
          status: 'in-progress',
          priority: 'high',
          notes: 'Focus on weather and climate patterns',
          dateAdded: '2024-01-12',
          lastUpdated: '2024-01-22',
          estimatedHours: 8,
          actualHours: 4
        },
        {
          id: '2-3',
          name: 'Hydrosphere',
          status: 'completed',
          priority: 'medium',
          notes: 'Ocean currents and water cycle completed',
          dateAdded: '2024-01-05',
          lastUpdated: '2024-01-18',
          estimatedHours: 6,
          actualHours: 7,
          completedDate: '2024-01-18',
          revisionDueDate: '2024-01-25',
          revisionCount: 1,
          lastRevisionDate: '2024-01-23',
          revisionInterval: 7
        }
      ]
    },
    {
      id: '3',
      name: 'Essay Writing',
      category: 'Mains',
      description: 'Essay writing techniques and practice',
      isExpanded: false,
      totalTopics: 0,
      completedTopics: 0,
      subtopics: [
        {
          id: '3-1',
          name: 'Essay Structure and Format',
          status: 'completed',
          priority: 'high',
          notes: 'Introduction, body, conclusion format mastered',
          dateAdded: '2024-01-01',
          lastUpdated: '2024-01-15',
          estimatedHours: 4,
          actualHours: 5,
          completedDate: '2024-01-15',
          revisionDueDate: '2024-01-29',
          revisionCount: 2,
          lastRevisionDate: '2024-01-24',
          revisionInterval: 14
        },
        {
          id: '3-2',
          name: 'Philosophical Essays',
          status: 'in-progress',
          priority: 'high',
          notes: 'Practice different philosophical themes',
          dateAdded: '2024-01-12',
          lastUpdated: '2024-01-22',
          estimatedHours: 15,
          actualHours: 8
        }
      ]
    }
  ]);

  const [newSubject, setNewSubject] = useState({
    name: '',
    category: 'Both' as 'Prelims' | 'Mains' | 'Both',
    description: ''
  });

  const [newSubtopic, setNewSubtopic] = useState<Partial<Subtopic>>({
    name: '',
    status: 'not-started',
    priority: 'medium',
    notes: '',
    estimatedHours: 0
  });

  // Get all completed topics for revision
  const getCompletedTopics = () => {
    const completedTopics: Array<Subtopic & { subjectName: string; subjectCategory: string }> = [];
    
    subjects.forEach(subject => {
      subject.subtopics.forEach(subtopic => {
        if (subtopic.status === 'completed' && subtopic.completedDate) {
          completedTopics.push({
            ...subtopic,
            subjectName: subject.name,
            subjectCategory: subject.category
          });
        }
      });
    });

    return completedTopics.sort((a, b) => {
      if (!a.revisionDueDate || !b.revisionDueDate) return 0;
      return new Date(a.revisionDueDate).getTime() - new Date(b.revisionDueDate).getTime();
    });
  };

  // Filter revision topics
  const getFilteredRevisionTopics = () => {
    const completedTopics = getCompletedTopics();
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    switch (revisionFilter) {
      case 'Due Today':
        return completedTopics.filter(topic => topic.revisionDueDate === todayStr);
      case 'Overdue':
        return completedTopics.filter(topic => 
          topic.revisionDueDate && topic.revisionDueDate < todayStr
        );
      case 'This Week':
        return completedTopics.filter(topic => 
          topic.revisionDueDate && topic.revisionDueDate <= weekFromNow
        );
      default:
        return completedTopics;
    }
  };

  // Calculate revision stats
  const getRevisionStats = () => {
    const completedTopics = getCompletedTopics();
    const today = new Date().toISOString().split('T')[0];
    
    const dueToday = completedTopics.filter(topic => topic.revisionDueDate === today).length;
    const overdue = completedTopics.filter(topic => 
      topic.revisionDueDate && topic.revisionDueDate < today
    ).length;
    const thisWeek = completedTopics.filter(topic => {
      if (!topic.revisionDueDate) return false;
      const weekFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      return topic.revisionDueDate <= weekFromNow && topic.revisionDueDate >= today;
    }).length;

    return { total: completedTopics.length, dueToday, overdue, thisWeek };
  };

  // Update subject totals
  const updateSubjectTotals = (subjectId: string) => {
    setSubjects(prevSubjects => 
      prevSubjects.map(subject => {
        if (subject.id === subjectId) {
          const totalTopics = subject.subtopics.length;
          const completedTopics = subject.subtopics.filter(st => st.status === 'completed').length;
          return { ...subject, totalTopics, completedTopics };
        }
        return subject;
      })
    );
  };

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

  const getDueDateStatus = (dueDate: string) => {
    const today = new Date().toISOString().split('T')[0];
    if (dueDate < today) return 'overdue';
    if (dueDate === today) return 'due-today';
    return 'upcoming';
  };

  const getDueDateColor = (dueDate: string) => {
    const status = getDueDateStatus(dueDate);
    switch (status) {
      case 'overdue': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'due-today': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    }
  };

  const scheduleRevision = (subjectId: string, subtopicId: string, interval: number = 7) => {
    const newDueDate = new Date();
    newDueDate.setDate(newDueDate.getDate() + interval);
    
    updateSubtopic(subjectId, subtopicId, {
      revisionDueDate: newDueDate.toISOString().split('T')[0],
      revisionInterval: interval,
      lastRevisionDate: new Date().toISOString().split('T')[0],
      revisionCount: (subjects.find(s => s.id === subjectId)?.subtopics.find(st => st.id === subtopicId)?.revisionCount || 0) + 1
    });
  };

  const markAsRevised = (subjectId: string, subtopicId: string) => {
    const subtopic = subjects.find(s => s.id === subjectId)?.subtopics.find(st => st.id === subtopicId);
    if (subtopic) {
      const currentInterval = subtopic.revisionInterval || 7;
      const newInterval = Math.min(currentInterval * 1.5, 30); // Increase interval, max 30 days
      scheduleRevision(subjectId, subtopicId, Math.floor(newInterval));
    }
  };

  const addSubject = () => {
    if (!newSubject.name) return;

    const subjectToAdd: Subject = {
      id: Date.now().toString(),
      name: newSubject.name,
      category: newSubject.category,
      description: newSubject.description,
      subtopics: [],
      isExpanded: true,
      totalTopics: 0,
      completedTopics: 0
    };

    setSubjects([...subjects, subjectToAdd]);
    setNewSubject({ name: '', category: 'Both', description: '' });
    setShowAddSubject(false);
  };

  const addSubtopic = (subjectId: string) => {
    if (!newSubtopic.name) return;

    const subtopicToAdd: Subtopic = {
      id: `${subjectId}-${Date.now()}`,
      name: newSubtopic.name!,
      status: newSubtopic.status || 'not-started',
      priority: newSubtopic.priority || 'medium',
      notes: newSubtopic.notes || '',
      dateAdded: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      estimatedHours: newSubtopic.estimatedHours || 0
    };

    setSubjects(prevSubjects =>
      prevSubjects.map(subject => {
        if (subject.id === subjectId) {
          const updatedSubject = {
            ...subject,
            subtopics: [...subject.subtopics, subtopicToAdd]
          };
          return updatedSubject;
        }
        return subject;
      })
    );

    updateSubjectTotals(subjectId);
    setNewSubtopic({ name: '', status: 'not-started', priority: 'medium', notes: '', estimatedHours: 0 });
    setShowAddSubtopic(null);
  };

  const updateSubtopic = (subjectId: string, subtopicId: string, updates: Partial<Subtopic>) => {
    setSubjects(prevSubjects =>
      prevSubjects.map(subject => {
        if (subject.id === subjectId) {
          return {
            ...subject,
            subtopics: subject.subtopics.map(subtopic => {
              if (subtopic.id === subtopicId) {
                const updatedSubtopic = {
                  ...subtopic,
                  ...updates,
                  lastUpdated: new Date().toISOString().split('T')[0]
                };

                // If marking as completed, set completion date and initial revision date
                if (updates.status === 'completed' && subtopic.status !== 'completed') {
                  updatedSubtopic.completedDate = new Date().toISOString().split('T')[0];
                  const revisionDate = new Date();
                  revisionDate.setDate(revisionDate.getDate() + 7); // Default 7 days
                  updatedSubtopic.revisionDueDate = revisionDate.toISOString().split('T')[0];
                  updatedSubtopic.revisionInterval = 7;
                  updatedSubtopic.revisionCount = 0;
                }

                return updatedSubtopic;
              }
              return subtopic;
            })
          };
        }
        return subject;
      })
    );
    updateSubjectTotals(subjectId);
  };

  const deleteSubtopic = (subjectId: string, subtopicId: string) => {
    setSubjects(prevSubjects =>
      prevSubjects.map(subject => {
        if (subject.id === subjectId) {
          return {
            ...subject,
            subtopics: subject.subtopics.filter(subtopic => subtopic.id !== subtopicId)
          };
        }
        return subject;
      })
    );
    updateSubjectTotals(subjectId);
  };

  const toggleSubjectExpansion = (subjectId: string) => {
    setSubjects(prevSubjects =>
      prevSubjects.map(subject => {
        if (subject.id === subjectId) {
          return { ...subject, isExpanded: !subject.isExpanded };
        }
        return subject;
      })
    );
  };

  const filteredSubjects = subjects.filter(subject => {
    if (filterCategory !== 'All' && subject.category !== filterCategory) return false;
    return true;
  });

  const calculateOverallProgress = () => {
    const allSubtopics = subjects.flatMap(subject => subject.subtopics);
    const totalSubtopics = allSubtopics.length;
    const completedSubtopics = allSubtopics.filter(st => st.status === 'completed').length;
    const revisionSubtopics = allSubtopics.filter(st => st.status === 'revision').length;
    const inProgressSubtopics = allSubtopics.filter(st => st.status === 'in-progress').length;

    const prelimsSubjects = subjects.filter(s => s.category === 'Prelims' || s.category === 'Both');
    const mainsSubjects = subjects.filter(s => s.category === 'Mains' || s.category === 'Both');

    return {
      subjectProgress: totalSubtopics > 0 ? Math.round((completedSubtopics / totalSubtopics) * 100) : 0,
      revisionProgress: totalSubtopics > 0 ? Math.round((revisionSubtopics / totalSubtopics) * 100) : 0,
      totalSubtopics,
      completedSubtopics,
      revisionSubtopics,
      inProgressSubtopics,
      prelimsCount: prelimsSubjects.length,
      mainsCount: mainsSubjects.length
    };
  };

  const progress = calculateOverallProgress();
  const revisionStats = getRevisionStats();
  const filteredRevisionTopics = getFilteredRevisionTopics();

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
              Subject-wise detailed tracking for comprehensive preparation
            </p>
          </div>
          <button
            onClick={() => setShowAddSubject(true)}
            className="flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors"
          >
            <FiPlus className="h-4 w-4" />
            Add Subject
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="mt-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('tracker')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'tracker'
                  ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <FiBookOpen className="h-4 w-4" />
                Syllabus Tracker
              </div>
            </button>
            <button
              onClick={() => setActiveTab('revision')}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'revision'
                  ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <FiRefreshCw className="h-4 w-4" />
                Revision Tracker
                {revisionStats.dueToday > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {revisionStats.dueToday}
                  </span>
                )}
              </div>
            </button>
          </nav>
        </div>
      </Card>

      {activeTab === 'tracker' ? (
        <>
          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Overall Progress */}
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
                <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
                  <div 
                    className="bg-gradient-to-r from-brand-500 to-brand-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progress.subjectProgress}%` }}
                  ></div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-navy-700 dark:text-white">{progress.completedSubtopics}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">of {progress.totalSubtopics} topics</div>
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
                <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-purple-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progress.revisionProgress}%` }}
                  ></div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-navy-700 dark:text-white">{progress.revisionSubtopics}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">topics</div>
                </div>
              </div>
            </Card>

            {/* Prelims Subjects */}
            <Card extra="p-6">
              <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
                <FiBookOpen className="h-5 w-5 text-blue-500" />
                Prelims Subjects
              </h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{progress.prelimsCount}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">subjects</div>
              </div>
            </Card>

            {/* Mains Subjects */}
            <Card extra="p-6">
              <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
                <FiBookOpen className="h-5 w-5 text-orange-500" />
                Mains Subjects
              </h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">{progress.mainsCount}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">subjects</div>
              </div>
            </Card>
          </div>

          {/* Filters */}
          <Card extra="p-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <FiFilter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by:</span>
              </div>
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
          </Card>

          {/* Subjects with Subtopics */}
          <div className="space-y-6">
            {filteredSubjects.length > 0 ? (
              filteredSubjects.map((subject) => (
                <Card key={subject.id} extra="overflow-hidden">
                  {/* Subject Header */}
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleSubjectExpansion(subject.id)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          {subject.isExpanded ? (
                            <MdExpandLess className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          ) : (
                            <MdExpandMore className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          )}
                        </button>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-xl font-bold text-navy-700 dark:text-white">
                              {subject.name}
                            </h2>
                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${getCategoryColor(subject.category)}`}>
                              {subject.category}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{subject.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm text-gray-600 dark:text-gray-400">Progress</div>
                          <div className="text-lg font-bold text-navy-700 dark:text-white">
                            {subject.totalTopics > 0 ? Math.round((subject.completedTopics / subject.totalTopics) * 100) : 0}%
                          </div>
                          <div className="text-xs text-gray-500">
                            {subject.completedTopics}/{subject.totalTopics} topics
                          </div>
                        </div>
                        <button
                          onClick={() => setShowAddSubtopic(subject.id)}
                          className="flex items-center gap-2 bg-brand-500 text-white px-3 py-2 rounded-lg hover:bg-brand-600 transition-colors text-sm"
                        >
                          <FiPlus className="h-4 w-4" />
                          Add Topic
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div 
                          className="bg-gradient-to-r from-brand-500 to-brand-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${subject.totalTopics > 0 ? (subject.completedTopics / subject.totalTopics) * 100 : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Subtopics Table */}
                  {subject.isExpanded && (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th className="text-left py-3 px-6 font-semibold text-gray-700 dark:text-gray-300 text-sm">Topic</th>
                            <th className="text-left py-3 px-6 font-semibold text-gray-700 dark:text-gray-300 text-sm">Status</th>
                            <th className="text-left py-3 px-6 font-semibold text-gray-700 dark:text-gray-300 text-sm">Priority</th>
                            <th className="text-left py-3 px-6 font-semibold text-gray-700 dark:text-gray-300 text-sm">Hours</th>
                            <th className="text-left py-3 px-6 font-semibold text-gray-700 dark:text-gray-300 text-sm">Updated</th>
                            <th className="text-left py-3 px-6 font-semibold text-gray-700 dark:text-gray-300 text-sm">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subject.subtopics.length > 0 ? (
                            subject.subtopics.map((subtopic) => (
                              <tr key={subtopic.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="py-4 px-6">
                                  <div className="flex items-center gap-3">
                                    {getStatusIcon(subtopic.status)}
                                    <div>
                                      <div className="font-medium text-navy-700 dark:text-white">{subtopic.name}</div>
                                      {subtopic.notes && (
                                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 max-w-xs">
                                          {subtopic.notes}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="py-4 px-6">
                                  <select
                                    value={subtopic.status}
                                    onChange={(e) => updateSubtopic(subject.id, subtopic.id, { status: e.target.value as any })}
                                    className={`px-3 py-1 text-xs font-medium rounded-full border-0 cursor-pointer ${getStatusColor(subtopic.status)}`}
                                  >
                                    <option value="not-started">Not Started</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="revision">Revision</option>
                                  </select>
                                </td>
                                <td className="py-4 px-6">
                                  <span className={`text-sm font-medium ${getPriorityColor(subtopic.priority)}`}>
                                    {subtopic.priority.charAt(0).toUpperCase() + subtopic.priority.slice(1)}
                                  </span>
                                </td>
                                <td className="py-4 px-6">
                                  <div className="text-sm">
                                    <div className="text-navy-700 dark:text-white">
                                      {subtopic.actualHours || 0}/{subtopic.estimatedHours || 0}h
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {subtopic.estimatedHours && subtopic.actualHours 
                                        ? `${Math.round((subtopic.actualHours / subtopic.estimatedHours) * 100)}%`
                                        : 'Not tracked'
                                      }
                                    </div>
                                  </div>
                                </td>
                                <td className="py-4 px-6">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {new Date(subtopic.lastUpdated).toLocaleDateString()}
                                  </span>
                                </td>
                                <td className="py-4 px-6">
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => setEditingSubtopic({ subjectId: subject.id, subtopic })}
                                      className="p-2 text-gray-400 hover:text-brand-500 transition-colors"
                                    >
                                      <FiEdit2 className="h-4 w-4" />
                                    </button>
                                    <button
                                      onClick={() => deleteSubtopic(subject.id, subtopic.id)}
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
                              <td colSpan={6} className="py-12 text-center">
                                <FiBookOpen className="h-8 w-8 mx-auto mb-3 opacity-50 text-gray-400" />
                                <p className="text-gray-500 dark:text-gray-400">No topics added yet</p>
                                <p className="text-sm text-gray-400 dark:text-gray-500">Add topics to start tracking your progress</p>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Card>
              ))
            ) : (
              <Card extra="p-12 text-center">
                <FiBookOpen className="h-16 w-16 mx-auto mb-4 opacity-50 text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No subjects found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Add subjects to start organizing your syllabus</p>
                <button
                  onClick={() => setShowAddSubject(true)}
                  className="bg-brand-500 text-white px-6 py-3 rounded-lg hover:bg-brand-600 transition-colors"
                >
                  Add Your First Subject
                </button>
              </Card>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Revision Tracker Tab */}
          {/* Revision Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card extra="p-6">
              <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
                <FiRefreshCw className="h-5 w-5 text-brand-500" />
                Total for Revision
              </h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-600 dark:text-brand-400 mb-2">{revisionStats.total}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">completed topics</div>
              </div>
            </Card>

            <Card extra="p-6">
              <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
                <FiAlertCircle className="h-5 w-5 text-red-500" />
                Overdue
              </h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">{revisionStats.overdue}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">topics</div>
              </div>
            </Card>

            <Card extra="p-6">
              <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
                <MdNotifications className="h-5 w-5 text-orange-500" />
                Due Today
              </h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">{revisionStats.dueToday}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">topics</div>
              </div>
            </Card>

            <Card extra="p-6">
              <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
                <FiCalendar className="h-5 w-5 text-blue-500" />
                This Week
              </h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{revisionStats.thisWeek}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">topics</div>
              </div>
            </Card>
          </div>

          {/* Revision Filters */}
          <Card extra="p-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <FiFilter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by:</span>
              </div>
              <select
                value={revisionFilter}
                onChange={(e) => setRevisionFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-navy-700 text-navy-700 dark:text-white text-sm"
              >
                <option value="All">All Topics</option>
                <option value="Due Today">Due Today</option>
                <option value="Overdue">Overdue</option>
                <option value="This Week">This Week</option>
              </select>
            </div>
          </Card>

          {/* Revision Topics Table */}
          <Card extra="overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-navy-700 dark:text-white flex items-center gap-2">
                <MdSchedule className="h-6 w-6 text-brand-500" />
                Revision Schedule
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                Manage your revision schedule with smart spaced repetition
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700 dark:text-gray-300 text-sm">Topic</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700 dark:text-gray-300 text-sm">Subject</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700 dark:text-gray-300 text-sm">Due Date</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700 dark:text-gray-300 text-sm">Revision Count</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700 dark:text-gray-300 text-sm">Last Revised</th>
                    <th className="text-left py-3 px-6 font-semibold text-gray-700 dark:text-gray-300 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRevisionTopics.length > 0 ? (
                    filteredRevisionTopics.map((topic) => (
                      <tr key={topic.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <MdCheckCircle className="h-5 w-5 text-green-500" />
                            <div>
                              <div className="font-medium text-navy-700 dark:text-white">{topic.name}</div>
                              {topic.notes && (
                                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 max-w-xs">
                                  {topic.notes}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <div className="font-medium text-navy-700 dark:text-white">{topic.subjectName}</div>
                            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${getCategoryColor(topic.subjectCategory)}`}>
                              {topic.subjectCategory}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          {topic.revisionDueDate && (
                            <div>
                              <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getDueDateColor(topic.revisionDueDate)}`}>
                                {new Date(topic.revisionDueDate).toLocaleDateString()}
                              </span>
                              <div className="text-xs text-gray-500 mt-1">
                                {getDueDateStatus(topic.revisionDueDate) === 'overdue' && 'Overdue'}
                                {getDueDateStatus(topic.revisionDueDate) === 'due-today' && 'Due Today'}
                                {getDueDateStatus(topic.revisionDueDate) === 'upcoming' && 'Upcoming'}
                              </div>
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-center">
                            <div className="text-lg font-bold text-navy-700 dark:text-white">
                              {topic.revisionCount || 0}
                            </div>
                            <div className="text-xs text-gray-500">times</div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {topic.lastRevisionDate 
                              ? new Date(topic.lastRevisionDate).toLocaleDateString()
                              : 'Never'
                            }
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                const subjectId = subjects.find(s => s.name === topic.subjectName)?.id;
                                if (subjectId) markAsRevised(subjectId, topic.id);
                              }}
                              className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors text-sm"
                            >
                              <MdCheckCircle className="h-4 w-4" />
                              Mark Revised
                            </button>
                            <button
                              onClick={() => {
                                const subjectId = subjects.find(s => s.name === topic.subjectName)?.id;
                                if (subjectId) scheduleRevision(subjectId, topic.id, 3);
                              }}
                              className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                            >
                              <FiClock className="h-4 w-4" />
                              Reschedule
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-12 text-center">
                        <FiRefreshCw className="h-8 w-8 mx-auto mb-3 opacity-50 text-gray-400" />
                        <p className="text-gray-500 dark:text-gray-400">No topics for revision</p>
                        <p className="text-sm text-gray-400 dark:text-gray-500">
                          {revisionFilter === 'All' 
                            ? 'Complete some topics to start your revision schedule'
                            : `No topics ${revisionFilter.toLowerCase()}`
                          }
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Quick Actions for Revision */}
          {filteredRevisionTopics.length > 0 && (
            <Card extra="p-6">
              <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    // Mark all due today as revised
                    const dueToday = getCompletedTopics().filter(topic => 
                      topic.revisionDueDate === new Date().toISOString().split('T')[0]
                    );
                    dueToday.forEach(topic => {
                      const subjectId = subjects.find(s => s.name === topic.subjectName)?.id;
                      if (subjectId) markAsRevised(subjectId, topic.id);
                    });
                  }}
                  disabled={revisionStats.dueToday === 0}
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <MdCheckCircle className="h-4 w-4" />
                  Mark All Due Today as Revised
                </button>
                <button
                  onClick={() => {
                    // Reschedule all overdue to tomorrow
                    const overdue = getCompletedTopics().filter(topic => 
                      topic.revisionDueDate && topic.revisionDueDate < new Date().toISOString().split('T')[0]
                    );
                    overdue.forEach(topic => {
                      const subjectId = subjects.find(s => s.name === topic.subjectName)?.id;
                      if (subjectId) scheduleRevision(subjectId, topic.id, 1);
                    });
                  }}
                  disabled={revisionStats.overdue === 0}
                  className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiClock className="h-4 w-4" />
                  Reschedule All Overdue
                </button>
              </div>
            </Card>
          )}
        </>
      )}

      {/* Add Subject Modal */}
      {showAddSubject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-navy-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-4">
              Add New Subject
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Subject Name *
                </label>
                <input
                  type="text"
                  value={newSubject.name}
                  onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-navy-700 text-navy-700 dark:text-white"
                  placeholder="e.g., History, Geography, Polity"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category *
                </label>
                <select
                  value={newSubject.category}
                  onChange={(e) => setNewSubject({...newSubject, category: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-navy-700 text-navy-700 dark:text-white"
                >
                  <option value="Prelims">Prelims Only</option>
                  <option value="Mains">Mains Only</option>
                  <option value="Both">Both Prelims & Mains</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={newSubject.description}
                  onChange={(e) => setNewSubject({...newSubject, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-navy-700 text-navy-700 dark:text-white"
                  rows={3}
                  placeholder="Brief description of the subject"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={addSubject}
                disabled={!newSubject.name}
                className="flex-1 bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Subject
              </button>
              <button
                onClick={() => {
                  setShowAddSubject(false);
                  setNewSubject({ name: '', category: 'Both', description: '' });
                }}
                className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Subtopic Modal */}
      {showAddSubtopic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-navy-800 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-4">
              Add New Topic
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Topic Name *
                </label>
                <input
                  type="text"
                  value={newSubtopic.name}
                  onChange={(e) => setNewSubtopic({...newSubtopic, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-navy-700 text-navy-700 dark:text-white"
                  placeholder="Enter topic name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Priority
                </label>
                <select
                  value={newSubtopic.priority}
                  onChange={(e) => setNewSubtopic({...newSubtopic, priority: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-navy-700 text-navy-700 dark:text-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Estimated Hours
                </label>
                <input
                  type="number"
                  value={newSubtopic.estimatedHours}
                  onChange={(e) => setNewSubtopic({...newSubtopic, estimatedHours: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-navy-700 text-navy-700 dark:text-white"
                  placeholder="0"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  value={newSubtopic.notes}
                  onChange={(e) => setNewSubtopic({...newSubtopic, notes: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-navy-700 text-navy-700 dark:text-white"
                  rows={3}
                  placeholder="Add any notes or study plan"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => addSubtopic(showAddSubtopic)}
                disabled={!newSubtopic.name}
                className="flex-1 bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Topic
              </button>
              <button
                onClick={() => {
                  setShowAddSubtopic(null);
                  setNewSubtopic({ name: '', status: 'not-started', priority: 'medium', notes: '', estimatedHours: 0 });
                }}
                className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Subtopic Modal */}
      {editingSubtopic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-navy-800 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-4">
              Edit Topic
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Topic Name *
                </label>
                <input
                  type="text"
                  value={editingSubtopic.subtopic.name}
                  onChange={(e) => setEditingSubtopic({
                    ...editingSubtopic,
                    subtopic: { ...editingSubtopic.subtopic, name: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-navy-700 text-navy-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Priority
                </label>
                <select
                  value={editingSubtopic.subtopic.priority}
                  onChange={(e) => setEditingSubtopic({
                    ...editingSubtopic,
                    subtopic: { ...editingSubtopic.subtopic, priority: e.target.value as any }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-navy-700 text-navy-700 dark:text-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Estimated Hours
                </label>
                <input
                  type="number"
                  value={editingSubtopic.subtopic.estimatedHours}
                  onChange={(e) => setEditingSubtopic({
                    ...editingSubtopic,
                    subtopic: { ...editingSubtopic.subtopic, estimatedHours: parseInt(e.target.value) || 0 }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-navy-700 text-navy-700 dark:text-white"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Actual Hours
                </label>
                <input
                  type="number"
                  value={editingSubtopic.subtopic.actualHours || 0}
                  onChange={(e) => setEditingSubtopic({
                    ...editingSubtopic,
                    subtopic: { ...editingSubtopic.subtopic, actualHours: parseInt(e.target.value) || 0 }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-navy-700 text-navy-700 dark:text-white"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notes
                </label>
                <textarea
                  value={editingSubtopic.subtopic.notes}
                  onChange={(e) => setEditingSubtopic({
                    ...editingSubtopic,
                    subtopic: { ...editingSubtopic.subtopic, notes: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-navy-700 text-navy-700 dark:text-white"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  updateSubtopic(editingSubtopic.subjectId, editingSubtopic.subtopic.id, editingSubtopic.subtopic);
                  setEditingSubtopic(null);
                }}
                className="flex-1 bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingSubtopic(null)}
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