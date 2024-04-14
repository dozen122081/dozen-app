"use client"
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const { isSignedIn } = useUser()
  return (
    <main className="flex h-screen gap-10 flex-col items-center lg:pt-10">
      <div className="flex flex-col justify-start gap-2 items-center w-full relative ">
        <div className="text-4xl font-light leading-[3rem] gap-7 flex flex-col lg:items-center lg:px-8">
          <h3 className="hidden text-4xl lg:flex gap-1">
            "Tired of Life's
            <span className="text-destructive">Chaos</span>?
            Let's Clean Up
            <div className="relative">
              <span className="text-green-800">
                Together
              </span>
              <Image
                src="/bluecircle.svg"
                alt=""
                height={80}
                width={200}
                className="absolute -top-1 -translate-x-1/2 left-1/2"
              />
            </div>
            !"</h3>
          <h3 className="lg:hidden text-3xl flex flex-col gap-3">
            <div>
              <span>"Tired of Life's</span>
              <span className="text-destructive">Chaos</span>
              <span>?</span>
            </div>
            <div className="relative">
              <span className="text-green-800">
              Let's Clean Up Together !"
              </span>
              <Image
                src="/bluecircle.svg"
                alt=""
                height={30}
                width={150}
                className="absolute -top-1 right-4"
              />
            </div>
          </h3>
          <h3 className="text-2xl lg:text-3xl">Dozen Organize Yourself and Your Team</h3>
        </div>
        <div className="text-2xl lg:text-3xl font-light text-right lg:text-left lg:px-8">
          <p>Your Personal Productivity Powerhouse</p>
        </div>
      </div>
      <div>
        <Link href={'/personal-dashboard'} className="flex items-center">
          <div className="flex items-center">
            <button className="rounded-2xl border-2 border-solid border-black bg-white px-3 py-1 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
              {
                isSignedIn ? (
                  <span>Enter App</span>
                ) : (
                  <span>Get Started</span>
                )
              }
            </button>
          </div>
        </Link>
      </div>
      <div>
        <div className="h-[20rem] relative">
          <Image
            src="/documents.png"
            alt="mess"
            height={768 / 2}
            width={1024 / 2}
            className="object-contain"
          />
          <div className="absolute h-[40rem] w-[40rem] rounded-full opacity-20 -z-[99999] top-1/2 -translate-y-1/2 bg-gradient-to-tr from-slate-800 to-green-500 blur-[100px]  left-1/2 -translate-x-1/2" />
        </div>
      </div>
    </main>
  );
};

export default Hero;
