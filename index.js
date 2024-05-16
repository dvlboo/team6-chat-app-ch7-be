require('dotenv').config()

const { createServer } = require("http");
const { Server } = require("socket.io");

const express = require('express')
const router = require('./server/routes')
const fileUpload = require('express-fileupload')
const cors = require('cors');

const app = express();

const httpServer = createServer(app);
const options = {
  cors: {
    origin: "*",
    methods: "*",
  },
};

const io = new Server(httpServer, options);

const port = process.env.PORT|| 3004;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Using socket.io to the request
app.use(async function (req, res, next) {
  req.io = io;
  next();
});

app.use(
  fileUpload({
    useTempFiles : true,
    tempFileDir: process.env.NODE_ENV == "development" ? "./tmp" : "/tmp",
  })
)

app.use('/api',router)

app.use('*', (req, res) => {

  const response = {
    data : null,
    message : "Route Not Found!!!"
  }

  res.status(400).json(response)
})

// Error Middleware
app.use((err, req, res, next) => {
  let statusCode = 500
  let message = "Internal Server Error"

  if (err.statusCode) {
    statusCode = err.statusCode
  }
  if (err.message) {
    message = err.message
  }

  res.status(statusCode).json({
    data : null,
    message
  })
})

const connectedUsers = {}
console.log(connectedUsers)

io.on("connection", (socket) => {
  console.log(socket.id + " connected!");

  socket.on("userConnected", (users) => {
    connectedUsers[socket.id] = users;
    io.emit("connectedUsers", Object.values(connectedUsers));
  });

  // Saat pengguna terputus
  socket.on("disconnect", () => {
    delete connectedUsers[socket.id];
    io.emit("connectedUsers", Object.values(connectedUsers));
  });

  socket.on("typing", () => {
    io.emit("ontyping");
  });
});

httpServer.listen(port, () => console.log(`Listening Server on Port ${port}`))