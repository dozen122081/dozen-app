"use client"
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { PersonalTomorrowValidation } from '@/lib/validations/personal.tomorrow.validation'
import { DayTaskValidation } from '@/lib/validations/workspace/daytask.validation'
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Trash } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Inter } from 'next/font/google'
import { TPersonalTomorrow } from '../ProductTrial'

const inter = Inter({
    subsets: ['cyrillic', "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

interface Props {
    personalTasks: TPersonalTomorrow[];
    setPersonalTasks: Dispatch<SetStateAction<TPersonalTomorrow[]>>;
    incompleteTasks: TPersonalTomorrow[];
    setIncompleteTasks: Dispatch<SetStateAction<TPersonalTomorrow[]>>
    completedTasks: TPersonalTomorrow[];
    setCompletedTasks: Dispatch<SetStateAction<TPersonalTomorrow[]>>
}

const TriToday = ({
    personalTasks,
    setPersonalTasks,
    incompleteTasks,
    setIncompleteTasks,
    completedTasks,
    setCompletedTasks
}: Props
) => {
    const [added, setAdded] = useState(false);
    const form = useForm<z.infer<typeof DayTaskValidation>>({
        resolver: zodResolver(DayTaskValidation),
        defaultValues: {
            title: "",
        },
    });


    const onSubmit = async (values: z.infer<typeof PersonalTomorrowValidation>) => {
        setAdded(true);
        const newTask: TPersonalTomorrow = {
            id: Math.random().toString(), // Generate a unique ID (you can use a better method in production)
            title: values.title,
            completed: false, // Assuming the new task is not completed initially
            taskFor: "today", // Assuming the new task is for tomorrow
        };

        setPersonalTasks((prevState) => [...prevState, newTask]);
        setIncompleteTasks((prevState) => [...prevState, newTask]);

        form.reset();
        setAdded(false);
    };

    const updateStatus = async (id: string, title: string, completed: boolean) => {
        setAdded(true);

        let updatedIncompleteTasks = [...incompleteTasks];
        let updatedCompletedTasks = [...completedTasks];
        const taskIndex = updatedIncompleteTasks.findIndex(task => task.id === id);

        if (taskIndex !== -1) {
            updatedIncompleteTasks.splice(taskIndex, 1);
        } else {
            const taskIndexCompleted = updatedCompletedTasks.findIndex(task => task.id === id);
            if (taskIndexCompleted !== -1) {
                updatedCompletedTasks.splice(taskIndexCompleted, 1);
            }
        }

        const newTask: TPersonalTomorrow = {
            id: id,
            title: title,
            completed: completed,
            taskFor: "today",
        };

        // Add the task to the appropriate list
        if (completed) {
            updatedCompletedTasks.push(newTask);
        } else {
            updatedIncompleteTasks.push(newTask);
        }

        // Update the state with the modified lists
        setIncompleteTasks(updatedIncompleteTasks);
        setCompletedTasks(updatedCompletedTasks);

        // Reset the form after submission
        form.reset();
        setAdded(false);
    };

    const deleteTomorrow = async (id: string) => {
        setAdded(true);

        // Remove the deleted item from the personalTomorrows state
        setPersonalTasks(prevState =>
            prevState.filter(tomorrow => tomorrow.id !== id)
        );
        setCompletedTasks(prevState =>
            prevState.filter(tomorrow => tomorrow.id !== id)
        );
        setIncompleteTasks(prevState =>
            prevState.filter(tomorrow => tomorrow.id !== id)
        );
        setAdded(false);
    };
    const deleteAllToday = async (completed: boolean) => {
        if (completed) {
            // Remove from completedTomorrows state
            setCompletedTasks([]);
        } else {
            // Remove from incompleteTomorrows state
            setIncompleteTasks([]);
        }

        // Also, remove from personalTomorrows state
        setPersonalTasks(prevState =>
            prevState.filter(tomorrow => tomorrow.completed !== completed)
        );
        setAdded(false);
    };

    return (
        <div className="mockup-browser border bg-neutral-50">
            <div className="mockup-browser-toolbar">
                <div className="input">https://dozen-app.vercel.app/workspace/661140ac0f5a6280dda/today</div>
            </div>
            <main className={cn('flex flex-col px-5 py-5 gap-12', inter.className)}>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-3xl'>Plan your tasks for today</h2>
                    <div className='flex gap-1'>
                        <p>Plan your tasks for today or import from tomorrow</p>
                    </div>
                </div>
                <Separator />
                <div className='flex flex-col md:flex-row gap-10'>
                    <div className='border p-2 lg:p-10 rounded-xl w-full flex flex-col gap-4'>
                        <div className='flex w-full justify-between itmes-center lg:py-2 '>
                            <h2 className='font-bold text-lg text-indigo-500'>Plans</h2>
                            <Button
                                variant={"ghost"}
                                onClick={() => deleteAllToday(false)}
                                className={"py-0"}
                            >
                                <Trash className='h-4 w-4 text-destructive' />
                            </Button>
                        </div>
                        <Separator />
                        <div className='flex flex-col gap-3 lg:py-3'>
                            {incompleteTasks
                                .filter(task => task.taskFor === "today")
                                .map(tomorrow => (
                                    <motion.div
                                        layout
                                        layoutId={tomorrow.id}
                                        key={tomorrow.id}
                                        className="flex gap-2 items-center py-0.5 px-3 w-full justify-between border rounded-lg"
                                    >
                                        <div className='flex items-center gap-2'>
                                            <Checkbox
                                                checked={tomorrow.completed}
                                                onCheckedChange={() => {
                                                    updateStatus(tomorrow.id, tomorrow.title, true);
                                                }}
                                            />
                                            <span className='font-medium text-sm lg:text-normal'>{tomorrow.title}</span>
                                        </div>
                                        <Button variant={"ghost"} onClick={() => deleteTomorrow(tomorrow.id)}>
                                            <Trash className='h-4 w-4 text-destructive' />
                                        </Button>
                                    </motion.div>
                                ))}
                        </div>
                        <div>
                            <Dialog>
                                <DialogTrigger>
                                    <Button>
                                        Add Task
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Your Plan for tomorrow</DialogTitle>
                                    </DialogHeader>
                                    <Form {...form}>
                                        <form
                                            className='mt-4 flex flex-col justify-start gap-10'
                                            onSubmit={form.handleSubmit(onSubmit)}
                                        >

                                            <FormField
                                                control={form.control}
                                                name='title'
                                                render={({ field }) => (
                                                    <FormItem className='flex w-full flex-col gap-1'>
                                                        <FormLabel className='font-medium text-lg'>
                                                            Title
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                placeholder="Add new task..."
                                                                {...field}
                                                                autoFocus
                                                                className={cn("w-full rounded border h-10 border-violet-400 bg-violet-400/20 p-3 text-2xl text-neutral-800 placeholder-violet-300 focus:outline-0")}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <div className="mt-1.5 flex items-center justify-end gap-1.5">
                                                <DialogClose>
                                                    <Button
                                                        type="submit"
                                                        className="flex items-center gap-1.5 rounded bg-slate-800 px-3 py-1.5 text-lg font-bold text-neutral-50 transition-colors hover:bg-neutral-300 hover:text-slate-900"
                                                    >
                                                        <span>Add Task</span>
                                                    </Button>
                                                </DialogClose>
                                            </div>
                                        </form>
                                    </Form>
                                </DialogContent>
                            </Dialog>

                        </div>
                    </div>
                    <div className='border p-2 lg:p-10 rounded-xl w-full flex flex-col gap-4'>
                        <div className='flex w-full justify-between itmes-center lg:py-2 '>
                            <h2 className='font-bold text-lg text-indigo-500'>Completed</h2>
                            <Button
                                variant={"ghost"}
                                onClick={() => deleteAllToday(true)}
                            >
                                <Trash className='h-4 w-4 text-destructive' />
                            </Button>
                        </div>
                        <Separator />
                        <div className='flex flex-col gap-3 py-3'>
                            {completedTasks
                                .filter(task => task.taskFor === "today")
                                .map(tomorrow => (
                                    <motion.div
                                        layout
                                        layoutId={tomorrow.id}
                                        key={tomorrow.id}
                                        className="flex gap-2 items-center py-0.5 px-3 w-full justify-between border rounded-lg bg-green-100"
                                    >
                                        <div className='flex items-center gap-2'>
                                            <Checkbox
                                                checked={tomorrow.completed}
                                                onCheckedChange={() => {
                                                    updateStatus(tomorrow.id, tomorrow.title, false)
                                                }}
                                            />
                                            <span className='font-medium text-sm lg:text-normal text-green-900'>
                                                {tomorrow.title}
                                            </span>
                                        </div>
                                        <Button
                                            variant={"ghost"}
                                            onClick={() => deleteTomorrow(tomorrow.id)}
                                        >
                                            <Trash className='h-4 w-4 text-destructive' />
                                        </Button>
                                    </motion.div>
                                ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>

    );
};
export default TriToday;
