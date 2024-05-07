"use client"
import React, { Dispatch, SetStateAction } from 'react'
import { TPersonalTomorrow, TStickyNotes } from '../ProductTrial'
import TriDChart from './TriDChart';
import TriDStickyNote from './TriDStickyNote';
import TriDToday from './TriDToday'
import TriDTomorrow from './TriDTomorrow';
interface Props {
  personalTasks: TPersonalTomorrow[];
  setPersonalTasks: Dispatch<SetStateAction<TPersonalTomorrow[]>>;
  incompleteTasks: TPersonalTomorrow[];
  setIncompleteTasks: Dispatch<SetStateAction<TPersonalTomorrow[]>>
  completedTasks: TPersonalTomorrow[];
  setCompletedTasks: Dispatch<SetStateAction<TPersonalTomorrow[]>>;
  notes: TStickyNotes[];
  setNotes: Dispatch<SetStateAction<TStickyNotes[]>>
}

const TriDashboard = (
  {
    personalTasks,
    setPersonalTasks,
    incompleteTasks,
    setIncompleteTasks,
    completedTasks,
    setCompletedTasks,
    notes,
    setNotes,
  }: Props
) => {

  return (
    <div>
      <section className='flex flex-col gap-10 p-4 min-h-screen border-2'>
        <div className='flex flex-col lg:grid lg:grid-cols-2 gap-10'>
          <TriDToday
            setPersonalTasks={setPersonalTasks}
            incompleteTasks={incompleteTasks}
            setIncompleteTasks={setIncompleteTasks}
            completedTasks={completedTasks}
            setCompletedTasks={setCompletedTasks}
          />
          <TriDChart />
        </div>
        <div className='flex flex-col lg:grid lg:grid-cols-2 gap-10'>
          <TriDStickyNote notes={notes} />
          <TriDTomorrow
            setPersonalTasks={setPersonalTasks}
            incompleteTasks={incompleteTasks}
            setIncompleteTasks={setIncompleteTasks}
            completedTasks={completedTasks}
            setCompletedTasks={setCompletedTasks}
          />
        </div>
      </section>
    </div>
  )
}

export default TriDashboard
