'use client';
import { useState, useRef, useEffect } from 'react';
import Card from 'components/card';
import { FiSend, FiUser, FiClock, FiBookOpen, FiTarget, FiTrendingUp } from 'react-icons/fi';
import { MdClear, MdHistory, MdLightbulb, MdOutlineRobot } from 'react-icons/md';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  messages: Message[];
}

const AIMentorPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI UPSC Mentor. I'm here to help you with your preparation strategy, answer questions about the syllabus, provide study tips, and guide you through your UPSC journey. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    {
      id: '1',
      title: 'Study Strategy Discussion',
      lastMessage: 'How should I plan my daily study schedule?',
      timestamp: new Date(Date.now() - 86400000),
      messages: []
    },
    {
      id: '2',
      title: 'Current Affairs Guidance',
      lastMessage: 'Best sources for current affairs?',
      timestamp: new Date(Date.now() - 172800000),
      messages: []
    },
    {
      id: '3',
      title: 'Mock Test Analysis',
      lastMessage: 'How to improve my mock test scores?',
      timestamp: new Date(Date.now() - 259200000),
      messages: []
    }
  ]);
  
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const suggestedPrompts = [
    {
      text: "Create a 6-month study plan for UPSC Prelims",
      icon: <FiTarget className="h-4 w-4" />,
      category: "Planning"
    },
    {
      text: "How to improve my answer writing for Mains?",
      icon: <FiBookOpen className="h-4 w-4" />,
      category: "Mains"
    },
    {
      text: "Best strategy for current affairs preparation",
      icon: <FiTrendingUp className="h-4 w-4" />,
      category: "Current Affairs"
    },
    {
      text: "How to manage time during Prelims exam?",
      icon: <FiClock className="h-4 w-4" />,
      category: "Strategy"
    },
    {
      text: "Revision techniques for better retention",
      icon: <MdLightbulb className="h-4 w-4" />,
      category: "Study Tips"
    },
    {
      text: "How to stay motivated during preparation?",
      icon: <FiUser className="h-4 w-4" />,
      category: "Motivation"
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputText),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('study plan') || input.includes('schedule')) {
      return "Here's a comprehensive study plan approach:\n\n1. **Foundation Phase (2-3 months)**: Complete NCERT books (6th-12th) for all subjects\n2. **Building Phase (2-3 months)**: Standard reference books + current affairs\n3. **Practice Phase (1-2 months)**: Mock tests + previous year questions\n4. **Revision Phase (1 month)**: Intensive revision + final practice\n\nDaily Schedule:\n- Morning (4-6 hours): Core subjects\n- Afternoon (2-3 hours): Current affairs + newspaper\n- Evening (2-3 hours): Revision + practice questions\n\nWould you like me to customize this plan based on your current preparation level?";
    }
    
    if (input.includes('current affairs')) {
      return "For effective current affairs preparation:\n\n**Daily Sources:**\n- The Hindu newspaper (editorial + important news)\n- PIB releases for government schemes\n- Rajya Sabha TV discussions\n\n**Monthly Sources:**\n- Yojana magazine\n- Kurukshetra magazine\n- Economic Survey highlights\n\n**Tips:**\n- Make daily notes (2-3 pages max)\n- Link current events to static portions\n- Focus on government policies and international relations\n- Practice current affairs MCQs weekly\n\nShall I help you create a current affairs tracking system?";
    }
    
    if (input.includes('answer writing') || input.includes('mains')) {
      return "Answer writing strategy for UPSC Mains:\n\n**Structure:**\n1. Introduction (10-15% of word limit)\n2. Body with multiple dimensions (70-80%)\n3. Conclusion with way forward (10-15%)\n\n**Key Techniques:**\n- Use keywords and technical terms\n- Include diagrams, flowcharts where relevant\n- Provide examples and case studies\n- Balance between breadth and depth\n\n**Practice Routine:**\n- Write 2-3 answers daily\n- Time yourself (1.5 minutes per mark)\n- Get feedback from mentors/peers\n- Analyze model answers\n\nWould you like specific guidance for any particular paper?";
    }
    
    if (input.includes('motivation') || input.includes('stress')) {
      return "Staying motivated during UPSC preparation:\n\n**Mental Strategies:**\n- Set small, achievable daily goals\n- Celebrate small victories\n- Connect with fellow aspirants\n- Remember your 'why' - your purpose\n\n**Practical Tips:**\n- Take regular breaks (Pomodoro technique)\n- Exercise daily (even 30 minutes)\n- Maintain work-life balance\n- Practice meditation/mindfulness\n\n**When feeling low:**\n- Read success stories\n- Talk to mentors or friends\n- Take a day off if needed\n- Revisit your goals and dreams\n\nRemember: UPSC is a marathon, not a sprint. Consistency beats intensity. You've got this! 💪";
    }
    
    return "Thank you for your question! As your AI mentor, I'm here to provide personalized guidance for your UPSC preparation. Could you please provide more specific details about your query? For example:\n\n- Your current preparation stage\n- Specific subjects you're struggling with\n- Your target exam year\n- Any particular challenges you're facing\n\nThis will help me give you more targeted and useful advice. Feel free to ask about study strategies, time management, subject-specific guidance, or any other aspect of UPSC preparation!";
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInputText(prompt);
    textareaRef.current?.focus();
  };

  const startNewChat = () => {
    if (messages.length > 1) {
      // Save current chat to history
      const newChat: ChatHistory = {
        id: Date.now().toString(),
        title: messages[1]?.text.substring(0, 50) + '...' || 'New Chat',
        lastMessage: messages[messages.length - 1]?.text.substring(0, 100) + '...' || '',
        timestamp: new Date(),
        messages: [...messages]
      };
      setChatHistory(prev => [newChat, ...prev]);
    }
    
    setMessages([{
      id: '1',
      text: "Hello! I'm your AI UPSC Mentor. How can I assist you today?",
      sender: 'ai',
      timestamp: new Date()
    }]);
    setCurrentChatId(null);
  };

  const loadChatHistory = (chat: ChatHistory) => {
    setMessages(chat.messages);
    setCurrentChatId(chat.id);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex h-[calc(100vh-120px)] gap-6">
      {/* Chat History Sidebar */}
      <div className="w-80 flex-shrink-0">
        <Card extra="h-full p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-navy-700 dark:text-white flex items-center gap-2">
              <MdHistory className="h-5 w-5 text-brand-500" />
              Chat History
            </h3>
            <button
              onClick={startNewChat}
              className="bg-brand-500 hover:bg-brand-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200"
            >
              New Chat
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {chatHistory.map((chat) => (
              <div
                key={chat.id}
                onClick={() => loadChatHistory(chat)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                  currentChatId === chat.id
                    ? 'bg-brand-50 dark:bg-brand-900/20 border-brand-200 dark:border-brand-700'
                    : 'bg-gray-50 dark:bg-navy-800 border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-navy-700'
                }`}
              >
                <h4 className="font-semibold text-navy-700 dark:text-white text-sm mb-2 line-clamp-2">
                  {chat.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                  {chat.lastMessage}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {formatTime(chat.timestamp)}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col">
        <Card extra="flex-1 flex flex-col p-6">
          {/* Chat Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center">
                <MdOutlineRobot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-navy-700 dark:text-white">
                  AI UPSC Mentor
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your personal guide for UPSC preparation
                </p>
              </div>
            </div>
            <button
              onClick={startNewChat}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-brand-500 transition-colors duration-200"
            >
              <MdClear className="h-5 w-5" />
              <span className="text-sm">Clear Chat</span>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'ai' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MdOutlineRobot className="h-4 w-4 text-white" />
                  </div>
                )}
                
                <div
                  className={`max-w-[70%] p-4 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-brand-500 text-white'
                      : 'bg-gray-100 dark:bg-navy-800 text-navy-700 dark:text-white'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {message.text}
                  </p>
                  <p className={`text-xs mt-2 ${
                    message.sender === 'user' 
                      ? 'text-white/70' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {message.sender === 'user' && (
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiUser className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center">
                  <MdOutlineRobot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-gray-100 dark:bg-navy-800 p-4 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          {messages.length === 1 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Suggested Questions:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestedPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedPrompt(prompt.text)}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-navy-800 rounded-xl hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors duration-200 text-left group"
                  >
                    <div className="text-brand-500 group-hover:scale-110 transition-transform duration-200">
                      {prompt.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-navy-700 dark:text-white">
                        {prompt.text}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {prompt.category}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask me anything about UPSC preparation..."
                  className="w-full p-4 pr-12 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-navy-800 text-navy-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
                  rows={3}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="absolute bottom-3 right-3 w-8 h-8 bg-brand-500 hover:bg-brand-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg flex items-center justify-center transition-colors duration-200 disabled:cursor-not-allowed"
                >
                  <FiSend className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Press Enter to send, Shift + Enter for new line
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AIMentorPage;