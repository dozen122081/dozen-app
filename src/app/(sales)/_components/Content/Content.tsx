import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { oswald } from "@/lib/constants/fonsts";
import { cn } from "@/lib/utils";

const Content = () => {
  return (
    <div className="py-10">
      <div
        className={cn(
          "text-center text-6xl leading-[4rem] flex flex-col gap-11",
          oswald.className
        )}
      >
        <div className="transition">
          <p>
            The only platform that can support your <br /> company at any scale
          </p>
        </div>
        <div className="min-h-[100px] flex items-center justify-center">
          <button className="transition text-white ease-in-out delay-150 bg-[#000000] text-[2.5rem] rounded-2xl font-medium p-2 hover:-translate-y-1 hover:scale-110 hover:bg-[#D7DEDC] hover:text-black duration-300">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Content;
