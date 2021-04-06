#!/bin/node

const data = JSON.stringify({
    "sender": "chet",  // sender ID of the user sending the message
    "message": "hi"
})

//http://6.tcp.ngrok.io:12371/webhooks/rest/webhook
const options = {
    hostname: '6.tcp.ngrok.io',
    port: 12371,
    path: '/webhooks/rest/webhook',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
}

const req = require('http').request(options, res => {
    //console.log(`statusCode: ${res.statusCode}`)
    res.on('data', d => {
        process.stdout.write(d)
        console.log("\n");
    })
})

req.on('error', error => {
    console.error(error)
})

req.write(data)
req.end()

