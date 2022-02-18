import { User } from "../models/user";
import { v4 as uuidv4 } from "uuid";
import { Error } from "../models/types";
import { usersMock } from "../mocks/users";
import jwt from "jsonwebtoken";
import { typeCryptographyJwt } from "../configurations/config";
import {  ChatExport, ChatImport } from "../models/chat";
import { userSelector } from "./users";
import { Message } from "../models/match";
import { chatsMock } from "../mocks/chats";

interface UserInterface {
  chats: ChatExport[];
  (): void;
  add(user: Omit<ChatImport, "id" | "messages">): readonly [number, ChatExport | { error: string }];
  addMessage(id: string, message: Message): readonly [number, Message | Error];
  generateToken(user: Omit<User, "id" | "cover">): readonly [number, {accessToken: string} | Error];

  // [key: string]: any; //indexer
}

const {users} = userSelector;

//first create function
const c = function () {};
export const chatSelector: UserInterface = c as UserInterface; //type assertion on right side
chatSelector.chats = chatsMock;
let { chats } = chatSelector;
// FUNCTIONS

//  ADD NEW CHAT
chatSelector.add = (user: Omit<ChatImport, "id" | "messages">) => {
  const {user1, user2} = user;
  if(chats.find(({user1: user1Selected,user2: user2Selected}) => 
  (user1Selected.nickname === user1 && user2Selected.nickname === user2) ||
  (user1Selected.nickname === user2 && user2Selected.nickname === user1)
  )) return [409, {error: 'Chat already exists!'}]
  const user_1 = users.find(({nickname}) => user1 === nickname);
  const user_2 = users.find(({nickname}) => user2 === nickname);
  if(!user_1 || !user_2) return [404, {error: 'Users not found!'}]
  const newChat: ChatExport = { user1: user_1, user2: user_2, id: uuidv4(), messages: [] };
  chats.push(newChat);
  return [200, newChat];
};

//  ADD NEW MESSAGE CHAT
chatSelector.addMessage = (id: string,message: Message) => {
  const indexChat =  chats.findIndex(({id: idChat}) => idChat === id);
  if(indexChat < 0) return [404, {error: 'Chat not found!'}];
  chats[indexChat].messages.push(message);
  return [200, message];
};




