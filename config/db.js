const mongoose = require('mongoose');
require('dotenv').config();

const { URI_DB } = process.env;

const db = mongoose.connect(URI_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

process.on('SIGINT', async () => {
    mongoose.connection.close(() => {
        console.log('Disconnected from DB');
        process.exit(1)
    });
});

module.exports = db;