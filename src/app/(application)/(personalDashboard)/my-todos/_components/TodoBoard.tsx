"use client"
import {
    useEffect,
    useState
} from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import Column from "./todoComponents/Column";
import { BurnBarrel } from "./todoComponents/TrashBin";

export type TUserTodo = {
    id: string;
    title: string,
    description: string;
    author: string,
    category: "backlog" | "todo" | "doing" | "done" | string,
}
interface Todo extends Document {
    id: string;
    author: string;
    title: string;
    category: "backlog" | "todo" | "doing" | "done" | string;
    // Add other properties as needed
}

interface TodoBoardProps {
    userId: string;
}

export const TodoBoard = ({
    userId,
    // userTodos
}: TodoBoardProps) => {
    const [cards, setCards] = useState<TUserTodo[]>([]);
    const [append, setAppend] = useState(false);
    console.log(append)
    const getTodos = async () => {
        const response = await fetch('/api/todo');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        setCards(data.map((todo: TUserTodo) => ({
            id: todo.id.toString(),
            author: todo.author.toString(),
            title: todo.title,
            description: todo.description,
            category: todo.category as "backlog" | "todo" | "doing" | "done" | string,
        })))
    }
    useEffect(() => {
        // Fetch todos on component mount
        getTodos();

        // Add event listener for page reload or tab close
        window.addEventListener('beforeunload', getTodos);

        return () => {
            // Clean up event listener on component unmount
            window.removeEventListener('beforeunload', getTodos);
        };
    }, []); // Empty dependency array ensures this effect runs only on mount and unmount

    useEffect(() => {
        // Fetch todos when append state changes
        if (append) {
            getTodos();
        }
    }, [append]); // Dependency array with append state

    return (
        <div className="h-full w-full flex-1 flex flex-col">
            <BurnBarrel
                setCards={setCards}
                author={userId}
            />
            <ScrollArea className="mt-10 h-[50vh]">
                <div className="flex gap-10 w-full mt-10 flex-wrap">
                    <Column
                        title="Ideas"
                        category="ideas"
                        headingColor="text-neutral-500"
                        cards={cards}
                        setCards={setCards}
                        userId={userId}
                        setAppend={setAppend}
                    />
                    <Column
                        title="Consider"
                        category="consider"
                        headingColor="text-red-400"
                        cards={cards}
                        setCards={setCards}
                        userId={userId}
                        setAppend={setAppend}
                    />
                    <Column
                        title="Todo"
                        category="todo"
                        headingColor="text-orange-400"
                        cards={cards}
                        setCards={setCards}
                        userId={userId}
                        setAppend={setAppend}
                    />
                    <Column
                        title="In progress"
                        category="doing"
                        headingColor="text-blue-400"
                        cards={cards}
                        setCards={setCards}
                        userId={userId}
                        setAppend={setAppend}
                    />
                    <Column
                        title="Completed"
                        category="done"
                        headingColor="text-emerald-400"
                        cards={cards}
                        setCards={setCards}
                        userId={userId}
                        setAppend={setAppend}
                    />
                </div>
            </ScrollArea>
        </div>
    );
};