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
        }
    },
    { timestamps: true }
);

let User = mongoose.model("user", userSchema);

module.exports = User;
