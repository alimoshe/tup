const mongoose = require('mongoose');
const MONGO_URL = 'mongodb://localhost:27017/test';

async function dbConnect() {
    await mongoose.connect(MONGO_URL);
}
mongoose.connection.on('open', () => {


});

mongoose.connection.on('error', (err) => {
    console.log(`something wrong was happened ${err} `);
});

async function disconnect() {
    await mongoose.disconnect();
}
module.exports = {
    dbConnect,
    disconnect,
};
