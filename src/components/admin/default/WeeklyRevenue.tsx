import Card from "components/card";
import BarChart from "components/charts/BarChart";
import {
  barChartDataWeeklyPerformance,
  barChartOptionsWeeklyPerformance,
} from "variables/charts";
import { MdBarChart, MdTrendingUp } from "react-icons/md";

const WeeklyPerformance = () => {
  return (
    <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
      <div className="mb-auto flex items-center justify-between px-6">
        <h2 className="text-lg font-bold text-navy-700 dark:text-white">
          Weekly Performance
        </h2>
        <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdTrendingUp className="h-6 w-6" />
        </button>
      </div>

      {/* Performance Legend */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-4 px-6">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-brand-500"></div>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Test Answers</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#6AD2FF]"></div>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">MCQ Solved</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#FFB547]"></div>
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Reading Hours</span>
        </div>
      </div>

      <div className="md:mt-8 lg:mt-0">
        <div className="h-[250px] w-full xl:h-[300px]">
          <BarChart
            chartData={barChartDataWeeklyPerformance}
            chartOptions={barChartOptionsWeeklyPerformance}
          />
        </div>
      </div>

      {/* Performance Summary */}
      <div className="mt-4 grid grid-cols-3 gap-4 px-6">
        <div className="text-center">
          <p className="text-lg font-bold text-navy-700 dark:text-white">156</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Total Answers</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-navy-700 dark:text-white">342</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">MCQs Solved</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-navy-700 dark:text-white">28h</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Study Hours</p>
        </div>
      </div>
    </Card>
  );
};

export default WeeklyPerformance;