const mongoose = require("mongoose");

var objSchema = new mongoose.Schema({
    name: {type:String, require:true},
    email: {type:String, require:true},
    gender: String,
    status: String
});

const UserDB = mongoose.model('users', objSchema);

module.exports = UserDB;