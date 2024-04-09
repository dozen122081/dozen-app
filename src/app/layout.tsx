import { ClerkProvider } from '@clerk/nextjs'
import { Metadata } from 'next';
import React from 'react'
import { Toaster } from 'sonner'
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
    manifest: '/manifest.webmanifest'
};
const RootLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <ClerkProvider>
            <html lang='en' className='antialiased'>
                <head>
                    <ColorSchemeScript />
                </head>
                <body>
                    <MantineProvider>{children}</MantineProvider>
                    <Toaster />
                </body>
            </html>
        </ClerkProvider>
    )
}

export default RootLayout
