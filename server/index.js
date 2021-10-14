const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const port = 5000;
const config = require("./dbConfig");

const usersRouter = require("./routes/users");

app.use(logger('dev'))

const dbUrl = config.dbUrl;

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

app.listen(port, function () {
    console.log("Runnning on " + port);
});

module.exports = app;
