"use client"
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import { BiDoorOpen } from 'react-icons/bi'

const Setting = () => {
  return (
    <div>
      <div>
        <Link
          href="/personal-dashboard"
          className={cn(
            "py-3 px-4 font-semibold rounded-md flex gap-1 items-center",
          )}
        >
          <BiDoorOpen className='h-4 w-4' />
          <span className='text-sm'> Back to home</span>
        </Link>
      </div>
      <div className='text-center '>
        <h3>
          Select The features you like to use in your dashboard!
        </h3>
      </div>
      <div className='flex justify-center items-center'>
        <div className='w-[80%] h-[50vh] '>
          <ul className='flex items-center p-2 justify-around' >
            <li>Tomorrow</li>
            <li>Focus Clock</li>
            <li>Sticky Notes</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Setting
