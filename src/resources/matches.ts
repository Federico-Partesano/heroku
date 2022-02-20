import { User } from "../models/user";
import { v4 as uuidv4 } from "uuid";
import { Error } from "../models/types";
import { usersMock } from "../mocks/users";
import { Match, Message, SetMove } from "../models/match";
import { initialField, matchesMock } from "../mocks/matches";
import { body } from "express-validator";
import { setMoves } from "../utils/matches";
interface MatchInterface {
  matches: Match[];
  (): void;
  add(player: string): readonly [number, Match | Error];
  addMessage(id: string, message: Message): readonly [number, Message | Error];
  remove(id: string): readonly [number, Match | Error];
  join(id: string, nickname: string): readonly [number, Match | Error];
  setMove(id:string,nickname: string,{ startX, startY, finalX, finalY }: SetMove): readonly [number, Match | Error, SetMove?];

  // [key: string]: any; //indexer
}

//first create function
const c = function () {};
export const matchSelector: MatchInterface = c as MatchInterface; //type assertion on right side
matchSelector.matches = [];
let { matches } = matchSelector;
// FUNCTIONS

//  ADD NEW MATCH
matchSelector.add = (player: string) => {
  const newMatch: Match = { player1: player, id: uuidv4(), player2: null, status: "pre_start", currentPlayer: null, field: initialField(), date: new Date(), messages: []   };
  matches.unshift(newMatch);
  return [200, newMatch];
};
//  ADD NEW MESSAGE
matchSelector.addMessage = (id: string,message: Message) => {
  const indexMatch = matches.findIndex(({id: idMatch}) => idMatch === id );
  if(indexMatch < 0) return [400, {error: 'Match not found!'}]
  matches[indexMatch].messages.push(message);
  return [200, message];
};


//  JOIN MATCH
matchSelector.join = (id: string, nickname: string) => {
    const matchIndex = matches.findIndex(({id: idMatch}) =>  id === idMatch);
    if(matchIndex < 0) return [400, {error: 'Match not found!'}]
     if(nickname === matches[matchIndex].player1){
      if(matches[matchIndex].player2 === null) return [400,  {error: 'Await another player!'}]
      return [200, matches[matchIndex]]
     }
     if(nickname === matches[matchIndex].player2) return [200, matches[matchIndex]]
    matches[matchIndex].player2 = nickname;
    matches[matchIndex].currentPlayer = nickname;
    matches[matchIndex].status = "in_progress";
    return [200, matches[matchIndex]];
  };

  //  SET MOVE MATCH
matchSelector.setMove = (id:string,nickname: string,body: SetMove) => {
    const {startX, startY, finalX, finalY} = body;
    const matchIndex = matches.findIndex(({id: idMatch}) =>  id === idMatch);
    if(matchIndex < 0) return [400, {error: 'Match not found!'}]
    // if(Object.keys(body).some(value => value === undefined)) return [400, {error: 'invalid body values'}]
    if(Object.values(body).some(value => value > 8 && value < 0)) return [400, {error: 'Body values must be less than 8 and greater than 0'}]
    const numberStart =  matches[matchIndex].field[startX][startY];
    const numberFinal =  matches[matchIndex].field[finalX][finalY];
    if(numberStart === 0) return [400, {error: 'Invalid request!'}]
    if(numberFinal !== 0) return [400, {error: 'Invalid request!'}]

    if(matches[matchIndex].currentPlayer !== nickname) return [400, {error: 'Not is your turn!'}]
    matches[matchIndex].field[startX][startY] = 0;
    setMoves(body, matches,matchIndex,numberStart);
    matches[matchIndex].field[finalX][finalY] = numberStart;
    matches[matchIndex].currentPlayer = matches[matchIndex].currentPlayer === matches[matchIndex].player1 
    ? matches[matchIndex].player2 :  matches[matchIndex].player1

    return [200, matches[matchIndex], body];
  };


// REMOVE MATCH
matchSelector.remove = (id: string) => {
  const index = matches.findIndex(({ id: idMatch }) => idMatch == id);
  if (index < 0) {
    return [400, { error: "Match not found!" }] as const;
  }
  const matchRemoved = matches[index];
  matches = matches.splice(index, 1);
  return [200, matchRemoved] as const;
};


