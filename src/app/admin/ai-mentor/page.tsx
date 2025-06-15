'use client';
import { useState, useRef, useEffect } from 'react';
import { FiSend, FiUser } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
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

  return (
    <div className="h-screen w-full flex flex-col bg-white dark:bg-navy-900 overflow-hidden">
      {/* Ultra Minimal Header - Fixed */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-navy-800 flex-shrink-0">
        <div className="w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center">
          <FaRobot className="h-3 w-3 text-white" />
        </div>
        <h1 className="text-sm font-semibold text-navy-700 dark:text-white">AI UPSC Mentor</h1>
      </div>

      {/* Messages Area - Scrollable, takes remaining space */}
      <div className="flex-1 overflow-y-auto px-4 py-3 scrollbar-thin min-h-0">
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'ai' && (
                <div className="w-5 h-5 bg-brand-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <FaRobot className="h-2.5 w-2.5 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${
                  message.sender === 'user'
                    ? 'bg-brand-500 text-white'
                    : 'bg-gray-50 dark:bg-navy-800 text-navy-700 dark:text-white'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-line">
                  {message.text}
                </p>
              </div>

              {message.sender === 'user' && (
                <div className="w-5 h-5 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <FiUser className="h-2.5 w-2.5 text-gray-600 dark:text-gray-300" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-2 justify-start">
              <div className="w-5 h-5 bg-brand-500 rounded-full flex items-center justify-center mt-1">
                <FaRobot className="h-2.5 w-2.5 text-white" />
              </div>
              <div className="bg-gray-50 dark:bg-navy-800 px-3 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-brand-400 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-brand-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Prompts - Only when no conversation, Fixed */}
      {messages.length === 1 && (
        <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-800 flex-shrink-0">
          <div className="flex gap-1 overflow-x-auto scrollbar-thin pb-1">
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setInputText(prompt)}
                className="flex-shrink-0 px-2 py-1 bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-300 rounded-full text-xs hover:bg-brand-100 dark:hover:bg-brand-900/30 hover:text-brand-600 dark:hover:text-brand-300 transition-colors whitespace-nowrap"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area - Fixed at Bottom */}
      <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-navy-800 flex-shrink-0">
        <div className="flex gap-2">
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
            className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-navy-900 text-navy-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-500 focus:border-brand-500 text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="w-9 h-9 bg-brand-500 hover:bg-brand-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg flex items-center justify-center transition-colors disabled:cursor-not-allowed"
          >
            <FiSend className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIMentorPage;