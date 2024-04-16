"use client"
import { Link } from 'next-view-transitions'
import React from 'react'
import { Button } from '../ui/button'

const AppPaymentUi = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <div className='flex flex-col gap-4 items-center'>
        <div className='text-center'>
          <h2 className='text-2xl'>Please Complete Your Order to continue using DoZen</h2>
          {/* <p className='text-sm text-muted-foreground'>It's just NPR.2500 for users in Nepal and just $23.25 for users outside Nepal</p> */}
        </div>
        <Link href="/apppayment">
          <Button>
            Complete order
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default AppPaymentUi
