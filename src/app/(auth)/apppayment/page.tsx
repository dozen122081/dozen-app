"use client"
import React, { useEffect, useState } from 'react';
import { fetchUserData } from '@/lib/backend-actions/user.actions';
import MaxWidthWrapper from '@/lib/MaxWidthWrapper';
import { currentUser, useUser } from '@clerk/nextjs';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { redirect } from 'next/navigation';
import PaypalPayment from './_component/PaypalPayment';
import EsewaPayment from './_component/EsewaPayment';
import { Link } from 'next-view-transitions';

const Page = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [isFromNepal, setIsFromNepal] = useState(null);
  const [onClient, setOnClient] = useState(false);
  const [clientIp, setClientIp] = useState("")

  useEffect(() => {
    setOnClient(true);
    const fetchData = async () => {
      if (!user) return null;

      // get user data from db 
      const userDataFromDb = await fetchUserData(user.id);
      console.log(userDataFromDb);

      setUserData(userDataFromDb);
    };
    fetchData();
  }, []);

  useEffect(() => {
    async function getClientIP() {
      try {
        const response = await fetch('https://api64.ipify.org?format=json');
        const data = await response.json();
        setClientIp(data.ip)
      } catch (error) {
        console.error('Error getting client IP:', error);
      }
    }

    getClientIP();

  }, [onClient]);

  useEffect(() => {
    const fetchIPDetails = async () => {
      try {
        if (!clientIp) return; // Return if clientIp is not available yet
        const response = await fetch(`/api/checkip?clientip=${clientIp}`);
        if (!response.ok) {
          throw new Error('Failed to fetch IP details');
        }
        const data = await response.json();
        setIsFromNepal(data.isFromNepal);
      } catch (error) {
        console.error('Error fetching IP details:', error);
      }
    };

    fetchIPDetails();
  }, [clientIp]); // Run only when clientIp changes

  if (!onClient || isFromNepal === null) return null;

  console.log("is from nepal: ", isFromNepal);

  return (
    <main className='grid grid-rows-2 lg:grid-cols-2 w-full h-full lg:max-h-screen'>
      <section className='bg-slate-800 flex flex-col p-7 lg:h-screen'>
        <div className=''>
          <Link href="/">
            <h1 className='text-slate-100 font-semibold'>DoZen</h1>
          </Link>
        </div>
        <div className='flex flex-col justify-center h-full gap-2 text-slate-100'>
          <div className=''>
            <h2 className='text-5xl lg:text-7xl font-medium'>Get life time</h2>
            <h2 className='text-5xl lg:text-7xl font-medium'>access at just</h2>
          </div>
          {/* {
            isFromNepal ? (
              <>
                <h2 className='text-5xl lg:text-7xl font-semibold '>NPR. 2, 500</h2>
              </>
            ) : (
              <h2 className='text-5xl lg:text-7xl font-semibold '>At just $23.25</h2>
            )
          } */}
          <h2 className='text-5xl lg:text-7xl font-semibold '>NPR. 150</h2>
        </div>
      </section>
      <div className='flex items-center justify-center lg:h-screen'>
        {/* {
          isFromNepal ? (
            <>
              <EsewaPayment />
            </>
          ) : (
            <>
              <PaypalPayment />
            </>
          )
        } */}
        <EsewaPayment />
      </div>
    </main>
  );
};

export default Page;


/// might use:
{/* <main className='flex flex-col justify-center items-center h-screen gap-3'>
<section>
  <h1 className='text-3xl font-semibold'>Get Life Time access at just</h1>
</section>
<div className='flex flex-col h-[34rem] lg:flex-row items-center justify-center gap-7'>
  <EsewaPayment />
  <div>
    <h3>Or</h3>
  </div>
  <PaypalPayment />
</div>
</main> */}