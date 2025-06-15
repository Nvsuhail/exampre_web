import Card from 'components/card';
import { MdTrendingUp, MdQuiz, MdTimer, MdStar } from 'react-icons/md';
import { FiTarget, FiBookOpen, FiUsers, FiAward } from 'react-icons/fi';

const PrelimsHero = () => {
  return (
    <Card extra="w-full h-full p-8 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
        <div className="absolute top-20 right-20 w-16 h-16 border-2 border-white rounded-lg rotate-45"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-white rounded-lg rotate-12"></div>
      </div>

      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="px-3 py-1 bg-white/20 rounded-full">
                <span className="text-sm font-medium">UPSC Prelims 2025</span>
              </div>
              <div className="px-3 py-1 bg-green-500/20 rounded-full">
                <span className="text-sm font-medium">🔥 Trending</span>
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Master UPSC Prelims with 
              <span className="block text-yellow-300">Smart Preparation</span>
            </h1>
            
            <p className="text-lg mb-6 text-white/90 leading-relaxed">
              Comprehensive toolkit designed by toppers and experts. Practice with 10,000+ MCQs, 
              analyze trends, and boost your score with AI-powered insights.
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <button className="bg-white text-brand-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center gap-2">
                <MdQuiz className="h-5 w-5" />
                Start Practice
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all duration-200 flex items-center gap-2">
                <FiBookOpen className="h-5 w-5" />
                View Syllabus
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <FiUsers className="h-4 w-4" />
                  <span className="text-sm">Success Rate</span>
                </div>
                <p className="text-2xl font-bold">78%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <FiTarget className="h-4 w-4" />
                  <span className="text-sm">Avg. Score Boost</span>
                </div>
                <p className="text-2xl font-bold">+45%</p>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Highlights */}
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-yellow-500 rounded-lg">
                  <MdStar className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-lg">AI-Powered Learning</h3>
              </div>
              <p className="text-white/80 text-sm">
                Personalized study plans and intelligent question recommendations based on your performance
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <MdTrendingUp className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-lg">Real-time Analytics</h3>
              </div>
              <p className="text-white/80 text-sm">
                Track your progress with detailed analytics and performance insights
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <MdTimer className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-lg">Timed Practice</h3>
              </div>
              <p className="text-white/80 text-sm">
                Simulate real exam conditions with timed tests and instant feedback
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <FiAward className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-lg">Expert Guidance</h3>
              </div>
              <p className="text-white/80 text-sm">
                Learn from IAS officers and subject matter experts
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-yellow-400 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-green-400 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-blue-400 rounded-full border-2 border-white"></div>
                <div className="w-8 h-8 bg-purple-400 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                  +5K
                </div>
              </div>
              <div>
                <p className="font-semibold">Join 50,000+ aspirants</p>
                <p className="text-sm text-white/80">Already preparing with us</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/80">Next batch starts</p>
              <p className="font-semibold">January 15, 2025</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PrelimsHero;