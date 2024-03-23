"use client"
import React from "react";
import Link from "next/link";
import { oswald } from "@/lib/constants/fonsts";
import { useUser } from "@clerk/nextjs";
import { SalesNavLinks } from "@/lib/constants/salesNavlink";

const Navbar = () => {
  const { isSignedIn } = useUser();
  return (
    <div className="w-full flex items-center justify-between py-5">
      <div className="flex text-3xl items-center">
        <Link href={"/"} className={`${oswald.className}`}>
          DoZen
        </Link>
      </div>
      <div className=" flex gap-20 items-center">
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
    </div>
  );
};

export default Navbar;
