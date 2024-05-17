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

// getAllMessages

// getAllSubscriptions

// deleteUser



module.exports = { 
    createUser,
    createChannel,
    createMessage,
    getAllUsers
};
