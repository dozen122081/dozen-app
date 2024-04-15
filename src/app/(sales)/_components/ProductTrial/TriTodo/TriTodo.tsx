"use client"
import React, {
    Dispatch,
    SetStateAction,
    useState,
    DragEvent,
    FormEvent,
} from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { createPersonalTodo } from "@/lib/backend-actions/personaltodo.actions";
import { PersonalTodoValidation } from "@/lib/validations/personaltodo.validation";
import { CardType, ColumnType } from "../ProductTrial";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TriProps {
    cards: CardType[];
    setCards: Dispatch<SetStateAction<CardType[]>>;
}
export const TriTodo = ({
    cards,
    setCards
}: TriProps) => {
    return (
        <div className="h-screen w-full text-neutral-50">
            <Board cards={cards} setCards={setCards} />
        </div>
    );
};

const Board = ({
    cards,
    setCards,
}: TriProps) => {


    return (
        <div className="mockup-browser border bg-neutral-50">
            <div className="mockup-browser-toolbar text-black">
                <div className="input">https://dozen-app.vercel.app/workspace/6611400ea85a6280dda/todo</div>
            </div>
            <ScrollArea className="h-[70vh]">
                <div className="flex flex-col h-full w-full gap-3 p-12">
                    <BurnBarrel setCards={setCards} />
                    <div className="flex flex-wrap gap-4">
                        <Column
                            title="Idea"
                            column="backlog"
                            headingColor="text-neutral-500"
                            cards={cards}
                            setCards={setCards}
                        />
                        <Column
                            title="TODO"
                            column="todo"
                            headingColor="text-yellow-400"
                            cards={cards}
                            setCards={setCards}
                        />
                        <Column
                            title="In progress"
                            column="doing"
                            headingColor="text-blue-500"
                            cards={cards}
                            setCards={setCards}
                        />
                        <Column
                            title="Complete"
                            column="done"
                            headingColor="text-emerald-500"
                            cards={cards}
                            setCards={setCards}
                        />

                    </div>
                </div>
            </ScrollArea>
        </div>

    );
};

type ColumnProps = {
    title: string;
    headingColor: string;
    cards: CardType[];
    column: ColumnType;
    setCards: Dispatch<SetStateAction<CardType[]>>;
};

const Column = ({
    title,
    headingColor,
    cards,
    column,
    setCards,
}: ColumnProps) => {
    const [active, setActive] = useState(false);

    const handleDragStart = (e: DragEvent, card: CardType) => {
        e.dataTransfer.setData("cardId", card.id);
    };

    const handleDragEnd = (e: DragEvent) => {
        const cardId = e.dataTransfer.getData("cardId");

        setActive(false);
        clearHighlights();

        const indicators = getIndicators();
        const { element } = getNearestIndicator(e, indicators);

        const before = element.dataset.before || "-1";

        if (before !== cardId) {
            let copy = [...cards];

            let cardToTransfer = copy.find((c) => c.id === cardId);
            if (!cardToTransfer) return;
            cardToTransfer = { ...cardToTransfer, column };

            copy = copy.filter((c) => c.id !== cardId);

            const moveToBack = before === "-1";

            if (moveToBack) {
                copy.push(cardToTransfer);
            } else {
                const insertAtIndex = copy.findIndex((el) => el.id === before);
                if (insertAtIndex === undefined) return;

                copy.splice(insertAtIndex, 0, cardToTransfer);
            }

            setCards(copy);
        }
    };

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        highlightIndicator(e);

        setActive(true);
    };

    const clearHighlights = (els?: HTMLElement[]) => {
        const indicators = els || getIndicators();

        indicators.forEach((i) => {
            i.style.opacity = "0";
        });
    };

    const highlightIndicator = (e: DragEvent) => {
        const indicators = getIndicators();

        clearHighlights(indicators);

        const el = getNearestIndicator(e, indicators);

        el.element.style.opacity = "1";
    };

    const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
        const DISTANCE_OFFSET = 50;

        const el = indicators.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();

                const offset = e.clientY - (box.top + DISTANCE_OFFSET);

                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            },
            {
                offset: Number.NEGATIVE_INFINITY,
                element: indicators[indicators.length - 1],
            }
        );

        return el;
    };

    const getIndicators = () => {
        return Array.from(
            document.querySelectorAll(
                `[data-column="${column}"]`
            ) as unknown as HTMLElement[]
        );
    };

    const handleDragLeave = () => {
        clearHighlights();
        setActive(false);
    };

    const filteredCards = cards.filter((c) => c.column === column);

    return (
        <div className="w-56 shrink-0">
            <div className="mb-3 flex items-center justify-between">
                <h3 className={`font-medium ${headingColor}`}>{title}</h3>
                <span className="rounded text-sm text-neutral-400">
                    {filteredCards.length}
                </span>
            </div>
            <div
                onDrop={handleDragEnd}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"
                    }`}
            >
                {filteredCards.map((c) => {
                    return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
                })}
                <DropIndicator beforeId={null} column={column} />
                <AddCard column={column} setCards={setCards} />
            </div>
        </div>
    );
};

type CardProps = CardType & {
    handleDragStart: Function;
};

const Card = ({ title, id, column, handleDragStart }: CardProps) => {
    return (
        <>
            <DropIndicator beforeId={id} column={column} />
            <motion.div
                layout
                layoutId={id}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, { title, id, column })}
                className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
            >
                <p className="text-sm text-neutral-100">{title}</p>
            </motion.div>
        </>
    );
};

type DropIndicatorProps = {
    beforeId: string | null;
    column: string;
};

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
    return (
        <div
            data-before={beforeId || "-1"}
            data-column={column}
            className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
        />
    );
};

const BurnBarrel = ({
    setCards,
}: {
    setCards: Dispatch<SetStateAction<CardType[]>>;
}) => {
    const [active, setActive] = useState(false);

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        setActive(true);
    };

    const handleDragLeave = () => {
        setActive(false);
    };

    const handleDragEnd = (e: DragEvent) => {
        const cardId = e.dataTransfer.getData("cardId");

        setCards((pv) => pv.filter((c) => c.id !== cardId));

        setActive(false);
    };

    return (
        <div
            onDrop={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`mt-10 grid h-24 w-full shrink-0 place-content-center rounded border text-3xl ${active
                ? "border-red-800 bg-red-800/20 text-red-500"
                : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
                }`}
        >
            {active ? <FaFire className="animate-bounce h-7 w-7" /> : <FiTrash className="h-7 w-7" />}
        </div>
    );
};

type AddCardProps = {
    column: ColumnType;
    setCards: Dispatch<SetStateAction<CardType[]>>;
};

const AddCard = ({ column, setCards }: AddCardProps) => {
    const [adding, setAdding] = useState(false);
    const form = useForm<z.infer<typeof PersonalTodoValidation>>({
        resolver: zodResolver(PersonalTodoValidation),
        defaultValues: {
            title: "",
            description: "",
        },
    });
    const onSubmit = async (values: z.infer<typeof PersonalTodoValidation>) => {
        console.log("onSubmit fired");
        const newCard = {
            column,
            title: values.title,
            id: Math.random().toString(),
        };

        setCards((pv) => [...pv, newCard]);
        setAdding(false);
    };

    return (
        <Sheet>
            <SheetContent className="w-[100%] md:w-auto">
                <SheetHeader>
                    <SheetTitle>Add Your Thoughts</SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <motion.form
                        layout
                        className='mt-4 flex flex-col justify-start gap-10'
                        onSubmit={form.handleSubmit(onSubmit)}
                    >

                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem className='flex w-full flex-col gap-1 '>
                                    <FormLabel className='font-medium text-lg'>
                                        Todo
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Add new task..."
                                            {...field}
                                            autoFocus
                                            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-800 placeholder-violet-300 focus:outline-0 focus:border-transparent"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem className='flex w-full flex-col gap-1'>
                                    <FormLabel className='font-medium text-lg'>
                                        Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Maybe some description..."
                                            rows={5}
                                            {...field}
                                            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-800 placeholder-violet-300 focus:outline-0 focus:border-transparent"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <SheetFooter className="mt-1.5 flex items-center justify-end gap-1.5">
                            <SheetClose asChild>
                                <button
                                    type="button"
                                    className="px-3 py-1.5 text-sm text-neutral-500 transition-colors hover:text-neutral-350"
                                >
                                    Close
                                </button>
                            </SheetClose>
                            <SheetClose asChild>
                                <Button
                                    type="submit"
                                    className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-sm text-neutral-950 transition-colors hover:bg-neutral-300"
                                >
                                    <span>Add Thought</span>
                                </Button>
                            </SheetClose>
                        </SheetFooter>
                    </motion.form>
                </Form>
            </SheetContent>
            <SheetTrigger asChild>
                <motion.button
                    layout
                    className="flex w-full focus:outline-none focus:ring-0 items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-800 transition-colors hover:text-neutral-500"
                >
                    <span>Add card</span>
                    <FiPlus />
                </motion.button>
            </SheetTrigger>
        </Sheet>
    );
};

