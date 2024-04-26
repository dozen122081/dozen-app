"use client"

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user.validation";
import { Button } from "@/components/ui/button"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { createUpdateUserData } from "@/lib/backend-actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/validations/uploadthing.validation";
import { TUserData } from "@/app/(auth)/onboarding/page";
interface UserProfileFormProps {
    user: TUserData,
    btnTitle: string;
}
const UserProfileForm = ({
    user,
    btnTitle,
}: UserProfileFormProps) => {
    const router = useRouter();
    const pathname = usePathname()
    const [files, setFiles] = useState<File[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const { startUpload } = useUploadThing("media");
    const form = useForm<z.infer<typeof UserValidation>>({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            username: user.username || "",
            name: user.name || "",
            profile_photo: user.image || "",

        },

    })
    const handleImage = (
        e: ChangeEvent<HTMLInputElement>,
        fieldChange: (value: string) => void
    ) => {
        e.preventDefault();

        const fileReader = new FileReader();

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFiles(Array.from(e.target.files));

            if (!file.type.includes("image")) return;

            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || "";
                fieldChange(imageDataUrl);
            };

            fileReader.readAsDataURL(file);
        }
    }

    const onSubmit = async (values: z.infer<typeof UserValidation>) => {
        setIsCreating(true);
        const blob = values.profile_photo;

        const hasImageChanged = isBase64Image(blob);
        if (hasImageChanged) {
            const imgRes = await startUpload(files);

            if (imgRes && imgRes[0].fileUrl) {
                values.profile_photo = imgRes[0].fileUrl;
            }
        }
        await createUpdateUserData({
            userId: user.id,
            email: user.email,
            name: values.name,
            username: values.username,
            image: values.profile_photo,
            onboarded: true,
            path: pathname,
            hasPaid: false,
            hasPaidWorkspace: false,
        })
        setIsCreating(false);
        if (pathname === "/profile/edit") {
            router.back();
        } else {
            if (!user.hasPaid) {
                router.push("/apppayment");
            } else {
                router.push("/personal-dashboard");
            }
        }
    }
    return (
        <Form {...form}>
            <form
                className='flex flex-col justify-start gap-7 p-10 rounded-lg border-2 border-slate-900'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name='profile_photo'
                    render={({ field }) => (
                        <FormItem className='flex items-center gap-4 mb-7'>
                            <FormLabel className=''>
                                {field.value ? (
                                    <Avatar>
                                        <AvatarImage 
                                            src={field.value}
                                            alt="profile_icon" 
                                        />
                                        <AvatarFallback>DZ</AvatarFallback>
                                    </Avatar>
                                ) : (
                                    <Avatar>
                                        <AvatarImage src='/assets/profile.svg' alt="profile_icon" />
                                        <AvatarFallback>DZ</AvatarFallback>
                                    </Avatar>
                                )}
                            </FormLabel>
                            <FormControl className='flex-1 text-base-semibold text-gray-200'>
                                <Input
                                    type='file'
                                    accept='image/*'
                                    placeholder='Add profile photo'
                                    className='border-none text-bold placeholder:text-muted'
                                    onChange={(e) => handleImage(e, field.onChange)}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-0.5'>
                            <FormLabel className='font-medium text-xl'>
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    className='text-2xl font-normal py-7'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                        <FormItem className='flex w-full flex-col gap-0.5'>
                            <FormLabel className='font-medium text-xl'>
                                Username
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type='text'
                                    className='text-2xl font-normal py-7'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='submit'>
                    {
                        isCreating ? (
                            <span className='animate-spin -ml-1 mr-3 h-5 w-5 rounded-full border-b-2 border-white border-opacity-25'></span>
                        ) : (
                            <span className="font-bold text-xl py-4">{btnTitle}</span>
                        )
                    }
                </Button>
            </form>
        </Form>
    )
}

export default UserProfileForm