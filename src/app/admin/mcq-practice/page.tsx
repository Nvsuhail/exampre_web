'use client';
import { useState, useEffect } from 'react';
import Card from 'components/card';
import { FiSearch, FiBookOpen, FiEdit3, FiGlobe, FiClock, FiCheck, FiX, FiArrowLeft, FiArrowRight, FiUpload, FiSettings } from 'react-icons/fi';
import { MdClose, MdTimer, MdQuiz, MdLightbulb, MdTune } from 'react-icons/md';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  source: string;
}

interface QuizState {
  currentQuestionIndex: number;
  selectedAnswers: { [key: number]: number };
  showAnswer: boolean;
  timeElapsed: number;
  isCompleted: boolean;
  startTime: Date | null;
}

type SourceType = 'notes' | 'topic' | 'current-affairs';
type DifficultyLevel = 'Easy' | 'Medium' | 'Hard' | 'Mixed';

const MCQPracticePage = () => {
  const [sourceType, setSourceType] = useState<SourceType>('topic');
  const [notesText, setNotesText] = useState('');
  const [topicText, setTopicText] = useState('');
  const [currentAffairsTopic, setCurrentAffairsTopic] = useState('');
  const [questionCount, setQuestionCount] = useState(3);
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>('Mixed');
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    selectedAnswers: {},
    showAnswer: false,
    timeElapsed: 0,
    isCompleted: false,
    startTime: null
  });

  const questionCounts = [1, 2, 3, 4, 5];
  const difficultyLevels: DifficultyLevel[] = ['Easy', 'Medium', 'Hard', 'Mixed'];

  const sampleTopics = [
    'Indian Constitution',
    'Fundamental Rights',
    'Economic Planning',
    'Climate Change',
    'Space Technology',
    'Ancient Indian History',
    'Monsoon System',
    'Banking Reforms'
  ];

  const currentAffairsTopics = [
    'G20 Summit 2024',
    'Digital India Initiative',
    'Renewable Energy Policy',
    'India-US Relations',
    'Budget 2024-25',
    'Climate Action',
    'Space Missions',
    'Economic Reforms'
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

  const generateQuestions = async () => {
    let sourceContent = '';
    let sourceLabel = '';

    switch (sourceType) {
      case 'notes':
        if (!notesText.trim()) {
          alert('Please paste your notes first');
          return;
        }
        sourceContent = notesText;
        sourceLabel = 'Your Notes';
        break;
      case 'topic':
        if (!topicText.trim()) {
          alert('Please enter a topic');
          return;
        }
        sourceContent = topicText;
        sourceLabel = topicText;
        break;
      case 'current-affairs':
        if (!currentAffairsTopic.trim()) {
          alert('Please enter a current affairs topic');
          return;
        }
        sourceContent = currentAffairsTopic;
        sourceLabel = `Current Affairs: ${currentAffairsTopic}`;
        break;
    }

    setIsGenerating(true);

    // Simulate AI question generation
    setTimeout(() => {
      const questions = generateSampleQuestions(sourceContent, sourceLabel, questionCount, difficultyLevel);
      setGeneratedQuestions(questions);
      setIsGenerating(false);
    }, 2000);
  };

  const generateSampleQuestions = (content: string, source: string, count: number, difficulty: DifficultyLevel): Question[] => {
    const questionTemplates = {
      Easy: [
        {
          question: `Which of the following is a key feature of ${content}?`,
          options: [
            'Democratic governance',
            'Centralized authority',
            'Federal structure',
            'Unitary system'
          ],
          correctAnswer: 0,
          explanation: `${content} emphasizes democratic principles and governance structures that ensure representation and accountability.`,
          difficulty: 'Easy' as const
        },
        {
          question: `What is the primary objective of ${content}?`,
          options: [
            'Economic development',
            'Social justice',
            'Political stability',
            'All of the above'
          ],
          correctAnswer: 3,
          explanation: `${content} aims to achieve comprehensive development including economic growth, social justice, and political stability.`,
          difficulty: 'Easy' as const
        }
      ],
      Medium: [
        {
          question: `In the context of ${content}, which statement is most accurate?`,
          options: [
            'It focuses only on short-term goals',
            'It emphasizes sustainable development',
            'It ignores environmental concerns',
            'It prioritizes only economic factors'
          ],
          correctAnswer: 1,
          explanation: `${content} emphasizes sustainable development that balances economic, social, and environmental considerations.`,
          difficulty: 'Medium' as const
        },
        {
          question: `The implementation of ${content} primarily involves:`,
          options: [
            'Central government only',
            'State governments only',
            'Both central and state governments',
            'International organizations'
          ],
          correctAnswer: 2,
          explanation: `${content} requires coordinated efforts from both central and state governments for effective implementation.`,
          difficulty: 'Medium' as const
        }
      ],
      Hard: [
        {
          question: `Analyze the long-term implications of ${content} on India's socio-economic framework:`,
          options: [
            'Limited impact on rural development',
            'Comprehensive transformation across sectors',
            'Focus only on urban infrastructure',
            'Temporary policy measure'
          ],
          correctAnswer: 1,
          explanation: `${content} is designed to bring about comprehensive transformation across multiple sectors, affecting both urban and rural development patterns.`,
          difficulty: 'Hard' as const
        },
        {
          question: `Which of the following best describes the constitutional validity and legal framework of ${content}?`,
          options: [
            'Violates federal principles',
            'Aligns with constitutional provisions',
            'Requires constitutional amendment',
            'Conflicts with fundamental rights'
          ],
          correctAnswer: 1,
          explanation: `${content} is designed to align with existing constitutional provisions while respecting federal principles and fundamental rights.`,
          difficulty: 'Hard' as const
        }
      ]
    };

    const getQuestionsForDifficulty = (targetDifficulty: DifficultyLevel) => {
      if (targetDifficulty === 'Mixed') {
        const allQuestions = [...questionTemplates.Easy, ...questionTemplates.Medium, ...questionTemplates.Hard];
        return allQuestions;
      }
      return questionTemplates[targetDifficulty] || questionTemplates.Medium;
    };

    const availableQuestions = getQuestionsForDifficulty(difficulty);

    return Array.from({ length: count }, (_, index) => {
      const template = availableQuestions[index % availableQuestions.length];
      return {
        id: `mcq-${index + 1}`,
        question: template.question,
        options: template.options,
        correctAnswer: template.correctAnswer,
        explanation: template.explanation,
        difficulty: template.difficulty,
        source: source
      };
    });
  };

  const startQuiz = () => {
    if (generatedQuestions.length === 0) {
      alert('Please generate questions first');
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
    if (quizState.currentQuestionIndex < generatedQuestions.length - 1) {
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

  const resetForm = () => {
    setNotesText('');
    setTopicText('');
    setCurrentAffairsTopic('');
    setGeneratedQuestions([]);
    setQuestionCount(3);
    setDifficultyLevel('Mixed');
  };

  const currentQuestion = generatedQuestions[quizState.currentQuestionIndex];
  const selectedAnswer = quizState.selectedAnswers[quizState.currentQuestionIndex];

  // Calculate quiz results with UPSC marking scheme
  const calculateMarks = () => {
    let totalMarks = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;

    generatedQuestions.forEach((question, index) => {
      const selectedAnswer = quizState.selectedAnswers[index];
      
      if (selectedAnswer === undefined) {
        // Unattempted - no marks deducted
        unattemptedCount++;
      } else if (selectedAnswer === question.correctAnswer) {
        // Correct answer - +2 marks
        totalMarks += 2;
        correctCount++;
      } else {
        // Wrong answer - -1/3 marks (negative marking)
        totalMarks -= 1/3;
        wrongCount++;
      }
    });

    return {
      totalMarks: Math.round(totalMarks * 100) / 100, // Round to 2 decimal places
      correctCount,
      wrongCount,
      unattemptedCount,
      maxPossibleMarks: generatedQuestions.length * 2
    };
  };

  const marks = calculateMarks();
  const accuracy = generatedQuestions.length > 0 ? Math.round((marks.correctCount / generatedQuestions.length) * 100) : 0;
  const avgTimePerQuestion = generatedQuestions.length > 0 ? Math.round(quizState.timeElapsed / generatedQuestions.length) : 0;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400';
      case 'Medium': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Hard': return 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  // Quiz Results Component
  if (quizMode && quizState.isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card extra="w-full max-w-3xl p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck className="h-10 w-10 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-navy-700 dark:text-white mb-2">
            Practice Completed!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Excellent work! Here's your detailed performance analysis
          </p>

          {/* UPSC Marks Display - Prominent */}
          <div className="bg-gradient-to-r from-brand-500 to-brand-600 rounded-xl p-6 mb-8 text-white">
            <h2 className="text-2xl font-bold mb-2">Total Marks Earned</h2>
            <div className="text-4xl font-bold mb-2">
              {marks.totalMarks} / {marks.maxPossibleMarks}
            </div>
            <p className="text-brand-100 text-sm">
              UPSC Marking Scheme: +2 for correct, -⅓ for wrong
            </p>
          </div>

          {/* Detailed Results Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                {marks.correctCount}
              </div>
              <div className="text-sm text-green-600/70 dark:text-green-400/70">Correct</div>
              <div className="text-xs text-green-600/50 dark:text-green-400/50 mt-1">
                +{marks.correctCount * 2} marks
              </div>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
                {marks.wrongCount}
              </div>
              <div className="text-sm text-red-600/70 dark:text-red-400/70">Wrong</div>
              <div className="text-xs text-red-600/50 dark:text-red-400/50 mt-1">
                -{Math.round(marks.wrongCount * (1/3) * 100) / 100} marks
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900/20 p-4 rounded-xl">
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-1">
                {marks.unattemptedCount}
              </div>
              <div className="text-sm text-gray-600/70 dark:text-gray-400/70">Unattempted</div>
              <div className="text-xs text-gray-600/50 dark:text-gray-400/50 mt-1">
                0 marks
              </div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                {accuracy}%
              </div>
              <div className="text-sm text-purple-600/70 dark:text-purple-400/70">Accuracy</div>
              <div className="text-xs text-purple-600/50 dark:text-purple-400/50 mt-1">
                Attempted: {marks.correctCount + marks.wrongCount}
              </div>
            </div>
          </div>

          {/* Performance Analysis */}
          <div className="bg-gray-50 dark:bg-navy-800 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-4">Performance Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Time per Question:</span>
                <div className="font-semibold text-navy-700 dark:text-white">{avgTimePerQuestion}s</div>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Total Time:</span>
                <div className="font-semibold text-navy-700 dark:text-white">{formatTime(quizState.timeElapsed)}</div>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Performance Level:</span>
                <div className={`font-semibold ${
                  marks.totalMarks >= marks.maxPossibleMarks * 0.8 ? 'text-green-600' : 
                  marks.totalMarks >= marks.maxPossibleMarks * 0.6 ? 'text-yellow-600' : 
                  marks.totalMarks >= 0 ? 'text-orange-600' : 'text-red-600'
                }`}>
                  {marks.totalMarks >= marks.maxPossibleMarks * 0.8 ? 'Excellent' : 
                   marks.totalMarks >= marks.maxPossibleMarks * 0.6 ? 'Good' : 
                   marks.totalMarks >= 0 ? 'Average' : 'Needs Improvement'}
                </div>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Efficiency:</span>
                <div className="font-semibold text-navy-700 dark:text-white">
                  {Math.round((marks.totalMarks / marks.maxPossibleMarks) * 100)}%
                </div>
              </div>
            </div>
          </div>

          {/* Marking Scheme Explanation */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-8">
            <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">UPSC Marking Scheme</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-700 dark:text-blue-300">
              <div className="flex items-center gap-2">
                <FiCheck className="h-4 w-4 text-green-500" />
                <span>Correct Answer: +2 marks</span>
              </div>
              <div className="flex items-center gap-2">
                <FiX className="h-4 w-4 text-red-500" />
                <span>Wrong Answer: -⅓ marks</span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="h-4 w-4 text-gray-500" />
                <span>Unattempted: 0 marks</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={exitQuiz}
              className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors"
            >
              Generate New Questions
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
              Retake Practice
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
                  Exit Practice
                </button>
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex items-center gap-2">
                  <MdQuiz className="h-5 w-5 text-brand-500" />
                  <span className="font-medium text-navy-700 dark:text-white">
                    Question {quizState.currentQuestionIndex + 1} of {generatedQuestions.length}
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
                    {currentQuestion.source}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(currentQuestion.difficulty)}`}>
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
                            <div className="flex items-center gap-1">
                              <FiCheck className="h-5 w-5 text-green-500" />
                              <span className="text-xs font-medium text-green-600">+2</span>
                            </div>
                          ) : selectedAnswer === index ? (
                            <div className="flex items-center gap-1">
                              <FiX className="h-5 w-5 text-red-500" />
                              <span className="text-xs font-medium text-red-600">-⅓</span>
                            </div>
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
                  <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
                    <MdLightbulb className="h-4 w-4" />
                    Explanation:
                  </h3>
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
                  {quizState.currentQuestionIndex === generatedQuestions.length - 1 ? (
                    <button
                      onClick={submitQuiz}
                      className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                    >
                      Submit Practice
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

  // Main Interface
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card extra="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/20 rounded-xl flex items-center justify-center">
            <MdQuiz className="h-5 w-5 text-brand-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy-700 dark:text-white">
              MCQ Practice Generator
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Generate custom MCQ questions with UPSC marking scheme (+2, -⅓)
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">AI-Powered</p>
            <p className="text-xs text-blue-600/70 dark:text-blue-400/70">Questions</p>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-lg font-bold text-green-600 dark:text-green-400">1-5</p>
            <p className="text-xs text-green-600/70 dark:text-green-400/70">Questions</p>
          </div>
          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <p className="text-lg font-bold text-purple-600 dark:text-purple-400">UPSC</p>
            <p className="text-xs text-purple-600/70 dark:text-purple-400/70">Marking</p>
          </div>
        </div>
      </Card>

      {/* Question Generation Form - Only show when no questions generated */}
      {generatedQuestions.length === 0 && (
        <Card extra="p-6">
          <h2 className="text-lg font-semibold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
            <MdLightbulb className="h-4 w-4" />
            Generate Practice Questions
          </h2>

          {/* Source Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Choose Source Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => setSourceType('notes')}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  sourceType === 'notes'
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-brand-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <FiUpload className={`h-5 w-5 ${sourceType === 'notes' ? 'text-brand-500' : 'text-gray-500'}`} />
                  <span className={`font-medium ${sourceType === 'notes' ? 'text-brand-700 dark:text-brand-300' : 'text-gray-700 dark:text-gray-300'}`}>
                    From Your Notes
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Paste your study notes and generate questions
                </p>
              </button>

              <button
                onClick={() => setSourceType('topic')}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  sourceType === 'topic'
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-brand-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <FiBookOpen className={`h-5 w-5 ${sourceType === 'topic' ? 'text-brand-500' : 'text-gray-500'}`} />
                  <span className={`font-medium ${sourceType === 'topic' ? 'text-brand-700 dark:text-brand-300' : 'text-gray-700 dark:text-gray-300'}`}>
                    From Any Topic
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Enter any topic and get relevant questions
                </p>
              </button>

              <button
                onClick={() => setSourceType('current-affairs')}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  sourceType === 'current-affairs'
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-brand-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <FiGlobe className={`h-5 w-5 ${sourceType === 'current-affairs' ? 'text-brand-500' : 'text-gray-500'}`} />
                  <span className={`font-medium ${sourceType === 'current-affairs' ? 'text-brand-700 dark:text-brand-300' : 'text-gray-700 dark:text-gray-300'}`}>
                    Current Affairs
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Generate questions on current events
                </p>
              </button>
            </div>
          </div>

          {/* Content Input Based on Source Type */}
          <div className="mb-6">
            {sourceType === 'notes' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Paste Your Notes
                </label>
                <textarea
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  placeholder="Paste your study notes here... (e.g., Constitutional provisions, economic policies, etc.)"
                  className="w-full h-32 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-navy-800 text-navy-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 resize-none"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Minimum 50 characters required for better question generation
                </p>
              </div>
            )}

            {sourceType === 'topic' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter Topic
                </label>
                <input
                  type="text"
                  value={topicText}
                  onChange={(e) => setTopicText(e.target.value)}
                  placeholder="Enter any topic (e.g., Indian Constitution, Climate Change, etc.)"
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-navy-800 text-navy-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                />
                
                {/* Sample Topics */}
                <div className="mt-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Popular topics:</p>
                  <div className="flex flex-wrap gap-2">
                    {sampleTopics.map((topic, index) => (
                      <button
                        key={index}
                        onClick={() => setTopicText(topic)}
                        className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-brand-100 dark:hover:bg-brand-900/30 hover:text-brand-600 dark:hover:text-brand-300 transition-colors"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {sourceType === 'current-affairs' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Affairs Topic
                </label>
                <input
                  type="text"
                  value={currentAffairsTopic}
                  onChange={(e) => setCurrentAffairsTopic(e.target.value)}
                  placeholder="Enter current affairs topic (e.g., G20 Summit 2024, Budget 2024-25, etc.)"
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-navy-800 text-navy-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                />
                
                {/* Current Affairs Topics */}
                <div className="mt-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Trending topics:</p>
                  <div className="flex flex-wrap gap-2">
                    {currentAffairsTopics.map((topic, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentAffairsTopic(topic)}
                        className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-brand-100 dark:hover:bg-brand-900/30 hover:text-brand-600 dark:hover:text-brand-300 transition-colors"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Question Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Question Count Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number of Questions
              </label>
              <div className="flex gap-2">
                {questionCounts.map((count) => (
                  <button
                    key={count}
                    onClick={() => setQuestionCount(count)}
                    className={`w-12 h-12 rounded-lg border-2 font-medium transition-all duration-200 ${
                      questionCount === count
                        ? 'border-brand-500 bg-brand-500 text-white'
                        : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-brand-300'
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Level Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <MdTune className="h-4 w-4" />
                Difficulty Level
              </label>
              <div className="grid grid-cols-2 gap-2">
                {difficultyLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficultyLevel(level)}
                    className={`px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                      difficultyLevel === level
                        ? 'border-brand-500 bg-brand-500 text-white'
                        : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-brand-300'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Mixed includes all difficulty levels
              </p>
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex gap-3">
            <button
              onClick={generateQuestions}
              disabled={isGenerating}
              className="flex-1 flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Generating Questions...
                </>
              ) : (
                <>
                  <MdLightbulb className="h-4 w-4" />
                  Generate {questionCount} Question{questionCount > 1 ? 's' : ''} ({difficultyLevel})
                </>
              )}
            </button>
            
            <button
              onClick={resetForm}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <MdClose className="h-4 w-4" />
            </button>
          </div>
        </Card>
      )}

      {/* Action Buttons - Only shown when questions are generated */}
      {generatedQuestions.length > 0 && !quizMode && (
        <Card extra="p-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={startQuiz}
              className="flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <MdQuiz className="h-4 w-4" />
              Start Practice ({generatedQuestions.length} Questions)
            </button>
            
            <button
              onClick={() => {
                setGeneratedQuestions([]);
                resetForm();
              }}
              className="flex items-center justify-center gap-2 border border-brand-500 text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <FiEdit3 className="h-4 w-4" />
              Generate New Questions
            </button>
          </div>
        </Card>
      )}

      {/* Generated Questions Preview - Without Answer Keys */}
      {generatedQuestions.length > 0 && !quizMode && (
        <Card extra="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-navy-700 dark:text-white">
              Generated Questions ({generatedQuestions.length})
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <MdLightbulb className="h-4 w-4" />
              AI Generated • {difficultyLevel} Level
            </div>
          </div>

          <div className="space-y-4">
            {generatedQuestions.map((question, index) => (
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
                          {question.source}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(question.difficulty)}`}>
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
    </div>
  );
};

export default MCQPracticePage;