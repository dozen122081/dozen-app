import "../globals.css"
import { Toaster } from 'sonner';
const ApplicationLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <main className='w-full'>
            {children}
        </main>

    )
}

export default ApplicationLayout