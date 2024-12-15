const express = require("express");
const userRouter = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorMiddleware");
const connectDB = require("./config/connect");
const app = express();
require("dotenv").config();
require("colors");
const http = require("http");
// get the socket server
const { Server } = require("socket.io");
// make your own server

const cors = require("cors");
const postRouter = require("./routes/postRoutes");
const requestRouter = require("./routes/requestRoute");
const paymentRouter = require("./routes/paymentRoute");
app.use(cors());
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = http.createServer(app);

// make socket server

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "PUT", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected on host: ${socket.id.blue}`);

  socket.on("add_friend", (data) => {
    socket.broadcast.emit("show_request", data);
    // console.log(data);
  });

  socket.on("sent_message", (data) => {
    console.log(data);
    socket.broadcast.emit("received_message", data);
  });

  socket.on("incoming-video", (data) => {
    socket.broadcast.emit("show-video", data);
    console.log(data);
  });

  socket.on("reject_call", (data) => {
    socket.broadcast.emit("call_rejected", data);
  });
});

app.use("/api/user/", userRouter);
app.use("/api/posts/", postRouter);
app.use("/api/requests/", requestRouter);
app.use("/api/payment/", paymentRouter);

app.use(errorHandler);

server.listen(process.env.PORT, () =>
  console.log(`Server started on port: ${process.env.PORT.yellow}`)
);
