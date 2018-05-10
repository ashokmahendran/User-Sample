let mongoose = require('mongoose');
let Schema = mongoose.Schema;


const UserSchema = new Schema({
    userid: {type: String, required: true, max: 20, unique: true},
    firstname: {type: String, required: true, max: 50},
    lastname: {type: String, required: true, max: 50},
    password: {type: String, required: true, max: 20},
    age: {type: Number, required: true, max: 100},
    phonenumber: {type: String, required: true, max: 10, unique: true},
    role: {type: String, required: true, max: 10}
});

module.exports =mongoose.model('UsersModel', UserSchema);