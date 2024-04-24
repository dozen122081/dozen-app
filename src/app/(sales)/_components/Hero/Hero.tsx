import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { poppins } from "../../lib/constants/useFonts";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="flex flex-col items-center px-3 py-5 md:flex-row lg:flex-row">
      <div className="flex flex-col w-full items-center  lg:items-start lg:pl-[4rem] pt-2 lg:w-set">
        <h1
          className={cn(
            "lg:hidden text-[40px] leading-[50px] font-medium text-center",
            poppins.className
          )}
        >
          Tired of life <br /> chaos?
          {/* <span className="text-[#bd1313] "> chaos</span>? */}
        </h1>
        <h1
          className={cn(
            "hidden lg:flex text-[60px] font-medium w-full z-[999]",
            poppins.className
          )}
        >
          Tired of life chaos?
        </h1>
        <h2 className="text-[30px] leading-[] text-center lg:text-[40px] pt-3">
          Let's clean <span className="text-[#0ad136]">together</span>!
        </h2>
        <p className="text-[1rem] text-center w-set">
          Dozen Organize Yourself and Your Team
        </p>
        <p className="text-[1rem] text-center">
          Your Personal Productivity Powerhouse
        </p>
        <div className="flex gap-5 items-center pt-4">
          <Button className="bg-[#3B7FBD] rounded-full">Get Started</Button>
          <button className="border-2 border-[#3B7FBD] text-[14px] px-4 py-[7px] rounded-full hover:text-white hover:bg-black/80 hover:border-black/80">
            Learn More
          </button>
        </div>
      </div>
      <div className=" pt-3 lg:h-[35rem] lg:w-[45rem] flex items-center justify-center">
        <div className=" w-full rounded-lg lg:w-[45rem] overflow-hidden relative lg:right-11 ">
          <Image
            src={"/heroImage.png"}
            alt={"hero image"}
            height={768}
            width={1024}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
