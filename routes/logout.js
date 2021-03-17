var express = require('express');
var router = express.Router();
const {SESSION_NAME} = require("./roles");

/* GET request for logout */
router.get("/", (req,res) => {

    req.session.destroy();              //Destroying the session.
    res.clearCookie(SESSION_NAME);      //Clearing the session cookies.
    console.log("User has logged out, session destroyed and cookies cleared.");
    res.redirect("/");              //Redirect to home.
});

module.exports = router;