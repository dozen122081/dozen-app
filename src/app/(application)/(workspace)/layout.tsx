import WorkspaceSideBar from "@/components/SideBars/WorkspaceSideBar/WorkspaceSideBar"
import { cn } from "@/lib/utils"
import { Work_Sans } from "next/font/google"

const workSans = Work_Sans({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})
const WorkspaceLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <div className={cn("", workSans.className)}>
      <div className="flex ">
        <main className="w-full">
          {children}
        </main>
      </div>
    </div>
  )
}

export default WorkspaceLayout