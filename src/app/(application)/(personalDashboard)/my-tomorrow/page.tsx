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
import { createPersonalTomorrow, deleteAllPersonalTomorrow, deletePersonalTomorrow, fetchPersonalTomorrow, updatePersonalTomorrow } from '@/lib/backend-actions/personal.tomorrow.actions'
import { fetchUserData } from '@/lib/backend-actions/user.actions'
import { cn } from '@/lib/utils'
import { PersonalTomorrowValidation } from '@/lib/validations/personal.tomorrow.validation'
import { useUser } from '@clerk/nextjs'
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Inter } from 'next/font/google'

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
  const form = useForm<z.infer<typeof PersonalTomorrowValidation>>({
    resolver: zodResolver(PersonalTomorrowValidation),
    defaultValues: {
      title: "",
    },
  });
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const userInfo = await fetchUserData(user.id);
          if (userInfo && userInfo._id) {
            setUserId(userInfo._id.toString());
          } else {
            throw new Error("User data not found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Handle error
        }
      }
    };

    if (!userId) {
      fetchData();
    }
  }, [user, userId, personalTomorrows]);

  useEffect(() => {
    const getPersonalTomorrowData = async () => {
      try {
        if (userId) {
          const personalTomorrow = await fetchPersonalTomorrow({
            author: userId
          });
          setPersonalTomorrows(personalTomorrow);
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


  const onSubmit = async (values: z.infer<typeof PersonalTomorrowValidation>) => {
    setAdded(true);
    console.log("onSubmit fired");
    try {
      await createPersonalTomorrow({
        title: values.title,
        author: userId,
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
      await updatePersonalTomorrow({
        author: userId,
        completed: completed,
        id: id,
        title: title,
      });

      // Update the personalTomorrows state to reflect the completed status change
      setPersonalTomorrows(prevState =>
        prevState.map(tomorrow =>
          tomorrow.id === id ? { ...tomorrow, completed: completed } : tomorrow
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
      // Handle error
    }
    setAdded(false);
  };

  const deleteTomorrow = async (id: string) => {
    setAdded(true);
    try {
      await deletePersonalTomorrow({
        authorId: userId,
        tomorrowId: id
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
  const deleteAllTomorrow = async (completed: boolean) => {
    setAdded(true);
    try {
      await deleteAllPersonalTomorrow({
        authorId: userId,
        completed
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

  return (
    <main className={cn('flex flex-col px-5 py-5 gap-5', inter.className)}>
      <div className='flex flex-col md:flex-row gap-10'>
        <div className='border p-10 rounded-xl w-full flex flex-col gap-4'>
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
                              className={cn("w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-2xl text-neutral-800 placeholder-violet-300 focus:outline-0")}
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
              onClick={() => deleteAllTomorrow(true)}
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
