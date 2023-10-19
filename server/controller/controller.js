var userDB = require('../model/modelUsers.js');

//create and save new user details

exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({ message : "Content can not be empty!"});
        return;
    }

    //New User
    const user = new userDB({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    //Save User in the DB
    user
    .save(user)
    .then(data => {
        //res.send(data);
        res.redirect("/");
    })
    .catch(error => {
        res.status(500).send({
            message: error.message || "Some Error Occured while creating a create operation.."
        });
    });
}

//retrieve and return all users or a sing user
exports.find = (req, res) => {

    if(req.query.id)
    {
        const id = req.query.id;

        userDB.findById(id)
        .then(data => {
            if(!data)
            {
                res.status(404).send({ message : "No Record found with the Id - " + id});
            }
            else
            {
                res.send(data);
            }
        })
        .catch(error => {
            res.status(500).send({ message : "Error Retreiving User with Id - " + id});
        })
    }
    else
    {
        userDB.find()
        .then(user => {
            res.send(user)
        })
        .catch(error => {
            res.status(500).send({ message: error.message || "Error Occurred while retreiving User Information!"})
        })
    }
}

//update a new user by id
exports.update = (req, res) => {
    if(!req.body){
        return res
        .status(400)
        .send({ message : "Data to Update can not be empty"})
    }

    const id = req.params.id;

    userDB.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(data => {
        if(!data){
            res.status(400).send({ message : `Cannot Update User With ${id}. May be user not found!`})
        }
        else {
            res.send(data)
        }
    })
    .catch(error => {
        res.status(500).send({ message : "Error Update User Information"})
    })
}

//delete a user by Id
exports.delete = (req, res) => {
    const id = req.params.id;

    console.log(id);
    userDB.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({ message : `Connot Delete with id ${id}. Maybe id is wrong...`})
        }
        else{
            res.status(200).send({
                message : "User Was Deleted Successfully!"
            })
        }
    })
    .catch(error => {
        res.status(500).send({
            message : "Could not delete User with Id = " + id
        });
    });
}

exports.testUser = (req, res) => {
    const vId = req.params.id;

    // console.log("Test from Controller id: " + id);
    // res.status(400).send({ status : "error", message : id});

    userDB.findByIdAndDelete(vId)
    .then(data => {
        if(!data){
            res.status(404).send({status: "Invalid", message : `Can not Delete with id ${vId}. Please check the ID`})
        }
        else{
            res.status(200).send({ status: "success", message : "User Deleted Successfully!" })
        }
    })
    .catch(error => {
        res.status(500).send({ status: "Error", message : "Could not delete User with Id = " + vId });
    });
}