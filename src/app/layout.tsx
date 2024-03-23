import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'
import { Toaster } from 'sonner'

const RootLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <ClerkProvider>
            <html lang='en'>
                <body>
                {children}
                <Toaster />
                </body>
            </html>
        </ClerkProvider>
    )
}

export default RootLayout
