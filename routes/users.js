var express = require('express');
var router = express.Router();

const service = require('../services/users');
// const private = require('../middlewares/private');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Create a new user in the database */
router.post('/', service.create);
/* Authentification of the user */
router.post('/login', service.login);

module.exports = router;
