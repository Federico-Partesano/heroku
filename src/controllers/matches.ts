import { Request, Response } from "express";
import { socketConnection } from "..";
import { Match, Message, SetMove } from "../models/match";
import { Error, ObjectReduce } from "../models/types";
import { User } from "../models/user";
import { matchSelector } from "../resources/matches";
import { userSelector } from "../resources/users";

// const [users, dispatch] = usersSelector();

const { matches, add, remove, join, setMove, addMessage } = matchSelector;

export const matchController = {
  getMatches: (req: Request, res: Response<Match[]>) => {
    res.json(matches);
  },
  getMatch: ({params:{ id }}: Request<{id: string}>, res: Response<Match | {error: string}>) => {
    const match = matches.find(({id: idMatch}) => idMatch === id);
    if(!match) return res.status(400).json({error: 'match not find'})
    
    res.json(match);
  },
  removeMatch: (
    { body: { id } }: Request<{}, {}, { id: string }>,res: Response<Match | Error>) => {
    const [status, match] = remove(id);
    res.status(status).json(match);
  },
  addMatch: (
    { body: { id } }: Request<{}, {}, { id: string }>,res: Response<Match | Error>) => {
    const [status, match] = add(id);
    try{
    status < 300 && socketConnection!.broadcast.emit('add-new-match', match );
    status < 300 && socketConnection!.emit('add-new-match', match );

    } catch(e:any) {
      return res.status(400).json(e);
    }
    res.status(status).json(match);
  },

  addMessage: (
    { params: { id }, body }: Request<{ id: string }, {}, { nickname: string, content: string }>,res: Response<Message | Error>) => {
    const [status, message] = addMessage(id, body);
    status < 300 && socketConnection!.broadcast.emit(`add-new-message-${id}`, message );
    status < 300 && socketConnection!.emit(`add-new-message-${id}`, message );
    res.status(status).json(message);
  },


  joinMatch: (
    { params: { id }, headers: {nickname} }: Request<{ id: string }>,res: Response<Match | Error>) => {
      console.log(nickname);
      if(nickname && typeof nickname === "string"){
        const [status, match] = join(id, nickname);
        status < 300 && socketConnection!.emit(`match-join`, match );
        status < 300 && socketConnection!.broadcast.emit(`match-join`, match );

        res.status(status).json(match);
      } else {
        res.status(400).json({error: 'Invalid nickname!'})
      }
  },


  Setmove: (
    {params:{id} ,body, headers: {nickname} }: Request<{id: string},{},SetMove>,res: Response<Match | Error>) => { 
      if(nickname && typeof nickname === "string"){
        const [status, match, moves] = setMove(id, nickname ,body)
        status < 300 && socketConnection!.broadcast.emit(`match-refresh-${id}`, {match, moves} );
        status < 300 && socketConnection!.emit(`match-refresh-${id}`, {match, moves} );

        status < 300 && socketConnection!.broadcast.emit(`match-setmove`, match );
        status < 300 && socketConnection!.emit(`match-setmove`, match );

        return res.status(status).json(match);
      }
      res.status(400).json({error: 'Invalid nickname!'})
  },


};
