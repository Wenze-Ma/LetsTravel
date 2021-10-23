const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let sessionSchema = new Schema(
    {
        user: {
            type: String,
        },
        session: {
            type: String,
        }
    }
);

let Session = mongoose.model("session", sessionSchema);

module.exports = Session;
