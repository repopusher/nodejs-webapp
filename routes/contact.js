var express = require('express');
const {ROLE} = require("./roles");
var router = express.Router();

/* GET contact page */
router.get("/", (req,res) => {
    //Only an admin and a guest can access the contact page. Any other role and the user will get redirected back to home.
    if(req.session.logged && (req.session.role === ROLE.ADMIN || req.session.role === ROLE.GUEST)){
        res.render('contact', {title: 'Contact page', loggedInCheck: req.session.logged});
    }else{
        res.redirect("/");
    }
});

module.exports = router;