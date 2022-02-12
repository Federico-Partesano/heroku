import { Request, Response } from "express";
import { Match } from "../models/match";
import { Error, ObjectReduce } from "../models/types";
import { User } from "../models/user";
import { matchSelector } from "../resources/matches";
import { userSelector } from "../resources/users";
// const [users, dispatch] = usersSelector();

const { matches, add, remove } = matchSelector;

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
    { body: { id } }: Request<{}, {}, { id: string }>,{},res: Response<Match | Error>) => {
    const [status, match] = remove(id);
    res.status(status).json(match);
  },
  addMatch: (
    { body: { id } }: Request<{}, {}, { id: string }>,{},res: Response<Match | Error>) => {
    const [status, match] = add(id);
    res.status(status).json(match);
  },

  Setmove: (
    {params:{id} ,body: { startX, startY, finalX, finalY }, headers: {nickname} }: Request<{id: string}, {}, Record< 'startX' | 'startY' | 'finalX' | 'finalY', number>>,{},res: Response<Match[] | Error>) => {
      const match = matches.find(({id: idMatch}) => idMatch === id);
      if(!match) return res.status(400).json({error: 'match not find'}) 
      if(match.currentPlayer !== nickname) return res.status(403).json({error: 'Not is your turn!'});
      
      res.status(200).json(matches);
  },


};
