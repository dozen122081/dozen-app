"use client"
import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent, DrawerTrigger
} from "@/components/ui/drawer";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { PersonalWorkspaceValidation } from '@/lib/validations/personal.workspace.validation';
import { useUser } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from "framer-motion";
import { ArrowRight, Pen, Trash } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiDoorOpen } from 'react-icons/bi';
import { z } from 'zod';
export type TUserWorkspace = {
    id: string;
    title: string,
    description: string;
    author: string,
    backgroundColor: string,
}
const defaultBg = "#f1f58f"
const page = () => {
    const { user } = useUser()
    if (!user) return null

    const router = useRouter()
    const [userWorkspace, setUserWorkspace] = useState<TUserWorkspace[]>([]);
    console.log(userWorkspace)
    const [append, setAppend] = useState(false);
    const getUserWorkspaces = async () => {
        // const todos = await fetchPersonalStickyNotes(userId);
        const response = await fetch('/api/workspace')
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setUserWorkspace(data.map((todo: any) => ({
            id: todo.id.toString(), // Assuming _id is an ObjectId and converted to string
            author: todo.author.toString(),
            title: todo.title,
            description: todo.description,
            backgroundColor: todo.backgroundColor,
        })))
        console.log(userWorkspace)
    }
    useEffect(() => {
        getUserWorkspaces()
    }, [])
    useEffect(() => {
        getUserWorkspaces()
        // Polling interval (fetch new data every 5 seconds)
    }, [append, setUserWorkspace])
    const pathname = usePathname();
    const form = useForm<z.infer<typeof PersonalWorkspaceValidation>>({
        resolver: zodResolver(PersonalWorkspaceValidation),
        defaultValues: {
            title: "",
            description: "",
            background: "#f1f58f",
        },
    });
    const onSubmit = async (values: z.infer<typeof PersonalWorkspaceValidation>) => {
        setAppend(true)
        console.log("onSubmit fired");
        try {
            const response = await fetch(('/api/workspace'), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: values.title,
                    author: user.id,
                    description: values.description,
                    background: values.background
                })
            });
            form.reset(); // Reset the form after successful submission
            const data = await response.json()
            router.push(`/workspace/${data._id}`)
        } catch (error) {
            console.error("Error submitting form:", error);
            // Handle error or show error message to the user
        }
        setAppend(false)
    };
    const deletePersonalWorkspace = async (workspaceId: string) => {
        setAppend(true)
        try {
            const response = await fetch('/api/workspace', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: workspaceId, path: pathname, author: user.id })
            });
        } catch (err) {
            console.log(err)
        }
        setAppend(false)
    }
    return (
        <div>
            <div>
                <Link
                    href="/personal-dashboard"
                    className={cn(
                        "py-3 px-4 font-semibold rounded-md flex gap-1 items-center",
                    )}
                >
                    <BiDoorOpen className='h-4 w-4' />
                    <span className='text-sm'> Back to home</span>
                </Link>
            </div>
            <div className='w-full my-10 flex items-center justify-center md:justify-start'>
                <Drawer>
                    <DrawerTrigger>
                        <div
                            className='py-8 px-10 border border-dashed rounded-xl flex justify-center items-center border-slate-800'
                        >
                            <div className='flex  md:items-center text-slate-600 gap-2'>
                                <Pen />
                                <span>Add Workspace</span>
                            </div>
                        </div>
                    </DrawerTrigger>
                    <DrawerContent className='px-10 h-[80vh] md:h-[85vh] lg:h-[70vh] '>
                        <Form {...form}>
                            <motion.form
                                layout
                                className='mt-4 flex flex-col justify-start gap-10'
                                onSubmit={form.handleSubmit(onSubmit)}
                            >

                                <div className='flex gap-10'>
                                    <FormField
                                        control={form.control}
                                        name='title'
                                        render={({ field }) => (
                                            <FormItem className='flex w-full flex-col gap-1'>
                                                <FormLabel className='font-medium text-lg'>
                                                    Title
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Add new task..."
                                                        {...field}
                                                        autoFocus
                                                        className={cn("md:w-full md:rounded md:border md:border-violet-400 md:bg-violet-400/20 md:p-3 md:text-2xl md:text-neutral-800 md:placeholder-violet-300 md:focus:outline-0 focus:border-transparent",)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='background'
                                        render={({ field }) => (
                                            <FormItem className='flex w-full flex-col gap-1'>
                                                <FormLabel className='font-medium text-lg'>
                                                    Background Color
                                                </FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <SelectTrigger className="w-[180px] rounded border border-violet-400 bg-violet-400/20 p-3 text-2xl text-neutral-800 placeholder-violet-300 focus:outline-0 focus:border-transparent">
                                                            <SelectValue placeholder="Theme" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="#f1f58f">Mindaro</SelectItem>
                                                            <SelectItem value="#fff385">Maize</SelectItem>
                                                            <SelectItem value="#ffa930">Orange</SelectItem>
                                                            <SelectItem value="#ff32b2">Persian rose</SelectItem>
                                                            <SelectItem value="#74ed4b">Green</SelectItem>
                                                            <SelectItem value="#a9edf1">Celeste</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name='description'
                                    render={({ field }) => (
                                        <FormItem className='flex w-full flex-col gap-1'>
                                            <FormLabel className='font-medium text-lg'>
                                                Content
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
                                <div className="mt-1.5 flex items-center justify-end gap-1.5">
                                    <DrawerClose>
                                        <Button
                                            type="submit"
                                            className="flex items-center gap-1.5 rounded bg-slate-800 px-3 py-1.5 text-lg font-bold text-neutral-50 transition-colors hover:bg-neutral-300 hover:text-slate-900"
                                        >
                                            <span>Add Note</span>
                                        </Button>
                                    </DrawerClose>
                                </div>
                            </motion.form>
                        </Form>
                    </DrawerContent>
                </Drawer>
            </div>
            <div className='w-full flex gap-7 flex-wrap'>
                {userWorkspace.map(workspace => (
                    <div
                        key={workspace.id}
                        style={{
                            backgroundColor: workspace.backgroundColor
                        }}
                        className={cn("p-4 px-5 w-full max-w-[16rem] rounded-md flex flex-col gap-2", workspace.backgroundColor ? `bg-[${workspace.backgroundColor}]` : `bg-[${defaultBg}]`)}
                    >
                        <div className='flex items-center gap-10 justify-between p-0'>
                            <h2 className='p-0'>{workspace.title}</h2>
                            <Button
                                variant={"ghost"}
                                className="p-0 text-destructive hover:bg-transparent hover:text-red-800"
                                onClick={() => { deletePersonalWorkspace(workspace.id) }}
                            >
                                <Trash className='h-4 w-4' />
                            </Button>
                        </div>
                        <Separator className='bg-neutral-900' />
                        <div className='flex flex-col gap-2'>
                            <p className='truncate'>{workspace.description}</p>
                            <Link
                                href={`/workspace/${workspace.id}`}
                                className='w-full flex items-center justify-between border border-neutral-950 rounded p-2'
                            >
                                <span>Enter</span>
                                <ArrowRight className='w-4 h-4' />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default page