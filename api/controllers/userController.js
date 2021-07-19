const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');

const User = require('../models/user');
const HttpError = require('../models/httpError');

const signup = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return next(            
            new HttpError('Invalid user passed, check data.', 422)
        );
    }
    const { name, password, email } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        const error = new HttpError(
            'Signing up failed, please try again later.',
            500
        );
        return next(error);
    }

    if (existingUser) {
        const error = new HttpError(
          'User exists already, please login instead.',
          422
        );
        return next(error);
      }

    let createdUser = new User({
        name,
        password, // TODO: replace this with encrypted version later
        email,
        image: 'https://homepages.cae.wisc.edu/~ece533/images/tulips.png',
        notes: [],
        storySessions: []
    });
    
    console.log(`New user submitted for saving: ${JSON.stringify(createdUser)} ...`);
    
    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError(
            'Saving created user to DB has failed',
            500
        );
        return next(error);
    }
    console.log(`Created new user: ${name}`);
    res.status(201).json({user: createdUser.toObject({ getters: true })});
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email: email });
    } catch {
        const error = new HttpError(
            'Login failed, please try again later.',
            500
        );
        return next(error);
    }

    if(!existingUser || existingUser.password !== password){
        const error = new HttpError(
            'Invalid credentials, could not log in.',
            401
        );
        return next(error);
    }

    res.json({
        message: 'User logged in', 
        user: existingUser.toObject({ getters: true }) 
    });
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
        const error =  new HttpError('Could not find a user with the specified ID.',
        404
        );
        return next(error);
    }
    res.json({ user: user.toObject({ getters: true }) }); // "Getters" being true adds "id" property, not just the underscore-prefixed ID in DB.
}


// Returns array containing all users
const getUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, '-password'); // Empty object for projection. Omitting password
    } catch (err) {
        const error = new HttpError(
            'Fetching users failed, please try again later.',
            500
        );
        return next(error);
    }
    res.json({ users: users.map(user => user.toObject({getters: true })) });

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
exports.signup = signup;
exports.login = login;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUsers = getUsers;
