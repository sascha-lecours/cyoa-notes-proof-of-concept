const express = require('express');
const { check } = require('express-validator');

const userController = require('../controllers/userController');
const router = express.Router();


router.get('/id/:uid', userController.getUserById);
router.get('/', userController.getUsers);


router.post(
    '/signup',
    [
        check('name')
            .not()
            .isEmpty(),
        check('email')
            .normalizeEmail()
            .isEmail(),
        check('password').isLength({ min: 6 })
    ],
    userController.signup
    );

router.post(
    '/login',
    [
        check('email')
        .normalizeEmail()
        .isEmail(),
        check('password').isLength({ min: 6 })
    ],
    userController.login
    );


router.delete('/:uid', userController.deleteUser)


/* // Still TODO
router.patch
router.delete
*/

module.exports = router;