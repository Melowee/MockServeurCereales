const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const https = require('https')
const pushNewLead = require('./ZohoConnector')

var urlEncodedParser = bodyParser.json()

app.listen(4000, function () {
    console.log('Listening on  port 4000')
});

app.post('/pushLead', urlEncodedParser, (req, res) => {
    console.log(req.body)
    pushNewLead(req.body)
    res.end('Sois content, plèbe, car ta création fonctionne')
})