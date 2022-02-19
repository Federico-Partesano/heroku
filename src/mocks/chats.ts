import { ChatExport } from "../models/chat";
import { usersMock } from "./users";
const generateMessagesMock = () => [ {
    nickname: usersMock[0].nickname,
    content: 'ciao',
    watched: false
},
{
    nickname: usersMock[1].nickname,
    content: 'ciao',
    watched: false
},
{
    nickname: usersMock[0].nickname,
    content: 'come va?',
    watched: true
},
{
    nickname: usersMock[1].nickname,
    content: 'bene grazie!',
    watched: true
},]

export const chatsMock: ChatExport[] = [
{
    id: '123123',
    user1: usersMock[0],
    user2: usersMock[1],
    messages: [
        ...generateMessagesMock(),
        ...generateMessagesMock(),
        ...generateMessagesMock(),
        ...generateMessagesMock(),
        ...generateMessagesMock(),
        ...generateMessagesMock(),
        ...generateMessagesMock(),
        ...generateMessagesMock(),

    ]
}

]