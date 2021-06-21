const express = require('express');
const { check } = require('express-validator');

const userController = require('../controllers/userController');
const router = express.Router();


// TODO: make these point to services instead

router.get('/id/:uid', userController.getUserById);


router.post( // TODO: add validation
    '/',
    userController.createUser
);

router.delete('/:uid', userController.deleteUser)


/* // Still TODO
router.patch
router.delete
*/

module.exports = router;