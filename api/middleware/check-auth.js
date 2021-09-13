const jwt = require('jsonwebtoken');
const HttpError = require("../models/httpError");

const privateKey = 'very_secret_private_key'; // TODO: This will be replaced later when it's updated in userController

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') { // Handle browser automatic OPTIONS requests prior to POST
        return next();
    }
    console.log(`Verifying authorization... request headers: ${JSON.stringify(req.headers)}`);
    try {
        const token = req.headers.authorization.split(' ')[1]; // Authorizaion: 'Bearer TOKEN'
        if(!token) {
            throw new Error('Authentication failed! (No token)');
        }
        const decodedToken = jwt.verify(token, privateKey);
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        const error = new HttpError('Authentication failed! (Invalid token)' + ' ... error: ' + err, 401);
        return next(error);
    }
};

