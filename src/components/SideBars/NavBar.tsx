import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const NavBar = () => {
  return (
    <nav className='border-b-2 flex items-center justify-between p-4'>
        <div>
            <h2 className='text-2xl font-bold'>Dozen</h2>
        </div>
        <div className='flex items-center gap-7 font-medium text-sm'>
            <div>
              <Link href="/workspace">
                My Workspaces
              </Link>
            </div>
            <UserButton afterSignOutUrl='/'/>
        </div>
    </nav>
  )
}

export default NavBar