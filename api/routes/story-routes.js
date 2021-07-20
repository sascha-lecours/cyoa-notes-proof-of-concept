const express = require('express');
const { check } = require('express-validator');

const storyController = require('../controllers/storyController');
const router = express.Router();


router.post('/', storyController.createStory);
router.get('/', storyController.getStories);
router.get('/userid/:uid', storyController.getStorySessionsByUserID);
router.get('/storyid/:sid' , storyController.getStoryById);

router.post('/name', storyController.getStoryByName);
router.get('/session', storyController.getStorySessions);
router.post('/session/start', storyController.startStorySession);
router.post('/session/ids', storyController.getStorySessionByIds);

router.post('/session/move', storyController.moveStorySession);

/* // Still TODO
router.patch
router.delete
*/

module.exports = router;
