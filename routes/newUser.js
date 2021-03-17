let express = require('express');
const bcrypt = require("bcrypt");
const {ROLE} = require("./roles");
const {register, database} = require("../model/database");
let router = express.Router();
let errorPlaceholder;


router.post("/createUser",  (req,res) => {
    let account = req.body;

    register(account, (registered, errorMessage) => {
        if (registered) {
            errorPlaceholder = errorMessage;
            res.redirect('/newUser');
            console.log("A new user has been created.");
        }
        else {
            errorPlaceholder = errorMessage;
            res.redirect('/newUser');
        }
    });
});

/* GET newUser page */
router.get("/", (req,res) => {
    let newMessage = errorPlaceholder;
    if(req.session.logged && req.session.role === ROLE.ADMIN){

        database.all('SELECT * FROM Account', (err, rows) => {
            let usernameList = []
            if (err) {
                throw err;
            }

            rows.forEach((row) => {
                usernameList.push({username: row.username, role: row.role})
            })
            res.render('newUser', { title: 'Admin page', errorMessage: newMessage, loggedInCheck: req.session.logged, usernameList});
        })
    }
    else{
        res.redirect("/");
    }
    errorPlaceholder = "";
});

//Delete user
router.post("/deleteUser/:username",  (req,res) => {
    let sql = "DELETE FROM Account WHERE username=?";
    database.run(sql, req.params.username);
    res.redirect("/newUser");
});

//Updating password
router.post("/updatePass/:username",  (req,res) => {
    let sql = "UPDATE Account SET password = ? WHERE username = ?";
    let updatedPass = bcrypt.hashSync(req.body.password, 10);
    database.run(sql, [updatedPass, req.params.username]);
    console.log("Password successfully updated.");
    res.redirect("/newUser");
});

//Updating role
router.post("/updateRole/:username",  (req,res) => {
    let sql = "UPDATE Account SET role = ? WHERE username = ?";
    database.run(sql, [req.body.role, req.params.username]);
    console.log("Role successfully updated.");
    res.redirect("/newUser");
});

module.exports = router;