import React from 'react'
import ProgressChart from '../ProgressChart/ProgressChart'
import StickyNotes from './StickyNotes/StickyNotes'
import TasksToday from './TasksToday/TasksToday'
import TasksTomorrow from './TasksTomorrow/TasksTomorrow'

const Dashboard = () => {
  return (
    <section className='flex flex-col gap-10 p-4 min-h-screen border-2'>
      <div className='grid grid-cols-2 gap-10'>
        <TasksToday />
        <ProgressChart />
      </div>
      <div className='grid grid-cols-2 gap-10 h-full'>
        <StickyNotes />
        <TasksTomorrow />
      </div>
    </section>
  )
}

export default Dashboard