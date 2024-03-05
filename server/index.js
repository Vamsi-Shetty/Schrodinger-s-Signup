const express = require('express');
const bcrypt = require("bcrypt");
const cors = require("cors");


const {Usermodel} = require("./models/User.model");
const {connection} = require('./config/db');

const app = express();

app.use(cors())

app.use(express.json());

app.post("/signup", async (req, res) => {
    const {name, email, password} = req.body;
    try {
        bcrypt.hash(password, 5, async function(err, hash) {
            await Usermodel.create({name, email, password: hash});
            res.send("signup successful");
        });
    } catch (error) {
        console.log(error);
    }
})

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log("Error connecting to DB");
        console.log(error);
    }
    console.log(`Listening on PORT ${process.env.PORT}`);
})