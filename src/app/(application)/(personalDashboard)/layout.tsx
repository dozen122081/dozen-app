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
    <main className="flex flex-col max-h-screen">
      <NavBar />
      <div className="flex flex-col md:flex-row h-full max-h-screen">
        <AsideBar navLinksData={personalDashboardLinks} />
        <div className="w-full">
          <ScrollArea className="h-full max-h-[89vh] w-full rounded-md">
            {children}
          </ScrollArea>
        </div>
      </div>
    </main>
  )
}

export default PersonalDashboardLayout