const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create todolist Schema & model
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username field is required"]
    },
    password: {
        type: String,
        required: [true, "Password field is required"]
    }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;