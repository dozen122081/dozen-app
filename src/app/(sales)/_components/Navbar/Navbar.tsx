"use client"
import React, { useState } from "react";
import Link from "next/link";
import { oswald } from "@/lib/constants/fonsts";
import { useUser } from "@clerk/nextjs";
import { SalesNavLinks } from "@/lib/constants/salesNavlink";
import { FaHamburger } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const Navbar = () => {
  const { isSignedIn } = useUser();
  const [showMob, setShowMob] = useState(false)
  return (
    <div className="w-full flex items-center justify-between py-2 pb-5 lg:pb-0 lg:py-5 relative">
      <div className="flex text-3xl items-center">
        <Link href={"/"} className={`${oswald.className}`}>
          DoZen
        </Link>
      </div>
      <div className="hidden lg:flex gap-20 items-center">
        <div className="flex gap-7 items-center">
          {
            SalesNavLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="text-md font-medium hover:underline underline-black-500"
              >
                {link.label}
              </Link>

            ))
          }
          {
            !isSignedIn && (
              <Link href={"/sign-in"}>Login</Link>
            )
          }
        </div>
        <Link href={'/onboarding'} className="flex items-center">
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
      <div className="lg:hidden">
        {
          showMob ? (
            <div className="h-screen w-full absolute top-0 left-0 bg-background z-[9999]">
              <div className="w-full flex justify-end">
                <Button
                  variant={"ghost"}
                  onClick={() => setShowMob(!showMob)}
                  className="p-0"
                >
                  <X />
                </Button>
              </div>
              <div className="flex flex-col gap-7">
                <div className="flex flex-col-reverse gap-7">
                  {
                    SalesNavLinks.map((link) => (
                      <Link
                        key={link.id}
                        href={link.href}
                        className="text-md font-medium hover:underline underline-black-500"
                      >
                        {link.label}
                      </Link>

                    ))
                  }
                  {
                    !isSignedIn && (
                      <Link href={"/sign-in"}>Login</Link>
                    )
                  }
                </div>
                <Link href={'/personal-dashboard'} className="flex w-full justify-center">
                  <div className="flex w-full justify-center items-center">
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
            </div>
          ) : (
            <Button
              variant={"ghost"}
              onClick={() => setShowMob(!showMob)}
            >
              <FaHamburger />
            </Button>
          )
        }
      </div>
    </div>
  );
};

export default Navbar;
