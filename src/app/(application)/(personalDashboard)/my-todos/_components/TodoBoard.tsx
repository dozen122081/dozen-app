"use client"
import {
    useEffect,
    useState
} from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import Column from "./todoComponents/Column";
import { BurnBarrel } from "./todoComponents/TrashBin";
import { fetchTodos } from "@/lib/backend-actions/personaltodo.actions";

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
        const todos = await fetchTodos(userId);

        setCards(todos.map((todo) => ({
            id: todo.id.toString(), // Assuming _id is an ObjectId and converted to string
            author: todo.author.toString(),
            title: todo.title,
            description: todo.description,
            category: todo.category as "backlog" | "todo" | "doing" | "done" | string, // Adjust as needed
        })))
    }
    useEffect(() => {
        getTodos()
        // Polling interval (fetch new data every 5 seconds)
    }, [append, setCards])

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