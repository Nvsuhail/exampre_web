'use client';
import { useState, useRef, useEffect } from 'react';
import Card from 'components/card';
import { FiSend, FiUser, FiMenu, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { MdHistory } from 'react-icons/md';
import { FaRobot } from 'react-icons/fa';

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
      text: "Hi! I'm your AI UPSC Mentor. Ask me anything about your preparation strategy, syllabus, or study tips.",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    {
      id: '1',
      title: 'Study Strategy Discussion',
      lastMessage: 'How should I plan my daily study schedule for UPSC?',
      timestamp: new Date(Date.now() - 86400000),
      messages: []
    },
    {
      id: '2',
      title: 'Current Affairs Guidance',
      lastMessage: 'What are the best sources for current affairs preparation?',
      timestamp: new Date(Date.now() - 172800000),
      messages: []
    },
    {
      id: '3',
      title: 'Mock Test Analysis',
      lastMessage: 'How can I improve my mock test performance?',
      timestamp: new Date(Date.now() - 259200000),
      messages: []
    },
    {
      id: '4',
      title: 'Answer Writing Tips',
      lastMessage: 'What is the best structure for mains answers?',
      timestamp: new Date(Date.now() - 345600000),
      messages: []
    },
    {
      id: '5',
      title: 'Revision Strategy',
      lastMessage: 'How to revise effectively in the last month?',
      timestamp: new Date(Date.now() - 432000000),
      messages: []
    }
  ]);
  
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const quickPromptsRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Create a 6-month study plan",
    "Answer writing tips for mains",
    "Current affairs strategy",
    "Time management techniques",
    "Motivation and stress management",
    "Revision techniques",
    "Optional subject guidance",
    "Interview preparation tips",
    "Previous year analysis",
    "Daily routine planning"
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
      return "Here's a comprehensive 6-month UPSC study plan:\n\n📚 **Foundation Phase (Months 1-2):**\n• Complete NCERT books (6th-12th)\n• Basic current affairs reading\n• Newspaper reading habit development\n\n📖 **Building Phase (Months 3-4):**\n• Standard reference books\n• Previous year questions analysis\n• Mock test series beginning\n\n✅ **Practice Phase (Months 5-6):**\n• Intensive mock tests\n• Answer writing practice\n• Current affairs compilation\n• Weak area improvement\n\n⏰ **Daily Schedule:**\n• 6-8 hours focused study\n• 2 hours current affairs\n• 1 hour revision\n• Regular breaks and exercise";
    }
    
    if (input.includes('current affairs')) {
      return "**Current Affairs Mastery Strategy:**\n\n📰 **Daily Sources:**\n• The Hindu newspaper (editorial + news)\n• PIB releases and government announcements\n• Rajya Sabha TV discussions\n\n📝 **Note-Making:**\n• 2-3 pages daily notes\n• Link current events to static topics\n• Monthly compilation for revision\n\n🔗 **Integration:**\n• Connect to prelims and mains syllabus\n• Practice current affairs MCQs\n• Use in answer writing examples\n\n📊 **Monthly Review:**\n• Compile important events\n• Create topic-wise summaries\n• Practice related questions";
    }
    
    if (input.includes('answer writing') || input.includes('mains')) {
      return "**Answer Writing Excellence Framework:**\n\n📝 **Structure (Universal):**\n• Introduction (15%): Hook + Definition + Roadmap\n• Body (70%): Arguments + Examples + Analysis\n• Conclusion (15%): Summary + Way forward\n\n⏱️ **Time Management:**\n• 1.5 minutes per mark\n• 10 marks = 15 minutes\n• 15 marks = 22-25 minutes\n\n🔑 **Key Elements:**\n• Use keywords from question\n• Add relevant examples and case studies\n• Include diagrams where applicable\n• Maintain word limit\n\n✍️ **Daily Practice:**\n• Write 2-3 answers daily\n• Get feedback from mentors\n• Analyze model answers\n• Time yourself strictly";
    }
    
    if (input.includes('motivation') || input.includes('stress')) {
      return "**Mental Strength & Motivation Toolkit:**\n\n🎯 **Goal Setting:**\n• Break down into daily targets\n• Celebrate small achievements\n• Track progress visually\n\n💪 **Stress Management:**\n• Daily exercise (30 minutes)\n• Meditation or deep breathing\n• Adequate sleep (7-8 hours)\n• Regular breaks during study\n\n👥 **Support System:**\n• Connect with fellow aspirants\n• Join study groups\n• Seek mentor guidance\n• Family support\n\n📚 **Inspiration:**\n• Read success stories\n• Watch motivational content\n• Remember your 'why'\n• Visualize success\n\n🔄 **Consistency:**\n• Small daily progress > sporadic intense efforts\n• Maintain routine even on difficult days\n• Focus on process, not just outcomes";
    }
    
    if (input.includes('revision') || input.includes('revise')) {
      return "**Strategic Revision Methodology:**\n\n🔄 **Revision Cycles:**\n• 1st Revision: Within 24 hours\n• 2nd Revision: After 1 week\n• 3rd Revision: After 1 month\n• Final Revision: Before exam\n\n📋 **Techniques:**\n• Active recall over passive reading\n• Spaced repetition system\n• Mind maps and flowcharts\n• Teaching others (Feynman technique)\n\n📚 **Material Organization:**\n• Concise notes (max 2 pages per topic)\n• Flashcards for facts and dates\n• Formula sheets for economics\n• Map practice for geography\n\n⏰ **Last Month Strategy:**\n• Only revised material\n• Daily current affairs\n• Mock tests analysis\n• Stress management focus";
    }
    
    return "I'm your dedicated UPSC mentor! I can help you with:\n\n📋 **Study Planning & Strategy**\n⏰ **Time Management & Scheduling**\n📚 **Subject-wise Guidance**\n📝 **Answer Writing Techniques**\n📰 **Current Affairs Strategy**\n💪 **Motivation & Stress Management**\n🔄 **Revision Techniques**\n🎯 **Mock Test Analysis**\n📊 **Performance Improvement**\n🗣️ **Interview Preparation**\n\nWhat specific area would you like detailed guidance on? I'm here to provide personalized strategies for your UPSC journey!";
  };

  const startNewChat = () => {
    if (messages.length > 1) {
      const newChat: ChatHistory = {
        id: Date.now().toString(),
        title: messages[1]?.text.substring(0, 40) + '...' || 'New Chat',
        lastMessage: messages[messages.length - 1]?.text.substring(0, 60) + '...' || '',
        timestamp: new Date(),
        messages: [...messages]
      };
      setChatHistory(prev => [newChat, ...prev]);
    }
    
    setMessages([{
      id: '1',
      text: "Hi! I'm your AI UPSC Mentor. Ask me anything about your preparation strategy, syllabus, or study tips.",
      sender: 'ai',
      timestamp: new Date()
    }]);
    setCurrentChatId(null);
    setIsMobileSidebarOpen(false);
  };

  const loadChatHistory = (chat: ChatHistory) => {
    setMessages(chat.messages.length > 0 ? chat.messages : [{
      id: '1',
      text: "Hi! I'm your AI UPSC Mentor. Ask me anything about your preparation strategy, syllabus, or study tips.",
      sender: 'ai',
      timestamp: new Date()
    }]);
    setCurrentChatId(chat.id);
    setIsMobileSidebarOpen(false);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const scrollQuickPrompts = (direction: 'left' | 'right') => {
    if (quickPromptsRef.current) {
      const scrollAmount = 200;
      quickPromptsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex h-[calc(100vh-120px)] relative bg-gray-50 dark:bg-navy-900">
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Main Chat Interface */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isSidebarOpen ? 'lg:mr-80 xl:mr-96' : 'mr-0'
      }`}>
        <Card extra="flex-1 flex flex-col h-full">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-navy-800">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-brand-500 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-700"
              >
                <FiMenu className="h-5 w-5" />
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center shadow-lg">
                <FaRobot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-navy-700 dark:text-white">
                  AI UPSC Mentor
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your personalized preparation guide
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden lg:flex p-2 text-gray-600 dark:text-gray-400 hover:text-brand-500 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors"
            >
              {isSidebarOpen ? <FiChevronRight className="h-5 w-5" /> : <FiChevronLeft className="h-5 w-5" />}
            </button>
          </div>

          {/* Quick Prompts - Horizontal Scrollable */}
          {messages.length === 1 && (
            <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-navy-800">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Quick questions:
              </p>
              <div className="relative">
                <button
                  onClick={() => scrollQuickPrompts('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white dark:bg-navy-700 shadow-lg rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-brand-500 transition-colors"
                >
                  <FiChevronLeft className="h-4 w-4" />
                </button>
                
                <div 
                  ref={quickPromptsRef}
                  className="flex gap-3 overflow-x-auto scrollbar-thin pb-2 px-8"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {quickPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setInputText(prompt)}
                      className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-navy-700 dark:to-navy-600 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:from-brand-100 hover:to-brand-200 dark:hover:from-brand-900/30 dark:hover:to-brand-800/30 hover:text-brand-700 dark:hover:text-brand-300 transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => scrollQuickPrompts('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white dark:bg-navy-700 shadow-lg rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-brand-500 transition-colors"
                >
                  <FiChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Messages Area - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4 scrollbar-thin">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'ai' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <FaRobot className="h-4 w-4 text-white" />
                  </div>
                )}
                
                <div
                  className={`max-w-[85%] lg:max-w-[75%] p-4 rounded-2xl shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white'
                      : 'bg-white dark:bg-navy-800 text-navy-700 dark:text-white border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {message.text}
                  </p>
                  <p className={`text-xs mt-2 ${
                    message.sender === 'user' 
                      ? 'text-white/80' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                {message.sender === 'user' && (
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                    <FiUser className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center shadow-md">
                  <FaRobot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white dark:bg-navy-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Fixed at Bottom */}
          <div className="p-4 lg:p-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-navy-800">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask about UPSC preparation strategies, study plans, or any doubts..."
                  className="w-full p-4 pr-12 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-navy-900 text-navy-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none text-sm lg:text-base transition-all duration-200"
                  rows={2}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="absolute bottom-2 right-2 w-8 h-8 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 disabled:from-gray-300 disabled:to-gray-400 dark:disabled:from-gray-600 dark:disabled:to-gray-700 text-white rounded-lg flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  <FiSend className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Press Enter to send • Shift + Enter for new line
            </p>
          </div>
        </Card>
      </div>

      {/* Right Sidebar - Chat History */}
      <div className={`
        fixed lg:absolute inset-y-0 right-0 z-50 w-80 xl:w-96
        transform transition-all duration-300 ease-in-out
        ${isMobileSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        ${isSidebarOpen ? 'lg:translate-x-0' : 'lg:translate-x-full'}
      `}>
        <Card extra="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-navy-700 dark:text-white flex items-center gap-2">
              <MdHistory className="h-5 w-5 text-brand-500" />
              Chat History
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={startNewChat}
                className="bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                New Chat
              </button>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="lg:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-700"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-3 scrollbar-thin">
            {chatHistory.map((chat) => (
              <div
                key={chat.id}
                onClick={() => loadChatHistory(chat)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                  currentChatId === chat.id
                    ? 'bg-gradient-to-r from-brand-50 to-brand-100 dark:from-brand-900/30 dark:to-brand-800/30 border-brand-200 dark:border-brand-700 shadow-md'
                    : 'bg-gray-50 dark:bg-navy-800 hover:bg-gray-100 dark:hover:bg-navy-700 border-gray-200 dark:border-gray-700 hover:shadow-md'
                }`}
              >
                <h4 className="font-semibold text-navy-700 dark:text-white text-sm mb-2 line-clamp-1">
                  {chat.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2 leading-relaxed">
                  {chat.lastMessage}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {formatTime(chat.timestamp)}
                  </p>
                  {currentChatId === chat.id && (
                    <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AIMentorPage;