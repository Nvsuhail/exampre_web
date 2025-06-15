'use client';
import { useState, useEffect } from 'react';
import Card from 'components/card';
import { FiSearch, FiFilter, FiBookOpen, FiCalendar, FiTarget, FiClock, FiCheck, FiX, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { MdExpandMore, MdClose, MdTimer, MdQuiz } from 'react-icons/md';

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

interface QuizState {
  currentQuestionIndex: number;
  selectedAnswers: { [key: number]: number };
  showAnswer: boolean;
  timeElapsed: number;
  isCompleted: boolean;
  startTime: Date | null;
}

const PYQsPage = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedSubtopics, setSelectedSubtopics] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState({ from: 2015, to: 2024 });
  const [searchResults, setSearchResults] = useState<Question[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    selectedAnswers: {},
    showAnswer: false,
    timeElapsed: 0,
    isCompleted: false,
    startTime: null
  });

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
      explanation: 'Pataliputra (modern-day Patna) was the capital of the Mauryan Empire established by Chandragupta Maurya.',
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
      explanation: 'The Western Ghats are residual mountains formed by weathering and erosion of older mountain systems.',
      difficulty: 'Medium'
    },
    {
      id: '3',
      year: 2021,
      subject: 'Polity',
      subtopic: 'Constitution',
      question: 'Which article of the Indian Constitution deals with the Right to Equality?',
      options: ['Article 12', 'Article 14', 'Article 19', 'Article 21'],
      correctAnswer: 1,
      explanation: 'Article 14 of the Indian Constitution guarantees equality before law and equal protection of laws.',
      difficulty: 'Medium'
    },
    {
      id: '4',
      year: 2020,
      subject: 'Economics',
      subtopic: 'Indian Economy',
      question: 'What does GDP stand for?',
      options: ['Gross Domestic Product', 'General Development Program', 'Global Development Policy', 'Gross Development Plan'],
      correctAnswer: 0,
      explanation: 'GDP stands for Gross Domestic Product, which measures the total value of goods and services produced within a country.',
      difficulty: 'Easy'
    },
    {
      id: '5',
      year: 2019,
      subject: 'Environment',
      subtopic: 'Climate Change',
      question: 'Which gas is primarily responsible for global warming?',
      options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
      correctAnswer: 2,
      explanation: 'Carbon Dioxide (CO2) is the primary greenhouse gas responsible for global warming and climate change.',
      difficulty: 'Easy'
    }
  ];

  // Timer effect for quiz mode
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (quizMode && quizState.startTime && !quizState.isCompleted) {
      interval = setInterval(() => {
        setQuizState(prev => ({
          ...prev,
          timeElapsed: Math.floor((Date.now() - prev.startTime!.getTime()) / 1000)
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizMode, quizState.startTime, quizState.isCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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

  const startQuiz = () => {
    if (searchResults.length === 0) {
      alert('Please search for questions first');
      return;
    }
    
    setQuizMode(true);
    setQuizState({
      currentQuestionIndex: 0,
      selectedAnswers: {},
      showAnswer: false,
      timeElapsed: 0,
      isCompleted: false,
      startTime: new Date()
    });
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (quizState.showAnswer) return;
    
    setQuizState(prev => ({
      ...prev,
      selectedAnswers: {
        ...prev.selectedAnswers,
        [prev.currentQuestionIndex]: answerIndex
      }
    }));
  };

  const showAnswerKey = () => {
    setQuizState(prev => ({ ...prev, showAnswer: true }));
  };

  const nextQuestion = () => {
    if (quizState.currentQuestionIndex < searchResults.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
        showAnswer: false
      }));
    }
  };

  const prevQuestion = () => {
    if (quizState.currentQuestionIndex > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
        showAnswer: false
      }));
    }
  };

  const submitQuiz = () => {
    setQuizState(prev => ({ ...prev, isCompleted: true }));
  };

  const exitQuiz = () => {
    setQuizMode(false);
    setQuizState({
      currentQuestionIndex: 0,
      selectedAnswers: {},
      showAnswer: false,
      timeElapsed: 0,
      isCompleted: false,
      startTime: null
    });
  };

  const clearFilters = () => {
    setSelectedSubject('');
    setSelectedSubtopics([]);
    setYearRange({ from: 2015, to: 2024 });
    setSearchResults([]);
  };

  const selectedSubjectData = subjects.find(s => s.id === selectedSubject);
  const currentQuestion = searchResults[quizState.currentQuestionIndex];
  const selectedAnswer = quizState.selectedAnswers[quizState.currentQuestionIndex];

  // Calculate quiz results
  const correctAnswers = Object.entries(quizState.selectedAnswers).filter(
    ([index, answer]) => searchResults[parseInt(index)]?.correctAnswer === answer
  ).length;
  const totalQuestions = searchResults.length;
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  const avgTimePerQuestion = totalQuestions > 0 ? Math.round(quizState.timeElapsed / totalQuestions) : 0;

  // Quiz Results Component
  if (quizMode && quizState.isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card extra="w-full max-w-2xl p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck className="h-10 w-10 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-navy-700 dark:text-white mb-2">
            Quiz Completed!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Great job! Here's your performance summary
          </p>

          {/* Results Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {correctAnswers}/{totalQuestions}
              </div>
              <div className="text-sm text-blue-600/70 dark:text-blue-400/70">Correct</div>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
                {totalQuestions - correctAnswers}
              </div>
              <div className="text-sm text-red-600/70 dark:text-red-400/70">Wrong</div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                {accuracy}%
              </div>
              <div className="text-sm text-green-600/70 dark:text-green-400/70">Accuracy</div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                {formatTime(quizState.timeElapsed)}
              </div>
              <div className="text-sm text-purple-600/70 dark:text-purple-400/70">Total Time</div>
            </div>
          </div>

          {/* Performance Analysis */}
          <div className="bg-gray-50 dark:bg-navy-800 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-4">Performance Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Average Time per Question:</span>
                <div className="font-semibold text-navy-700 dark:text-white">{avgTimePerQuestion}s</div>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Performance Level:</span>
                <div className={`font-semibold ${
                  accuracy >= 80 ? 'text-green-600' : 
                  accuracy >= 60 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {accuracy >= 80 ? 'Excellent' : accuracy >= 60 ? 'Good' : 'Needs Improvement'}
                </div>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Questions Attempted:</span>
                <div className="font-semibold text-navy-700 dark:text-white">
                  {Object.keys(quizState.selectedAnswers).length}/{totalQuestions}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={exitQuiz}
              className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors"
            >
              Back to Search
            </button>
            <button
              onClick={() => {
                setQuizState({
                  currentQuestionIndex: 0,
                  selectedAnswers: {},
                  showAnswer: false,
                  timeElapsed: 0,
                  isCompleted: false,
                  startTime: new Date()
                });
              }}
              className="px-6 py-3 border border-brand-500 text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-lg font-medium transition-colors"
            >
              Retake Quiz
            </button>
          </div>
        </Card>
      </div>
    );
  }

  // Quiz Mode Component
  if (quizMode && currentQuestion) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Quiz Header - Completely rounded like bottom quiz box */}
        <div className="m-4 mb-0">
          <Card extra="p-4 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={exitQuiz}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-brand-500 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FiArrowLeft className="h-4 w-4" />
                  Exit Quiz
                </button>
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex items-center gap-2">
                  <MdQuiz className="h-5 w-5 text-brand-500" />
                  <span className="font-medium text-navy-700 dark:text-white">
                    Question {quizState.currentQuestionIndex + 1} of {searchResults.length}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-xl">
                  <MdTimer className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="font-mono text-blue-600 dark:text-blue-400 font-medium">
                    {formatTime(quizState.timeElapsed)}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quiz Content - Scrollable */}
        <div className="flex-1 px-4 pb-4 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <Card extra="p-8 rounded-xl">
              {/* Question Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                    {currentQuestion.year}
                  </span>
                  <span className="text-xs bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">
                    {currentQuestion.subtopic}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    currentQuestion.difficulty === 'Easy' ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400' :
                    currentQuestion.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400' :
                    'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                  }`}>
                    {currentQuestion.difficulty}
                  </span>
                </div>
              </div>

              {/* Question */}
              <h2 className="text-xl font-semibold text-navy-700 dark:text-white mb-8 leading-relaxed">
                {currentQuestion.question}
              </h2>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={quizState.showAnswer}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      selectedAnswer === index
                        ? quizState.showAnswer
                          ? index === currentQuestion.correctAnswer
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                            : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                          : 'border-brand-500 bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300'
                        : quizState.showAnswer && index === currentQuestion.correctAnswer
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-navy-800 text-gray-700 dark:text-gray-300 hover:border-brand-300 hover:bg-brand-25 dark:hover:bg-brand-900/10'
                    } ${quizState.showAnswer ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        selectedAnswer === index
                          ? quizState.showAnswer
                            ? index === currentQuestion.correctAnswer
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                            : 'bg-brand-500 text-white'
                          : quizState.showAnswer && index === currentQuestion.correctAnswer
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {quizState.showAnswer && (
                        <span className="flex-shrink-0">
                          {index === currentQuestion.correctAnswer ? (
                            <FiCheck className="h-5 w-5 text-green-500" />
                          ) : selectedAnswer === index ? (
                            <FiX className="h-5 w-5 text-red-500" />
                          ) : null}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Show Answer Button */}
              {selectedAnswer !== undefined && !quizState.showAnswer && (
                <div className="mb-6">
                  <button
                    onClick={showAnswerKey}
                    className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Show Answer Key
                  </button>
                </div>
              )}

              {/* Explanation */}
              {quizState.showAnswer && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl mb-6">
                  <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Explanation:</h3>
                  <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={prevQuestion}
                  disabled={quizState.currentQuestionIndex === 0}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FiArrowLeft className="h-4 w-4" />
                  Previous
                </button>

                <div className="flex items-center gap-2">
                  {quizState.currentQuestionIndex === searchResults.length - 1 ? (
                    <button
                      onClick={submitQuiz}
                      className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                    >
                      Submit Quiz
                    </button>
                  ) : (
                    <button
                      onClick={nextQuestion}
                      className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors"
                    >
                      Next
                      <FiArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Main Search Interface
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

      {/* Search Filters - Only show when no search results */}
      {searchResults.length === 0 && (
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

            {/* Enhanced Year Range with Dual Handle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Year Range
              </label>
              <div className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    From {yearRange.from} to {yearRange.to}
                  </span>
                  <span className="text-xs bg-brand-100 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 px-3 py-1.5 rounded-full font-medium">
                    {yearRange.to - yearRange.from + 1} years
                  </span>
                </div>
                
                {/* Dual Range Slider Container */}
                <div className="relative mb-8">
                  {/* Background track */}
                  <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full">
                    {/* Active range track */}
                    <div 
                      className="absolute h-3 bg-gradient-to-r from-brand-500 to-brand-600 rounded-full shadow-sm"
                      style={{
                        left: `${((yearRange.from - 2000) / (2024 - 2000)) * 100}%`,
                        width: `${((yearRange.to - yearRange.from) / (2024 - 2000)) * 100}%`
                      }}
                    />
                  </div>
                  
                  {/* From slider */}
                  <input
                    type="range"
                    min="2000"
                    max="2024"
                    value={yearRange.from}
                    onChange={(e) => {
                      const newFrom = parseInt(e.target.value);
                      if (newFrom <= yearRange.to) {
                        setYearRange(prev => ({ ...prev, from: newFrom }));
                      }
                    }}
                    className="absolute top-0 w-full h-3 bg-transparent appearance-none cursor-pointer range-slider"
                    style={{ 
                      pointerEvents: 'auto',
                      zIndex: 2
                    }}
                  />
                  
                  {/* To slider */}
                  <input
                    type="range"
                    min="2000"
                    max="2024"
                    value={yearRange.to}
                    onChange={(e) => {
                      const newTo = parseInt(e.target.value);
                      if (newTo >= yearRange.from) {
                        setYearRange(prev => ({ ...prev, to: newTo }));
                      }
                    }}
                    className="absolute top-0 w-full h-3 bg-transparent appearance-none cursor-pointer range-slider"
                    style={{ 
                      pointerEvents: 'auto',
                      zIndex: 1
                    }}
                  />
                </div>
                
                {/* Year inputs */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">From Year</label>
                    <div className="relative">
                      <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        min="2000"
                        max="2024"
                        value={yearRange.from}
                        onChange={(e) => {
                          const newFrom = parseInt(e.target.value);
                          if (newFrom >= 2000 && newFrom <= yearRange.to) {
                            setYearRange(prev => ({ ...prev, from: newFrom }));
                          }
                        }}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-navy-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-navy-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">To Year</label>
                    <div className="relative">
                      <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        min="2000"
                        max="2024"
                        value={yearRange.to}
                        onChange={(e) => {
                          const newTo = parseInt(e.target.value);
                          if (newTo <= 2024 && newTo >= yearRange.from) {
                            setYearRange(prev => ({ ...prev, to: newTo }));
                          }
                        }}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-navy-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-navy-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Quick Year Presets */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setYearRange({ from: 2020, to: 2024 })}
                    className="text-xs px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors font-medium border border-blue-200 dark:border-blue-800"
                  >
                    Last 5 years
                  </button>
                  <button
                    onClick={() => setYearRange({ from: 2015, to: 2024 })}
                    className="text-xs px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors font-medium border border-green-200 dark:border-green-800"
                  >
                    Last 10 years
                  </button>
                  <button
                    onClick={() => setYearRange({ from: 2000, to: 2024 })}
                    className="text-xs px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors font-medium border border-purple-200 dark:border-purple-800"
                  >
                    All years
                  </button>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="pt-2">
              <button
                onClick={handleSearch}
                disabled={!selectedSubject || isSearching}
                className="w-full flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
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
      )}

      {/* Action Buttons - Only shown when search results exist */}
      {searchResults.length > 0 && !quizMode && (
        <Card extra="p-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={startQuiz}
              className="flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <MdQuiz className="h-4 w-4" />
              Start Quiz ({searchResults.length} Questions)
            </button>
            
            <button
              onClick={() => {
                setSearchResults([]);
                setSelectedSubject('');
                setSelectedSubtopics([]);
              }}
              className="flex items-center justify-center gap-2 border border-brand-500 text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <FiSearch className="h-4 w-4" />
              Search Another Topic
            </button>
          </div>
        </Card>
      )}

      {/* Search Results - Without Answer Keys */}
      {searchResults.length > 0 && !quizMode && (
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {question.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className="p-3 rounded-lg border bg-gray-50 border-gray-200 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 text-sm"
                    >
                      <span className="font-medium">{String.fromCharCode(65 + optIndex)}.</span> {option}
                    </div>
                  ))}
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