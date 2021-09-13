const express = require('express');
const { check } = require('express-validator');

const noteController = require('../controllers/noteController');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');


router.get('/', noteController.getNotes);
router.get('/id/:nid', noteController.getNoteById);

router.post('/location', noteController.getNotesByLocation); 

// Everything below this "checkAuth" middleware requires a valid token
router.use(checkAuth);

router.get('/userid/:uid', noteController.getNotesByUserId); // TODO: still needs token to be sent during requests

router.post(
    '/',
    [
        check('content')
            .not()
            .isEmpty(),
        // TODO: Check creator is an ID, location exists, stitch is set, story is an id
    ],
    noteController.createNote
);

router.delete('/delete/:nid', noteController.deleteNote) // TODO: still needs token to be sent during requests


/* // Still TODO
router.patch
router.delete
*/

module.exports = router;