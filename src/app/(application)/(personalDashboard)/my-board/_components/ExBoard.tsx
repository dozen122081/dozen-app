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
                    className="flex justify-center items-center h-10 w-10 z-[9999] relative left-3.5 top-[2%]  bg-background"
                >
                    
                </div>
                <div 
                    className="flex justify-center items-center h-[4rem] w-[4rem] z-[9999] absolute right-2.5 bottom-[1.9%]  bg-background "
                >
                    
                </div>
                <div 
                    className="flex justify-center items-center h-10 w-[7rem] z-[9999] absolute right-2.5 top-[2.10%]  bg-background "
                >
                    
                </div>
            </Excalidraw>
        </div>
    )
}

export default ExBoard
