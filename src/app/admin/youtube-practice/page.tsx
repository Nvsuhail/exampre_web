'use client';
import { useState, useEffect } from 'react';
import Card from 'components/card';
import { FiYoutube, FiLink, FiDownload, FiPrinter, FiSave, FiEdit3, FiBookOpen, FiClock, FiCheck, FiX, FiArrowLeft, FiArrowRight, FiEye, FiRefreshCw, FiFileText, FiSettings } from 'react-icons/fi';
import { MdClose, MdTimer, MdQuiz, MdLightbulb, MdTune, MdOndemandVideo, MdNotes } from 'react-icons/md';

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
  isReviewing: boolean;
}

interface VideoInfo {
  title: string;
  duration: string;
  channel: string;
  description: string;
}

interface SavedNote {
  id: string;
  title: string;
  content: string;
  videoUrl: string;
  videoTitle: string;
  createdAt: Date;
}

type FeatureType = 'mcq' | 'notes';
type DifficultyLevel = 'Easy' | 'Medium' | 'Hard' | 'Mixed';

const YouTubePracticePage = () => {
  const [featureType, setFeatureType] = useState<FeatureType>('mcq');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [questionCount, setQuestionCount] = useState(3);
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>('Mixed');
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [generatedNotes, setGeneratedNotes] = useState('');
  const [quizMode, setQuizMode] = useState(false);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    selectedAnswers: {},
    showAnswer: false,
    timeElapsed: 0,
    isCompleted: false,
    startTime: null,
    isReviewing: false
  });
  const [savedNotes, setSavedNotes] = useState<SavedNote[]>([]);
  const [showSavedNotes, setShowSavedNotes] = useState(false);

  const questionCounts = [1, 2, 3, 4, 5];
  const difficultyLevels: DifficultyLevel[] = ['Easy', 'Medium', 'Hard', 'Mixed'];

  // Sample YouTube URLs for demonstration
  const sampleUrls = [
    'https://youtube.com/watch?v=dQw4w9WgXcQ',
    'https://youtu.be/dQw4w9WgXcQ',
    'https://youtube.com/watch?v=abc123def456'
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

  // Load saved notes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('youtube-practice-notes');
    if (saved) {
      setSavedNotes(JSON.parse(saved));
    }
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const processYouTubeVideo = async () => {
    if (!youtubeUrl.trim()) {
      alert('Please enter a YouTube URL');
      return;
    }

    const videoId = extractVideoId(youtubeUrl);
    if (!videoId) {
      alert('Please enter a valid YouTube URL');
      return;
    }

    setIsProcessing(true);

    // Simulate video processing
    setTimeout(() => {
      // Mock video info
      const mockVideoInfo: VideoInfo = {
        title: 'UPSC Prelims Strategy 2024 | Complete Guide',
        duration: '45:32',
        channel: 'UPSC Preparation Channel',
        description: 'Comprehensive guide for UPSC Prelims preparation covering all subjects and strategies.'
      };
      
      setVideoInfo(mockVideoInfo);
      
      if (featureType === 'mcq') {
        const questions = generateQuestionsFromVideo(mockVideoInfo, questionCount, difficultyLevel);
        setGeneratedQuestions(questions);
      } else {
        const notes = generateNotesFromVideo(mockVideoInfo);
        setGeneratedNotes(notes);
      }
      
      setIsProcessing(false);
    }, 3000);
  };

  const generateQuestionsFromVideo = (video: VideoInfo, count: number, difficulty: DifficultyLevel): Question[] => {
    const questionTemplates = {
      Easy: [
        {
          question: `According to the video "${video.title}", what is the primary focus of UPSC Prelims preparation?`,
          options: [
            'Memorizing facts only',
            'Understanding concepts and current affairs',
            'Solving previous year papers only',
            'Reading newspapers daily'
          ],
          correctAnswer: 1,
          explanation: 'The video emphasizes that UPSC Prelims requires a balanced approach of understanding concepts along with staying updated with current affairs.',
          difficulty: 'Easy' as const
        },
        {
          question: `What does the video suggest as the most important aspect of UPSC preparation?`,
          options: [
            'Speed reading',
            'Consistent study schedule',
            'Expensive coaching',
            'Multiple reference books'
          ],
          correctAnswer: 1,
          explanation: 'The video stresses the importance of maintaining a consistent and disciplined study schedule for effective UPSC preparation.',
          difficulty: 'Easy' as const
        }
      ],
      Medium: [
        {
          question: `Based on the video content, which strategy is recommended for effective time management in UPSC Prelims?`,
          options: [
            'Study 12+ hours daily',
            'Focus only on strong subjects',
            'Balanced approach with regular revision',
            'Cramming before exams'
          ],
          correctAnswer: 2,
          explanation: 'The video advocates for a balanced study approach that includes regular revision cycles and covers all subjects systematically.',
          difficulty: 'Medium' as const
        },
        {
          question: `According to the video, what is the optimal approach for current affairs preparation?`,
          options: [
            'Reading multiple newspapers',
            'Focused reading with note-making',
            'Only online sources',
            'Monthly magazines only'
          ],
          correctAnswer: 1,
          explanation: 'The video recommends focused reading of reliable sources combined with systematic note-making for effective current affairs preparation.',
          difficulty: 'Medium' as const
        }
      ],
      Hard: [
        {
          question: `Analyze the comprehensive strategy discussed in the video for integrating static and dynamic portions of the UPSC syllabus:`,
          options: [
            'Study them separately without connection',
            'Link current events with static concepts for better retention',
            'Focus only on static portions',
            'Prioritize current affairs over static content'
          ],
          correctAnswer: 1,
          explanation: 'The video emphasizes the importance of creating connections between static knowledge and current events to enhance understanding and retention.',
          difficulty: 'Hard' as const
        },
        {
          question: `What does the video suggest about the psychological aspect of UPSC preparation and maintaining motivation?`,
          options: [
            'Ignore mental health completely',
            'Study continuously without breaks',
            'Maintain work-life balance with regular breaks',
            'Compare with other aspirants constantly'
          ],
          correctAnswer: 2,
          explanation: 'The video stresses the importance of maintaining mental health through proper work-life balance and taking regular breaks to sustain long-term preparation.',
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
        id: `youtube-mcq-${index + 1}`,
        question: template.question,
        options: template.options,
        correctAnswer: template.correctAnswer,
        explanation: template.explanation,
        difficulty: template.difficulty,
        source: `YouTube: ${video.title}`
      };
    });
  };

  const generateNotesFromVideo = (video: VideoInfo): string => {
    return `# ${video.title}

**Channel:** ${video.channel}  
**Duration:** ${video.duration}  
**Date:** ${new Date().toLocaleDateString()}

---

## 📋 Key Points

### 1. Foundation Building
- **NCERT Mastery**: Complete understanding of NCERT books from classes 6-12
- **Conceptual Clarity**: Focus on understanding rather than rote memorization
- **Subject Integration**: Connect different subjects for holistic understanding

### 2. Current Affairs Strategy
- **Daily Reading**: Consistent newspaper reading (The Hindu recommended)
- **Note Making**: Systematic compilation of important events
- **Monthly Compilation**: Regular revision of current affairs notes
- **Linking**: Connect current events with static portions

### 3. Practice and Revision
- **Previous Year Papers**: Solve last 10 years' questions systematically
- **Mock Tests**: Regular practice with time management
- **Revision Cycles**: Multiple revisions with decreasing time intervals
- **Weak Area Focus**: Identify and strengthen weak subjects

### 4. Time Management
- **Study Schedule**: 8-10 hours of focused study daily
- **Subject Rotation**: Balanced coverage of all subjects
- **Break Management**: Regular breaks to maintain efficiency
- **Sleep Cycle**: Maintain healthy sleep patterns

### 5. Mental Health & Motivation
- **Stress Management**: Regular exercise and meditation
- **Peer Support**: Healthy competition and group discussions
- **Goal Setting**: Short-term and long-term milestone planning
- **Positive Mindset**: Maintain optimism throughout the journey

### 6. Resource Management
- **Quality over Quantity**: Limited but reliable sources
- **Standard Books**: Stick to recommended reference materials
- **Online Resources**: Utilize quality online content judiciously
- **Coaching Support**: Optional but can provide structure

---

## 🎯 Action Items

1. **Week 1-2**: Complete NCERT foundation
2. **Week 3-4**: Start current affairs compilation
3. **Month 2**: Begin previous year paper analysis
4. **Month 3**: Start mock test series
5. **Final Month**: Intensive revision and practice

---

## 📚 Recommended Resources

- **History**: NCERT + Spectrum Modern History
- **Geography**: NCERT + Certificate Physical Geography
- **Polity**: NCERT + Laxmikanth
- **Economics**: NCERT + Economic Survey
- **Environment**: NCERT + Shankar Environment
- **Science**: NCERT + Current developments

---

## 💡 Key Takeaways

> "Success in UPSC is not about studying hard, but studying smart with consistency and the right strategy."

- Consistency beats intensity
- Understanding trumps memorization
- Current affairs integration is crucial
- Mental health is as important as academic preparation
- Quality resources over quantity

---

**Note:** These notes are generated from the YouTube video content. Regular revision and personal additions are recommended for better retention.`;
  };

  const saveNotes = () => {
    if (!generatedNotes.trim() || !videoInfo) {
      alert('No notes to save');
      return;
    }

    const newNote: SavedNote = {
      id: Date.now().toString(),
      title: videoInfo.title,
      content: generatedNotes,
      videoUrl: youtubeUrl,
      videoTitle: videoInfo.title,
      createdAt: new Date()
    };

    const updatedNotes = [...savedNotes, newNote];
    setSavedNotes(updatedNotes);
    localStorage.setItem('youtube-practice-notes', JSON.stringify(updatedNotes));
    alert('Notes saved successfully!');
  };

  const printNotes = () => {
    if (!generatedNotes.trim()) {
      alert('No notes to print');
      return;
    }

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>YouTube Notes - ${videoInfo?.title || 'UPSC Notes'}</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; }
              h1, h2, h3 { color: #333; }
              h1 { border-bottom: 2px solid #4318ff; padding-bottom: 10px; }
              h2 { color: #4318ff; margin-top: 30px; }
              h3 { color: #666; }
              ul, ol { margin-left: 20px; }
              blockquote { background: #f9f9f9; border-left: 4px solid #4318ff; padding: 10px; margin: 20px 0; }
              .meta { color: #666; font-size: 14px; margin-bottom: 20px; }
              @media print { body { margin: 20px; } }
            </style>
          </head>
          <body>
            <div class="meta">Generated on: ${new Date().toLocaleDateString()} | Source: YouTube</div>
            ${generatedNotes.replace(/\n/g, '<br>').replace(/### /g, '<h3>').replace(/## /g, '<h2>').replace(/# /g, '<h1>')}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const downloadNotes = () => {
    if (!generatedNotes.trim()) {
      alert('No notes to download');
      return;
    }

    const blob = new Blob([generatedNotes], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `youtube-notes-${videoInfo?.title.replace(/[^a-zA-Z0-9]/g, '-') || 'upsc-notes'}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const deleteSavedNote = (noteId: string) => {
    const updatedNotes = savedNotes.filter(note => note.id !== noteId);
    setSavedNotes(updatedNotes);
    localStorage.setItem('youtube-practice-notes', JSON.stringify(updatedNotes));
  };

  const resetForm = () => {
    setYoutubeUrl('');
    setVideoInfo(null);
    setGeneratedQuestions([]);
    setGeneratedNotes('');
    setQuestionCount(3);
    setDifficultyLevel('Mixed');
  };

  // Quiz functions (similar to MCQ Practice)
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
      startTime: new Date(),
      isReviewing: false
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
        showAnswer: quizState.isReviewing ? true : false
      }));
    }
  };

  const prevQuestion = () => {
    if (quizState.currentQuestionIndex > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
        showAnswer: quizState.isReviewing ? true : false
      }));
    }
  };

  const submitQuiz = () => {
    setQuizState(prev => ({ ...prev, isCompleted: true }));
  };

  const startReview = () => {
    setQuizState(prev => ({
      ...prev,
      currentQuestionIndex: 0,
      showAnswer: true,
      isReviewing: true,
      isCompleted: false
    }));
  };

  const exitQuiz = () => {
    setQuizMode(false);
    setQuizState({
      currentQuestionIndex: 0,
      selectedAnswers: {},
      showAnswer: false,
      timeElapsed: 0,
      isCompleted: false,
      startTime: null,
      isReviewing: false
    });
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
        unattemptedCount++;
      } else if (selectedAnswer === question.correctAnswer) {
        totalMarks += 2;
        correctCount++;
      } else {
        totalMarks -= 1/3;
        wrongCount++;
      }
    });

    return {
      totalMarks: Math.round(totalMarks * 100) / 100,
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
            YouTube Quiz Completed!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Great work! Here's your performance summary
          </p>

          {/* UPSC Marks Display */}
          <div className="bg-gradient-to-r from-brand-500 to-brand-600 rounded-xl p-6 mb-8 text-white">
            <h2 className="text-2xl font-bold mb-2">Total Marks Earned</h2>
            <div className="text-4xl font-bold mb-2">
              {marks.totalMarks} / {marks.maxPossibleMarks}
            </div>
            <p className="text-brand-100 text-sm">
              UPSC Marking Scheme: +2 for correct, -⅓ for wrong
            </p>
          </div>

          {/* Results Grid */}
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
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                {accuracy}%
              </div>
              <div className="text-sm text-purple-600/70 dark:text-purple-400/70">Accuracy</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={startReview}
              className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <FiEye className="h-4 w-4" />
              Review Questions & Answers
            </button>
            <button
              onClick={exitQuiz}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
            >
              Back to YouTube Practice
            </button>
            <button
              onClick={() => {
                setQuizState({
                  currentQuestionIndex: 0,
                  selectedAnswers: {},
                  showAnswer: false,
                  timeElapsed: 0,
                  isCompleted: false,
                  startTime: new Date(),
                  isReviewing: false
                });
              }}
              className="px-6 py-3 border border-brand-500 text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <FiRefreshCw className="h-4 w-4" />
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
        {/* Quiz Header */}
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
                  <FiYoutube className="h-5 w-5 text-red-500" />
                  <span className="font-medium text-navy-700 dark:text-white">
                    {quizState.isReviewing ? 'Review' : 'Question'} {quizState.currentQuestionIndex + 1} of {generatedQuestions.length}
                  </span>
                </div>
                {quizState.isReviewing && (
                  <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                    Review Mode
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                {!quizState.isReviewing && (
                  <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-xl">
                    <MdTimer className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="font-mono text-blue-600 dark:text-blue-400 font-medium">
                      {formatTime(quizState.timeElapsed)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Quiz Content */}
        <div className="flex-1 px-4 pb-4 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <Card extra="p-8 rounded-xl">
              {/* Question Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-1 rounded-full flex items-center gap-1">
                    <FiYoutube className="h-3 w-3" />
                    YouTube
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
              {selectedAnswer !== undefined && !quizState.showAnswer && !quizState.isReviewing && (
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
                  {quizState.isReviewing ? (
                    quizState.currentQuestionIndex === generatedQuestions.length - 1 ? (
                      <button
                        onClick={exitQuiz}
                        className="px-6 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-medium transition-colors"
                      >
                        Finish Review
                      </button>
                    ) : (
                      <button
                        onClick={nextQuestion}
                        className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors"
                      >
                        Next
                        <FiArrowRight className="h-4 w-4" />
                      </button>
                    )
                  ) : (
                    quizState.currentQuestionIndex === generatedQuestions.length - 1 ? (
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
                    )
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Saved Notes Modal
  if (showSavedNotes) {
    return (
      <div className="min-h-screen p-4">
        <Card extra="w-full max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-navy-700 dark:text-white flex items-center gap-2">
              <MdNotes className="h-6 w-6 text-brand-500" />
              Saved Notes ({savedNotes.length})
            </h1>
            <button
              onClick={() => setShowSavedNotes(false)}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-brand-500 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FiArrowLeft className="h-4 w-4" />
              Back
            </button>
          </div>

          {savedNotes.length === 0 ? (
            <div className="text-center py-12">
              <MdNotes className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                No saved notes yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Generate notes from YouTube videos to see them here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedNotes.map((note) => (
                <div key={note.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-navy-700 dark:text-white mb-1">
                        {note.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Created: {note.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setGeneratedNotes(note.content);
                          setVideoInfo({ title: note.videoTitle, duration: '', channel: '', description: '' });
                          setYoutubeUrl(note.videoUrl);
                          setShowSavedNotes(false);
                        }}
                        className="text-brand-500 hover:text-brand-600 p-1"
                        title="Load Note"
                      >
                        <FiEdit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteSavedNote(note.id)}
                        className="text-red-500 hover:text-red-600 p-1"
                        title="Delete Note"
                      >
                        <MdClose className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 max-h-32 overflow-y-auto text-sm">
                    <pre className="whitespace-pre-wrap font-sans text-gray-700 dark:text-gray-300">
                      {note.content.substring(0, 200)}...
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    );
  }

  // Main Interface
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card extra="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center">
              <FiYoutube className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-navy-700 dark:text-white">
                YouTube Practice
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Generate MCQ questions or create notes from YouTube videos
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setShowSavedNotes(true)}
            className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <MdNotes className="h-4 w-4" />
            Saved Notes ({savedNotes.length})
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-lg font-bold text-red-600 dark:text-red-400">AI-Powered</p>
            <p className="text-xs text-red-600/70 dark:text-red-400/70">Processing</p>
          </div>
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">MCQ + Notes</p>
            <p className="text-xs text-blue-600/70 dark:text-blue-400/70">Dual Mode</p>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-lg font-bold text-green-600 dark:text-green-400">Save & Print</p>
            <p className="text-xs text-green-600/70 dark:text-green-400/70">Export Options</p>
          </div>
        </div>
      </Card>

      {/* Feature Selection & URL Input - Only show when no content generated */}
      {!videoInfo && (
        <Card extra="p-6">
          <h2 className="text-lg font-semibold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
            <MdOndemandVideo className="h-4 w-4" />
            YouTube Video Processing
          </h2>

          {/* Feature Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Choose Feature Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setFeatureType('mcq')}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  featureType === 'mcq'
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-brand-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <MdQuiz className={`h-5 w-5 ${featureType === 'mcq' ? 'text-brand-500' : 'text-gray-500'}`} />
                  <span className={`font-medium ${featureType === 'mcq' ? 'text-brand-700 dark:text-brand-300' : 'text-gray-700 dark:text-gray-300'}`}>
                    Generate MCQ Questions
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Create practice questions from video content with UPSC marking scheme
                </p>
              </button>

              <button
                onClick={() => setFeatureType('notes')}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  featureType === 'notes'
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-brand-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <FiFileText className={`h-5 w-5 ${featureType === 'notes' ? 'text-brand-500' : 'text-gray-500'}`} />
                  <span className={`font-medium ${featureType === 'notes' ? 'text-brand-700 dark:text-brand-300' : 'text-gray-700 dark:text-gray-300'}`}>
                    Create Study Notes
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Generate structured notes that you can save, edit, and print
                </p>
              </button>
            </div>
          </div>

          {/* YouTube URL Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              YouTube Video URL
            </label>
            <div className="relative">
              <FiLink className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="Paste YouTube URL here (e.g., https://youtube.com/watch?v=...)"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-navy-800 text-navy-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
            </div>
            
            {/* Sample URLs */}
            <div className="mt-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Sample formats:</p>
              <div className="flex flex-wrap gap-2">
                {sampleUrls.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => setYoutubeUrl(url)}
                    className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-brand-100 dark:hover:bg-brand-900/30 hover:text-brand-600 dark:hover:text-brand-300 transition-colors"
                  >
                    {url.length > 30 ? url.substring(0, 30) + '...' : url}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Settings for MCQ Mode */}
          {featureType === 'mcq' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Question Count */}
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

              {/* Difficulty Level */}
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
              </div>
            </div>
          )}

          {/* Process Button */}
          <div className="flex gap-3">
            <button
              onClick={processYouTubeVideo}
              disabled={isProcessing || !youtubeUrl.trim()}
              className="flex-1 flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing Video...
                </>
              ) : (
                <>
                  <FiYoutube className="h-4 w-4" />
                  {featureType === 'mcq' 
                    ? `Generate ${questionCount} Question${questionCount > 1 ? 's' : ''} (${difficultyLevel})`
                    : 'Generate Study Notes'
                  }
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

      {/* Video Info Display */}
      {videoInfo && (
        <Card extra="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-navy-700 dark:text-white flex items-center gap-2">
              <FiYoutube className="h-5 w-5 text-red-500" />
              Video Information
            </h2>
            <button
              onClick={resetForm}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-brand-500 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <MdClose className="h-4 w-4" />
              Process New Video
            </button>
          </div>

          <div className="bg-gray-50 dark:bg-navy-800 rounded-xl p-4">
            <h3 className="font-semibold text-navy-700 dark:text-white mb-2">{videoInfo.title}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div>
                <span className="font-medium">Channel:</span> {videoInfo.channel}
              </div>
              <div>
                <span className="font-medium">Duration:</span> {videoInfo.duration}
              </div>
              <div>
                <span className="font-medium">Feature:</span> {featureType === 'mcq' ? 'MCQ Questions' : 'Study Notes'}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Action Buttons for MCQ */}
      {generatedQuestions.length > 0 && !quizMode && (
        <Card extra="p-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={startQuiz}
              className="flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <MdQuiz className="h-4 w-4" />
              Start Quiz ({generatedQuestions.length} Questions)
            </button>
            
            <button
              onClick={resetForm}
              className="flex items-center justify-center gap-2 border border-brand-500 text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <FiYoutube className="h-4 w-4" />
              Process Another Video
            </button>
          </div>
        </Card>
      )}

      {/* Generated Questions Preview */}
      {generatedQuestions.length > 0 && !quizMode && (
        <Card extra="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-navy-700 dark:text-white">
              Generated Questions ({generatedQuestions.length})
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FiYoutube className="h-4 w-4 text-red-500" />
              From YouTube • {difficultyLevel} Level
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
                    <span className="w-8 h-8 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-1 rounded-full flex items-center gap-1">
                          <FiYoutube className="h-3 w-3" />
                          YouTube
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

      {/* Generated Notes Display */}
      {generatedNotes && !quizMode && (
        <Card extra="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-navy-700 dark:text-white flex items-center gap-2">
              <MdNotes className="h-5 w-5 text-brand-500" />
              Generated Notes
            </h2>
            <div className="flex gap-2">
              <button
                onClick={saveNotes}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                <FiSave className="h-4 w-4" />
                Save
              </button>
              <button
                onClick={printNotes}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                <FiPrinter className="h-4 w-4" />
                Print
              </button>
              <button
                onClick={downloadNotes}
                className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                <FiDownload className="h-4 w-4" />
                Download
              </button>
            </div>
          </div>

          {/* Editable Notes */}
          <div className="bg-gray-50 dark:bg-navy-800 rounded-xl p-4">
            <textarea
              value={generatedNotes}
              onChange={(e) => setGeneratedNotes(e.target.value)}
              className="w-full h-96 bg-transparent border-0 resize-none focus:outline-none text-navy-700 dark:text-white font-mono text-sm leading-relaxed"
              placeholder="Your notes will appear here..."
            />
          </div>

          <div className="mt-4 flex justify-center">
            <button
              onClick={resetForm}
              className="flex items-center gap-2 border border-brand-500 text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <FiYoutube className="h-4 w-4" />
              Process Another Video
            </button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default YouTubePracticePage;