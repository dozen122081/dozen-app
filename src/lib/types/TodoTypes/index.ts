export type ColumnType = "backlog" | "todo" | "doing" | "done" | string;
export type CardType = {
    id: string;
    author: string;
    description: string | "";
    title: string;
    category: ColumnType;
};


