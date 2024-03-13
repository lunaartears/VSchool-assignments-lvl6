const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const {expressjwt: jwt} = require('express-jwt')

app.use(express.json())
app.use(morgan('dev'))

async function connectToDB() {
    try {
        mongoose.connect(
            'mongodb+srv://lunarlightandshadow:aHfU9fuuC2lpi83U@cluster1.jpuzumm.mongodb.net/')
            console.log('Connected to the DB')
    } catch (err) {
        console.log(err)
    }
}

app.use('/auth', require('./routes/authRouter.js'))
app.use('/api', jwt({secret: process.env.SECRET, algorithms: ['HS256']}))
app.use('/api/post', require('./routes/postRouter.js'))
app.use('/api/comment', require('./routes/commentRouter.js'))

app.use((err, req, res, next) => {
    console.log(err)
    if (err.name === "UnauthorizedError") {
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})


app.listen(7004, () => {
    console.log('Server is running on port 7004')
    connectToDB()
})
