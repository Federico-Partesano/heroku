import { Request, Response } from "express";
import {  ChatExport, ChatImport } from "../models/chat";
import { Message } from "../models/match";
import { Error, ObjectReduce } from "../models/types";
import { User } from "../models/user";
import { chatSelector } from "../resources/chats";
// const [users, dispatch] = usersSelector();

const { chats ,add, addMessage } = chatSelector;

export const chatsController = {
  addChat: (
    { body }: Request<{}, {}, Omit<ChatImport, 'id' | 'messages'>>,res: Response<ChatExport | Error>) => {
      const [status, chat] = add(body);
      res.status(status).json(chat) 
},

getChats: (
  {headers: {nickname}}: Request,res:  Response) => {
    console.log('statusToken', nickname); 
    const chatFiltered = chats.filter(({user1, user2}) => user1.nickname === nickname || user2.nickname === nickname)
    res.status(200).json(chatFiltered); 
},

addMessage: (
  { body:{content}, params: { id }, headers:{nickname} }: Request<{id: string}, {}, {content: string}>,res: Response<Message | Error>) => {
    if( typeof nickname !== "string" ) return [404, {error: 'Nickname invalid!'}]
    const [status, message] = addMessage(id,{nickname, content});
    res.status(status).json(message);

    

},


}
