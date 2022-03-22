const http = require('http');
const CMS_PORT = 3080 || process.env.CMS_PORT;
const app = require('./app');

const server = http.createServer(app);
server.listen(CMS_PORT, ()=>{
   console.log(`CMS backend API is listening on Port ${CMS_PORT}...`);
});


