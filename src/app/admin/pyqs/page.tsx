'use client';
import { useState } from 'react';
import Card from 'components/card';
import { FiSearch, FiFilter, FiBookOpen, FiCalendar, FiTarget } from 'react-icons/fi';
import { MdExpandMore, MdClose } from 'react-icons/md';

interface Subject {
  id: string;
  name: string;
  subtopics: string[];
}

interface Question {
  id: string;
  year: number;
  subject: string;
  subtopic: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const PYQsPage = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedSubtopics, setSelectedSubtopics] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState({ from: 2015, to: 2024 });
  const [searchResults, setSearchResults] = useState<Question[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const subjects: Subject[] = [
    {
      id: 'history',
      name: 'History',
      subtopics: [
        'Ancient India',
        'Medieval India', 
        'Modern India',
        'Art & Culture',
        'Freedom Struggle',
        'Post Independence'
      ]
    },
    {
      id: 'geography',
      name: 'Geography',
      subtopics: [
        'Physical Geography',
        'Human Geography',
        'Indian Geography',
        'World Geography',
        'Climate & Weather',
        'Natural Resources'
      ]
    },
    {
      id: 'polity',
      name: 'Polity',
      subtopics: [
        'Constitution',
        'Fundamental Rights',
        'Directive Principles',
        'Parliament',
        'Judiciary',
        'Executive',
        'Local Government',
        'Elections'
      ]
    },
    {
      id: 'economics',
      name: 'Economics',
      subtopics: [
        'Basic Economics',
        'Indian Economy',
        'Economic Planning',
        'Banking & Finance',
        'Budget & Taxation',
        'International Trade'
      ]
    },
    {
      id: 'environment',
      name: 'Environment',
      subtopics: [
        'Ecology',
        'Biodiversity',
        'Climate Change',
        'Pollution',
        'Conservation',
        'Environmental Laws'
      ]
    },
    {
      id: 'science',
      name: 'Science & Technology',
      subtopics: [
        'Physics',
        'Chemistry',
        'Biology',
        'Space Technology',
        'Defense Technology',
        'IT & Communication'
      ]
    }
  ];

  const sampleQuestions: Question[] = [
    {
      id: '1',
      year: 2023,
      subject: 'History',
      subtopic: 'Ancient India',
      question: 'Which of the following was the capital of the Mauryan Empire?',
      options: ['Pataliputra', 'Taxila', 'Ujjain', 'Kaushambi'],
      correctAnswer: 0,
      explanation: 'Pataliputra (modern-day Patna) was the capital of the Mauryan Empire.',
      difficulty: 'Easy'
    },
    {
      id: '2',
      year: 2022,
      subject: 'Geography',
      subtopic: 'Physical Geography',
      question: 'The Western Ghats are an example of which type of mountains?',
      options: ['Fold Mountains', 'Block Mountains', 'Volcanic Mountains', 'Residual Mountains'],
      correctAnswer: 3,
      explanation: 'The Western Ghats are residual mountains formed by weathering and erosion.',
      difficulty: 'Medium'
    }
  ];

  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setSelectedSubtopics([]);
  };

  const handleSubtopicToggle = (subtopic: string) => {
    setSelectedSubtopics(prev => 
      prev.includes(subtopic) 
        ? prev.filter(s => s !== subtopic)
        : [...prev, subtopic]
    );
  };

  const handleSearch = async () => {
    if (!selectedSubject) {
      alert('Please select a subject first');
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const filteredQuestions = sampleQuestions.filter(q => {
        const subjectMatch = q.subject.toLowerCase() === subjects.find(s => s.id === selectedSubject)?.name.toLowerCase();
        const subtopicMatch = selectedSubtopics.length === 0 || selectedSubtopics.includes(q.subtopic);
        const yearMatch = q.year >= yearRange.from && q.year <= yearRange.to;
        
        return subjectMatch && subtopicMatch && yearMatch;
      });
      
      setSearchResults(filteredQuestions);
      setIsSearching(false);
    }, 1000);
  };

  const clearFilters = () => {
    setSelectedSubject('');
    setSelectedSubtopics([]);
    setYearRange({ from: 2015, to: 2024 });
    setSearchResults([]);
  };

  const selectedSubjectData = subjects.find(s => s.id === selectedSubject);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card extra="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/20 rounded-xl flex items-center justify-center">
            <FiBookOpen className="h-5 w-5 text-brand-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy-700 dark:text-white">
              Previous Year Questions
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Search and practice UPSC Prelims questions from 2000-2024
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">25,000+</p>
            <p className="text-xs text-blue-600/70 dark:text-blue-400/70">Questions</p>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-lg font-bold text-green-600 dark:text-green-400">25</p>
            <p className="text-xs text-green-600/70 dark:text-green-400/70">Years</p>
          </div>
          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-lg font-bold text-purple-600 dark:text-purple-400">6</p>
            <p className="text-xs text-purple-600/70 dark:text-purple-400/70">Subjects</p>
          </div>
        </div>
      </Card>

      {/* Search Filters */}
      <Card extra="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-navy-700 dark:text-white flex items-center gap-2">
            <FiFilter className="h-4 w-4" />
            Search Filters
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-1 text-brand-500 text-sm"
            >
              <FiFilter className="h-4 w-4" />
              {showFilters ? 'Hide' : 'Show'}
            </button>
            <button
              onClick={clearFilters}
              className="text-gray-500 hover:text-red-500 text-sm flex items-center gap-1"
            >
              <MdClose className="h-4 w-4" />
              Clear
            </button>
          </div>
        </div>

        <div className={`space-y-4 ${showFilters ? 'block' : 'hidden md:block'}`}>
          {/* Subject Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Subject *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => handleSubjectChange(subject.id)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                    selectedSubject === subject.id
                      ? 'bg-brand-500 text-white border-brand-500 shadow-lg'
                      : 'bg-white dark:bg-navy-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-brand-300 hover:bg-brand-50 dark:hover:bg-brand-900/20'
                  }`}
                >
                  {subject.name}
                </button>
              ))}
            </div>
          </div>

          {/* Subtopics Selection */}
          {selectedSubjectData && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Subtopics (Optional)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {selectedSubjectData.subtopics.map((subtopic) => (
                  <button
                    key={subtopic}
                    onClick={() => handleSubtopicToggle(subtopic)}
                    className={`p-2 rounded-lg border text-xs font-medium transition-all duration-200 ${
                      selectedSubtopics.includes(subtopic)
                        ? 'bg-brand-100 text-brand-700 border-brand-300 dark:bg-brand-900/30 dark:text-brand-300'
                        : 'bg-white dark:bg-navy-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-brand-200 hover:bg-brand-25'
                    }`}
                  >
                    {subtopic}
                  </button>
                ))}
              </div>
              {selectedSubtopics.length > 0 && (
                <p className="text-xs text-brand-600 dark:text-brand-400 mt-2">
                  {selectedSubtopics.length} subtopic(s) selected
                </p>
              )}
            </div>
          )}

          {/* Year Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Year Range
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FiCalendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">From:</span>
                <select
                  value={yearRange.from}
                  onChange={(e) => setYearRange(prev => ({ ...prev, from: parseInt(e.target.value) }))}
                  className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-navy-800 text-navy-700 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {Array.from({ length: 25 }, (_, i) => 2000 + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">To:</span>
                <select
                  value={yearRange.to}
                  onChange={(e) => setYearRange(prev => ({ ...prev, to: parseInt(e.target.value) }))}
                  className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-navy-800 text-navy-700 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {Array.from({ length: 25 }, (_, i) => 2000 + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="pt-2">
            <button
              onClick={handleSearch}
              disabled={!selectedSubject || isSearching}
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
            >
              {isSearching ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Searching...
                </>
              ) : (
                <>
                  <FiSearch className="h-4 w-4" />
                  Search Questions
                </>
              )}
            </button>
          </div>
        </div>
      </Card>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card extra="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-navy-700 dark:text-white">
              Search Results ({searchResults.length} questions)
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FiTarget className="h-4 w-4" />
              {selectedSubjectData?.name} • {yearRange.from}-{yearRange.to}
            </div>
          </div>

          <div className="space-y-4">
            {searchResults.map((question, index) => (
              <div
                key={question.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-brand-100 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                          {question.year}
                        </span>
                        <span className="text-xs bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">
                          {question.subtopic}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          question.difficulty === 'Easy' ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' :
                          question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400' :
                          'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                          {question.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-navy-700 dark:text-white font-medium mb-3">
                  {question.question}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                  {question.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className={`p-2 rounded-lg border text-sm ${
                        optIndex === question.correctAnswer
                          ? 'bg-green-50 border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-700 dark:text-green-300'
                          : 'bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <span className="font-medium">{String.fromCharCode(65 + optIndex)}.</span> {option}
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <span className="font-medium">Explanation:</span> {question.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* No Results */}
      {searchResults.length === 0 && selectedSubject && !isSearching && (
        <Card extra="p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiSearch className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            No questions found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Try adjusting your filters or selecting different subtopics
          </p>
        </Card>
      )}
    </div>
  );
};

export default PYQsPage;