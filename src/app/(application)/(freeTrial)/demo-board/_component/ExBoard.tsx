"use client";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { Mynerve } from 'next/font/google'
import { useState } from "react";

const mynerve = Mynerve({
    subsets: ['latin', 'greek', 'latin-ext', 'vietnamese'],
    weight: ['400']
})

const Excalidraw = dynamic(
    async () => (await import("@excalidraw/excalidraw")).Excalidraw,
    {
        ssr: false,
    },
);

const UIOptions = {
    canvasActions: {
        changeViewBackgroundColor: true,
        saveAsImage: true,
    },
};
const ExBoard = () => {

    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    }

    return (
        <div className=" md:ml-10 max-h-screen h-full relative">
            <Excalidraw UIOptions={UIOptions}>

                <div className={`absolute z-[999]
                    ${isClicked ? "hidden" : ""}
                flex gap-2 items-center 
                justify-center h-[100vh] w-full`}>
                    <div className="flex flex-col items-center justify-center gap-2 p-10 text-xl border-2 rounded-lg bg-[#eeeeee] shadow-xl">
                        <div>
                            <h2 className={mynerve.className}>Board Powered By Excalidraw!</h2>
                        </div>

                        <div>
                            <Button onClick={handleClick}>Start</Button>
                        </div>
                    </div>
                </div>
                {/* <div className="dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2]">

                </div> */}
                {/* <div 
                    className="flex justify-center items-center h-10 w-10 z-[9999] absolute md:left-3.5 md:top-[2%] left-4 bottom-5  bg-background"
                >
                </div>
                <div 
                    className="flex justify-center items-center md:h-10 md:w-20 w-14 h-10 z-[9999] absolute md:right-[27.6%] md:top-[2.8%] top-4 right-[0.2rem] md:bg-transparent bg-background"
                >
                </div>
                <div 
                    className="flex justify-center items-center  md:h-[4rem] md:w-[4rem] z-[9999] absolute  md:right-2.5 md:bottom-[1.9%] bg-background"
                >
                </div>
                <div 
                    className="flex justify-center items-center  md:h-[4rem] md:w-[4rem] z-[9999] absolute  md:right-2.5 md:bottom-[1.9%] h-10 w-10 top-[4.8rem] right-0 md:hidden bg-background"
                >
                </div>
                <div 
                    className="md:flex md:justify-center md:items-center md:h-[4.5rem] md:w-[7rem] md:z-[9999] md:absolute md:right-2.5 md:top-[1.9%] hidden md:bg-background "
                >
                </div> */}
            </Excalidraw>
        </div>
    )
}

export default ExBoard
