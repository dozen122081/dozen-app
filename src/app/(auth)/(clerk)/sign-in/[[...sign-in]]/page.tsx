import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
    // let onboarded = false;
    // if (onboarded) {
    //     return <SignIn afterSignInUrl={"/personal-dashboard"}/>
    // }
    return (
        <div className="flex h-screen items-center justify-center">
            <SignIn afterSignInUrl={"/onboarding"}/>
        </div>
    )
}