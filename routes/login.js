const express = require('express');
const {login} = require("../model/database");
const {ROLE} = require("./roles");
const router = express.Router();
let errorMsg;

router.post("/", (req, res) => {
    let account = req.body;

    login(account, (canLogin, role) => {
        if (canLogin){
            req.session.logged = true;                  //Upon successful login session.logged is set to true
            req.session.role = role;                    //The role that the user has in the DB will

            if (req.session.logged === true){           //Checking if user is logged in
                switch (req.session.role){
                    case ROLE.ADMIN:
                        res.redirect('/newUser');
                        break;
                    case ROLE.GUEST:
                        res.redirect('/contact');
                        break;
                    case ROLE.ORDINARY:
                        res.redirect('/about');
                        break;
                }
            }
        }
        else{
            errorMsg = "Incorrect details";
            res.redirect('/login');
        }
    });
});

/* GET login page */
router.get("/", (req,res) => {
    res.render('login', {title: 'Login page', loginErrorMessage: errorMsg, loggedInCheck: req.session.logged})
    errorMsg = "";
});

module.exports = router;