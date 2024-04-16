"use client";
import { Separator } from '@/components/ui/separator';
import { cn, getIdFromWorkspaceUrl } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import React, { useEffect, useState } from 'react';

export type TStickyNotes = {
    id: string;
    title: string;
    description: string;
    author: string;
    backgroundColor: string;
    workspaceId: string;
};

const StickyNotes = () => {
    const [notes, setNotes] = useState<TStickyNotes[]>([]);

    // Extract workspaceId from URL on initial render only
    const [fullUrl, setFullUrl] = useState('');
    const [workspaceId, setWorkspaceId] = useState<string | null>(null);

    useEffect(() => {
        // **Warning:** Using window.location can be a security risk. Consider alternative approaches.
        const url = window.location.href;
        setFullUrl(url);
        const extractedWorkspaceId = getIdFromWorkspaceUrl(url);
        setWorkspaceId(extractedWorkspaceId);
    }, []);

    useEffect(() => {
        const getTodos = async () => {
            if (!workspaceId) return; // Early exit if no workspaceId

            const response = await fetch(`/api/workspace/stickynote?workspaceId=${workspaceId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setNotes(data.map((todo: any) => ({
                id: todo.id.toString(),
                workspaceId: todo.workspaceId,
                author: todo.author.toString(),
                title: todo.title,
                description: todo.description,
                backgroundColor: todo.backgroundColor,
            })));
        };
        getTodos();
    }, [workspaceId]); // Re-fetch only when workspaceId changes

    if (!fullUrl) return null;

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
                        <Link
                            href={`/workspace/${workspaceId}/stickynotes`}
                            className={cn("flex flex-col gap-1.5 h-full w-full rounded-md")}
                        >
                            <h3 className='text-sm font-semibold'>{note.title}</h3>
                            <Separator className='bg-neutral-900' />
                            <p className='text-wrap overflow-hidden'>{note.description}</p></Link>
                    </aside>
                ))}
            </div>
        </div>
    );
};

export default StickyNotes;
