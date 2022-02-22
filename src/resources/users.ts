import { User } from "../models/user";
import { v4 as uuidv4 } from "uuid";
import { Error } from "../models/types";
import { usersMock } from "../mocks/users";
import jwt from "jsonwebtoken";
import { typeCryptographyJwt } from "../configurations/config";

interface UserInterface {
  users: User[];
  (): void;
  add(user: Omit<User, "id" | "online">): readonly [number, User | Error];
  remove(id: string): readonly [number, User | Error];
  generateToken(user: Omit<User, "id" | "cover" | "online">): readonly [number, {accessToken: string} | Error, string];

  // [key: string]: any; //indexer
}

//first create function
const createInterface = function () {};
export const userSelector: UserInterface = createInterface as UserInterface; //type assertion on right side
userSelector.users = usersMock;
let { users } = userSelector;  

// FUNCTIONS

//  ADD NEW USER
userSelector.add = (user: Omit<User, "id">) => {
  const newUser = { ...user, id: uuidv4() };
  users.push(newUser);
  return [200, newUser];
};
// REMOVE USER
userSelector.remove = (id: string) => {
  const index = users.findIndex(({ id: idUser }) => idUser == id);
  if (index < 0) {
    return [400, { error: 'User not found!' }];
  }
  const userRemoved = users[index];
  users = users.splice(index, 1);
  return [200, userRemoved];
};

//  LOGIN
userSelector.generateToken = ({nickname, password}: Omit<User, "id">) => {
  const user = users.find(({nickname: nicknameUser, password: passwordUser}) => nicknameUser === nickname && passwordUser === password);
    if(!user)  return [400, {error: 'Wrong credentials!'}, "null"];
    if(user.online) return [400, {error: "This User already logged!"}, "null"]
    user.online = true;
  return [200, {accessToken:  jwt.sign({nickname, password}, typeCryptographyJwt)}, user.id];
};

