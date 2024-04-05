import AsideBar from "@/components/SideBars/AsideBar";
import NavBar from "@/components/SideBars/NavBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { personalDashboardLinks } from "@/lib/constants/personalDashboard/personalDashboardLinks";
import "../../globals.css";
const PersonalDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <main className="flex flex-col h-full max-h-screen border-5">
      <NavBar />
      <div className="flex flex-col md:flex-row md:h-full md:max-h-screen">
        <AsideBar navLinksData={personalDashboardLinks} />
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