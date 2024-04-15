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
import { cn, getIdFromUrl, getIdFromWorkspaceUrl } from '@/lib/utils'
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
import Link from 'next/link'
import { FaSpinner } from 'react-icons/fa'
import { Skeleton } from '@/components/ui/skeleton'

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

const TasksToday = () => {
  const { user } = useUser();
  const [userId, setUserId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<TPersonalTomorrow[]>([]);
  const [incompleteTasks, setIncompleteTasks] = useState<TPersonalTomorrow[]>([]);
  const [added, setAdded] = useState(false);
  const [fullUrl, setFullUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
  }, [user, userId, tasks]);

  useEffect(() => {
    const getTaskData = async () => {
      try {
        if (userId) {
          const response = await fetch(`/api/workspace/today?workspaceId=${workspaceId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const data = await response.json();
          setTasks(data);

        }
      } catch (error) {
        console.error("Error fetching personal tomorrow data:", error);
      }
    };

    if (userId) {
      getTaskData();
      setIsLoading(false)
    }
  }, [userId, added]);

  useEffect(() => {
    if (tasks.length > 0) {
      const incomplete = tasks.filter(tomorrow => !tomorrow.completed);
      setIncompleteTasks(incomplete);
    }
  }, [tasks, added]);

  if (!user || !userId) return null;
  if (!fullUrl) return null;
  const workspaceId = getIdFromWorkspaceUrl(fullUrl);
  if (!workspaceId) return null;
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
      setTasks(prevState =>
        prevState.map(task =>
          task.id === id ? { ...task, completed: completed } : task
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
    setAdded(false);
  };

  const deleteTask = async (id: string) => {
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
      setTasks(prevState =>
        prevState.filter(task => task.id !== id)
      );
      setIncompleteTasks(prevState =>
        prevState.filter(task => task.id !== id)
      );
    } catch (error) {
      console.log("Failed to delete");
    }
    setAdded(false);
  };
  if (isLoading) {
    return (
      <div className='flex flex-col gap-2 w-full'>
        <div>
          <h2 className='font-semibold'>Today's Tasks</h2>
        </div>
        <div className='flex flex-col gap-1.5'>
            <Skeleton className="flex bg-neutral-200 gap-2 items-center h-10 py-0.5 px-3 w-full justify-between border rounded-lg"/>
            <Skeleton className="flex bg-neutral-200 gap-2 items-center h-10 py-0.5 px-3 w-full justify-between border rounded-lg"/>
            <Skeleton className="flex bg-neutral-200 gap-2 items-center h-10 py-0.5 px-3 w-full justify-between border rounded-lg"/>
            <Skeleton className="flex bg-neutral-200 gap-2 items-center h-10 py-0.5 px-3 w-full justify-between border rounded-lg"/>
            <Skeleton className="flex bg-neutral-200 gap-2 items-center h-10 py-0.5 px-3 w-full justify-between border rounded-lg"/>
        </div>
      </div>
    )
  } else {
    return (
      <aside className='flex flex-col gap-2 w-full'>
        <div>
          <h2 className='font-semibold'>Today's Tasks</h2>
        </div>
        <div className='flex flex-col gap-1.5'>
          {
            incompleteTasks.slice(0, 5).map((task) => (
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
    )
  }
}

export default TasksToday