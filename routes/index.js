let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/',(req, res) => {
  res.render('index', {title: 'Home page', loggedInCheck: req.session.logged})
});

module.exports = router;
