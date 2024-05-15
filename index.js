const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database')

const app = express()
const PORT = 5000;
const URL = '127.0.0.1'

app.use(bodyParser.json()) // ser till att omvandla JSON-format så att vi kan utläsa det 

// const db = database.initDatabase() // denna fixar vi på database.js sen 

// frågan är om funktionern (dvs createSubscription, createUser, etc) ska följa här nedan eller om vi ska separera dem i en egen js-fil



app.listen(PORT, URL, () => {
    console.log(`Server running at http://${URL}:${PORT}`)
})