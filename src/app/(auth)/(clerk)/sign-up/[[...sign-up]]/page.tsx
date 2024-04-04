import { SignUp } from "@clerk/nextjs";

export default function Page() {
    // let onboarded = false;
    // if (onboarded) {
    //     return <SignUp afterSignInUrl={"/personal-dashboard"}/>
    // }
    return (
        <div className="flex h-screen items-center justify-center">
            <SignUp afterSignInUrl={"/onboarding"}/>
        </div>
    )
}