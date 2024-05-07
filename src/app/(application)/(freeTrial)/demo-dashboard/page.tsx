"use client"

import React, { useEffect, useState } from 'react'
import TriDashboard from './TriDashboard'
import { TPersonalTomorrow, TStickyNotes } from '../ProductTrial';


const incompleteTasks: TPersonalTomorrow[] = [
    {
        id: "1",
        title: "Complete project proposal",
        completed: false,
        taskFor: "tomorrow",
    },
    {
        id: "2",
        title: "Call client for follow-up",
        completed: false,
        taskFor: "tomorrow",
    },
    {
        id: "4",
        title: "Send report to manager",
        completed: false,
        taskFor: "today",
    },
  ];
  
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

  const dummyNotes: TStickyNotes[] = [
    {
        id: "1",
        title: "Meeting Agenda",
        description: "Discuss project milestones and deliverables.",
        backgroundColor: "#f1f58f",
    },
    {
        id: "2",
        title: "Grocery List",
        description: "Milk, bread, eggs, fruits, vegetables.",
        backgroundColor: "#fff385",
    },
    {
        id: "3",
        title: "Birthday Party Planning",
        description: "Theme: Superheroes. Guests: 15.",
        backgroundColor: "#ffa930",
    },
    {
        id: "4",
        title: "Daily Goals",
        description: "Complete tasks: A, B, and C. Exercise for 30 minutes.",
        backgroundColor: "#ff32b2",
    },
    {
      id: "5",
      title: "Vacation Planning",
      description: "Destination: Bali. Dates: June 15th - June 30th.",
      backgroundColor: "#a9edf1",
  },
  ];

const page = () => {
    const [personalTomorrows, setPersonalTomorrows] = useState<TPersonalTomorrow[]>([]);
    const [incompleteTomorrows, setIncompleteTomorrows] = useState<TPersonalTomorrow[]>(incompleteTasks);
    const [completedTomorrows, setCompletedTomorrows] = useState<TPersonalTomorrow[]>(completedTasks);
    const [notes, setNotes] = useState<TStickyNotes[]>(dummyNotes);
    const [onClient, setOnClient] = useState(false);
    useEffect(() => {setOnClient(true)}, [])
    if(!onClient) return null;
    return (
    <div className='flex flex-col gap-7'>
      <TriDashboard
        personalTasks={personalTomorrows}
        setPersonalTasks={setPersonalTomorrows}
        completedTasks={completedTomorrows}
        setCompletedTasks={setCompletedTomorrows}
        incompleteTasks={incompleteTomorrows}
        setIncompleteTasks={setIncompleteTomorrows}
        notes={notes}
        setNotes={setNotes}
      />
      
    </div>
  )
}

export default page
