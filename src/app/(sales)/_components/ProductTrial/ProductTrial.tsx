"use client"
import React, { useEffect, useState } from 'react'
import TriDashboard from './TriDashboard/TriDashboard'
import { TriTodo } from './TriTodo/TriTodo'
import TriTomorrow from './TriTomorrow/TriTomorrow'
import TriToday from './TriToday/TriToday'
import TriStickyNote from './TriStickyNote/TriStickyNote'
export type ColumnType = "backlog" | "todo" | "doing" | "done";

export type CardType = {
  title: string;
  id: string;
  column: ColumnType;
};

export const DEFAULT_CARDS: CardType[] = [
  { title: "Look into render bug in dashboard", id: "1", column: "backlog" },
  { title: "SOX compliance checklist", id: "2", column: "backlog" },
  { title: "[SPIKE] Migrate to Azure", id: "3", column: "backlog" },
  { title: "Document Notifications service", id: "4", column: "backlog" },
  {
    title: "Research DB options for new microservice",
    id: "5",
    column: "todo",
  },
  { title: "Postmortem for outage", id: "6", column: "todo" },
  { title: "Sync with product on Q3 roadmap", id: "7", column: "todo" },

  {
    title: "Refactor context providers to use Zustand",
    id: "8",
    column: "doing",
  },
  { title: "Add logging to daily CRON", id: "9", column: "doing" },
  {
    title: "Set up DD dashboards for Lambda listener",
    id: "10",
    column: "done",
  },
];
export type TPersonalTomorrow = {
  id: string,
  title: string,
  completed: boolean
  taskFor: 'tomorrow' | "today"
}
export type TStickyNotes = {
  id: string;
  title: string,
  description: string;
  backgroundColor: string,
}
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

const ProductTrial = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);
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
      <TriTodo cards={cards} setCards={setCards} />
      <TriToday
        personalTasks={personalTomorrows}
        setPersonalTasks={setPersonalTomorrows}
        incompleteTasks={incompleteTomorrows}
        setIncompleteTasks={setIncompleteTomorrows}
        completedTasks={completedTomorrows}
        setCompletedTasks={setCompletedTomorrows}
      />
      <TriTomorrow
        personalTasks={personalTomorrows}
        setPersonalTasks={setPersonalTomorrows}
        incompleteTasks={incompleteTomorrows}
        setIncompleteTasks={setIncompleteTomorrows}
      />
      <TriStickyNote
        notes={notes}
        setNotes={setNotes}
      />
    </div>
  )
}

export default ProductTrial
