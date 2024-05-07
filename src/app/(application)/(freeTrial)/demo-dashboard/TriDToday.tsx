"use client"
import React, { Dispatch, SetStateAction } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { TPersonalTomorrow } from '../ProductTrial'
import {motion} from "framer-motion"
interface Props {
    setPersonalTasks: Dispatch<SetStateAction<TPersonalTomorrow[]>>;
    incompleteTasks: TPersonalTomorrow[];
    setIncompleteTasks: Dispatch<SetStateAction<TPersonalTomorrow[]>>
    completedTasks: TPersonalTomorrow[];
    setCompletedTasks: Dispatch<SetStateAction<TPersonalTomorrow[]>>
}
const TriDToday = ({
    setPersonalTasks,
    incompleteTasks,
    setIncompleteTasks,
    completedTasks,
    setCompletedTasks
}: Props) => {
    const updateStatus = async (id: string, title: string, completed: boolean) => {
        // setAdded(true);

        // Remove the task from the appropriate list
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
        // form.reset();
        // setAdded(false);
    };
    const deleteTask = async (id: string) => {

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
    };
    return (
        <div className='w-full gap-10'>
            <aside className='flex flex-col gap-2 w-full'>
                <div>
                    <h2 className='font-semibold'>Today's Tasks</h2>
                </div>
                <div className='flex flex-col w-full gap-1.5'>
                    {
                        incompleteTasks && incompleteTasks.filter(task => task.taskFor === "tomorrow").slice(0, 5).map((task) => (
                            <motion.aside
                                layout
                                layoutId={task.id}
                                key={task.id}
                                className="flex gap-2 items-center h-10 py-0.5 px-3 w-full justify-between border rounded-lg"
                            >
                                <div className='flex items-center gap-2'>
                                    <Checkbox
                                        checked={task.completed}
                                        onCheckedChange={() => {
                                            updateStatus(task.id, task.title, true)
                                        }}
                                        className="h-3 w-3 rounded-sm"
                                    />
                                    <p className='text-xs font-semibold'>{task.title}</p>
                                </div>
                                <Button className='' variant={"ghost"} onClick={() => deleteTask(task.id)}>
                                    <Trash className='h-4 w-4 text-destructive' />
                                </Button>
                            </motion.aside>
                        ))
                    }
                </div>
            </aside>
        </div>
    )
}

export default TriDToday