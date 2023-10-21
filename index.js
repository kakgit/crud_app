
//Replace in config.env
//MONGODB_URI=mongodb+srv://kamarthianil:JClOaCHWnkye9O6g@clusterkak.2qbgbpn.mongodb.net/AlgoDB
//MONGODB_URI=mongodb://127.0.0.1:27017/AlgoDB


const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
const { Server } = require("socket.io");

const connectDB = require("./server/database/connection.js");


const app = express();

dotenv.config({path: 'config.env'});

const PORT = process.env.PORT || 8080;

//mongoDB Connection caller
connectDB();

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (cSocket) => {
    //console.log("New User ID: ", cSocket.id);

    cSocket.on("UserMessage", (pMsg) => {
        console.log("New Msg from client: " + pMsg);
        io.emit("ServerEmit", pMsg);
    });
});

//log requests
app.use(morgan("tiny"));

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}));

//set view engine
app.set("view engine", "ejs");

//uncomment the below stmt only if the views has subfolders. By Default root of views is searched
//app.set("views", path.resolve(__dirname, "views/ejs"));

//load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

app.post("/tv-msg", (req, res) => {
    //console.log("from TV Msg");
    const vMsg = req.body.pMessage
    io.emit("ServerEmit", vMsg);

    res.send();
    //res.render("index.ejs");
    return;
});


//Moved to Router.js
// app.get("/", (req, res) => {
//     //res.send("Crud Application");
//     res.render("index.ejs");
// });

// app.get("/addUser", (req, res) => {
//     //res.send("Crud Application");
//     res.render("add_user.ejs");
// });

// app.get("/updateUser", (req, res) => {
//     //res.send("Crud Application");
//     res.render("update_user.ejs");
// });
//Moved to Router.js
//Instead of the above code use this below code
app.use('/', require('./server/routes/Router.js'));


server.listen(PORT, ()=> {
    console.log(`Server is running on ${process.env.API_PATH}`);
});