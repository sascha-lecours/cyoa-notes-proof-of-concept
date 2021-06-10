const express = require('express');
const { check } = require('express-validator');

const storyController = require('../controllers/storyController');
const router = express.Router();



router.post('/name', storyController.getStoryByName);

router.post('/', storyController.createStory);
router.get('/', storyController.getStories);

router.post('/session/start', storyController.startStorySession);



/* // Still TODO
router.patch
router.delete
*/

module.exports = router;