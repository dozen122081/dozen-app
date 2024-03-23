"use client";
import {
  Excalidraw,
  MainMenu,
  WelcomeScreen,
  convertToExcalidrawElements,
} from "@excalidraw/excalidraw";

// import "@excalidraw/excalidraw/index.css";

const Board: React.FC = () => {
  return (
    <div className="h-[90vh] w-full">
      <Excalidraw>
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
              {/* <WelcomeScreen.Center.MenuItemHelp /> */}
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
      </Excalidraw>
    </div>
  );
};
export default Board;
