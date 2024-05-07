"use client"
import React, { useState } from 'react'
import { TriTodo } from './TriTodo';
import { ColumnType } from '../ProductTrial';

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

const page = () => {

  const [cards, setCards] = useState(DEFAULT_CARDS);
  return (
    <div>
      <TriTodo cards={cards} setCards={setCards} />
    </div>
  )
}

export default page
