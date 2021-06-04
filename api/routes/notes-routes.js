const express = require('express');
const { check } = require('express-validator');
const noteController = require('../controllers/noteController');

const router = express.Router();

router.get('/id/:nid', noteController.getNoteById);
router.get('/location', noteController.getNotesByLocation);


router.post( // TODO: add validation
    '/',
    noteController.createNote
);

router.delete('/:nid', noteController.deleteNote)


/* // Still TODO
router.patch
router.delete
*/

module.exports = router;