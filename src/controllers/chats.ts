import { Request, Response } from "express";
import {  ChatExport, ChatImport } from "../models/chat";
import { Message } from "../models/match";
import { Error, ObjectReduce } from "../models/types";
import { User } from "../models/user";
import { chatSelector } from "../resources/chats";
import { socketConnection } from "..";
import { userSelector } from "../resources/users";
// const [users, dispatch] = usersSelector();

const { chats ,add, addMessage } = chatSelector;
const  {users} = userSelector

export const chatsController = {
  addChat: (
    { body }: Request<{}, {}, Omit<ChatImport, 'id' | 'messages'>>,res: Response<ChatExport>) => {

      const [status, chat] = add(body); 

      (status < 300 && chat) &&  socketConnection!.broadcast.emit(`add-new-room-chat-${chat.user1.id}`, chat );
      (status < 300 && chat) &&  socketConnection!.broadcast.emit(`add-new-room-chat-${chat.user2.id}`, chat );

      (status < 300 && chat) && socketConnection!.emit(`add-new-room-chat-${chat.user1.id}`, chat );
      (status < 300 && chat) && socketConnection!.emit(`add-new-room-chat-${chat.user2.id}`, chat );

      res.status(status).json(chat) 
},

getChats: (
  {headers: {nickname}}: Request,res:  Response<ChatExport[] | Error>) => {
    if(!users.some(({nickname: nicknameUser}) => nicknameUser === nickname)) return res.status(404).json({error: 'Invalid nickname!'})
    const chatFiltered = chats.filter(({user1, user2}) => user1.nickname === nickname || user2.nickname === nickname);
    const calcMessagesNotWatched = chatFiltered.map((chat) => ({...chat, messagesNotWatched: chat.messages.reduce((acc, curr) => (!curr.watched && curr.nickname !== nickname) ? acc + 1 : acc , 0) }))
    res.status(200).json(calcMessagesNotWatched); 
},

getChat: (
  {params: {id}, headers:{nickname}}: Request<{id: string}>,res:  Response<ChatExport | Error>) => {
    const chat =  chats.find(({id: idChat}) => idChat === id);
    if(!chat) return res.status(404).json({error: 'Chat not found!'});
    const messagesNotWatched = chat.messages.reduce((acc,curr) => (!curr.watched && curr.nickname !== nickname) ? acc + 1 : acc ,0)
    res.status(200).json({...chat, messagesNotWatched}); 
},

setAllMessagesWatched: (
  {params: {id}, headers:{nickname}}: Request<{id: string}>,res:  Response<ChatExport | Error>) => {
    const chat =  chats.find(({id: idChat}) => idChat === id);
    if(!chat) return res.status(404).json({error: "Chat not found!"})
    chat.messages.forEach(message => {
       (!message.watched && message.nickname !== nickname) && (message.watched = true);
    });
    res.status(200).json(chat); 
},

addMessage: (
  { body:{content}, params: { id }, headers:{nickname} }: Request<{id: string}, {}, {content: string}>,res: Response<Message | Error>) => {
    if( typeof nickname !== "string" ) return [404, {error: 'Invalid nickname!'}]
    const [status,idChat ,message] = addMessage(id,{nickname, content});


    (status < 300 && idChat !== "null") &&  socketConnection!.broadcast.emit(`add-new-message-chat-${idChat}`, message );
    (status < 300 && idChat !== "null") && socketConnection!.emit(`add-new-message-chat-${idChat}`, message );


    res.status(status).json(message);

  },


}
