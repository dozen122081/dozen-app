import { UserButton } from '@clerk/nextjs'

const NavBar = () => {
  return (
    <nav className='border-b-2 flex items-center justify-between p-4'>
        <div>
            <h2 className='text-2xl font-bold'>Dozen</h2>
        </div>
        <div>
            <UserButton afterSignOutUrl='/'/>
        </div>
    </nav>
  )
}

export default NavBar