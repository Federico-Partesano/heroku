import { Request, Response } from "express";
import { Error, ObjectReduce } from "../models/types";
import { User } from "../models/user";
import { userSelector } from "../resources/users";
// const [users, dispatch] = usersSelector();

const { users, add, remove, generateToken } = userSelector;

export const usersController = {
  signUp: (
    { body: {nickname, password, cover} }: Request<{}, {}, Record<"nickname" | "password" | "cover", string>>,res: Response<User | Error>) => {


    if(users.find(({nickname: nicknameUser}) =>nicknameUser === nickname )){
      return res.status(400).json({error: 'Nickname already exists!'});
    }
    const [status, user] = add({nickname, password, cover});
    res.status(status).json(user);
  },

  login: (
    { body: {nickname, password} }: Request<{}, {}, Omit<User, "id">>,res: Response<{accessToken: string, id: string} | Error>) => {
    const [statusToken, token, id] = generateToken({nickname, password});  
    res.status(statusToken).json({...token, id: id});
  },


  getUsers: ({headers: {nickname}}: Request, res: Response<User[]>) => {
    res.json(users.filter(({nickname: nicknameUser}) => nicknameUser !== nickname));
  },

  removeUser: (
    { body: { id } }: Request<{}, {}, { id: string }>,{},res: Response<User | Error>) => {
    const [status, user] = remove(id);
    res.status(status).json(user);
  },
};
