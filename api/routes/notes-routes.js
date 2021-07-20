const express = require('express');
const { check } = require('express-validator');

const noteController = require('../controllers/noteController');
const router = express.Router();

// TODO: make these point to services instead


router.get('/', noteController.getNotes);
router.get('/id/:nid', noteController.getNoteById);
router.get('/userid/:uid', noteController.getNotesByUserId);

router.post('/location', noteController.getNotesByLocation);


router.post( // TODO: add more validation for creator etc
    '/',
    [
        check('content')
            .not()
            .isEmpty(),
    ],
    noteController.createNote
);

router.delete('/delete/:nid', noteController.deleteNote)


/* // Still TODO
router.patch
router.delete
*/

module.exports = router;