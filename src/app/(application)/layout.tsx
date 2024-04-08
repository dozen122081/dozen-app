import "../globals.css";
const ApplicationLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <main className='w-full h-full min-h-screen'>
                {children}
        </main>

    )
}

export default ApplicationLayout