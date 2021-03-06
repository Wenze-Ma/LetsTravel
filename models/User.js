const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema(
    {
        email: {
            type: String,
        },
        first_name: {
            type: String,
        },
        last_name: {
            type: String,
        },
        password_hash: {
            type: String
        },
        gender: {
            type: String
        },
        src: {
            type: String
        },
        favorites: {
            type: Array
        },
        friends: {
            type: Array
        },
        pendingRequest: {
            type: Array
        },
        messageSent: {
            type: Array
        },
        messageReceived: {
            type: Array
        }
    },
    { timestamps: true }
);

let User = mongoose.model("user", userSchema);

module.exports = User;
