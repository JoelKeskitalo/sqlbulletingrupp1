const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database')
const { createUser } = require('./functions');

const app = express()
const PORT = 5000;
const URL = '127.0.0.1'

app.use(bodyParser.json()) // ser till att omvandla JSON-format så att vi kan utläsa det 

// frågan är om funktionerna (dvs createSubscription, createUser, etc) ska följa här nedan eller om vi ska separera dem i en egen js-fil

app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    try {
        const user = await createUser(name, email)
        res.status(200).send(user)
    } catch(error){
        res.status(500).send(error.message)
    }
});


app.listen(PORT, URL, () => {
    console.log(`Server running at http://${URL}:${PORT}`)
})