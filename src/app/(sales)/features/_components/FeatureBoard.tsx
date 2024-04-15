"use client"
import {
    useEffect,
    useState
} from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import FbColumn from "./todoboard/FbColumn";
import { UserData } from "@/app/api/user/route";

export type TUserTodo = {
    id: string;
    title: string,
    description: string;
    author: string;
    authorEmail: string;
    authorImage: string;
    category: "backlog" | "todo" | "doing" | "done" | string;
}

interface TodoBoardProps {
    userId?: string;
}


const FeatureTodoBoard = ({
    userId,
}: TodoBoardProps) => {
    const [cards, setCards] = useState<TUserTodo[]>([]);
    const [append, setAppend] = useState(false);
    console.log(append)
    const getTodos = async () => {
        const response = await fetch(`/api/featureboard`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        setCards(data.map((todo: TUserTodo) => ({
            id: todo.id.toString(),
            author: todo.author.toString(),
            authorEmail: todo.authorEmail,
            authorImage: todo.authorImage,
            title: todo.title,
            description: todo.description,
            category: todo.category as "backlog" | "todo" | "doing" | "done" | string,
        })))
    }
    useEffect(() => {
        getTodos();

        window.addEventListener('beforeunload', getTodos);
        return () => {
            window.removeEventListener('beforeunload', getTodos);
        };
    }, []);

    useEffect(() => {
        if (append) {
            getTodos();
        }
    }, [append]);
    return (
        <div className="h-full w-full flex-1 flex flex-col">
            {/* <WsBurnBarrel
                setCards={setCards}
                author={userId}
            /> */}
            <ScrollArea className="mt-10 md:h-[80vh] w-full">
                <div className="flex gap-10 w-full mt-10 md:mx-10 md:h-[70vh] justify-center md:justify-start flex-wrap">
                    <FbColumn
                        title="Ideas"
                        category="ideas"
                        headingColor="text-neutral-500"
                        cards={cards}
                        setCards={setCards}
                        userId={userId}
                        setAppend={setAppend}
                        />
                    <FbColumn
                        title="Consider"
                        category="consider"
                        headingColor="text-red-400"
                        cards={cards}
                        setCards={setCards}
                        userId={userId}
                        setAppend={setAppend}
                        />
                    <FbColumn
                        title="Todo"
                        category="todo"
                        headingColor="text-orange-400"
                        cards={cards}
                        setCards={setCards}
                        userId={userId}
                        setAppend={setAppend}
                        />
                    <FbColumn
                        title="In progress"
                        category="doing"
                        headingColor="text-blue-400"
                        cards={cards}
                        setCards={setCards}
                        userId={userId}
                        setAppend={setAppend}
                        />
                    <FbColumn
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
    )
}

export default FeatureTodoBoard