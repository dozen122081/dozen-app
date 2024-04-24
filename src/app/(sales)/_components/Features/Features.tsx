import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { poppins } from "../../lib/constants/useFonts";

const Features = () => {
  return (
    <div className="flex m-10 flex-col md:flex-row lg:flex-row lg:gap-16">
      <div className="flex flex-col gap-5 justify-center lg:pl-[2rem] ">
          <h3
            className={cn("text-[30px] lg:text-[36px] font-semibold ", poppins.className)}
          >
            Enjoy our features
          </h3>
        <div className="text-[1rem] lg:text-[1.2rem]">
          <p className="">Organize your life using our app.</p>
          <p className="">
            Using dozen you can{" "}
            <span className="text-[#3B7FBD]">achieve your potential.</span>
          </p>
        </div>
      </div>
      <div className="h-[25rem] w-screen -left-16 lg:right-8 lg:w-[50rem] relative flex flex-row justify-center items-center">
        <div>
          <div className="">
            <Image
              src={"/public/mobile1.png"}
              alt={"hero image"}
              height={327}
              width={313}
              className="object-cover"
            />
          </div>
        </div>
        <div>
          <div className="">
            <Image
              src={"/public/mobile2.png"}
              alt={"hero image"}
              height={313}
              width={156}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
