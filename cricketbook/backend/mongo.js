require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.MONGO_URI;

mongoose.set('strictQuery', false);

mongoose.connect(url, { family: 4 });

const cricketerschema = new mongoose.Schema({
    name: String,
    battingposition: String,
})


module.exports = mongoose.model('Cricketer', cricketerschema);


