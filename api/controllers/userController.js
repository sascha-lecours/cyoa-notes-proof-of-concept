const { validationResult } = require('express-validator');
const User = require('../models/user');
const HttpError = require('../models/httpError');
const mongoose = require('mongoose');

const createUser = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return next(
            new HttpError('Invalid user passed, check data.', 422)
        );
    }
    const { username, password, email } = req.body;

    const createdUser = new User({
        username,
        password,
        email
    });

    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError(
            'Creating user has failed',
            500
        );
        return next(error);
    }
    console.log(`Created new user: ${username}`);
    res.status(201).json({ user: createdUser });
}

const getUserById = async (req, res, next) => {
    const userId = req.params.uid;
    let user; 

    try{
        user = await User.findById(userId); // Not a "real" promise, but Mongoose still allows async/await
    } catch (err) {
        const error = new HttpError(
            'Error when attempting to find user', 500
        );
        return next(error);
    }
    
    if(!user) {
        const error =  new HttpError('Could not find a user with the specified ID.', 404);
        return next(error);
    }
    res.json({ user: user.toObject({ getters: true }) }); // "Getters" being true adds "id" property, not just the underscore-prefixed ID in DB.
}

const updateUser = async (req, res, next) => {
    // TODO
}

const deleteUser = async (req, res, next) => {
    const userId = req.params.uid;

    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong while attempting to a delete a user.',
            500
        );
        return next(error);
    }

    try {
        await user.remove();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong while attempting to a delete a user.',
            500
        );
        return next(error);
    }

    res.status(200).json({ message: 'Deleted user.' });
}




exports.getUserById = getUserById;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
