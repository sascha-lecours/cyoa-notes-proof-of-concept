const express = require('express');
const { check } = require('express-validator');

const storyController = require('../controllers/storyController');
const router = express.Router();


// TODO: make these point to services instead

router.post('/', storyController.createStory);
router.get('/', storyController.getStories);

router.post('/name', storyController.getStoryByName);
router.post('/session/start', storyController.startStorySession);
router.post('/session/names', storyController.getStorySessionByNames);

/* // Still TODO
router.patch
router.delete
*/

module.exports = router;