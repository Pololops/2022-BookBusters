
const debug = require('debug')('middleware:tokenVerifier');


const jwt = require('jsonwebtoken');
const { ApiError } = require('../middlewares/handleError');

module.exports = {
    // Middleware to get and verify token received from frontend
    verifyToken(req, res, next) {
        debug('Full req.headers : \n', req.headers);
        const headerAuth = req.headers['x-access-token'] || req.headers.authorization;
        debug('Authorization key : ', headerAuth);

        if (!headerAuth) {
            throw new ApiError('Access denied. No token provided', { statusCode: 401 });
        }

        const token = headerAuth.split('Bearer ')[1];
        debug('Token : ', token);

        jwt.verify(token, process.env.SECRET_TOKEN_KEY, (err, decoded) => {
            if (err) {
                throw new ApiError('Access denied. Invalid token', { statusCode: 401 });
            } else {
                req.body.user = decoded;

                next();
            }
        });
    },
    // Middleware to get and verify token received from frontend
    verifyTokenWithoutError(req, res, next) {
        debug('Full req.headers : \n', req.headers);
        const headerAuth = req.headers['x-access-token'] || req.headers.authorization;
        debug('Authorization key : ', headerAuth);

        // let token;
        if (headerAuth) {
            const token = headerAuth.split('Bearer ')[1];
            debug('Token : ', token);

            jwt.verify(token, process.env.SECRET_TOKEN_KEY, (err, decoded) => {
                if (!err) {
                    req.body.user = decoded;
                }
            });
        }

        next();
    },
};
