const express = require('express');
const router = express.Router();
const decodeToken = require('../middlewares/decodeToken');
const fs = require('node:fs');
const path = require('node:path');
const {marked} = require('marked');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/login', {error: null});
});

router.get('/home', decodeToken, function(req, res, next){
   
   const email = req.decoded.user.email;
   const userName = req.decoded.user.userName;
  return res.render('index', {
    email : email,
    userName : userName,
  });
});


router.get('/readme', function(req, res,next){
  const readmePath = path.join(__dirname, '..', 'README.md');

  fs.readFile(readmePath, 'utf8', (err, data) => {
    if(err){
      return next(err);
    }

    const content = marked.parse(data);

    res.render('pages/readme', {
      title: 'README',
      content
    });
  });
});

router.get('/reservations', function(req, res, next){
  res.render('pages/reservations')
});

router.get('/users', function(req, res, next){
  res.render('pages/users')
});

router.get('/catways', function(req, res, next){
  res.render('pages/catways', {showConfirmModal : false})
});

module.exports = router;
