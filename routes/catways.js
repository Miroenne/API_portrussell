var express = require('express');
var router = express.Router();

const service = require('../services/catways');

/* Create a new catway in the database */
router.post('/', service.create);

router.get('/', service.getAll);

module.exports = router;