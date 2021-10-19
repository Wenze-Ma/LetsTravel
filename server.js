const config = require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const port = 5000;
// const config = require("./dbConfig");

const usersRouter = require("./routes/users");
const path = require("path");

app.use(logger('dev'))

const dbUrl = process.env.prodMongoURI;

const options = {
    keepAlive: 1,
    connectTimeoutMS: 30000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(dbUrl, options, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to database")
    }
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/users", usersRouter);


if(process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'));
    // app.get('*', (req, res) => {
    //     res.sendFile(path.resolve(__dirname, 'client', 'build', 'public/index.html'));
    // });
}

app.listen(port, function () {
    console.log("Running on " + port);
});

module.exports = app;
