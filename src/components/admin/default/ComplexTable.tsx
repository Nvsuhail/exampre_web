import React from "react";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";
import { MdTrendingUp, MdTrendingDown, MdRemove } from "react-icons/md";
import { FiAward, FiUser, FiTarget } from "react-icons/fi";

type LeaderboardEntry = {
  rank: number;
  name: string;
  avatar: string;
  score: number;
  change: number;
  accuracy: number;
  testsCompleted: number;
  badge?: string;
};

const leaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    name: "Arjun Sharma",
    avatar: "AS",
    score: 2847,
    change: 12,
    accuracy: 94,
    testsCompleted: 156,
    badge: "🏆"
  },
  {
    rank: 2,
    name: "Priya Patel",
    avatar: "PP",
    score: 2756,
    change: 8,
    accuracy: 91,
    testsCompleted: 142,
    badge: "🥈"
  },
  {
    rank: 3,
    name: "Rahul Kumar",
    avatar: "RK",
    score: 2698,
    change: -3,
    accuracy: 89,
    testsCompleted: 138,
    badge: "🥉"
  },
  {
    rank: 4,
    name: "Sneha Singh",
    avatar: "SS",
    score: 2634,
    change: 15,
    accuracy: 87,
    testsCompleted: 134
  },
  {
    rank: 5,
    name: "Vikram Joshi",
    avatar: "VJ",
    score: 2589,
    change: 0,
    accuracy: 85,
    testsCompleted: 129
  },
  {
    rank: 6,
    name: "Anita Gupta",
    avatar: "AG",
    score: 2534,
    change: -7,
    accuracy: 83,
    testsCompleted: 125
  }
];

export default function TodaysLeaderboard() {
  const getTrendIcon = (change: number) => {
    if (change > 0) return <MdTrendingUp className="h-4 w-4 text-green-500" />;
    if (change < 0) return <MdTrendingDown className="h-4 w-4 text-red-500" />;
    return <MdRemove className="h-4 w-4 text-gray-400" />;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-green-500";
    if (change < 0) return "text-red-500";
    return "text-gray-400";
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white";
      case 2: return "bg-gradient-to-r from-gray-300 to-gray-500 text-white";
      case 3: return "bg-gradient-to-r from-orange-400 to-orange-600 text-white";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <Card extra={"w-full h-full px-6 pb-6"}>
      <div className="relative flex items-center justify-between pt-4 pb-2">
        <div>
          <h3 className="text-xl font-bold text-navy-700 dark:text-white">
            Today's Leaderboard
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Top performers this week
          </p>
        </div>
        <CardMenu />
      </div>

      {/* Your Rank Card */}
      <div className="mb-6 bg-gradient-to-r from-brand-500 to-brand-600 rounded-xl p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">
              YU
            </div>
            <div>
              <p className="font-semibold">Your Rank</p>
              <p className="text-sm opacity-90">Keep pushing!</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">#127</p>
            <div className="flex items-center gap-1">
              <MdTrendingUp className="h-4 w-4" />
              <span className="text-sm">+5</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {leaderboardData.map((entry) => (
          <div
            key={entry.rank}
            className="group bg-white dark:bg-navy-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-brand-500/30 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              {/* Rank and User Info */}
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRankColor(entry.rank)}`}>
                  {entry.badge || entry.rank}
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {entry.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-700 dark:text-white">
                      {entry.name}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {entry.testsCompleted} tests completed
                    </p>
                  </div>
                </div>
              </div>

              {/* Score and Stats */}
              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-bold text-navy-700 dark:text-white">
                    {entry.score.toLocaleString()}
                  </span>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(entry.change)}
                    <span className={`text-sm font-medium ${getTrendColor(entry.change)}`}>
                      {entry.change > 0 ? '+' : ''}{entry.change}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {entry.accuracy}% accuracy
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-600 dark:text-gray-400">Weekly Progress</span>
                <span className="text-xs font-medium text-brand-500">{entry.accuracy}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-brand-500 to-brand-400 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${entry.accuracy}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Leaderboard Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <FiAward className="h-4 w-4 text-brand-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Top Score</span>
            </div>
            <p className="text-lg font-bold text-navy-700 dark:text-white">2,847</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <FiUser className="h-4 w-4 text-brand-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Participants</span>
            </div>
            <p className="text-lg font-bold text-navy-700 dark:text-white">1,247</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <FiTarget className="h-4 w-4 text-brand-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Avg Score</span>
            </div>
            <p className="text-lg font-bold text-navy-700 dark:text-white">1,856</p>
          </div>
        </div>
      </div>
    </Card>
  );
}