import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { poppins } from "../../lib/constants/useFonts";

const Why = () => {
  return (
    <div className="flex flex-col pb-14">
      <div className="text-center ">
        <h1 className={cn("text-[30px] py-10 font-semibold text-[#011C27]", poppins.className)}>Why Dozen ?</h1>
      </div>
      <div className="flex gap-10 items-center justify-around flex-col md:flex-row ">
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 items-center justify-center ">
              <Image
                src={"/public/Why/universe.png"}
                alt={"universe"}
                height={63}
                width={64}
                className="object-cover"
              />
            <div>
              <h2>Universal</h2>
            </div>
          </div>
          <div>
            {/* <p>Dozen is universal app . We provide </p>
            <p>services to all the countries in the world.</p>
            <p>We have also make available in your native</p>
            <p>language . </p> */}
            <p className="w-[20rem]">Dozen is universal app . We provide services to all the countries in the world. We have also make available in your native language.</p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 items-center justify-center ">
              <Image
                src={"/public/Why/pricing.png"}
                alt={"universe"}
                height={63}
                width={64}
                className="object-cover"
              />
            <div>
              <h2>Pricing</h2>
            </div>
          </div>
          <div>
            {/* <p>Luckly we have plan for everyone.</p>
            <p>Understand your need and take full advantage of it.</p>
            <p>Enjoy the experience with us .</p> */}
            <p className="w-[20rem]">Luckly we have plan for everyone. Understand your need and take full advantage of it.Enjoy the experience with us.</p>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default Why;
