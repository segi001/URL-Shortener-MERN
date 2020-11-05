const express = require('express');
const controller = require('./controller');

const router = express.Router();

router.get('/:siteID',controller.getURL);
router.post('/',controller.shortenURL);

module.exports = router;
