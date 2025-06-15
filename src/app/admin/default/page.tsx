'use client';
import MiniCalendar from 'components/calendar/MiniCalendar';
import WeeklyRevenue from 'components/admin/default/WeeklyRevenue';
import TotalSpent from 'components/admin/default/TotalSpent';
import PieChartCard from 'components/admin/default/PieChartCard';
import { IoMdHome } from 'react-icons/io';
import { IoDocuments } from 'react-icons/io5';
import { MdBarChart, MdDashboard, MdOutlineTarget } from 'react-icons/md';
import { FaFire, FaBrain, FaPen } from 'react-icons/fa';

import Widget from 'components/widget/Widget';
import CheckTable from 'components/admin/default/CheckTable';
import ComplexTable from 'components/admin/default/ComplexTable';
import DailyTraffic from 'components/admin/default/DailyTraffic';
import TaskCard from 'components/admin/default/TaskCard';
import tableDataCheck from 'variables/data-tables/tableDataCheck';
import tableDataComplex from 'variables/data-tables/tableDataComplex';

const Dashboard = () => {
  return (
    <div>
      {/* Study Metrics Cards */}
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Widget
          icon={<FaFire className="h-6 w-6" />}
          title={'Total Streaks'}
          subtitle={'42 days'}
        />
        <Widget
          icon={<MdOutlineTarget className="h-6 w-6" />}
          title={'Today\'s Target'}
          subtitle={'85%'}
        />
        <Widget
          icon={<FaBrain className="h-6 w-6" />}
          title={'MCQ Practiced'}
          subtitle={'24'}
        />
        <Widget
          icon={<FaPen className="h-6 w-6" />}
          title={'Mains Answers'}
          subtitle={'3'}
        />
      </div>

      {/* Charts */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div>

      {/* Tables & Charts */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}
        <div>
          <CheckTable tableData={tableDataCheck} />
        </div>

        {/* Traffic chart & Pie Chart */}
        <div className="grid grid-cols-1 gap-5 rounded-[20px] lg:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div>

        {/* Complex Table , Task & Calendar */}
        <ComplexTable tableData={tableDataComplex} />

        {/* Task chart & Calendar */}
        <div className="grid grid-cols-1 gap-5 rounded-[20px] lg:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;