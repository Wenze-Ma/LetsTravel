const config = require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 5000;

const usersRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");

const path = require("path");

app.use(logger('dev'))
app.use(cookieParser());

const dbUrl = process.env.prodMongoURI;

const options = {
    keepAlive: 1,
    connectTimeoutMS: 30000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect('mongodb+srv://dbUser:dbUserPassword@cluster0.4u0km.mongodb.net/lets_travel?retryWrites=true&w=majority', options, (err) => {
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
app.use("/auth", authRouter);


app.use(express.static(path.join(__dirname, 'client/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

app.listen(port, function () {
    console.log("Running on " + port);
});

module.exports = app;
