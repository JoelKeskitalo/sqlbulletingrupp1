// här skapar vi alla våra funktioner, som vi sedan exporterar och slutligen importerar till vår run-fil, dvs index. 
const database = require (`./database`)
const db = database.initDatabase()

// funktioner som behövs:

// createUser
const createUser = async (name, email) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO users (name, email) VALUES(?, ?)`
        db.run(sql, [name, email], function (error) { // ? är för att undvika SQL injection.
            if (error) {
                console.error(error);
                reject(error);
             } else {
                const userId = this.lastID;
                resolve({userId, name, email})
            }
        }); 
    });
};



// createChannel
const createChannel = async (name, owner_id) => {     // owner_id ger oss access, i och med att den är våran foreign key??
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO channels (name, owner_id) VALUES (?, ?)`;
        db.run(sql, [name, owner_id], function (error) {
            if (error) {
                console.error(error)
                reject(error)
            } else {
                const userId = this.lastID
                resolve({userId, name, owner_id}) // måste vara inloggad för att kunna skapa en kanal, därmed blir det unika ägare
            }
        })
    })
}

// createMessage
const createMessage = async (content, user_id, channel_id) => {

    const isSubscribed = await checkIfSubscribed(user_id, channel_id)
    if (!isSubscribed) {
        throw new Error(`The user is not subscribed to this channel.`)
    }
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO messages(content, user_id, channel_id) VALUES (?, ?, ?)`;
        db.run(sql, [content, user_id, channel_id], function (error) {
            if(error) {
                console.error(error)
                reject(error)
            } else {
                const userId = this.lastID
                resolve({content, user_id, channel_id})
            }
        })
    })
}

// createSubscription
const createSubscription = async (user_id, channel_id) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO subscriptions(user_id, channel_id) VALUES (?, ?)`;
        db.run(sql, [user_id, channel_id], function (error) {
            if(error) {
                console.error(error)
                reject(error)
            } else {
                const subscription_id = this.lastID;  
                resolve({ subscription_id, user_id, channel_id });
            }
        })
    })
}

// Kollar om användaren är subscriber
const checkIfSubscribed = async (user_id, channel_id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT 1 FROM subscriptions WHERE user_id = ? AND channel_id = ?`;
        db.get(sql, [user_id, channel_id], (error, row) => {
            if(error) {
                return reject(error)
            } 
            resolve(row ? true : false)
        })
    })
}

// getAllUsers
const getAllUsers = async () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users`
        db.all(sql, [], (error, rows) => {
            if (error) {
                return reject(error)
            } else {
                resolve(rows)
            }
        } )
    })
}

// getAllChannels
const getAllChannels = async () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM channels`
        db.all(sql, [], (error, rows) => {
            if (error) {
                return reject(error)
            } else {
                resolve(rows)
            }
        })
    })
}

// getAllMessages
const getAllMessages = async () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM messages`
        db.all(sql, [], (error, rows) => {
            if (error) {
                return reject(error)
            } else {
                resolve(rows)
            }
        })
    })
}

// getAllSubscriptions
const getAllSubscriptions = async () => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM subscriptions`
        db.all(sql, [], (error, rows) => {
            if (error) {
                return reject(error)
            } else {
                resolve(rows)
            }
        })
    })
}


module.exports = { 
    createUser,
    createChannel,
    createMessage,
    createSubscription,
    getAllUsers,
    getAllChannels,
    getAllMessages,
    getAllSubscriptions
};
