"use client"
import { Button } from '@/components/ui/button'
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
import { cn, getIdFromUrl } from '@/lib/utils'
import { PersonalTomorrowValidation } from '@/lib/validations/personal.tomorrow.validation'
import { DayTaskValidation } from '@/lib/validations/workspace/daytask.validation'
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { LogOut, Trash } from 'lucide-react'
import { Dispatch, DragEventHandler, SetStateAction, useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { Inter } from 'next/font/google'
import { useRouter } from 'next/navigation'
import DropIndicator from '@/app/(application)/(personalDashboard)/my-todos/_components/todoComponents/DropIndicator'
import { TPersonalTomorrow } from '../ProductTrial'


const inter = Inter({
  subsets: ['cyrillic', "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})


interface Props {
  personalTasks: TPersonalTomorrow[];
  setPersonalTasks: Dispatch<SetStateAction<TPersonalTomorrow[]>>
  incompleteTasks: TPersonalTomorrow[];
  setIncompleteTasks: Dispatch<SetStateAction<TPersonalTomorrow[]>>
}
const TriTomorrow = (
  {
    personalTasks,
    setPersonalTasks,
    incompleteTasks,
    setIncompleteTasks,
  }: Props
) => {
  const [added, setAdded] = useState(false);
  const [isClient, setIsClient] = useState(false)
  const [active, setActive] = useState(false);
  const form = useForm<z.infer<typeof DayTaskValidation>>({
    resolver: zodResolver(DayTaskValidation),
    defaultValues: {
      title: "",
    },
  });
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null;

  const onSubmit = async (values: z.infer<typeof PersonalTomorrowValidation>) => {
    setAdded(true);
    const newTask: TPersonalTomorrow = {
      id: Math.random().toString(), // Generate a unique ID (you can use a better method in production)
      title: values.title,
      completed: false, // Assuming the new task is not completed initially
      taskFor: "tomorrow", // Assuming the new task is for tomorrow
    };

    // Add the new task to both personalTomorrows and incompleteTomorrows states
    setPersonalTasks((prevState) => [...prevState, newTask]);
    setIncompleteTasks((prevState) => [...prevState, newTask]);

    // Reset the form after submission
    form.reset();
    setAdded(false);
  };

  const moveToToday = (taskId: string) => {
    // Find the task with the specified ID
    const updatedTask = personalTasks.find(task => task.id === taskId);

    // If the task is found, update its taskFor property to "today"
    if (updatedTask) {
      updatedTask.taskFor = "today";
      setPersonalTasks(prevState =>
        prevState.map(task =>
          task.id === taskId ? updatedTask : task
        )
      );

      // Remove the task from incompleteTasks
      setIncompleteTasks(prevState =>
        prevState.filter(task => task.id !== taskId)
      );

      // Add the updated task to incompleteTasks
      setIncompleteTasks(prevState => [...prevState, updatedTask]);
    }
  };
  const sendToToday = () => {
    // Filter tasks from tomorrow section
    const tasksToSend = incompleteTasks.filter(task => task.taskFor === "tomorrow");

    console.log("Tasks to send:", tasksToSend);

    // Move filtered tasks to incompleteTasks of today
    setIncompleteTasks(prevState => [...prevState, ...tasksToSend]);

    console.log("Updated incompleteTasks:", incompleteTasks);

    // Remove filtered tasks from tomorrow section
    setIncompleteTasks(prevState =>
        prevState.filter(task => task.taskFor !== "tomorrow")
    );

    console.log("Filtered tomorrow tasks:", incompleteTasks);

    // Also, update the taskFor property of filtered tasks to "today"
    const updatedTasks = tasksToSend.map(task => ({
        ...task,
        taskFor: "today"
    }));

    console.log("Updated tasks:", updatedTasks);

    // Update personalTasks state to reflect the change
    setPersonalTasks(prevState =>
        prevState.map(task =>
            tasksToSend.some(sentTask => sentTask.id === task.id)
                ? { ...task, taskFor: "today" }
                : task
        )
    );

};

  const deleteTomorrow = async (id: string) => {
    setAdded(true);

    // Remove the deleted item from the personalTomorrows state
    setPersonalTasks(prevState =>
      prevState.filter(tomorrow => tomorrow.id !== id)
    );
    setIncompleteTasks(prevState =>
      prevState.filter(tomorrow => tomorrow.id !== id)
    );
    setAdded(false);
  };
  const deleteAllTomorrow = async (completed: boolean) => {
    setAdded(true);
    setIncompleteTasks([]);

    // Also, remove from personalTomorrows state
    setPersonalTasks(prevState =>
      prevState.filter(tomorrow => tomorrow.completed !== completed)
    );
    setAdded(false);
  };
  const handleDragStart = (e: DragEvent, card: TPersonalTomorrow) => {
    e.dataTransfer?.setData("cardId", card.id);
  };
  const handleDragEnd = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent default behavior to allow drop
    const cardId = e.dataTransfer?.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let oldData = [...incompleteTasks];
      let copy = oldData;

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }
      setIncompleteTasks(copy);
    }
  };


  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
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

  const highlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };


  const getNearestIndicator = (e: React.DragEvent<HTMLDivElement>, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;

    const clientY = e.clientY;

    let closest = {
      offset: Number.NEGATIVE_INFINITY,
      element: indicators[indicators.length - 1],
    };

    indicators.forEach(child => {
      const box = child.getBoundingClientRect();
      const offset = clientY - (box.top + DISTANCE_OFFSET);

      console.log('Child:', child); // Log the child element for debugging

      if (offset < 0 && offset > closest.offset) {
        closest = { offset: offset, element: child };
      }
    });

    console.log('Closest:', closest); // Log the closest element for debugging

    return closest;
  };



  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-column="tomorrow"]`
      ) as unknown as HTMLElement[]
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  return (
    <main className={cn('flex flex-col lg:px-5 py-5 gap-5', inter.className)}>
      <div className='flex flex-col gap-10'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-3xl'>Plan your tasks for tomorrow</h2>
          <p>Plan your tasks for tomorrow and then send it to today when you feel like it.</p>
        </div>
        <Separator />
        <div className='border p-2 lg:p-10 rounded-xl w-full flex flex-col gap-4'>
          <div className='flex w-full justify-between itmes-center py-2 '>
            <h2 className='font-bold text-lg text-indigo-500'>Plans</h2>
            <Button
              variant={"ghost"}
              onClick={() => deleteAllTomorrow(false)}
            >
              <Trash className='h-4 w-4 text-destructive' />
            </Button>
          </div>
          <Separator />
          <div
            onDrop={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className='flex flex-col gap-0.5 py-3'
          >

            {incompleteTasks
              .filter(task => task.taskFor === "tomorrow")
              .map(tomorrow => (
                <div className='flex flex-col gap-1'>
                  <DropIndicator beforeId={tomorrow.id} category={"tomorrow"} />
                  <motion.div
                    id="yourElementId"
                    layout
                    layoutId={tomorrow.id}
                    draggable="true"
                    onDragStart={(e) => {
                      if ("dataTransfer" in e) {
                        handleDragStart(e as DragEvent, {
                          title: tomorrow.title,
                          id: tomorrow.id,
                          taskFor: tomorrow.taskFor,
                          completed: tomorrow.completed
                        });
                      }
                    }}
                    key={tomorrow.id}
                    className="flex gap-2 items-center py-0.5 px-3 w-full justify-between border rounded-lg"
                  >
                    <div className='flex items-center gap-2'>
                      <span className='font-medium text-sm lg:text-normal'>
                        {tomorrow.title}
                      </span>
                    </div>
                    <div>
                      <Button variant={"ghost"} onClick={() => deleteTomorrow(tomorrow.id)}>
                        <Trash className='h-4 w-4 text-destructive' />
                      </Button>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Button variant={"ghost"}
                              onClick={() => moveToToday(tomorrow.id)}
                            >
                              <LogOut className='h-4 w-4 text-primary' />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent sideOffset={30}>
                            <p>Send to Today</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </motion.div>
                </div>
              ))}
          </div>
          <div className='flex justify-between'>
            <Dialog>
              <DialogTrigger>
                <Button>
                  Add Todo
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
            {/* <Button
              //   onClick={() => sendToToday()}
              onClick={sendToToday}
            >
              Send To Today
            </Button> */}
          </div>
        </div>
      </div>
    </main>
  );
};
export default TriTomorrow;
