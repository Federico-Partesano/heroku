import { Request, Response } from "express";
import {  ChatExport, ChatImport } from "../models/chat";
import { Message } from "../models/match";
import { Error, ObjectReduce } from "../models/types";
import { User } from "../models/user";
import { chatSelector } from "../resources/chats";
import { socketConnection } from "..";
// const [users, dispatch] = usersSelector();

const { chats ,add, addMessage } = chatSelector;

export const chatsController = {
  addChat: (
    { body }: Request<{}, {}, Omit<ChatImport, 'id' | 'messages'>>,res: Response<ChatExport | Error>) => {
      const [status, chat] = add(body);
      res.status(status).json(chat) 
},

getChats: (
  {headers: {nickname}}: Request,res:  Response<ChatExport[] | Error>) => {
    const chatFiltered = chats.filter(({user1, user2}) => user1.nickname === nickname || user2.nickname === nickname)
    res.status(200).json(chatFiltered); 
},

getChat: (
  {params: {id}}: Request<{id: string}>,res:  Response<ChatExport | Error>) => {
    const chat =  chats.find(({id: idChat}) => idChat === id);
    if(!chat) return res.status(404).json({error: 'Chat not found!'})
    res.status(200).json(chat); 
},


addMessage: (
  { body:{content}, params: { id }, headers:{nickname} }: Request<{id: string}, {}, {content: string}>,res: Response<Message | Error>) => {
  console.log("🚀 ~ file: chats.ts ~ line 35 ~ content", content)
    console.log('nickname', nickname);
    if( typeof nickname !== "string" ) return [404, {error: 'Invalid nickname!'}]
    const [status,idChat ,message] = addMessage(id,{nickname, content});

    (status < 300 && idChat !== "null") &&  socketConnection!.broadcast.emit(`add-new-message-chat-${idChat}`, message );
    (status < 300 && idChat !== "null") && socketConnection!.emit(`add-new-message-chat-${idChat}`, message );


    res.status(status).json(message);

    

},


}
