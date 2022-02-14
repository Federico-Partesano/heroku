// import { io } from ".";
// import { matchSelector } from "./resources/matches";

// export const socketMethods = () => {
// io.on("connection", (socket) => {
//     console.log('connected');
//   socket.on("add-new-match", (data) => {
//     console.log(data.msg);
//     socket.emit("match-added", {
//       msg: "Loud and clear :)",
//     });
//   });

//   socket.emit("event2", {
//     msg: "Server to client, do you read me? Over.",
//   });

//   socket.on("event3", (data) => {
//     console.log(data.msg);
//     socket.emit("event4", {
//       msg: "Loud and clear :)",
//     });
//   });
// }) 
// }
