import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { IoSettings } from "react-icons/io5";

const NavBar = () => {
  return (
    <nav className='border-b-2 flex items-center justify-between p-4'>
        <div>
            <h2 className='text-2xl font-bold'>Dozen</h2>
        </div>
        <div className='flex items-center gap-7 font-medium text-sm'>
            <div className='flex gap-4 items-center'>
              <Link href="/features" className='hover:underline transition-all duration-300'>
                Feature Board
              </Link>
              <Link href="/workspace" className='hover:underline transition-all duration-300'>
                My Workspaces
              </Link>
              <Link href="/settings" className='hover:underline transition-all duration-300'>
                <IoSettings />
              </Link>
            </div>
            <UserButton afterSignOutUrl='/'/>
        </div>
    </nav>
  )
}

export default NavBar