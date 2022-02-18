import { Message } from "./match";
import { User } from "./user";


export interface ChatImport  {
    id: string, 
    user1: string, 
    user2: string,
    messages: Message[]
}

export interface ChatExport  {
    id: string, 
    user1: User, 
    user2: User,
    messages: Message[]
}