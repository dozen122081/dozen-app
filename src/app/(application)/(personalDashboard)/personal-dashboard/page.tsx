"use client"
import { UserData } from '@/app/api/user/route';
import AppPaymentUi from '@/components/paymentUi/AppPaymentUi';
import { useUser } from '@clerk/nextjs';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

const page = () => {
    const { user } = useUser()
    const [userData, setUserData] = useState<UserData>();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true)
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
            } finally {
                setIsLoading(false)
            }
        };

        fetchData();
    }, []);
    if (!user) return null;
    if (isLoading || !userData) {
        return (
            <div className='h-screen w-full flex justify-center items-center'>
                {/* <FaSpinner className='h-7 w-7 animate-spin' /> */}
                <div className='flex flex-col gap-2 items-center'>
                    <span className="loading loading-dots loading-lg"></span>
                    <span>Loading...</span>
                </div>
            </div>
        )
    }
    if (!userData.onboarded) redirect("/onboarding")
    if (!userData.hasPaid) {
        return <AppPaymentUi />
    }
    return (
        <div className='mx-6 md:mx-10 h-[80vh] flex flex-col justify-center items-center w-full'>
            <div>
                <Image
                    src="/assets/illustrations/27.webp"
                    width={2500}
                    height={1778}
                    alt="under construction"
                    className='h-[24rem] w-[34rem]'
                />
            </div>
            <div className='flex w-full flex-col gap-2 items-center'>
                <h2 className='font-semibold text-lg'>This area is under development.</h2>
                <p>Please visit workspaces for normal task flow.</p>
                <Link href="/workspace">
                    <button className="flex gap-2  items-center rounded-2xl border-2 border-solid border-black bg-white px-3 py-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
                        Visit <ArrowRight />
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default page