const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const https = require('https')
const pushNewLead = require('./ZohoConnector')

var urlEncodedParser = bodyParser.json()

app.listen(4000, function () {
    console.log('Listening on  port 4000')
});

app.get('/ping', urlEncodedParser, (req, res) => {
    console.log("pong")
    res.end('pong')
})

app.post('/pushLead', urlEncodedParser, (req, res) => {
    console.log(req.body)
    try{
        pushNewLead(req.body)
        res.status(200).send('OK')

    }catch(error){
        console.log(error.message)
        return res.status(400).send(error.message);
    }
})
