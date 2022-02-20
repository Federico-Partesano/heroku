import express from "express";
import users from "./routes/users";
import matches from "./routes/matches";
import chats from "./routes/chats";

import cors from "cors";
import { Request } from "express";
import {
  errorHandler,
  ResponseSuccessJson,
  toExpressHandler,
} from "./utils/express.utils";
import * as http from "http";
import * as socketio from "socket.io";
import path from "path";
import { matchesMock } from "./mocks/matches";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { userSelector } from "./resources/users";
import { User } from "./models/user";
import { chatSelector } from "./resources/chats";


const { users: usersArray } = userSelector;


// let SOCKET_LIST: Record<string, socketio.Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>> = {};

const port = process.env.PORT || 3001;

export let socketConnection: socketio.Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | null = null;
const app = express();
const server = http.createServer(app);


const io = new socketio.Server(server, {cors: {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"]
 }})
 
   io.on('connection',(socket) =>{
     socketConnection = socket;
     const idSocket = socket.id;
     let userConnected: User | undefined = undefined;
  
      socket.on(`online-user`,(idUser) => {

        let user = usersArray.find(({id}) => id === idUser);
        if(!user)return;
        user!.online = true;
        userConnected = user;
        
        const chatsFiltered =  chatSelector.chats.filter(({user1: {id: id_1}, user2:{id:id_2}}) => userConnected!.id === id_1 || userConnected?.id === id_2)
            .map(({id, user1, user2}) => ({id, user1, user2}));
          // console.log('asd', chatsFiltered);
            chatsFiltered.forEach(({id, user1, user2}) => {
          socket.broadcast.emit(`connection-user-${id}`, {chatId: id,user: userConnected});
      });
    });
    socket.on('disconnect', () => {
      if(!userConnected) return;
      userConnected.online = false;

      const chatsFiltered =  chatSelector.chats.filter(({user1: {id: id_1}, user2:{id:id_2}}) => userConnected!.id === id_1 || userConnected?.id === id_2)
          .map(({id, user1, user2}) => ({id, user1, user2}));
        // console.log('asd', chatsFiltered);
          chatsFiltered.forEach(({id, user1, user2}) => {
        socket.broadcast.emit(`connection-user-${id}`, {chatId: id,user: userConnected});

      })

    })

   })
// app.use(express.static(path.join(__dirname, "public")));








 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.options("*", cors() as any);

app.use("/users", users);
app.use("/matches", matches);
app.use("/chats", chats);



class TestController {
  static testEndpoint = async (req: Request) => {
    if (req.query.fail) throw new Error("simulated error");
    return ResponseSuccessJson({ message: "ok" });
  };
}



app.get(
  "/test",
  // ----
  toExpressHandler(TestController.testEndpoint, TestController)
);
app.use(errorHandler);

server.listen(port ,() => console.log("Server is running"));



   export default app;

