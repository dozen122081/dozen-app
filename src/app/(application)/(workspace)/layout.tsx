"use client"
import { UserData } from '@/app/api/user/route'
import AppPaymentUi from "@/components/paymentUi/AppPaymentUi"
import { cn } from "@/lib/utils"
import { useUser } from "@clerk/nextjs"
import { Work_Sans } from "next/font/google"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

const workSans = Work_Sans({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})
const WorkspaceLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  const { user } = useUser()
  const [userData, setUserData] = useState<UserData>();
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/user');
        if (!response.ok) {
          throw new Error(await response.text());
        }
        const data = await response.json();
        setUserData(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);
  if (!user || !userData) return null;
  if (!userData.onboarded) redirect("/onboarding")
  if (!userData.hasPaid || !userData.hasPaidWorkspace) {
    return <AppPaymentUi />
  }
  return (
    <div className={cn("", workSans.className)}>
      <main className="w-full">
        {children}
      </main>
    </div>
  )
}

export default WorkspaceLayout