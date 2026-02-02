type Audit = {
    id: number;
    ip: string;
    url: string;
    html: string;
    scor: number;
    device: number;
    date: string;
};

type SortKey = keyof Audit | null;
type SortDirection = "asc" | "desc";

export type { Audit, SortKey, SortDirection };