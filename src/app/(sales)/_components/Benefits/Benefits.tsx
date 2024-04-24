import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { poppins } from "../../lib/constants/useFonts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Benefits = () => {
  return (
    <div className="px-[2rem] lg:px-[4rem] pt-5 lg:mt-5">
      <div className="flex flex-col md:flex-row lg:flex-row">
        <div className="flex flex-col gap-y-5">
          <div>
            <h2 className={cn("text-[30px] lg:text-[36px] font-semibold ", poppins.className)}>
              Use sticky notes for{" "}
              <span className="text-[rgb(59,127,189)]">Easy Organization</span>
            </h2>
          </div>
          <div className="text-[1rem] lg:text-[1.1rem]">
            <div className="hidden lg:block">
            <p>
              With Dozen's Sticky Notes feature, you can effortlessly create and
            </p>
            <p>
              organize notes to stay on top of your tasks and ideas. Whether
              it's a{" "}
            </p>
            <p>reminder, a brainstorming session, or a simple to use.</p>
            </div>
            <p className=" lg:hidden">With Dozen's Sticky Notes feature, you can effortlessly create and organize notes to stay on top of your tasks and ideas. Whether reminder, a brainstorming session, or a simple to use.</p>
          </div>
        </div>
        <div className="h-[18rem] lg:w-[30rem] relative flex flex-col lg:items-center">
          <div className="flex gap-10">
            <div>
              <div className="w-[9rem] relative">
                <Image
                  src={"/public/Benefits_photos/sticky.png"}
                  alt={"hero image"}
                  height={327}
                  width={313}
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <div className="w-[7rem] relative transform rotate-12 top-[6.5rem] lg:top-[6rem] ">
                <Image
                  src={"/public/Benefits_photos/dozen.png"}
                  alt={"hero image"}
                  height={327}
                  width={313}
                  className="object-cover bg-[#FF9083]"
                />
              </div>
            </div>
          </div>
          <div className="w-[12rem] relative -top-[2rem] left-7 lg:left-0">
            <div>
                <Image
                  src={"/public/Benefits_photos/line.png"}
                  alt={"hero image"}
                  height={327}
                  width={313}
                  className="object-cover"
                />
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5 relative lg:-top-[5rem] flex-col md:flex-row lg:flex-row items-centeryarn">
        <div className="drop-shadow-xl">
          <Card className="h-[200px] w-[300px]">
            <CardHeader className="text-center">
              <CardTitle>Efficient</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Stay organized with our Sticky Notes feature that allows you to create, edit and priotize your notes.</p>
            </CardContent>
          </Card>
        </div>
        <div className="gap-5 drop-shadow-xl">
          <Card className="h-[200px] w-[300px]">
            <CardHeader>
              <CardTitle className="text-center">Versatile</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Take advantage of our Sticky Notes feature to keep track of important information and ideas.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
