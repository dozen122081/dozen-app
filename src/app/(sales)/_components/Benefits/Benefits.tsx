import React from "react";
import Image from "next/image";
import { oswald } from "@/lib/constants/fonsts";
import { cn } from "@/lib/utils";
const Benefits = () => {
  return (
    <main className="h-screen w-screen">
      <div
        className={cn(
          oswald.className,
          "text-5xl leading-4rem py-20 px-72"
        )}
      >
        <h1>Ready to break free from the overwhelm?</h1>
      </div>
      <div className=" h-[70vh] gap-10">
        <div className="h-[75vh] w-[20rem] overflow-hidden absolute right-0">
          <div className="py-[10rem]">
            <Image
              src={"/benefits.png"}
              alt={"photo"}
              height={553}
              width={800}
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col gap-12 w-full left-1">
          <div className="flex items-center px-72 gap-3">
            <div>
              <Image
                src={"/icons.benefits/smiley-fill.svg"}
                alt="smiley-face"
                height={40}
                width={40}
                className="object-contain"
              />
            </div>
            <div className="text-center text-3xl p">
              <p>Reduce stress and anxiety with clear organization</p>
            </div>
          </div>
          <div className="flex items-center px-72 gap-3">
            <div>
              <Image
                src={"/icons.benefits/light-bulb.svg"}
                alt="light-bulb"
                height={40}
                width={40}
                className="object-contain"
              />
            </div>
            <div className="text-center text-3xl">
              <p>Unlock your focus and achieve peak productivity</p>
            </div>
          </div>
          <div className="flex items-center px-72 gap-3">
            <div className="">
              <Image
                src={"/icons.benefits/trophy.svg"}
                alt="trophy"
                height={40}
                width={40}
                className="object-contain"
              />
            </div>
            <div className="text-center text-3xl">
              <p>Empower yourself to reach your full potential</p>
            </div>
            </div>
          </div>
      </div>  
    </main>
  );
};

export default Benefits;
