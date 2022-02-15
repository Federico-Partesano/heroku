import express from "express";
import users from "./routes/users";
import matches from "./routes/matches";
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


// let SOCKET_LIST: Record<string, socketio.Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>> = {};

const port = process.env.PORT || 5500;

export let socketConnection: socketio.Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | null = null;
const app = express();
const server = http.createServer(app);


const io = new socketio.Server(server, {cors: {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"]
 }})
 
   io.on('connection',(socket) =>{
     socketConnection = socket;
   })
// app.use(express.static(path.join(__dirname, "public")));






 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.options("*", cors() as any);

app.use("/users", users);
app.use("/matches", matches);



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

