const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");

const connectDB = require("./server/database/connection.js");


const app = express();
dotenv.config({path: 'config.env'});

const PORT = process.env.PORT || 8080;

//mongoDB Connection caller
connectDB();

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
app.use('/', require('./server/routes/Router.js'))

app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
});