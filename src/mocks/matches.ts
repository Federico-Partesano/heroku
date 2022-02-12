import { Match } from "../models/match";
export  const  initialField = Array.from({length: 8}, (_, column) => {
   return Array.from({length: 8}, (_, row )=>{
    if(column> 2 && column< 5){ return 0 } 
    if(column< 3){
        return column% 2 ? row % 2 ? 0 : 1 : row % 2 ? 1 : 0;
    } else {
        return column% 2 ? row % 2 ? 0 : 3 : row % 2 ? 3 : 0;
    }
})
});

export const matchesMock: Match[] = [
    {id: "1234", player1: "Federico", player2: null, currentPlayer: "Federico", field: initialField, status: "pre_start" }
]

