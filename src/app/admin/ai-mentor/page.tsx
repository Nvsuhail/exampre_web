'use client';
import { useState, useRef, useEffect } from 'react';
import Card from 'components/card';
import { FiSend, FiUser, FiMenu, FiX } from 'react-icons/fi';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    {
      id: '1',
      title: 'Study Strategy',
      lastMessage: 'How should I plan my daily study schedule?',
      timestamp: new Date(Date.now() - 86400000),
      messages: []
    },
    {
      id: '2',
      title: 'Current Affairs',
      lastMessage: 'Best sources for current affairs?',
      timestamp: new Date(Date.now() - 172800000),
      messages: []
    },
    {
      id: '3',
      title: 'Mock Tests',
      lastMessage: 'How to improve mock test scores?',
      timestamp: new Date(Date.now() - 259200000),
      messages: []
    }
  ]);
  
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Create a study plan",
    "Answer writing tips",
    "Current affairs strategy",
    "Time management",
    "Motivation tips",
    "Revision techniques"
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
    }, 1000);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('study plan') || input.includes('schedule')) {
      return "Here's a simple study plan:\n\n📚 Foundation (2-3 months): NCERT books\n📖 Building (2-3 months): Standard books + current affairs\n✅ Practice (1-2 months): Mock tests + PYQs\n🔄 Revision (1 month): Intensive review\n\nDaily: 6-8 hours split between subjects, current affairs, and practice.";
    }
    
    if (input.includes('current affairs')) {
      return "Current Affairs Strategy:\n\n📰 Daily: The Hindu newspaper\n🏛️ Government: PIB releases\n📺 Analysis: Rajya Sabha TV\n📝 Notes: 2-3 pages daily\n🔗 Link to static topics\n\nFocus on policies, international relations, and recent developments.";
    }
    
    if (input.includes('answer writing') || input.includes('mains')) {
      return "Answer Writing Tips:\n\n📝 Structure: Intro (15%) → Body (70%) → Conclusion (15%)\n⏱️ Time: 1.5 minutes per mark\n🔑 Use keywords and examples\n📊 Add diagrams where relevant\n✍️ Practice 2-3 answers daily\n\nGet feedback and analyze model answers regularly.";
    }
    
    if (input.includes('motivation') || input.includes('stress')) {
      return "Stay Motivated:\n\n🎯 Set small daily goals\n🎉 Celebrate small wins\n👥 Connect with fellow aspirants\n💪 Exercise daily (30 mins)\n🧘 Practice meditation\n📚 Read success stories\n\nRemember: Consistency beats intensity!";
    }
    
    return "I'm here to help with your UPSC preparation! Ask me about:\n\n📋 Study strategies\n⏰ Time management\n📚 Subject guidance\n📝 Answer writing\n📰 Current affairs\n💪 Motivation\n\nWhat specific area would you like guidance on?";
  };

  const startNewChat = () => {
    if (messages.length > 1) {
      const newChat: ChatHistory = {
        id: Date.now().toString(),
        title: messages[1]?.text.substring(0, 30) + '...' || 'New Chat',
        lastMessage: messages[messages.length - 1]?.text.substring(0, 50) + '...' || '',
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
    setIsSidebarOpen(false);
  };

  const loadChatHistory = (chat: ChatHistory) => {
    setMessages(chat.messages);
    setCurrentChatId(chat.id);
    setIsSidebarOpen(false);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days}d ago`;
  };

  return (
    <div className="flex h-[calc(100vh-120px)] relative">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Chat History Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-80 lg:w-72 xl:w-80 
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <Card extra="h-full p-4 lg:p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-navy-700 dark:text-white flex items-center gap-2">
              <MdHistory className="h-5 w-5 text-brand-500" />
              <span className="hidden sm:inline">Chat History</span>
              <span className="sm:hidden">Chats</span>
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={startNewChat}
                className="bg-brand-500 hover:bg-brand-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              >
                New
              </button>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin">
            {chatHistory.map((chat) => (
              <div
                key={chat.id}
                onClick={() => loadChatHistory(chat)}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  currentChatId === chat.id
                    ? 'bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-700'
                    : 'bg-gray-50 dark:bg-navy-800 hover:bg-gray-100 dark:hover:bg-navy-700'
                }`}
              >
                <h4 className="font-medium text-navy-700 dark:text-white text-sm mb-1 truncate">
                  {chat.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 line-clamp-2">
                  {chat.lastMessage}
                </p>
                <p className="text-xs text-gray-500">
                  {formatTime(chat.timestamp)}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col min-w-0">
        <Card extra="flex-1 flex flex-col p-4 lg:p-6">
          {/* Chat Header */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-brand-500"
              >
                <FiMenu className="h-5 w-5" />
              </button>
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center">
                <FaRobot className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg lg:text-xl font-bold text-navy-700 dark:text-white">
                  AI Mentor
                </h2>
                <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
                  Your UPSC preparation guide
                </p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto space-y-3 lg:space-y-4 mb-4 scrollbar-thin">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 lg:gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'ai' && (
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaRobot className="h-3 w-3 lg:h-4 lg:w-4 text-white" />
                  </div>
                )}
                
                <div
                  className={`max-w-[85%] lg:max-w-[70%] p-3 lg:p-4 rounded-2xl ${
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
                  <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiUser className="h-3 w-3 lg:h-4 lg:w-4 text-gray-600 dark:text-gray-300" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-2 lg:gap-3 justify-start">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center">
                  <FaRobot className="h-3 w-3 lg:h-4 lg:w-4 text-white" />
                </div>
                <div className="bg-gray-100 dark:bg-navy-800 p-3 lg:p-4 rounded-2xl">
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

          {/* Quick Prompts - Only show on first message */}
          {messages.length === 1 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Quick questions:
              </p>
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setInputText(prompt)}
                    className="px-3 py-2 bg-gray-100 dark:bg-navy-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-navy-700 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex gap-2 lg:gap-3">
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
                  placeholder="Ask about UPSC preparation..."
                  className="w-full p-3 lg:p-4 pr-12 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-navy-800 text-navy-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none text-sm lg:text-base"
                  rows={window.innerWidth < 768 ? 2 : 3}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="absolute bottom-2 lg:bottom-3 right-2 lg:right-3 w-8 h-8 bg-brand-500 hover:bg-brand-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg flex items-center justify-center transition-colors disabled:cursor-not-allowed"
                >
                  <FiSend className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 hidden sm:block">
              Press Enter to send, Shift + Enter for new line
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AIMentorPage;