"use client"
import { CardType, ColumnType } from "@/lib/types/TodoTypes";
import { Dispatch, DragEvent, SetStateAction, useState } from "react";
import { TUserTodo } from "../FeatureBoard";
import FbAddCard from "./FbAddCard";
import FbCard from "./FbCard";
import FbDropIndicator from "./FbDropIndicator";

type WsColumnProps = {
    title: string;
    headingColor: string;
    cards: TUserTodo[];
    category: ColumnType;
    setCards: Dispatch<SetStateAction<TUserTodo[]>>;
    userId?: string;
    setAppend: Dispatch<SetStateAction<boolean>>;
};

const FbColumn = ({
    title,
    headingColor,
    cards,
    category,
    setCards,
    userId,
    setAppend,
}: WsColumnProps) => {
    const [active, setActive] = useState(false);

    const handleDragStart = (e: DragEvent | TouchEvent, card: CardType) => {
        if ('touches' in e) {
            const touch = e.touches[0];
            (e as TouchEvent).dataTransfer.setData("cardId", card.id);
        } else {
            (e as DragEvent).dataTransfer.setData("cardId", card.id);
        }
    };

    const handleDragEnd = async (e: DragEvent | TouchEvent) => {
        const cardId = ('dataTransfer' in e) ? e.dataTransfer.getData("cardId") : (e.currentTarget as HTMLElement).dataset.cardId;

        setActive(false);
        clearHighlights();

        const indicators = getIndicators();
        const { element } = getNearestIndicator(e, indicators);

        const before = element.dataset.before || "-1";

        if (before !== cardId) {
            let copy = [...cards];

            let cardToTransfer = copy.find((c) => c.id === cardId);
            if (!cardToTransfer) return;
            cardToTransfer = { ...cardToTransfer, category };

            copy = copy.filter((c) => c.id !== cardId);

            const moveToBack = before === "-1";

            if (moveToBack) {
                copy.push(cardToTransfer);
            } else {
                const insertAtIndex = copy.findIndex((el) => el.id === before);
                if (insertAtIndex === undefined) return;

                copy.splice(insertAtIndex, 0, cardToTransfer);
            }
            setCards(copy);
            const response = await fetch('/api/featureboardcat', {
                method: 'PUT',
                body: JSON.stringify({
                    newData: copy,
                    author: userId,
                }),
                headers: { 'Content-Type': 'application/json' }
            })
        }
    };

    const handleDragOver = (e: DragEvent | TouchEvent) => {
        e.preventDefault();
        highlightIndicator(e);

        setActive(true);
    };


    const clearHighlights = (els?: HTMLElement[]) => {
        const indicators = els || getIndicators();

        indicators.forEach((i) => {
            i.style.opacity = "0";
        });
    };

    const highlightIndicator = (e: DragEvent | TouchEvent) => {
        const indicators = getIndicators();

        clearHighlights(indicators);

        const el = getNearestIndicator(e, indicators);

        el.element.style.opacity = "1";
    };

    const getNearestIndicator = (e: DragEvent | TouchEvent, indicators: HTMLElement[]) => {
        const DISTANCE_OFFSET = 50;

        const clientY = ('touches' in e) ? e.touches[0].clientY : e.clientY;

        const el = indicators.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();

                const offset = clientY - (box.top + DISTANCE_OFFSET);

                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            },
            {
                offset: Number.NEGATIVE_INFINITY,
                element: indicators[indicators.length - 1],
            }
        );

        return el;
    };

    const getIndicators = () => {
        return Array.from(
            document.querySelectorAll(
                `[data-column="${category}"]`
            ) as unknown as HTMLElement[]
        );
    };

    const handleDragLeave = () => {
        clearHighlights();
        setActive(false);
    };

    const filteredCards = cards.filter((c) => c.category === category);

    return (
        <div className="w-56 shrink-0">
            <div className="mb-3 flex items-center justify-between">
                <h3 className={`font-bold text-xl ${headingColor}`}>{title}</h3>
                <span className="rounded text-sm text-neutral-400">
                    {filteredCards.length}
                </span>
            </div>
            <div
                onDrop={handleDragEnd}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onTouchCancel={handleDragLeave}

                className={`h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"
                    }`}
            >
                {filteredCards.map((c) => {
                    return (
                        <FbCard
                            key={c.id}
                            id={c.id}
                            title={c.title}
                            description={c.description}
                            handleDragStart={handleDragStart}
                            setAppend={setAppend}
                            author={userId}
                            category={c.category}
                            authorEmail={c.authorEmail}
                            userImage={c.authorImage}
                        />
                    )
                })}
                <FbDropIndicator beforeId={null} category={category} />
                {
                    userId && (

                        <FbAddCard
                            column={category}
                            setCards={setCards}
                            userId={userId}
                            setAppend={setAppend}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default FbColumn;