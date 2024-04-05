"use client"
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
import { Separator } from "@/components/ui/separator";
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
import { updatePersonalTodo } from "@/lib/backend-actions/personaltodo.actions";
import { CardType } from "@/lib/types/TodoTypes";
import { PersonalTodoValidation } from "@/lib/validations/personaltodo.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEdit2 } from "react-icons/fi";
import * as z from "zod";
import DropIndicator from "./DropIndicator";
type CardProps = CardType & {
    handleDragStart: Function;
    setAppend: Dispatch<SetStateAction<boolean>>;
    author: string;
    id: string;
    title: string;
    description: string;
    setCards: Dispatch<SetStateAction<CardType[]>>;
};

const Card = ({
    title,
    id,
    category,
    description,
    handleDragStart,
    setAppend,
    author,
    setCards

}: CardProps) => {
    const pathname = usePathname()
    const router = useRouter()
    const [hovering, setHovering] = useState(false);
    const form = useForm<z.infer<typeof PersonalTodoValidation>>({
        resolver: zodResolver(PersonalTodoValidation),
        defaultValues: {
            title: "",
            description: "",
        },
    });
    const onSubmit = async (values: z.infer<typeof PersonalTodoValidation>) => {
        setAppend(true)
        console.log("onSubmit fired");
        try {
            // await updatePersonalTodo({
            //     id,
            //     title: values.title,
            //     author: author,
            //     description: values.description,
            //     path: pathname,
            //     category: category,
            // });
            const response = await fetch('/api/todo', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    title: values.title,
                    author: author,
                    description: values.description,
                    path: pathname,
                })
            });
            if (!response.ok) {
                throw new Error('Failed to update personal todo');
            }
            form.reset(); // Reset the form after successful submission
            console.log("getting new todos")

        } catch (error) {
            console.error("Error submitting form:", error);
            // Handle error or show error message to the user
        }
        setAppend(false)
    };
    return (
        <Sheet>
            <div
                onMouseLeave={() => setHovering(false)}
            >
                <DropIndicator beforeId={id} category={category} />
                {
                    hovering && (
                        <div className="h-10 w-full flex items-center justify-end pr-3">
                            <SheetTrigger asChild>
                                <FiEdit2 className="h-4 w-4" />
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Add Your Thoughts</SheetTitle>
                                    <SheetDescription>
                                        Make changes to your todos here. Click update when you're done.
                                    </SheetDescription>
                                </SheetHeader>
                                <Separator className="my-4" />
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-col gap1">
                                        <h2 className='font-medium text-lg'>Title</h2>
                                        <div
                                            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm font-bold text-neutral-800 placeholder-violet-300 focus:outline-0"
                                        >
                                            {title}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap1">
                                        <h2 className='font-medium text-lg'>Description</h2>
                                        <div
                                            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 font-medium text-sm text-neutral-800 placeholder-violet-300 focus:outline-0"
                                        >
                                            {description}

                                        </div>
                                    </div>
                                </div>
                                <Separator className="my-4" />
                                <h2 className="text-md font-bold">New Values</h2>
                                <Form {...form}>
                                    <motion.form
                                        layout
                                        className='mt-4 flex flex-col justify-start gap-3'
                                        onSubmit={form.handleSubmit(onSubmit)}
                                    >

                                        <FormField
                                            control={form.control}
                                            name='title'
                                            render={({ field }) => (
                                                <FormItem className='flex w-full flex-col gap-1'>
                                                    <FormLabel className='font-medium text-lg'>
                                                        Todo
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Add new task..."
                                                            {...field}
                                                            autoFocus
                                                            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-800 placeholder-violet-300 focus:outline-0"
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
                                                            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-800 placeholder-violet-300 focus:outline-0"
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
                                                    <span>Update Thought</span>
                                                </Button>
                                            </SheetClose>
                                        </SheetFooter>
                                    </motion.form>
                                </Form>
                            </SheetContent>
                        </div>
                    )
                }
                <motion.div
                    id="yourElementId"
                    onContextMenu={(e) => {
                        e.preventDefault()
                        setHovering(true)
                    }}
                    layout
                    layoutId={id}
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, { title, id, category })}
                    className="cursor-grab relative rounded border border-neutral-700 overflow-y-auto bg-neutral-800 p-3 active:cursor-grabbing"
                >
                    <p className="text-sm text-neutral-100 w-full">{title}</p>

                </motion.div>
            </div>
        </Sheet>
    );
};

export default Card;
