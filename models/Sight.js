const mongoose = require('mongoose');
const {SchemaTypes} = require("mongoose");
require('mongoose-double')(mongoose);
let Schema = mongoose.Schema;

let sightSchema = new Schema(
    {
        xid: String,
        name: String,
        address: {
            city: String,
            road: String,
            state: String,
            county: String,
            country: String,
            postcode: String,
        },
        rate: SchemaTypes.Double,
        wikidata: String,
        kinds: String,
        preview: {
            source: String,
            height: Number,
            width: Number,
        },
        wikipedia_extracts: {
            title: String,
            text: String,
            html: String
        },
        comments: [
            {
                user: String,
                text: String,
                time: Date,
                likes: Number,
                dislikes: Number,
                avatar: String,
            }
        ],
    }
);

let Sight = mongoose.model("sight", sightSchema);

module.exports = Sight;
