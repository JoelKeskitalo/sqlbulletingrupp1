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



module.exports = { 
    createUser
};
// postUser

// getUser

// getAllUsers

// deleteUser