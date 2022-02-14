import { Match } from "../models/match";
export  const  initialField = () => Array.from({length: 8}, (_, column) => {
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
    {id: "47573d9a-4cfc-49b7-990e-1347c8715353", player1: "Federico", player2: null, currentPlayer: null, field: initialField(), status: "pre_start", date: new Date(), messages: [{nickname: 'Federico', content: 'Ciao come va?'},{nickname: 'Federico', content: 'Ciao come va?'}] },
    {id: "9401125d-5349-4818-b4c9-1f7a12d2907b", player1: "f", player2: null, currentPlayer: null, field: initialField(), status: "pre_start", date: new Date(), messages: [{nickname: 'Federico', content: 'Ciao come va?'},{nickname: 'Federico', content: 'Ciao come va?'}] }

]

