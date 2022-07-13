const req = require('express/lib/request');
const https = require('https')
const secret = require('./secret.json')
const verify_field = require('./verify_field')

token = "";
zohoCrmOptions = {
    hostname: 'www.zohoapis.eu',
    path: '/crm/v2/Leads',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Zoho-oauthtoken non'
    }
}
zohoAccountsOptions = {
    hostname: 'accounts.zoho.eu',
    path: '/oauth/v2/token?refresh_token=' + secret.token + '&client_id=' + secret.client_id + '&client_secret=' + secret.client_secret + '&grant_type=refresh_token',
    method: 'POST'
}

function pushNewLead(data) {
    console.log(zohoCrmOptions)
    if (verify_field.fields_ok(data)) {
        let req = https.request(zohoCrmOptions, res => {
            console.log(`status code : ${res.statusCode}`)

            res.on('data', message => {
                if (JSON.parse(message).code == "INVALID_TOKEN") {
                    updateTokenAndRetry(data)
                }
            })
        });

        let body = {
            data: [
                {
                    First_Name: data.firstName,
                    Last_Name: data.lastName,
                    Email: data.email
                }
            ]
        }

        req.write(JSON.stringify(body));

        req.on('error', error => {
            console.log(error.message);
        });

        req.end();
    }
}

function updateTokenAndRetry(data) {
    let req = https.request(zohoAccountsOptions, res => {
        res.on('data', message => {
            zohoCrmOptions.headers.Authorization = 'Zoho-oauthtoken ' + JSON.parse(message).access_token
            pushNewLead(data)
        })
    })



    req.on('error', error => {
        console.log(error)
    })

    req.end();
}

module.exports = pushNewLead;
