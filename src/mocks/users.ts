import { v4 as uuidv4 } from "uuid";
import { User } from "../models/user";

export const usersMock: User[] = [
    {id: uuidv4(), nickname: 'Federico', password: '1234', cover: 'horse.jpg'},
    {id: uuidv4(), nickname: 'f', password: 'f', cover: 'bojack.png'}

]