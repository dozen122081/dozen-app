import "@blocknote/core/fonts/inter.css";
import { darkDefaultTheme, lightDefaultTheme, useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/react";
import "@blocknote/mantine/style.css";
 
 
export default function App() {
  // Creates a new editor instance.
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: "Welcome to this demo!",
      },
      {
        type: "paragraph",
        content: "Open up a menu or toolbar to see more of the red theme",
      },
      
      {
        type: "paragraph",
      },
      {
        type: "paragraph", 
        content: ""
      },
    ],
  });
 
  // Renders the editor instance using a React component.
  // Adds `data-theming-css-variables-demo` to restrict styles to only this demo.
  return (
    <>
    <h2 className="p-5">Demo Note </h2>
    <div className="max-h-[100vh] h-96 p-10">
      <BlockNoteView editor={editor} theme={lightDefaultTheme} />
    </div>
    </>
  );
}
 
 