const sqlite = require('sqlite3').verbose() // verbosa förtydligar error-meddelanden

function initDatabase() { // funktionen som skapar själva databasen
    const db = new sqlite.Database('./sqlBulletinDB', (error) => { // databasen skapas i samma nivå som database.js, om den inte finns, finns den så körs den bara 
        if (error) {
            return console.log(error)
        } else {
            return console.log('Connected to database')
        }
    })


    // placeholders för våra tabeller, dvs, dessa skapar tabellerna för varje entitet
    let sql_user = `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
    )`

    let sql_channel = `CREATE TABLE IF NOT EXISTS channels (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        owner_id INTEGER NOT NULL,
        FOREIGN KEY (owner_id) REFERENCES users(id)
    )`

    let sql_message = `CREATE TABLE IF NOT EXISTS messages (
        
    )`

    let sql_subscription = ``

    // db.run ser till att de "körs", dvs skapas, i den ordningen vi har ställt upp dem (serialize)
    db.serialize(() => {
        db.run(sql_user)
            .run(sql_channel)
            .run(sql_message)
            .run(sql_subscription, () => {
                console.log('Tables created!')
            })

    })

    return db;
}


module.exports = { initDatabase } 