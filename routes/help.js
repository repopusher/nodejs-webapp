var express = require('express');
var router = express.Router();

/* GET help page */
router.get("/", (req,res) => {
    res.render('help', {title: 'Help page', loggedInCheck: req.session.logged})
});

module.exports = router;