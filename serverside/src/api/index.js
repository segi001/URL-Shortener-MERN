const express = require('express');

const emojis = require('./emojis');
const api = require('./api');

const router = express.Router();

router.use('/emojis', emojis);
router.use('/',api);

module.exports = router;
