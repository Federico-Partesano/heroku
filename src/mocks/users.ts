import { v4 as uuidv4 } from "uuid";
import { User } from "../models/user";

export const usersMock: User[] = [
    {id: uuidv4(), nickname: 'Federico', password: '1234', cover: 'horse.jpg'},
    {id: uuidv4(), nickname: 'f', password: 'f', cover: 'bojack.png'},
    {id: uuidv4(), nickname: 'Marco', password: 'm', cover: 'bojack.png'},
    {id: uuidv4(), nickname: 'Padella', password: 'p', cover: 'bojack.png'},
    {id: uuidv4(), nickname: 'Giuseppe', password: 'm', cover: 'bojack.png'},
    {id: uuidv4(), nickname: 'Wolf', password: 'm', cover: 'bojack.png'},
    {id: uuidv4(), nickname: 'Salvo', password: 'm', cover: 'bojack.png'},
    {id: uuidv4(), nickname: 'Alagi', password: 'm', cover: 'horse.jpg'},
    {id: uuidv4(), nickname: 'Carlo', password: 'm', cover: 'bojack.png'},
    {id: uuidv4(), nickname: 'Jhonny', password: 'm', cover: 'horse.jpg'},
    {id: uuidv4(), nickname: 'Santo', password: 'm', cover: 'bojack.png'},
    {id: uuidv4(), nickname: 'Seby', password: 'm', cover: 'bojack.png'},

]