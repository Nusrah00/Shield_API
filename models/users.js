const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');



const usersSchema = new Schema({

  
    name: {
        type: String,
        required: true,
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

module.exports = model("Users", usersSchema);