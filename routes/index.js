const express = require('express');
const router = express.Router();
const readme = require ('../middlewares/readme');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/login');
});




router.get('/readme', readme, function(req, res, next){
    res.render('pages/readme', {content, title: 'README'});
});


module.exports = router;
