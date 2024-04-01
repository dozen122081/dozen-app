"use client"
import {
    useEffect,
    useState
} from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { WsBurnBarrel } from "./WorkspaceTodoComponents/wsTrashbin";
import WsColumn from "./WorkspaceTodoComponents/wsColumn";

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
    workspaceId: string;
}


const WorkspaceTodoBoard = ({
    userId,
    workspaceId
    // userTodos
}: TodoBoardProps) => {
    const [cards, setCards] = useState<TUserTodo[]>([]);
    const [append, setAppend] = useState(false);
    console.log(append)
    const getTodos = async () => {
        const response = await fetch(`/api/workspace/todo?workspaceId=${workspaceId}`);
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
            <WsBurnBarrel
                setCards={setCards}
                author={userId}
            />
            <ScrollArea className="mt-10 md:h-[60vh] w-full">
                <div className="flex gap-10 w-full mt-10 md:mx-10 md:h-[70vh] justify-center md:justify-start flex-wrap">
                    <WsColumn
                        title="Ideas"
                        category="ideas"
                        headingColor="text-neutral-500"
                        cards={cards}
                        setCards={setCards}
                        userId={userId}
                        setAppend={setAppend}
                        workspaceId={workspaceId}
                    />
                    <WsColumn
                        title="Consider"
                        category="consider"
                        headingColor="text-red-400"
                        cards={cards}
                        setCards={setCards}
                        userId={userId}
                        setAppend={setAppend}
                        workspaceId={workspaceId}
                    />
                    <WsColumn
                        title="Todo"
                        category="todo"
                        headingColor="text-orange-400"
                        cards={cards}
                        setCards={setCards}
                        userId={userId}
                        setAppend={setAppend}
                        workspaceId={workspaceId}
                    />
                    <WsColumn
                        title="In progress"
                        category="doing"
                        headingColor="text-blue-400"
                        cards={cards}
                        setCards={setCards}
                        userId={userId}
                        setAppend={setAppend}
                        workspaceId={workspaceId}
                    />
                    <WsColumn
                        title="Completed"
                        category="done"
                        headingColor="text-emerald-400"
                        cards={cards}
                        setCards={setCards}
                        userId={userId}
                        setAppend={setAppend}
                        workspaceId={workspaceId}
                    />
                </div>
            </ScrollArea>
        </div>
    )
}

export default WorkspaceTodoBoard