const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database')
const { 
    createUser, 
    createChannel,
    createMessage,
    createSubscription,
    getAllUsers 
} = require('./functions');

const app = express()
const PORT = 5000;
const URL = '127.0.0.1'

app.use(bodyParser.json()) // ser till att omvandla JSON-format så att vi kan utläsa det 

// frågan är om funktionerna (dvs createSubscription, createUser, etc) ska följa här nedan eller om vi ska separera dem i en egen js-fil

// EXPRESS ROUTES:
// skapa ny användare
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
        return res.status(400).send(`Please write a message, choose a user-id and chose a channel-id`)
    }

    try {
        const message = await createMessage(content,  user_id, channel_id)
        res.status(200).send(message)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// skapa en prenumeration
app.post('/subscription', async (req, res) => {
    const { user_id, channel_id } = req.body
    if (!user_id || !channel_id) {
        return res.status(400).send(`Please write user-id and channel-id`)
    }
    
    try {
        const subscription = await createSubscription(user_id, channel_id)
        res.status(200).send(message)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// hämta alla användare
// app.get('/users', async (req, res) => {
//     const { name } = req.body
//     if (!user) {
//         return res.status(400).send(error.message)
//     }
//     try {
//         const allUsers = await getAllUsers()
//         res.status(200).send(allUsers)
//     } catch (error) {
//         res.status(500).send(error.message)
//     }
// })

app.get('/users', async (req, res) => {
    console.log('GET /users called');  // Loggar när endpointen nås
    const { name } = req.query;  
    console.log('Received name:', name);  // Kontrollerar vad som skickas i 'name'

    if (!name) {
        console.log('No name provided, sending 400 error');
        return res.status(400).send('Name is required');
    }
    
    try {
        console.log('Calling getAllUsers()');
        const allUsers = await getAllUsers();
        console.log('All users:', allUsers);  // Loggar alla användare som hämtats
        res.status(200).send(allUsers);
    } catch (error) {
        console.log('Error in getAllUsers:', error.message);  // Loggar specifika fel från getAllUsers
        res.status(500).send(error.message);
    }
});



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