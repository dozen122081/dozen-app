"use client"
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ChevronRight, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface NotesProps {
    userId: string;
}
export type TPersonalNotes = {
    id: string,
    title: string,
    content: string,
    author: string,
}
const initialContent = [
    {
        type: "paragraph",
        content: "Your Creativity Flows Here",
    },
]
const Notes = ({
    userId
}: NotesProps) => {
    const [title, setTitle] = useState("set new title");
    const [notes, setNotes] = useState<TPersonalNotes[]>([]);
    const [onClient, setOnClient] = useState(false);
    const [append, setAppend] = useState(false);
    const router = useRouter();
    useEffect(() => { setOnClient(true) }, [])
    useEffect(() => {
        const getNotes = async () => {
            const response = await fetch('/api/personalnotes');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setNotes(data.map((note: TPersonalNotes) => ({
                id: note.id.toString(),
                author: note.author.toString(),
                title: note.title,
                content: note.content,
            })))
            console.log(notes)
        }
        getNotes()
    }, [onClient, append])
    const addNote = async () => {
        setAppend(true);
        try {
            const response = await fetch("/api/personalnote", {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    author: userId,
                    content: initialContent,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Error submitting title");
            }
            console.log(response);
        } catch (error) {
            console.error("error: ", error);
        }
        setAppend(false);
    };
    const deleteNote = async (noteId: string) => {
        setAppend(true);
        try {
            const response = await fetch("/api/personalnote", {
                method: "DELETE",
                body: JSON.stringify({
                    noteId: noteId,
                    author: userId,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Error submitting title");
            }
            console.log(response);
        } catch (error) {
            console.error("error: ", error);
        }
        setAppend(false);
    };
    return (
        <ScrollArea>
            <div className="flex p-10 justify-start gap-10">
                <Sheet>
                    <SheetTrigger
                        className="px-7 py-2 text-xl w-56 h-28 border-2 
                border-dotted border-slate-400 rounded-xl"
                    >
                        Add note
                    </SheetTrigger>
                    <SheetContent className='flex flex-col gap-2'>
                        <SheetHeader>
                            <SheetTitle>Note Title</SheetTitle>
                            <Input
                                id="name"
                                defaultValue="Untitled"
                                onChange={(e) => setTitle(e.target.value)}
                                className="col-span-3 p-1 bg-neutral-50 rounded-lg border-2 border-slate-400"
                            />
                            <SheetDescription>
                                Create notes that help you organize and recall
                            </SheetDescription>
                        </SheetHeader>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button 
                                    type="button" onClick={addNote}
                                    className="w-full"
                                >
                                    Create
                                </Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
                <div className="flex flex-wrap gap-10">
                    {notes.map((note) => (
                        <aside
                            key={note.id}
                            className="flex flex-col gap-1 w-[250px] border px-2 rounded-lg"
                        >
                            <div className='flex flex-row flex-nowrap items-center justify-between'>
                                <h4 className='truncate font-semibold text-lg'>{note.title}</h4>
                                <Button
                                    variant={"ghost"}
                                    onClick={() => deleteNote(note.id)}
                                    className="px-0 text-red-500 hover:bg-transparent hover:text-slate-900"
                                >
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                            <Separator className="my-1" />
                            <section>
                                <Button
                                    variant={"outline"}
                                    className="w-full"
                                    onClick={() => router.push(`/my-notes/${note.id}`)}
                                >
                                    Enter Note <ChevronRight className='h-4 w-4' />
                                </Button>
                            </section>
                        </aside>
                    ))}
                </div>
            </div>
        </ScrollArea>
    )
}

export default Notes