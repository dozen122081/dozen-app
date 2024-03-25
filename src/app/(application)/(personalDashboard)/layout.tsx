import AsideBar from "@/components/SideBars/AsideBar";
import NavBar from "@/components/SideBars/NavBar";
import { personalDashboardLinks } from "@/lib/constants/personalDashboard/personalDashboardLinks";
import "../../globals.css";
const PersonalDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <main className="flex flex-col">
      <NavBar />
      <div className="flex">
        <AsideBar navLinksData={personalDashboardLinks}/>
        <div className="w-full">
          {children}
        </div>
      </div>
    </main>
  )
}

export default PersonalDashboardLayout