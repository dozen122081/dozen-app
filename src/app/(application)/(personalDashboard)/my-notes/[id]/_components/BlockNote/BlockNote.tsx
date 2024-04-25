"use client"
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, lightDefaultTheme } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import "@blocknote/core/fonts/inter.css";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import Link from "next/link";

interface BlockNoteProps {
    userId: string;
    noteId: string;
}
const colorTheme = {
    light: lightDefaultTheme,
    dark: lightDefaultTheme,
};
const BlockNote = ({
    userId,
    noteId
}: BlockNoteProps) => {
    const [blocks, setBlocks] = useState<PartialBlock[]>([]);
    const [noteTitle, setNoteTitle] = useState<string>("")
    const [saving, setSaving] = useState(false);
    const [initialContent, setInitialContent] = useState<
        PartialBlock[] | undefined | "loading"
    >("loading");

    const getNotes = async () => {
        const response = await fetch(`/api/personalnote?noteId=${noteId}`);
        const data = await response.json();
        console.log("content: ");
        setNoteTitle(data.title)
        return data ? (JSON.parse(data.content)) as PartialBlock[] : undefined
    }

    useEffect(() => {
        getNotes().then((content) => {
            setInitialContent(content)
        })
    }, [])

    const editor = useMemo(() => {
        if (initialContent === "loading") {
            return null;
        }
        return BlockNoteEditor.create({ initialContent });
    }, [initialContent]);

    if (editor === null) {
        return (
            <div className='h-screen w-full flex justify-center items-center'>
                {/* <FaSpinner className='h-7 w-7 animate-spin' /> */}
                <div className='flex flex-col gap-2 items-center'>
                    <span className="loading loading-dots loading-lg"></span>
                    <span>Loading...</span>
                </div>
            </div>
        );
    }
    const handleSubmit = async (id: string) => {
        setSaving(true)
        try {
            const response = await fetch("/api/personalnote", {
                method: "PUT",
                body: JSON.stringify({
                    content: blocks,
                    author: id,
                    noteId: noteId,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Error submitting data");
            }
            setSaving(false)

        } catch (error) {
            console.error("error", error);
        }
    };

    return (
        <div className="rounded-lg w-full  max-h-[90vh] overflow-auto">
            <nav className="flex w-full items-center justify-between lg:pt-7 pb-3 border-b">
                <div className="flex items-center gap-2">
                    <Link href="/my-notes">
                        <ChevronLeft className="h-4 w-4"/>
                    </Link>
                    <Label>
                        {noteTitle}
                    </Label>
                </div>
                <Button onClick={() => handleSubmit(userId)}>
                    {
                        saving ? (
                            <span>Saving...</span>
                        ) : (
                            <span>Save</span>
                        )
                    }
                </Button>
            </nav>
            <BlockNoteView
                editor={editor}
                onChange={() => {
                    setBlocks(editor.document);
                }}
                theme={colorTheme}
            />
        </div>
    );
}
export default BlockNote
