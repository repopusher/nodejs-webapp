const sqlite3 = require('sqlite3').verbose();
const path = require('path');               //Using path module and __dirname to get full path to database file
const bcrypt = require('bcrypt');           //Requiring bcrypt for password hashing
const dbPath = path.resolve(__dirname, 'R00191512.db');

// open the database connection
let database = new sqlite3.Database(dbPath, (err) => {
    if(err){
        console.log(err.message);
        throw err;
    }
    console.log(`Connected to database`);
});
exports.database = database;

//Register function
exports.register = (account, callback) => {
    let errorMessage = "";
    let canRegister = true;
    let registered = false;

    database.all("SELECT username FROM Account", (err, rows) => {
        if (err){
            throw err;
        }
        rows.forEach((row) => {
            if (row.username.toString() === account.username.toString()) {
                errorMessage = "Username already in use."
                canRegister = false;
            }
        })

        if(canRegister){
            database.serialize(() => {
                const hashedPassword = bcrypt.hashSync(account.password, 10);
                database.run('INSERT INTO Account VALUES (?, ?, ?)', [account.username, hashedPassword, account.role]);
                registered = true;
                callback(registered, errorMessage);
            });
        } else{
            registered = false;
            callback(registered, errorMessage)
        }
    })
};

//Login function
exports.login = (account, callback) => {
    let canLogin = false;
    let role;

    database.all('SELECT * FROM Account', (err, rows) => {
        if (err) {
            throw err;
        }

        rows.forEach((row) => {
            let validPass = bcrypt.compareSync(account.password, row.password);
            if (row.username.toString() === account.username.toString() && validPass) {
                canLogin = true;
                role = row.role;
            }
        })
        callback(canLogin, role)
    })
};
