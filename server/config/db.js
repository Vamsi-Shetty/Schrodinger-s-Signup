const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(`${process.env.MONGODB_URL}/assignment`)

module.exports = {connection};