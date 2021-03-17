var express = require('express');
var router = express.Router();

/* GET about page */
router.get("/", (req,res) => {
    if(req.session.logged){
        res.render('about', {title: 'About page', loggedInCheck: req.session.logged});
    }
    else {
        res.redirect("/");
    }
});

module.exports = router;