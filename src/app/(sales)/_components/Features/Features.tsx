import React from "react";
import Image from "next/image";

const Features = () => {
  return (
    <div className="flex flex-col gap-20 items-center justify-start">
      <div>
        <div className="text-center text-primary text-5xl">
          <h1>FEATURES</h1>
        </div>
        <div  className="h-1.5 bg-primary rounded-md w-85"></div>
      </div>
      <div className="flex gap-32 justify-around">
        <div className="flex flex-col gap-4 max-w-[15rem]">
          <div className="flex flex-col gap-4 items-center">
            <Image
              src={"/icons.services/checklist.svg"}
              alt="checklist"
              height={80}
              width={80}
              className="object-contain"
            />
            <div className="px-12">
              <h2 className="font-semibold text-lg">
                Effortless Task Management
              </h2>
            </div>
          </div>
          <div className="text-center text-muted">
            <p>
              Organize your life with ease. Create, edit, and prioritize tasks
              in seconds.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 max-w-[15rem]">
          <div className="flex flex-col gap-4 items-center">
            <Image
              src={"/icons.services/ringingBell.svg"}
              alt="bell"
              height={80}
              width={80}
              className="object-contain"
            />
            <div>
              <h2 className="font-semibold text-lg">
                Never Miss a <br /> Deadline Again
              </h2>
            </div>
          </div>
          <div className="text-center text-muted">
            <p>
              Set reminders and due dates for ultimate accountability. Stay on
              top of your goals.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 max-w-[15rem]">
          <div className="flex flex-col gap-4 items-center">
            <Image
              src={"/icons.services/cute-rocket-launching.svg"}
              alt="rocket"
              height={80}
              width={80}
              className="object-contain"
            />
            <div>
              <h2 className="font-semibold text-lg">Boost Your Productivity</h2>
            </div>
          </div>
          <div className="text-center">
            <p className="text-center text-muted">
              Free yourself from distractions. Achieve more with powerful
              organization tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
