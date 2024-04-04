"use client"
import { UserData } from '@/app/api/user/route';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

const page = () => {
    const { user } = useUser()
    const [userData, setUserData] = useState<UserData>();
    const [error, setError] = useState<string | null>(null);
    const [showNav, setShowNav] = useState(false);
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
    return (
        <div>Personal Dashboard 1</div>
    )
}

export default page