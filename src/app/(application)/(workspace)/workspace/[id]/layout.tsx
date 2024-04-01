import WorkspaceSideBar from '@/components/SideBars/WorkspaceSideBar/WorkspaceSideBar'
import React from 'react'

const layout = ({ children }: {
  children: React.ReactNode
}) => {
  return (
    <div>
      <div className='flex'>
        <WorkspaceSideBar />
        <main className='w-full'>
          {children}
        </main>
      </div>
    </div>
  )
}

export default layout