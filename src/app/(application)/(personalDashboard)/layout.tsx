"use client"
import { UserData } from '@/app/api/user/route';
import AsideBar from "@/components/SideBars/AsideBar";
import NavBar from "@/components/SideBars/NavBar";
import AppPaymentUi from '@/components/paymentUi/AppPaymentUi';
import { ScrollArea } from "@/components/ui/scroll-area";
import { personalDashboardLinks } from "@/lib/constants/personalDashboard/personalDashboardLinks";
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import "../../globals.css";
const PersonalDashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
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
  if(!userData.onboarded) redirect("/onboarding")
  if(!userData.hasPaid) {
      return <AppPaymentUi />
  }
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