"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import BlockNote from "./_components/BlockNote/BlockNote";

export function getIdFromWorkspaceUrl(url: string) {
    const regex = /my-notes\/([a-f0-9]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}
const page = () => {
    const { user } = useUser();
    const [noteId, setNoteId] = useState<string | null>(null);
    useEffect(() => {
        const url = window.location.href;
        setNoteId(getIdFromWorkspaceUrl(url));
    }, []);

    if (!user || !noteId) return null;
    return (
        <div className="w-full flex justify-center lg:border-l pl-1">
            <BlockNote userId={user.id} noteId={noteId} />
        </div>
    );
};

export default page;
