'use client'
import React, { useState } from 'react'
import TriTomorrow from './TriTomorrow'
import { TPersonalTomorrow } from '../ProductTrial';

const completedTasks: TPersonalTomorrow[] = [
    {
        id: "3",
        title: "Prepare presentation slides",
        completed: true,
        taskFor: "today",
    },
    {
        id: "5",
        title: "Review meeting agenda",
        completed: true,
        taskFor: "tomorrow",
    },
  ];
  

const page = () => {
    const [personalTomorrows, setPersonalTomorrows] = useState<TPersonalTomorrow[]>([]);
    const [incompleteTomorrows, setIncompleteTomorrows] = useState<TPersonalTomorrow[]>(completedTasks);
  return (
    <div>
     <TriTomorrow
        personalTasks={personalTomorrows}
        setPersonalTasks={setPersonalTomorrows}
        incompleteTasks={incompleteTomorrows}
        setIncompleteTasks={setIncompleteTomorrows}
      />
    </div>
  )
}

export default page
