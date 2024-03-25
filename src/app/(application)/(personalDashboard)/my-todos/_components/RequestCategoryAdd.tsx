"use client"
import { Button } from '@/components/ui/button';
import { sendEmail } from '@/lib/sendmail'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { redirect } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

type UserData = {
    id: string;
    objectId: string; // Assuming _id is a string
    username: string;
    image: string;
    name: string;
    email: string,
  }
const RequestCategoryAdd = () => {
    const [userData, setUserData] = useState<UserData | null>(null); // Explicitly define the type of state
    const { user } = useUser();
    useEffect(() => {
        const fetchData = async () => {
            if (!user) return null;
            const response = await fetch('/api/user');
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const data = await response.json();
            console.log(data)
            if (!data?.onboarded) {
                redirect("/onboarding");
                return;
            }
            
            const userMail = (user?.emailAddresses[0]).toString();
        
        setUserData({
          id: data.id,
          objectId: data._id || "",
          username: data.username || user.username || "",
          name: data.name || user.firstName || "",
          image: data.image || user.imageUrl,
          email: userMail || "",
        });
      };
  
      fetchData();
    }, [user]);
    if(!userData) return null;
    // get user data from db 
    const bodyText = `
    <h1>You Received a new mail.</h1>
    <p>User Name: ${userData.name}</p>
    <p>User email: ${userData.email}</p>
    <div>
        <p>Feature reqest: Add New Category</p>
    </div>
`
    const sendMailFunction = async () => {
        await sendEmail({
            subject: "New User Request",
            body: bodyText,
        })
        toast.success('Request Sent Successfull')
    }
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Add Catogory</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <DialogHeader>
                            <DialogTitle>
                                <h3 className="font-bold text-lg">Greetings!</h3>
                            </DialogTitle>
                            <DialogDescription>
                                <div className='py-4'>
                                    <p className="py-1">The feature you are trying to access is currently unavailable.</p>
                                    <p className="py-1">If you want this feature to be added soon, you can request early development.</p>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <div className="modal-action flex gap-7">
                                    <Button
                                        onClick={() => {
                                            sendMailFunction()
                                        }}
                                    >
                                        Request Early Development
                                    </Button>
                                    <DialogClose>

                                    {/* if there is a button, it will close the modal */}
                                    <button className="btn">Close</button>
                                    </DialogClose>
                            </div>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default RequestCategoryAdd
