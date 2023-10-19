const axios = require("axios");


exports.homeRoute = (req, res) => {
    //Make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
    .then(function(response){
        //console.log(response);
        //res.send("Crud Application");
        res.render("index.ejs", { users : response.data});
    })
    .catch(error => {
        res.send(error);
    })
}

exports.addUser = (req, res) => {
    res.render("add_user.ejs");
}

exports.updateUser = (req, res) => {
    axios.get('http://localhost:3000/api/users', { params : {id: req.query.id}})
    .then(function(userData){
        res.render("update_user.ejs", {user : userData.data});
    })
    .catch(error => {
        res.send(error);
    })
    // res.render("update_user.ejs");
}