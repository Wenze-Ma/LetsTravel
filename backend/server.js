const express = require('express');
const app = express();

app.listen(5000, function () {
    console.log('listening on 5000')
});

app.get('/', function (req, res) {
    res.send('Hello World')
});

app.post('/discover', (req, res) => {
    console.log(req.body)
});

const MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb+srv://dbUser:dbUserPassword@cluster0.4u0km.mongodb.net/letsTravelDatabase?retryWrites=true&w=majority';

MongoClient.connect(connectionString, {
    useUnifiedTopology: true
}, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
})
