//jshint esversion: 6

const express = require('express');
const request = require('request');
const https = require('https');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const zone = process.env.ZONE;
const list_id = process.env.LIST_ID;
const api_key = process.env.API_KEY+"-"+zone;

app.use(express.static('assets'));
app.use(express.urlencoded({extended: true}));

app.listen(port, () => console.log(`server is listening on port ${port}!`));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/signup.html');
});

app.post("/", function(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    console.log('name: ' + name+ ' email: ' + email);

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: name
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url  = "https://"+zone+".api.mailchimp.com/3.0/lists/"+list_id;
    const options = {
        method: "POST",
        auth: "kabirul:"+api_key
    }
    const request = https.request(url, options, function(response) {
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
        if(response.statusCode === 200){
            res.sendFile(__dirname + '/success.html');
        }
        else{
            res.sendFile(__dirname + '/failure.html');
        }
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res) {
    res.redirect('/');
});