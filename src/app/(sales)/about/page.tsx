import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col gap-10 w-full h-screen items-center justify-center'>
      <Image
        src="/dev.png"
        alt="mess"
        height={768 / 2}
        width={1024 / 2}
        className="object-contain"
      />
      <h2 className='text-5xl font-bold text-center'>Under Construction</h2>
      <Link href="/" className='font-semibold text-lg opacity-75 hover:underline'>Return Home</Link>
    </div>
  )
}

export default page
