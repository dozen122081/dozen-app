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
        <div>
            <Excalidraw />
            {/* board comming soon.... */}
            {/* <Excalidraw>
                <WelcomeScreen>
                    <WelcomeScreen.Center>
                        <WelcomeScreen.Center.Logo >DoZen</WelcomeScreen.Center.Logo>
                        <WelcomeScreen.Center.Heading>
                            Tap to start Drawing
                        </WelcomeScreen.Center.Heading>
                        <WelcomeScreen.Center.Menu>
                            <WelcomeScreen.Center.MenuItemLink href="https://github.com/excalidraw/excalidraw">
                                DoZen Board Powered By Excalidraw
                            </WelcomeScreen.Center.MenuItemLink>
                            {/* <WelcomeScreen.Center.MenuItemHelp /> 
                        </WelcomeScreen.Center.Menu>
                    </WelcomeScreen.Center>
                </WelcomeScreen>
                <MainMenu>
                    <MainMenu.Item onSelect={() => window.alert("Item1")}>
                        Item1
                    </MainMenu.Item>
                    <MainMenu.Item onSelect={() => window.alert("Item2")}>
                        Item 2
                    </MainMenu.Item>
                </MainMenu>
            </Excalidraw> */}
        </div>
    )
}

export default ExBoard
