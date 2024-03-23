import { SignUp } from "@clerk/nextjs";

export default function Page() {
    let onboarded = false;
    if (onboarded) {
        return <SignUp afterSignInUrl={"/personal-dashboard"}/>
    }
    return (
        <>
            <SignUp afterSignInUrl={"/onboarding"}/>
        </>
    )
}