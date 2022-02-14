export type StatusMatch = "pre_start" | "in_progress" | "closed"
type FieldType = 0 | 1 | 2
export interface Match {
    id: string,
    player1: string,
    player2: string | null,
    status: StatusMatch,
    currentPlayer: string | null,
    field: Array<Array<0 | 1  | 2 | 3 | 4 | number>>  
    date: Date,
    messages: Message[]
}

export type SetMove = Record< 'startX' | 'startY' | 'finalX' | 'finalY', number>

export type Message = Record<'nickname' | 'content', string>
