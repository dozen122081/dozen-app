"use client"
import { CardType, ColumnType } from "@/lib/types/TodoTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
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
type AddCardProps = {
    column: ColumnType;
    setCards: Dispatch<SetStateAction<CardType[]>>;
    userId: string;
    setAppend: Dispatch<SetStateAction<boolean>>;
};
const AddCard = ({ column, userId, setAppend }: AddCardProps) => {
    const router = useRouter()
    const pathname = usePathname();
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
            // await createPersonalTodo({
            //     title: values.title,
            //     author: userId,
            //     description: values.description,
            //     category: column,
            //     path: pathname,
            // });
            const response = await fetch(('/api/todo'), {
                method: "POST",
                body: JSON.stringify({
                    title: values.title,
                    author: userId,
                    description: values.description,
                    category: column,
                    path: pathname,
                }),
                headers: { "Content-Type": 'application/json' }
            });
            router.push("/my-todos")
            form.reset(); // Reset the form after successful submission
        } catch (error) {
            console.error("Error submitting form:", error);
            // Handle error or show error message to the user
        }
        setAppend(false)
    };

    return (
        <Sheet>
            <SheetContent>
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
                                            autoFocus
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

export default AddCard;