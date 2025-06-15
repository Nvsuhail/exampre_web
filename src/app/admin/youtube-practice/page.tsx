'use client';
import { useState, useEffect } from 'react';
import Card from 'components/card';
import { FiSearch, FiPlay, FiEdit3, FiSave, FiDownload, FiPrinter, FiClock, FiCheck, FiX, FiArrowLeft, FiArrowRight, FiEye, FiRefreshCw, FiTrash2, FiFileText } from 'react-icons/fi';
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

interface SavedNote {
  id: string;
  title: string;
  content: string;
  videoUrl: string;
  createdAt: Date;
}

type ModeType = 'mcq' | 'notes';
type DifficultyLevel = 'Easy' | 'Medium' | 'Hard' | 'Mixed';

const YouTubePracticePage = () => {
  const [mode, setMode] = useState<ModeType>('mcq');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [questionCount, setQuestionCount] = useState(3);
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>('Mixed');
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [generatedNotes, setGeneratedNotes] = useState('');
  const [editableNotes, setEditableNotes] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizMode, setQuizMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [savedNotes, setSavedNotes] = useState<SavedNote[]>([]);
  const [showSavedNotes, setShowSavedNotes] = useState(false);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    selectedAnswers: {},
    showAnswer: false,
    timeElapsed: 0,
    isCompleted: false,
    startTime: null,
    isReviewing: false
  });

  const questionCounts = [1, 2, 3, 4, 5];
  const difficultyLevels: DifficultyLevel[] = ['Easy', 'Medium', 'Hard', 'Mixed'];

  const sampleUrls = [
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://youtu.be/dQw4w9WgXcQ',
    'https://www.youtube.com/watch?v=example123'
  ];

  // Load saved notes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('youtube-practice-notes');
    if (saved) {
      setSavedNotes(JSON.parse(saved));
    }
  }, []);

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

  const isValidYouTubeUrl = (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return youtubeRegex.test(url);
  };

  const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : 'dQw4w9WgXcQ';
  };

  const getVideoTitle = (url: string) => {
    // Simulate getting video title
    const titles = [
      'Understanding Indian Constitution - Complete Guide',
      'UPSC Current Affairs 2024 - Important Topics',
      'Geography for UPSC - Physical Features of India',
      'Economics Simplified - GDP, Inflation & More',
      'History of India - Ancient to Modern Period'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const generateContent = async () => {
    if (!youtubeUrl.trim()) {
      alert('Please enter a YouTube URL');
      return;
    }

    if (!isValidYouTubeUrl(youtubeUrl)) {
      alert('Please enter a valid YouTube URL');
      return;
    }

    setIsGenerating(true);

    // Simulate AI processing
    setTimeout(() => {
      const videoTitle = getVideoTitle(youtubeUrl);
      
      if (mode === 'mcq') {
        const questions = generateSampleQuestions(videoTitle, questionCount, difficultyLevel);
        setGeneratedQuestions(questions);
      } else {
        const notes = generateSampleNotes(videoTitle);
        setGeneratedNotes(notes);
        setEditableNotes(notes);
      }
      
      setIsGenerating(false);
    }, 3000);
  };

  const generateSampleQuestions = (videoTitle: string, count: number, difficulty: DifficultyLevel): Question[] => {
    const questionTemplates = {
      Easy: [
        {
          question: `Based on the video "${videoTitle}", which of the following is a key concept discussed?`,
          options: ['Democratic principles', 'Authoritarian rule', 'Monarchy system', 'Tribal governance'],
          correctAnswer: 0,
          explanation: `The video "${videoTitle}" emphasizes democratic principles as a fundamental concept in governance and administration.`,
          difficulty: 'Easy' as const
        }
      ],
      Medium: [
        {
          question: `According to the video "${videoTitle}", what is the most significant implication of the discussed topic?`,
          options: ['Short-term policy changes', 'Long-term structural reforms', 'Temporary adjustments', 'Minor modifications'],
          correctAnswer: 1,
          explanation: `The video "${videoTitle}" highlights the importance of long-term structural reforms for sustainable development.`,
          difficulty: 'Medium' as const
        }
      ],
      Hard: [
        {
          question: `Analyze the complex relationship discussed in "${videoTitle}" between policy implementation and outcomes:`,
          options: ['Direct correlation exists', 'Multiple variables influence outcomes', 'No significant relationship', 'Inverse relationship only'],
          correctAnswer: 1,
          explanation: `The video "${videoTitle}" demonstrates that multiple variables and factors influence policy outcomes, making implementation complex.`,
          difficulty: 'Hard' as const
        }
      ]
    };

    const getQuestionsForDifficulty = (targetDifficulty: DifficultyLevel) => {
      if (targetDifficulty === 'Mixed') {
        return [...questionTemplates.Easy, ...questionTemplates.Medium, ...questionTemplates.Hard];
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
        source: `YouTube: ${videoTitle}`
      };
    });
  };

  const generateSampleNotes = (videoTitle: string): string => {
    return `# ${videoTitle}

## 📹 Video Summary
This comprehensive video covers essential concepts for UPSC preparation, providing detailed insights into key topics and their practical applications.

## 🎯 Key Learning Objectives
- **Understanding Core Concepts**: Grasp fundamental principles and their significance
- **Practical Applications**: Learn how theoretical knowledge applies to real-world scenarios  
- **Exam Perspective**: Focus on UPSC-relevant aspects and question patterns
- **Current Relevance**: Connect topics to contemporary issues and developments

## 📚 Main Topics Covered

### 1. Introduction and Context
- **Historical Background**: Evolution of the subject matter over time
- **Current Significance**: Why this topic is crucial for UPSC aspirants
- **Scope of Study**: Areas covered and their interconnections

### 2. Core Concepts and Principles

#### 2.1 Fundamental Definitions
- **Primary Concepts**: Basic terminology and definitions
- **Key Characteristics**: Essential features and attributes
- **Classification**: Different types and categories

#### 2.2 Theoretical Framework
- **Underlying Principles**: Foundational theories and concepts
- **Conceptual Models**: Frameworks for understanding
- **Analytical Approaches**: Methods of analysis and evaluation

### 3. Practical Applications

#### 3.1 Real-World Examples
- **Case Studies**: Specific instances and their analysis
- **Success Stories**: Positive outcomes and best practices
- **Challenges**: Common problems and their solutions

#### 3.2 Policy Implications
- **Government Initiatives**: Relevant policies and programs
- **Implementation Strategies**: How concepts are applied in practice
- **Monitoring and Evaluation**: Assessment mechanisms and outcomes

### 4. UPSC Examination Perspective

#### 4.1 Syllabus Relevance
- **Prelims Connection**: How this topic appears in preliminary examination
- **Mains Application**: Essay and answer writing opportunities
- **Interview Preparation**: Potential questions and discussion points

#### 4.2 Question Patterns
- **Factual Questions**: Direct knowledge-based queries
- **Analytical Questions**: Application and analysis-based problems
- **Current Affairs Integration**: Linking with recent developments

## 🔍 Important Facts and Figures

### Statistical Data
- **Key Numbers**: Important statistics and their significance
- **Trends**: Historical patterns and future projections
- **Comparative Analysis**: Benchmarking with other regions/countries

### Constitutional Provisions
- **Relevant Articles**: Constitutional references and provisions
- **Legal Framework**: Laws and regulations governing the subject
- **Judicial Interpretations**: Important court decisions and their impact

## 🌟 Key Takeaways

### For Prelims Preparation
1. **Factual Knowledge**: Memorize important dates, names, and statistics
2. **Conceptual Clarity**: Understand basic principles and their applications
3. **Current Affairs**: Stay updated with recent developments and news

### For Mains Preparation
1. **Analytical Skills**: Develop ability to analyze and evaluate concepts
2. **Answer Writing**: Practice structured responses with examples
3. **Interdisciplinary Approach**: Connect with other subjects and topics

### For Interview Preparation
1. **Opinion Formation**: Develop informed views on contemporary issues
2. **Practical Knowledge**: Understand real-world applications and challenges
3. **Communication Skills**: Practice articulating complex ideas clearly

## 📖 Recommended Further Reading

### Books and Publications
- **Standard Textbooks**: Authoritative sources for detailed study
- **Government Reports**: Official documents and policy papers
- **Research Papers**: Academic studies and analysis

### Online Resources
- **Official Websites**: Government portals and databases
- **News Sources**: Reliable media outlets for current affairs
- **Educational Platforms**: Online courses and study materials

## 🎯 Practice Questions

### Multiple Choice Questions
1. What is the primary significance of the discussed concept?
2. Which of the following best describes the current status?
3. What are the main challenges in implementation?

### Descriptive Questions
1. Analyze the impact of recent policy changes on the subject matter
2. Discuss the role of various stakeholders in effective implementation
3. Evaluate the success and limitations of current approaches

## 💡 Tips for Effective Study

### Study Strategy
- **Regular Revision**: Schedule periodic review sessions
- **Note Making**: Create concise summaries and mind maps
- **Practice Tests**: Attempt mock questions regularly

### Memory Techniques
- **Mnemonics**: Use memory aids for complex information
- **Visual Learning**: Create diagrams and flowcharts
- **Association**: Link new concepts with familiar ideas

## 🔗 Cross-References

### Related Topics
- **Connected Subjects**: Other areas of study that complement this topic
- **Interdisciplinary Links**: Connections with different disciplines
- **Current Affairs**: Recent events and developments

### Examination Strategy
- **Time Management**: Allocate appropriate time for different sections
- **Answer Structure**: Follow proper format and presentation
- **Revision Plan**: Create systematic review schedule

---

## 📝 Personal Notes Section
*Use this space to add your own insights, questions, and additional points*

### My Key Insights
- 
- 
- 

### Questions for Further Research
- 
- 
- 

### Additional Examples
- 
- 
- 

---

**Note**: These notes are generated from the YouTube video "${videoTitle}". Please verify facts and cross-reference with standard UPSC preparation materials for comprehensive understanding.

**Last Updated**: ${new Date().toLocaleDateString()}  
**Source**: YouTube Video Analysis  
**Preparation Level**: Comprehensive UPSC Coverage`;
  };

  const saveNotes = () => {
    if (!editableNotes.trim()) {
      alert('No notes to save');
      return;
    }

    const newNote: SavedNote = {
      id: Date.now().toString(),
      title: getVideoTitle(youtubeUrl),
      content: editableNotes,
      videoUrl: youtubeUrl,
      createdAt: new Date()
    };

    const updatedNotes = [...savedNotes, newNote];
    setSavedNotes(updatedNotes);
    localStorage.setItem('youtube-practice-notes', JSON.stringify(updatedNotes));
    
    alert('Notes saved successfully!');
  };

  const downloadNotes = () => {
    if (!editableNotes.trim()) {
      alert('No notes to download');
      return;
    }

    const blob = new Blob([editableNotes], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${getVideoTitle(youtubeUrl).replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const printNotes = () => {
    if (!editableNotes.trim()) {
      alert('No notes to print');
      return;
    }

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${getVideoTitle(youtubeUrl)} - Notes</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; }
              h1, h2, h3 { color: #333; }
              h1 { border-bottom: 2px solid #4318FF; padding-bottom: 10px; }
              h2 { border-bottom: 1px solid #ddd; padding-bottom: 5px; }
              ul, ol { margin-left: 20px; }
              blockquote { border-left: 4px solid #4318FF; padding-left: 20px; margin: 20px 0; }
              code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
              pre { background: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto; }
              @media print { body { margin: 20px; } }
            </style>
          </head>
          <body>
            <div>${editableNotes.replace(/\n/g, '<br>').replace(/#{1,6}\s(.+)/g, '<h$1>$2</h$1>')}</div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const deleteSavedNote = (noteId: string) => {
    const updatedNotes = savedNotes.filter(note => note.id !== noteId);
    setSavedNotes(updatedNotes);
    localStorage.setItem('youtube-practice-notes', JSON.stringify(updatedNotes));
  };

  const loadSavedNote = (note: SavedNote) => {
    setYoutubeUrl(note.videoUrl);
    setGeneratedNotes(note.content);
    setEditableNotes(note.content);
    setMode('notes');
    setShowSavedNotes(false);
  };

  const resetForm = () => {
    setYoutubeUrl('');
    setGeneratedQuestions([]);
    setGeneratedNotes('');
    setEditableNotes('');
    setQuestionCount(3);
    setDifficultyLevel('Mixed');
    setIsEditing(false);
  };

  // Render markdown content with proper styling
  const renderMarkdown = (content: string) => {
    return content.split('\n').map((line, index) => {
      // Headers
      if (line.startsWith('# ')) {
        return (
          <h1 key={index} className="text-3xl font-bold text-navy-700 dark:text-white mb-6 pb-3 border-b-2 border-brand-500">
            {line.substring(2)}
          </h1>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-semibold text-navy-700 dark:text-white mb-4 mt-8 pb-2 border-b border-gray-200 dark:border-gray-700">
            {line.substring(3)}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-semibold text-navy-700 dark:text-white mb-3 mt-6">
            {line.substring(4)}
          </h3>
        );
      }
      if (line.startsWith('#### ')) {
        return (
          <h4 key={index} className="text-lg font-medium text-navy-700 dark:text-white mb-2 mt-4">
            {line.substring(5)}
          </h4>
        );
      }

      // Bold text
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <p key={index} className="mb-3 text-gray-700 dark:text-gray-300 leading-relaxed">
            {parts.map((part, i) => 
              i % 2 === 1 ? <strong key={i} className="font-semibold text-navy-700 dark:text-white">{part}</strong> : part
            )}
          </p>
        );
      }

      // Lists
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="mb-2 text-gray-700 dark:text-gray-300 ml-6 list-disc">
            {line.substring(2)}
          </li>
        );
      }
      if (/^\d+\.\s/.test(line)) {
        return (
          <li key={index} className="mb-2 text-gray-700 dark:text-gray-300 ml-6 list-decimal">
            {line.replace(/^\d+\.\s/, '')}
          </li>
        );
      }

      // Horizontal rule
      if (line.trim() === '---') {
        return <hr key={index} className="my-8 border-gray-200 dark:border-gray-700" />;
      }

      // Empty lines
      if (line.trim() === '') {
        return <div key={index} className="mb-2"></div>;
      }

      // Regular paragraphs
      return (
        <p key={index} className="mb-3 text-gray-700 dark:text-gray-300 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  // Quiz components (same as before)
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

  // Quiz Results Component (same as MCQ practice)
  if (quizMode && quizState.isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card extra="w-full max-w-3xl p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck className="h-10 w-10 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-navy-700 dark:text-white mb-2">
            YouTube Practice Completed!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Great work! Here's your performance summary
          </p>

          {/* UPSC Marks Display */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 mb-8 text-white">
            <h2 className="text-2xl font-bold mb-2">Total Marks Earned</h2>
            <div className="text-4xl font-bold mb-2">
              {marks.totalMarks} / {marks.maxPossibleMarks}
            </div>
            <p className="text-red-100 text-sm">
              UPSC Marking: +2 correct, -⅓ wrong
            </p>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                {marks.correctCount}
              </div>
              <div className="text-sm text-green-600/70 dark:text-green-400/70">Correct</div>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
                {marks.wrongCount}
              </div>
              <div className="text-sm text-red-600/70 dark:text-red-400/70">Wrong</div>
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
              Back to Generator
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

  // Quiz Mode Component (same as MCQ practice)
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
                  <MdOndemandVideo className="h-5 w-5 text-red-500" />
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
                  <span className="text-xs bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-1 rounded-full">
                    YouTube Generated
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
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card extra="w-full max-w-4xl max-h-[80vh] overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-navy-700 dark:text-white flex items-center gap-2">
                <FiFileText className="h-5 w-5" />
                Saved Notes ({savedNotes.length})
              </h2>
              <button
                onClick={() => setShowSavedNotes(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <MdClose className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {savedNotes.length === 0 ? (
              <div className="text-center py-8">
                <FiFileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No saved notes yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {savedNotes.map((note) => (
                  <div
                    key={note.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-navy-700 dark:text-white mb-2">
                          {note.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Created: {note.createdAt.toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                          {note.videoUrl}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => loadSavedNote(note)}
                          className="px-3 py-1 bg-brand-500 hover:bg-brand-600 text-white rounded text-sm transition-colors"
                        >
                          Load
                        </button>
                        <button
                          onClick={() => deleteSavedNote(note.id)}
                          className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  }

  // Main Interface
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card extra="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center">
            <MdOndemandVideo className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy-700 dark:text-white">
              YouTube Practice
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Generate MCQ questions and study notes from YouTube videos
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-lg font-bold text-red-600 dark:text-red-400">AI-Powered</p>
            <p className="text-xs text-red-600/70 dark:text-red-400/70">Analysis</p>
          </div>
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">Dual Mode</p>
            <p className="text-xs text-blue-600/70 dark:text-blue-400/70">MCQ + Notes</p>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-lg font-bold text-green-600 dark:text-green-400">{savedNotes.length}</p>
            <p className="text-xs text-green-600/70 dark:text-green-400/70">Saved Notes</p>
          </div>
        </div>
      </Card>

      {/* Generator Form - Only show when no content generated */}
      {generatedQuestions.length === 0 && generatedNotes === '' && (
        <Card extra="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-navy-700 dark:text-white mb-4 flex items-center gap-2">
              <MdOndemandVideo className="h-4 w-4" />
              Generate from YouTube Video
            </h2>
            
            {savedNotes.length > 0 && (
              <button
                onClick={() => setShowSavedNotes(true)}
                className="flex items-center gap-2 text-brand-500 hover:text-brand-600 text-sm font-medium"
              >
                <FiFileText className="h-4 w-4" />
                View Saved Notes ({savedNotes.length})
              </button>
            )}
          </div>

          {/* Mode Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Choose Generation Mode
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <button
                onClick={() => setMode('mcq')}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  mode === 'mcq'
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-brand-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <MdQuiz className={`h-5 w-5 ${mode === 'mcq' ? 'text-brand-500' : 'text-gray-500'}`} />
                  <span className={`font-medium ${mode === 'mcq' ? 'text-brand-700 dark:text-brand-300' : 'text-gray-700 dark:text-gray-300'}`}>
                    MCQ Questions
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Generate practice questions with UPSC marking scheme
                </p>
              </button>

              <button
                onClick={() => setMode('notes')}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  mode === 'notes'
                    ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-brand-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <MdNotes className={`h-5 w-5 ${mode === 'notes' ? 'text-brand-500' : 'text-gray-500'}`} />
                  <span className={`font-medium ${mode === 'notes' ? 'text-brand-700 dark:text-brand-300' : 'text-gray-700 dark:text-gray-300'}`}>
                    Study Notes
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Create comprehensive study notes from video content
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
              <FiPlay className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-red-500" />
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="Paste YouTube video URL here..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-navy-800 text-navy-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
              />
            </div>
            
            {/* Sample URLs */}
            <div className="mt-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Sample URLs:</p>
              <div className="flex flex-wrap gap-2">
                {sampleUrls.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => setYoutubeUrl(url)}
                    className="text-xs px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors border border-red-200 dark:border-red-800"
                  >
                    Sample {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* MCQ Settings - Only show for MCQ mode */}
          {mode === 'mcq' && (
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

          {/* Generate Button */}
          <div className="flex gap-3">
            <button
              onClick={generateContent}
              disabled={isGenerating}
              className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Analyzing Video...
                </>
              ) : (
                <>
                  <MdOndemandVideo className="h-4 w-4" />
                  Generate {mode === 'mcq' ? `${questionCount} Questions` : 'Study Notes'}
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

      {/* Action Buttons - Only shown when content is generated */}
      {(generatedQuestions.length > 0 || generatedNotes !== '') && !quizMode && (
        <Card extra="p-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {generatedQuestions.length > 0 && (
              <button
                onClick={startQuiz}
                className="flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <MdQuiz className="h-4 w-4" />
                Start Quiz ({generatedQuestions.length} Questions)
              </button>
            )}
            
            {generatedNotes !== '' && (
              <>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <FiEdit3 className="h-4 w-4" />
                  {isEditing ? 'View Notes' : 'Edit Notes'}
                </button>
                
                <button
                  onClick={saveNotes}
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <FiSave className="h-4 w-4" />
                  Save Notes
                </button>
                
                <button
                  onClick={downloadNotes}
                  className="flex items-center justify-center gap-2 border border-brand-500 text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <FiDownload className="h-4 w-4" />
                  Download
                </button>
                
                <button
                  onClick={printNotes}
                  className="flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  <FiPrinter className="h-4 w-4" />
                  Print
                </button>
              </>
            )}
            
            <button
              onClick={() => {
                setGeneratedQuestions([]);
                setGeneratedNotes('');
                setEditableNotes('');
                resetForm();
              }}
              className="flex items-center justify-center gap-2 border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <FiRefreshCw className="h-4 w-4" />
              Generate New Content
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
              <MdOndemandVideo className="h-4 w-4 text-red-500" />
              YouTube Generated • {difficultyLevel} Level
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
                        <span className="text-xs bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-1 rounded-full">
                          YouTube Generated
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

      {/* Generated Notes Display */}
      {generatedNotes !== '' && !quizMode && (
        <Card extra="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-navy-700 dark:text-white flex items-center gap-2">
              <MdNotes className="h-5 w-5" />
              Generated Study Notes
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <MdOndemandVideo className="h-4 w-4 text-red-500" />
              YouTube Generated
            </div>
          </div>

          {isEditing ? (
            <div>
              <textarea
                value={editableNotes}
                onChange={(e) => setEditableNotes(e.target.value)}
                className="w-full h-96 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-navy-800 text-navy-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 resize-none font-mono text-sm"
                placeholder="Edit your notes here..."
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                You can edit the notes in markdown format. Changes will be reflected in the preview.
              </p>
            </div>
          ) : (
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <div className="bg-gray-50 dark:bg-navy-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="space-y-4">
                  {renderMarkdown(editableNotes)}
                </div>
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default YouTubePracticePage;