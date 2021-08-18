const jwt = require('jsonwebtoken');
const HttpError = require("../models/httpError");

const privateKey = 'very_secret_private_key'; // TODO: This will be replaced later when it's updated in userController

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Authorizaion: 'Bearer TOKEN'
        if(!token) {
            throw new Error('Authentication failed!');
        }
        const decodedToken = jwt.verify(token, privateKey);
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        const error = new HttpError('Authentication failed!', 401);
        return next(error);
    }
};

