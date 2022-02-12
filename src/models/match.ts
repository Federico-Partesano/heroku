export type StatusMatch = "pre_start" | "in_progress" | "closed"
type FieldType = 0 | 1 | 2
export interface Match {
    id: string,
    player1: string,
    player2: string | null,
    status: StatusMatch,
    currentPlayer: string,
    field: Array<Array<0 | 1  | 2 | 3 | 4 >>
}



