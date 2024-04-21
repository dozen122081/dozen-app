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
import { cn, getIdFromUrl } from '@/lib/utils'
import { PersonalTomorrowValidation } from '@/lib/validations/personal.tomorrow.validation'
import { DayTaskValidation } from '@/lib/validations/workspace/daytask.validation'
import { useUser } from '@clerk/nextjs'
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Inter } from 'next/font/google'
import { Link } from 'next-view-transitions'
import { FaSpinner } from 'react-icons/fa'

const inter = Inter({
  subsets: ['cyrillic', "cyrillic-ext", "greek", "greek-ext", "latin", "latin-ext", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

type TPersonalTomorrow = {
  id: string,
  title: string,
  author: string,
  createdAt: string,
  completed: boolean
}

const Page = () => {
  const { user } = useUser();
  const [userId, setUserId] = useState<string | null>(null);
  const [personalTomorrows, setPersonalTomorrows] = useState<TPersonalTomorrow[]>([]);
  const [completedTomorrows, setCompletedTomorrows] = useState<TPersonalTomorrow[]>([]);
  const [incompleteTomorrows, setIncompleteTomorrows] = useState<TPersonalTomorrow[]>([]);
  const [added, setAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fullUrl, setFullUrl] = useState('');
  const form = useForm<z.infer<typeof DayTaskValidation>>({
    resolver: zodResolver(DayTaskValidation),
    defaultValues: {
      title: "",
    },
  });
  useEffect(() => {
    setIsLoading(true)
    // **Warning:** Using window.location can be a security risk. Consider alternative approaches.
    const url = window.location.href;
    setFullUrl(url);
  }, [])
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/user');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      if (data && data.id) {
        setUserId(data.id.toString());
        console.log(userId)
      } else {
        throw new Error("User data not found");
      }
    };

    if (!userId) {
      fetchData();
    }
    setIsLoading(false)
  }, [user, userId, personalTomorrows]);

  useEffect(() => {
    const getPersonalTomorrowData = async () => {
      try {
        if (userId) {
          const response = await fetch(`/api/workspace/today?workspaceId=${workspaceId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const data = await response.json();
          setPersonalTomorrows(data);
        }
      } catch (error) {
        console.error("Error fetching personal tomorrow data:", error);
      }
    };

    if (userId) {
      getPersonalTomorrowData();
    }
  }, [userId, added]);

  useEffect(() => {
    if (personalTomorrows.length > 0) {
      const completed = personalTomorrows.filter(tomorrow => tomorrow.completed);
      const incomplete = personalTomorrows.filter(tomorrow => !tomorrow.completed);
      setCompletedTomorrows(completed);
      setIncompleteTomorrows(incomplete);
    }
  }, [personalTomorrows, added]);
  if (!user || !userId) return null;
  if (!fullUrl) return;
  const workspaceId = getIdFromUrl(fullUrl);
  if (!workspaceId) return;
  

  const onSubmit = async (values: z.infer<typeof PersonalTomorrowValidation>) => {
    setAdded(true);
    console.log("onSubmit fired");
    try {
      const response = await fetch(('/api/workspace/today'), {
        method: "POST",
        body: JSON.stringify({
          title: values.title,
          author: userId,
          workspaceId: workspaceId,
        }),
        headers: { "Content-Type": 'application/json' }
      });
      form.reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error or show error message to the user
    }
    setAdded(false);
  };

  const updateStatus = async (id: string, title: string, completed: boolean) => {
    setAdded(true);
    try {
      const response = await fetch(('/api/workspace/today'), {
        method: "PUT",
        body: JSON.stringify({
          author: userId,
          completed: completed,
          id: id,
          title: title,
        }),
        headers: { "Content-Type": 'application/json' }
      });

      // Update the personalTomorrows state to reflect the completed status change
      setPersonalTomorrows(prevState =>
        prevState.map(tomorrow =>
          tomorrow.id === id ? { ...tomorrow, completed: completed } : tomorrow
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
    setAdded(false);
  };

  const deleteTomorrow = async (id: string) => {
    setAdded(true);
    try {
      const response = await fetch('/api/workspace/today', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ authorId: userId, tomorrowId: id })
      });

      // Remove the deleted item from the personalTomorrows state
      setPersonalTomorrows(prevState =>
        prevState.filter(tomorrow => tomorrow.id !== id)
      );
      setCompletedTomorrows(prevState =>
        prevState.filter(tomorrow => tomorrow.id !== id)
      );
      setIncompleteTomorrows(prevState =>
        prevState.filter(tomorrow => tomorrow.id !== id)
      );
    } catch (error) {
      console.log("Failed to delete");
    }
    setAdded(false);
  };
  const deleteAllToday = async (completed: boolean) => {
    setAdded(true);
    try {
      const response = await fetch('/api/workspace/deletetodays', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ authorId: userId, completed: completed })
      });
      // Remove the deleted items from the state based on completion status
      if (completed) {
        // Remove from completedTomorrows state
        setCompletedTomorrows([]);
      } else {
        // Remove from incompleteTomorrows state
        setIncompleteTomorrows([]);
      }

      // Also, remove from personalTomorrows state
      setPersonalTomorrows(prevState =>
        prevState.filter(tomorrow => tomorrow.completed !== completed)
      );
    } catch (error) {
      console.log("Failed to delete");
    }
    setAdded(false);
  };
  if (isLoading ) {
    return (
      <div className='h-screen w-full flex justify-center items-center'>
        {/* <FaSpinner className='h-7 w-7 animate-spin' /> */}
        <div className='flex flex-col gap-2 items-center'>
          <span className="loading loading-dots loading-lg"></span>
          <span>Loading...</span>
        </div>
      </div>
    )
  }
  return (
    <main className={cn('flex flex-col px-5 py-5 gap-12', inter.className)}>
      <div className='flex flex-col gap-2'>
        <h2 className='text-3xl'>Plan your tasks for today</h2>
        <div className='flex gap-1'>
          <p>Plan your tasks for today or import from</p>
          <Link href={`/workspace/${workspaceId}/tomorrow`} className='hover:underline'>
            tomorrow.
          </Link>
        </div>
      </div>
      <Separator />
      <div className='flex flex-col md:flex-row gap-10'>
        <div className='border p-10 rounded-xl w-full flex flex-col gap-4'>
          <div className='flex w-full justify-between itmes-center py-2 '>
            <h2 className='font-bold text-lg text-indigo-500'>Plans</h2>
            <Button
              variant={"ghost"}
              onClick={() => deleteAllToday(false)}
            >
              <Trash className='h-4 w-4 text-destructive' />
            </Button>
          </div>
          <Separator />
          <div className='flex flex-col gap-3 py-3'>
            {incompleteTomorrows.map(tomorrow => (
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
                      updateStatus(tomorrow.id, tomorrow.title, true)
                    }}
                  />
                  <span>
                    {tomorrow.title}
                  </span>
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
                          <span>Add Note</span>
                        </Button>
                      </DialogClose>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>

          </div>
        </div>
        <div className='border p-10 rounded-xl w-full flex flex-col gap-4'>
          <div className='flex w-full justify-between itmes-center py-2 '>
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
            {completedTomorrows.map(tomorrow => (
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
                  <span className='font-medium text-green-900'>
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
  );
};
export default Page;
