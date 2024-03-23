"use client"
import {
    Dispatch, DragEvent, SetStateAction,
    useState
} from "react";
import { FaFire } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";

import { CardType } from "@/lib/types/TodoTypes";
import { usePathname } from "next/navigation";
import { deletePersonalTodo } from "@/lib/backend-actions/personaltodo.actions";
export const BurnBarrel = ({
    setCards,
    author,
}: {
    setCards: Dispatch<SetStateAction<CardType[]>>;
    author: string;
}) => {
    const pathname = usePathname()
    const [active, setActive] = useState(false);

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        setActive(true);
    };

    const handleDragLeave = () => {
        setActive(false);
    };

    const handleDragEnd = async (e: DragEvent) => {
        const cardId = e.dataTransfer.getData("cardId");

        setCards((pv) => pv.filter((c) => c.id !== cardId));
        await deletePersonalTodo({
            id: cardId,
            path: pathname,
            author,
        })

        setActive(false);
    };

    return (
        <div
            onDrop={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`h-40 w-full flex items-center justify-center rounded border text-3xl ${active
                    ? "border-red-800 bg-red-800/20 text-red-500"
                    : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
                }`}
        >
            {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
        </div>
    );
};

