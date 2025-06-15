/* eslint-disable */

import { HiX } from 'react-icons/hi';
import Links from './components/Links';

import SidebarCard from 'components/sidebar/components/SidebarCard';
import { IRoute } from 'types/navigation';

function SidebarHorizon(props: { routes: IRoute[]; [x: string]: any }) {
  const { routes, open, setOpen } = props;
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-4 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? 'translate-x-0' : '-translate-x-96 xl:translate-x-0'
      }`}
    >
      <span
        className="absolute right-4 top-4 block cursor-pointer xl:hidden"
        onClick={() => setOpen(false)}
      >
        <HiX />
      </span>

      {/* Header - Fixed */}
      <div className={`mx-[56px] mt-[50px] flex items-center flex-shrink-0`}>
        <div className="ml-1 mt-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
          Horizon <span className="font-medium">FREE</span>
        </div>
      </div>
      
      {/* Divider - Fixed */}
      <div className="mb-4 mt-[58px] h-px bg-gray-300 dark:bg-white/30 mx-6 flex-shrink-0" />
      
      {/* Scrollable Navigation Area */}
      <div className="flex-1 overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500">
        <ul className="space-y-1 pb-4">
          <Links routes={routes} />
        </ul>
      </div>

      {/* Footer Card - Fixed at bottom */}
      <div className="flex justify-center px-4 pt-4 flex-shrink-0">
        <SidebarCard />
      </div>
    </div>
  );
}

export default SidebarHorizon;