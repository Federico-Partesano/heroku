import { v4 as uuidv4 } from "uuid";
import { User } from "../models/user";

export const usersMock: User[] = [
    {id: uuidv4(), nickname: 'Federico', password: '1234'}
]