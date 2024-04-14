import React, { Dispatch, SetStateAction } from 'react'
import { TStickyNotes } from '../ProductTrial';
import TriWsStickyNotes from './TriWsStickyNotes'
interface Props {
    notes: TStickyNotes[];
    setNotes: Dispatch<SetStateAction<TStickyNotes[]>>
}
const TriStickyNote = ({
    notes,
    setNotes
}: Props) => {
    return (
        <main className='px-5 py-10 w-full'>
            <div>
                <h1 className="text-3xl font-bold">All of your flash notes</h1>
            </div>
            <div className='w-full lg:max-w-[90vw]'>
                <TriWsStickyNotes
                    notes={notes}
                    setNotes={setNotes}
                />
            </div>
        </main>
    )
}

export default TriStickyNote