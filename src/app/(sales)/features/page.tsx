"use client"
import { useUser } from '@clerk/nextjs'
import { Link } from 'next-view-transitions'
import React from 'react'
import Navbar from '../_components/Navbar/Navbar'
import FeatureTodoBoard from './_components/FeatureBoard'

const page = () => {
  const {user} = useUser()

  return (
    <div className='flex flex-col px-5'>
      <nav>
       <Navbar />
      </nav>
      <div>
        <h2 className='font-bold text-xl text-center'>Feature Board For Users</h2>
      </div>
      <FeatureTodoBoard userId={user?.id}/>
    </div>
  )
}

export default page
