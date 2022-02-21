

type Elements = 'Match' | 'Chat' | 'User' | 'Nickname';



export type MessageError = `Invalid ${'nickname' | 'request' | 'content'}!` |
 `${Elements} not found!` | 
 `${Elements} already exists!`|
 `Wrong ${Elements | 'credentials!'}` | 
 'Await another player!' | 
 'Not is your turn!' | 
 'Body values must be less than 8 and greater than 0!' |
 'This User already logged!'



