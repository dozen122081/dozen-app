import "../globals.css";
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