"use client"
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import React, { Dispatch, SetStateAction } from 'react'
import { TStickyNotes } from '../ProductTrial';
interface Props {
  notes: TStickyNotes[];
}
const TriDStickyNote = ({
notes
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <h2>Your notes</h2>
      </div>
      <div className='flex flex-row flex-wrap justify-between gap-5'>
        {notes.slice(0, 6).map((note) => (
          <aside
            key={note.id}
            style={{
              backgroundColor: note.backgroundColor
            }}
            className={cn(" h-[8.5rem] w-[7rem] p-2 rounded-md")}
          >
            <div
              className={cn("flex flex-col gap-1.5 h-full w-full rounded-md")}
            >
              <h3 className='text-sm font-semibold truncate text-nowrap'>{note.title}</h3>
              <Separator className='bg-neutral-900' />
              <p className='text-wrap overflow-hidden'>{note.description}</p>
            </div>
          </aside>
        ))}
      </div>
    </div>
  )
}

export default TriDStickyNote