/* eslint-disable */
import React from 'react';
import { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import NavLink from 'components/link/NavLink';
import DashIcon from 'components/icons/DashIcon';
// chakra imports

export const SidebarLinks = (props: { routes: RoutesType[] }): JSX.Element => {
  // Chakra color mode
  const pathname = usePathname();

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = useCallback(
    (routeName: string) => {
      return pathname?.includes(routeName);
    },
    [pathname],
  );

  const createLinks = (routes: RoutesType[]) => {
    return routes.map((route, index) => {
      if (
        route.layout === '/admin' ||
        route.layout === '/auth' ||
        route.layout === '/rtl'
      ) {
        return (
          <NavLink key={index} href={route.layout + '/' + route.path}>
            <div className="relative mb-2 flex hover:cursor-pointer group">
              <li
                className={`my-[3px] flex cursor-pointer items-center px-6 py-3 rounded-xl mx-2 transition-all duration-200 ${
                  activeRoute(route.path) === true
                    ? 'bg-gradient-to-r from-brand-500 to-brand-600 shadow-lg shadow-brand-500/25'
                    : 'hover:bg-gray-100 dark:hover:bg-navy-700/50'
                }`}
                key={index}
              >
                <span
                  className={`transition-all duration-200 ${
                    activeRoute(route.path) === true
                      ? 'text-white scale-110'
                      : 'text-gray-600 dark:text-gray-400 group-hover:text-brand-500 dark:group-hover:text-brand-400'
                  }`}
                >
                  {route.icon ? route.icon : <DashIcon />}{' '}
                </span>
                <p
                  className={`leading-1 ml-4 flex font-medium transition-all duration-200 ${
                    activeRoute(route.path) === true
                      ? 'text-white font-semibold'
                      : 'text-gray-700 dark:text-gray-300 group-hover:text-brand-500 dark:group-hover:text-brand-400'
                  }`}
                >
                  {route.name}
                </p>
              </li>
              {activeRoute(route.path) ? (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-1 rounded-full bg-white shadow-lg" />
              ) : null}
            </div>
          </NavLink>
        );
      }
    });
  };
  // BRAND
  return <>{createLinks(routes)}</>;
};

export default SidebarLinks;