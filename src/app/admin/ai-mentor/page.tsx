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
    }
  ]);
  
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Create a 6-month study plan",
    "Answer writing tips for mains",
    "Current affairs strategy",
    "Time management techniques",
    "Motivation and stress management",
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
    
    return "I'm your dedicated UPSC mentor! I can help you with:\n\n📋 **Study Planning & Strategy**\n⏰ **Time Management & Scheduling**\n📚 **Subject-wise Guidance**\n📝 **Answer Writing Techniques**\n📰 **Current Affairs Strategy**\n💪 **Motivation & Stress Management**\n🔄 **Revision Techniques**\n🎯 **Mock Test Analysis**\n📊 **Performance Improvement**\n🗣️ **Interview Preparation**\n\nWhat specific area would you like detailed guidance on?";
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
    setIsSidebarOpen(false);
  };

  const loadChatHistory = (chat: ChatHistory) => {
    setMessages(chat.messages.length > 0 ? chat.messages : [{
      id: '1',
      text: "Hi! I'm your AI UPSC Mentor. Ask me anything about your preparation strategy, syllabus, or study tips.",
      sender: 'ai',
      timestamp: new Date()
    }]);
    setCurrentChatId(chat.id);
    setIsSidebarOpen(false);
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

  return (
    <div className="h-[calc(100vh-120px)] w-full flex bg-gray-50 dark:bg-navy-900 relative">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isSidebarOpen ? 'md:mr-80' : 'mr-0'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white dark:bg-navy-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center">
              <FaRobot className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-navy-700 dark:text-white">AI UPSC Mentor</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Your preparation guide</p>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-brand-500 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-700"
          >
            <FiMenu className="h-5 w-5" />
          </button>
        </div>

        {/* Messages Area - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'ai' && (
                <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaRobot className="h-4 w-4 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-brand-500 text-white'
                    : 'bg-white dark:bg-navy-800 text-navy-700 dark:text-white border border-gray-200 dark:border-gray-700'
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
              <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center">
                <FaRobot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-white dark:bg-navy-800 p-3 rounded-2xl border border-gray-200 dark:border-gray-700">
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

        {/* Quick Prompts - Horizontal Scrollable (only when no conversation) */}
        {messages.length === 1 && (
          <div className="px-4 py-2 bg-white dark:bg-navy-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-2">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setInputText(prompt)}
                  className="flex-shrink-0 px-3 py-2 bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-gray-300 rounded-full text-xs hover:bg-brand-100 dark:hover:bg-brand-900/30 hover:text-brand-700 dark:hover:text-brand-300 transition-colors whitespace-nowrap"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area - Fixed at Bottom */}
        <div className="p-4 bg-white dark:bg-navy-800 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ask about UPSC preparation..."
                className="w-full p-3 pr-12 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-navy-900 text-navy-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-500 hover:bg-brand-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg flex items-center justify-center transition-colors disabled:cursor-not-allowed"
              >
                <FiSend className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Chat History */}
      <div className={`
        fixed md:absolute inset-y-0 right-0 z-50 w-80
        transform transition-transform duration-300
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        bg-white dark:bg-navy-800 border-l border-gray-200 dark:border-gray-700
      `}>
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-bold text-navy-700 dark:text-white flex items-center gap-2">
              <MdHistory className="h-5 w-5 text-brand-500" />
              History
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={startNewChat}
                className="bg-brand-500 hover:bg-brand-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors"
              >
                New
              </button>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-700"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
            {chatHistory.map((chat) => (
              <div
                key={chat.id}
                onClick={() => loadChatHistory(chat)}
                className={`p-3 rounded-xl cursor-pointer transition-colors ${
                  currentChatId === chat.id
                    ? 'bg-brand-50 dark:bg-brand-900/30 border border-brand-200 dark:border-brand-700'
                    : 'bg-gray-50 dark:bg-navy-700 hover:bg-gray-100 dark:hover:bg-navy-600'
                }`}
              >
                <h4 className="font-semibold text-navy-700 dark:text-white text-sm mb-1 truncate">
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
        </div>
      </div>
    </div>
  );
};

export default AIMentorPage;