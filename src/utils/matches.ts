import { Match, SetMove } from "../models/match";

export const setMoves = ({startX, startY, finalX, finalY}: SetMove, matches: Match[], index: number, numberStart: number) => {
    const distanceX = Math.abs(finalX - startX);
    const distanceY = Math.abs(finalY - startY);
    switch (true){
        case distanceX > 1 && distanceY > 1:
            matches[index].field[finalX - 1][finalY - 1] = numberStart;
        break;
        case distanceX > 1:
            matches[index].field[finalX - 1][finalY] = numberStart;
            case distanceY > 1:
                matches[index].field[finalX][finalY - 1] = numberStart;
        default: 
        break;
    }
}