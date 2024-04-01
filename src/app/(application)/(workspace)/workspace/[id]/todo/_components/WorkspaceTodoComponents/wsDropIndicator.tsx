"use client"

type DropIndicatorProps = {
    beforeId: string | null;
    category: string;
};

const WsDropIndicator = ({ beforeId, category }: DropIndicatorProps) => {
    return (
        <div
            data-before={beforeId || "-1"}
            data-column={category}
            className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
        />
    );
};

export default WsDropIndicator;