const express = require('express');
const landing = require("../controller/landing");

const router = express.Router();

/* GET home page. */
router.get('/', landing.get_landing);

throw new Error("Working on video at 24:05");

module.exports = router;
