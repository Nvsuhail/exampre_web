'use client';
import { MdTrendingUp, MdQuiz, MdLibraryBooks, MdPsychology } from 'react-icons/md';
import { FiTarget, FiAward, FiTrendingUp, FiUsers } from 'react-icons/fi';

const PrelimsHeroBanner = () => {
  const achievements = [
    { icon: <FiAward className="h-5 w-5" />, label: 'Top Rankers', value: '500+' },
    { icon: <FiUsers className="h-5 w-5" />, label: 'Success Stories', value: '2,000+' },
    { icon: <MdQuiz className="h-5 w-5" />, label: 'Questions Bank', value: '50K+' },
    { icon: <FiTrendingUp className="h-5 w-5" />, label: 'Success Rate', value: '85%' }
  ];

  return (
    <div className="relative flex w-full flex-col rounded-[20px] bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 px-[30px] py-[40px] md:px-[64px] md:py-[56px] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-32 h-32 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 border-2 border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
        <div className="absolute top-1/4 right-1/4 w-20 h-20 border border-white rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 rounded-full p-3">
              <FiTarget className="h-8 w-8 text-white" />
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-full">
              <span className="text-white text-sm font-medium">UPSC Prelims 2025</span>
            </div>
          </div>
          
          <h1 className="mb-[14px] max-w-full text-3xl font-bold text-white md:w-[80%] md:text-4xl md:leading-[50px] lg:w-[70%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[65%]">
            Master UPSC Prelims with India's Most Advanced Preparation Platform
          </h1>
          
          <p className="mb-[40px] max-w-full text-base font-medium text-white/90 md:w-[70%] lg:w-[60%] xl:w-[72%] 2xl:w-[60%] 3xl:w-[50%]">
            Join thousands of successful candidates who cracked UPSC with our comprehensive toolkit, 
            AI-powered insights, and expert guidance. Your journey to IAS starts here!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mb-8 flex items-center justify-start gap-4 flex-wrap">
          <button className="linear rounded-xl bg-white px-6 py-3 text-center text-base font-medium text-brand-600 transition duration-200 hover:bg-white/90 active:bg-white/80 shadow-lg">
            Start Free Trial
          </button>
          <button className="flex items-center gap-2 text-base font-medium text-white hover:text-white/80 transition duration-200">
            <div className="bg-white/20 rounded-full p-2">
              <MdLibraryBooks className="h-5 w-5" />
            </div>
            Explore Resources
          </button>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="text-white">
                  {achievement.icon}
                </div>
                <div>
                  <div className="text-xl font-bold text-white">{achievement.value}</div>
                  <div className="text-xs text-white/80">{achievement.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Access Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <MdQuiz className="h-6 w-6 text-white" />
              <span className="font-semibold text-white">Daily Quiz</span>
            </div>
            <p className="text-sm text-white/80">Test your knowledge with daily curated questions</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <MdPsychology className="h-6 w-6 text-white" />
              <span className="font-semibold text-white">AI Mentor</span>
            </div>
            <p className="text-sm text-white/80">Get personalized guidance and doubt resolution</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-200 cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <MdTrendingUp className="h-6 w-6 text-white" />
              <span className="font-semibold text-white">Progress Track</span>
            </div>
            <p className="text-sm text-white/80">Monitor your preparation with detailed analytics</p>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 bg-white/10 rounded-full p-4 animate-pulse hidden lg:block">
        <FiTarget className="h-8 w-8 text-white" />
      </div>
      <div className="absolute bottom-20 right-32 bg-white/10 rounded-full p-3 animate-pulse hidden lg:block">
        <MdQuiz className="h-6 w-6 text-white" />
      </div>
    </div>
  );
};

export default PrelimsHeroBanner;