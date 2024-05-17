const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database')
const { 
    createUser, 
    createChannel,
    createMessage,
    getAllUsers 
} = require('./functions');

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

// EXPRESS ROUTES:

// skapa en ny kanal
app.post('/channels', async (req, res) => {
    const { name, owner_id } = req.body

    if (!name || !owner_id) {
        return res.status(400).send('Name and owner id are required')
    }

    try {
        const channel = await createChannel(name, owner_id)
        res.status(200).send(channel)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// skapa nya meddelanden
app.post('/messages', async (req, res) => {
    const { content, user_id, channel_id } = req.body
    if (!content || !user_id || !channel_id) {
        return res.status(400).send(`Please write a message and chose a channel`)
    }

    try {
        const message = await createMessage(content,  user_id, channel_id)
        res.status(200).send(message)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// skapa en prenumeration
app.post('/subscriptions', async (req, res) => {

})

// hämta alla användare
app.get('/users', async (req, res) => {
    try {
        const allUsers = await getAllUsers()
        res.status(200).send(allUsers)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// hämta alla kanaler
app.get('/channels', async (req, res) => {

})

// hämta alla meddelanden
app.get('/messages', async (req, res) => {

})

// hämta alla subscriptions
app.get('/subscriptions', async (req, res) => {

})

// ta bort användare
app.delete('/users', async (req, res) => {

})








app.listen(PORT, URL, () => {
    console.log(`Server running at http://${URL}:${PORT}`)
})