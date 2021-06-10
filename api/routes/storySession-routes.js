const express = require('express');
const { check } = require('express-validator');

const storySessionController = require('../controllers/storySessionController');
const router = express.Router();



router.post('/', storySessionController.startStorySession);

/* // Still TODO

Advancing a story to a new stitch
Getting the story session frontend object(?)
Overwriting an existing story session

router.delete
*/

module.exports = router;