import { User } from "../models/user";
import { v4 as uuidv4 } from "uuid";
import { Error } from "../models/types";
import { usersMock } from "../mocks/users";
import { Match } from "../models/match";
import { initialField, matchesMock } from "../mocks/matches";

interface MatchInterface {
  matches: Match[];
  (): void;
  add(player: string): readonly [number, Match | { error: string }];
  remove(id: string): readonly [number, Match | Error];
  // [key: string]: any; //indexer
}

//first create function
const c = function () {};
export const matchSelector: MatchInterface = c as MatchInterface; //type assertion on right side
matchSelector.matches = matchesMock;
let { matches } = matchSelector;
// FUNCTIONS

//  ADD NEW MATCH
matchSelector.add = (player: string) => {
  const newMatch: Match = { player1: player, id: uuidv4(), player2: player, status: "pre_start", currentPlayer: player, field: initialField   };
  matches.push(newMatch);
  return [200, newMatch];
};
// REMOVE MATCH
matchSelector.remove = (id: string) => {
  const index = matches.findIndex(({ id: idMatch }) => idMatch == id);
  if (index < 0) {
    return [400, { error: "match not found" }] as const;
  }
  const matchRemoved = matches[index];
  matches = matches.splice(index, 1);
  return [200, matchRemoved] as const;
};


