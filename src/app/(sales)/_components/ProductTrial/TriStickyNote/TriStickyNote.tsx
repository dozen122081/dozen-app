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
        <div className="mockup-browser border bg-base-300">
            <div className="mockup-browser-toolbar">
                <div className="input">https://dozen-app.vercel.app/workspace/6641468301d0ea85a6280dda/stickynotes</div>
            </div>
            <div className="flex justify-center px-4 py-16 bg-base-200">
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
            </div>
        </div>

    )
}

export default TriStickyNote