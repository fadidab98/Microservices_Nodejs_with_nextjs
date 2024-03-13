import Overlay from './provider/overlay';
import TopNavigation from './topnavigation';
import SideNavigation from './sidenavigation';
import DashboardProvider from './provider/context';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loading from '@/Components/loading/Loading';

/*	w-[calc(100%-16rem)] class get the remain width of the main component from lg:viewport by subtracting
(the total width by the width of the side navigation component which is w-64 = 16rem)*/

const style = {
  container: `h-screen overflow-hidden relative`,
  mainContainer: `bg-green-900 flex flex-col h-screen pl-0 w-full lg:w-[calc(100%-16rem)]`,
  main: `bg-gray-100 h-screen overflow-auto pb-36 pt-4 px-2 md:pb-8 md:px-4 lg:px-6 lg:rounded-tl-3xl`,
};

export default function DashboardLayout({ children }) {
  const loading =  useSelector(state=>state.setting.setting.loading) 

  useEffect(()=>{
    const use = async () => {
      (await import('tw-elements')).default;
        };
        use();
      
   
   },[loading])
  return (
    <DashboardProvider>
      <div className={style.container}>
        <div className="flex items-start">
          <Overlay />
          <SideNavigation mobilePosition="right" />
          <div className={style.mainContainer}>
            <TopNavigation />
            <main className={style.main}>
            { children}

              </main>
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
}
