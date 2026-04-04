const express = require('express');
const router = express.Router();
// const readme = require ('../middlewares/readme');
const fs = require('node:fs');
const path = require('node:path');
const {marked} = require('marked');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/login', {error: null});
});




/* router.get('/readme', readme, function(req, res, next){
    res.render('pages/readme', {content, title: 'README'});
}); */

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

module.exports = router;
