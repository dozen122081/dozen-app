"use client";
import ExBoard from "./ExBoard";

// import "@excalidraw/excalidraw/index.css";

const Board: React.FC = () => {
  return (
    <div className="h-[90vh] w-full">
      <ExBoard />
    </div>
  );
};
export default Board;
