const https = require('https')

zohoCrmOptions = {
    hostname: 'www.zohoapis.eu',
    path: '/crm/v2/Leads',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Zoho-oauthtoken 1000.edbf4ba426fe8dca4f36a395fcaeea57.af36cb63e762e7b9ccfebcc2286e9f07'
    }
}

req = https.request(zohoCrmOptions, res => {
    res.on('data', data => {
        process.stdout.write(data)
    })
})

req.on('error', error => {
    console.log(error.message);
});

req.end()