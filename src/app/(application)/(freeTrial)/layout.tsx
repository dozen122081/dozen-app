"use client"
import { UserData } from '@/app/api/user/route';
import { ScrollArea } from "@/components/ui/scroll-area";
import "../../globals.css";
import { freeDashboardLinks } from '@/lib/constants/freeDashboard/freeDashboardLinks';
import AsideBar from './components/sidebars/AsideBar';
import NavBar from './components/sidebars/NavBar';
const PersonalDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  
  return (
    <main className="flex flex-col h-full max-h-screen border-5">
      <NavBar />
      <div className="flex flex-col md:flex-row md:h-full md:max-h-screen">
        <AsideBar navLinksData={freeDashboardLinks} />
        <div className="w-full">
          <ScrollArea className="h-[89vh] w-full rounded-md">
            {children}
          </ScrollArea>
        </div>
      </div>
    </main>
  )
}

export default PersonalDashboardLayout