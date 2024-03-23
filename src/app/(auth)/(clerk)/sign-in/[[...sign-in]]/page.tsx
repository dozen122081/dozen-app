import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
    let onboarded = false;
    if (onboarded) {
        return <SignIn afterSignInUrl={"/personal-dashboard"}/>
    }
    return (
        <>
            <SignIn afterSignInUrl={"/onboarding"}/>
        </>
    )
}