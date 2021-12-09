//jshint esversion: 6

const express = require('express');
const request = require('request');
const app = express();
const port = 3000;


app.use(express.static('assets'));
app.use(express.urlencoded({extended: true}));

// app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`server is listening on port ${port}!`));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/signup.html');
});

app.post("/", function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    console.log('name: ' + name+ ' email: ' + email);
    res.redirect('/');
});