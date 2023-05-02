// IMPORT
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser');
const UserModel = require('./models/User.js')

// USE
const app = express();
app.use(express.json());
app.use(cors())
app.use(cookieParser())
require('dotenv').config();

// CONSTANTS
const PORT = process.env.PORT || 3001;
const MONGO_DB = process.env.MONGO_DB
const SECRET_KEY = process.env.SECRET_KEY;

// CONNECT
try{
    mongoose.connect(MONGO_DB)
    console.log('connected to db')
} catch (err){
    console.log(err)
}

// ROUTES
app.post('/register', async (req, res) => {
    try{
        if (!req.body.password || !req.body.name) res.status(400).send("Error name or password")

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        
        const newRegisteredUser = await UserModel.create({
            name: req.body.name,
            password: hashedPassword,
        })
        
        if (newRegisteredUser){
            res.status(200).send('User created')
        } else {
            res.status(400).send('Error registering')
        }
    } catch (error){
        res.status(400).send(error)
    }
})

app.post('/login', (req, res) => {
    try{
        if (!req.body.name || !req.body.password) res.status(400).send('Incorrect name or passwrod')

        res.status(200).send('Login ok')
    } catch (error){
        res.status(400).send(error)
    }
})

app.listen(PORT, () => console.log('>> listening on ' + PORT))
