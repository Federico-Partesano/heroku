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


const PORT =  3001;

const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server).listen(server);

io.on("connection", (...params) => {
  console.log(params);
});

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

app.listen(3001, () => console.log("Server is running"));
export default app;
