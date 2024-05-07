'use client'
import React, { useState } from 'react'
import TriStickyNote from './TriStickyNote'
import { TStickyNotes } from '../ProductTrial';

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

    const [notes, setNotes] = useState<TStickyNotes[]>(dummyNotes);    
  return (
    <div>
      <TriStickyNote
        notes={notes}
        setNotes={setNotes}
      />
      
    </div>
  )
}

export default page
