const express = require('express');
const { check } = require('express-validator');

const noteController = require('../controllers/noteController');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');


router.get('/', noteController.getNotes);
router.get('/id/:nid', noteController.getNoteById);

// Everything below this "use" middleware requires a valid token
router.use(checkAuth);

router.get('/userid/:uid', noteController.getNotesByUserId);


router.post('/location', noteController.getNotesByLocation);


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

router.delete('/delete/:nid', noteController.deleteNote)


/* // Still TODO
router.patch
router.delete
*/

module.exports = router;