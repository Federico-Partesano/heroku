import express from "express";
import sales from "./routes/sales";
import cors from "cors";
import { Request } from "express";
import {
  errorHandler,
  ResponseSuccessJson,
  toExpressHandler,
} from "./utils/express.utils";
const PORT = process.env.PORT || 5000;

const app = express();



// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// app.use(cors());
// app.options("*", cors() as any);

app.get('/',(res, req) => req.send('ciao'))


// class TestController {
//   static testEndpoint = async (req: Request) => {
//     if (req.query.fail) throw new Error("simulated error");
//     return ResponseSuccessJson({ message: "ok" });
//   };
// }

// app.get(
//   "/test",
//   // ----
//   toExpressHandler(TestController.testEndpoint, TestController)
// );
// app.use(errorHandler);

app.listen(PORT, () => console.log("Server is running"));
export default app;
