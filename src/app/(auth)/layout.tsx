import MaxWidthWrapper from '@/lib/MaxWidthWrapper';
import { ClerkProvider } from '@clerk/nextjs'

import '../globals.css'
const AuthenticationLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <html>
      <body className='flex items-center justify-center'>
        {children}
      </body>
    </html>
  )
}

export default AuthenticationLayout