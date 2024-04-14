"use client"
import { Button } from '@/components/ui/button'
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { PersonalStickyNotesValidation } from '@/lib/validations/personal.stickynotes.validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from "framer-motion"
import { Pen, Trash } from 'lucide-react'
import { Mynerve } from 'next/font/google'
import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { TStickyNotes } from '../ProductTrial'
const defaultBg = "#f1f58f"
const mynerve = Mynerve({
    subsets: ['latin', 'greek', 'latin-ext', 'vietnamese'],
    weight: ['400']
})
interface Props {
    notes: TStickyNotes[];
    setNotes: Dispatch<SetStateAction<TStickyNotes[]>>
}
const TriWsStickyNotes = ({
    notes,
    setNotes
}: Props) => {
    

    const form = useForm<z.infer<typeof PersonalStickyNotesValidation>>({
        resolver: zodResolver(PersonalStickyNotesValidation),
        defaultValues: {
            title: "",
            description: "",
            background: "#f1f58f",
        },
    });
    const onSubmit = async (values: z.infer<typeof PersonalStickyNotesValidation>) => {
        const newNote: TStickyNotes = {
            id: Math.random().toString(),
            title: values.title,
            description: values.description,
            backgroundColor: values.background,
        };
        setNotes(prevNotes => [...prevNotes, newNote]);
        form.reset();
    };

    const deletePersonalStickyNotes = async (noteId: string) => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
    };
  return (
    <section className='flex flex-col items-start h-[130vh] max-h-[200vh]  w-screen-xl'>
    <div className='w-full my-10 flex items-center justify-center md:justify-start'>
        <Drawer>
            <DrawerTrigger>
                <div
                    className='h-56 w-56 border border-dashed rounded-xl flex justify-center items-center border-slate-800'
                >
                    <div className='flex flex-col md:items-center text-slate-600 gap-2'>
                        <Pen />
                        <span>Add Note</span>
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
                                                className={cn("md:w-full md:rounded md:border md:border-violet-400 md:bg-violet-400/20 md:p-3 md:text-2xl md:text-neutral-800 md:placeholder-violet-300 md:focus:outline-0 focus:border-transparent", mynerve.className)}
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

                                            {/* <Input
                                            placeholder="Add new task..."
                                            {...field}
                                            autoFocus
                                            className={cn("w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-2xl text-neutral-800 placeholder-violet-300 focus:outline-0", mynerve.className)}
                                        /> */}
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
    <ScrollArea className="h-[90vh] w-full rounded-md">
        <div className='flex gap-10 flex-wrap justify-center md:justify-start'>
            {
                notes.map((note, index) => (
                    <Drawer key={index}>
                        <DrawerTrigger>
                            <ScrollArea
                                style={{
                                    backgroundColor: note.backgroundColor
                                }}
                                key={note.id}
                                className={cn("h-72 w-72 rounded-xl pb-4", note.backgroundColor ?  `bg-[${note.backgroundColor}]` : `bg-[${defaultBg}]`)}
                            >
                                <div className="relative px-4">
                                    <div 
                                        style={{
                                            backgroundColor: note.backgroundColor
                                        }}
                                        className='top-0 left-0 pt-4 mb-2 sticky w-full bg-[#fff385]'
                                    >
                                        <h4 className={cn("mb-4 text-2xl font-medium leading-none text-left", mynerve.className)}>{note.title}</h4>
                                        <Separator className='text-slate-900 bg-slate-700' />
                                    </div>
                                    <p className='py-2 text-left text-wrap'>{note.description}</p>
                                </div>
                            </ScrollArea>
                        </DrawerTrigger>
                        <DrawerContent className='px-10 w-full'>
                            <DrawerClose>
                                <div className='w-full flex justify-end'>
                                    <Button
                                        variant={"ghost"}
                                        onClick={() => deletePersonalStickyNotes(note.id)}
                                    >
                                        <Trash className={"h-7 w-7 text-destructive"} />
                                    </Button>
                                </div>
                            </DrawerClose>
                            <DrawerHeader>
                                <DrawerTitle>
                                    {/* <h4 className={cn("mb-4 text-2xl font-medium leading-none")}>Title</h4> */}
                                    <h4 className={cn("mb-4 text-2xl font-medium leading-none", mynerve.className)}>{note.title}</h4>
                                </DrawerTitle>
                            </DrawerHeader>
                            <Separator className='text-slate-900 bg-slate-700' />
                            <ScrollArea
                                key={note.id}
                                className="h-72 w-full rounded-xl"
                            >
                                <p className='py-4 text-left text-wrap'>{note.description}</p>
                            </ScrollArea>
                        </DrawerContent>
                    </Drawer>
                ))
            }
        </div>
    </ScrollArea>
</section >
  )
}

export default TriWsStickyNotes