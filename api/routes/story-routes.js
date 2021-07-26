const express = require('express');
const { check } = require('express-validator');

const storyController = require('../controllers/storyController');
const router = express.Router();


router.post('/', storyController.createStory);
router.get('/', storyController.getStories);
router.post('/name', storyController.getStoryByName);
router.get('/storyid/:sid' , storyController.getStoryById);

router.get('/session', storyController.getStorySessions);
router.get('/session/id/:ssid', storyController.getStorySessionById);
router.post('/session/start', storyController.startStorySession);
router.post('/session/ids', storyController.getStorySessionByIds);
router.get('/userid/:uid', storyController.getStorySessionsByUserID);
router.post('/session/move', storyController.moveStorySession);
router.delete('/session/delete/:ssid', storyController.deleteStorySession);

/* // Still TODO
router.patch
router.delete //for story
*/

module.exports = router;
