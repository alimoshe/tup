const https = require('https');
const app = require('./app');
const fs = require('fs');
const PORT = 5400 || process.env.PORT;

server = https.createServer({
    key:fs.readFileSync('key.pem'),
    cert:fs.readFileSync('cert.pem')
},app);

server.listen(PORT, () =>{
    console.log(`Tup Backend Server for API is up and Running at port : ${PORT}...`)
})