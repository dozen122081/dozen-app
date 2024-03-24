"use client";
import {
    MainMenu,
    WelcomeScreen
} from "@excalidraw/excalidraw";
import dynamic from "next/dynamic";
const Excalidraw = dynamic(
    async () => (await import("@excalidraw/excalidraw")).Excalidraw,
    {
        ssr: false,
    },
);
const ExBoard = () => {
    return (
        <div className="max-h-screen h-full relative">
            <Excalidraw>
                <div 
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
                </div>
            </Excalidraw>
        </div>
    )
}

export default ExBoard
