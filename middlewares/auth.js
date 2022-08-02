require('dotenv').config({ path: './variables.env' });
const jwt = require('jsonwebtoken');
const userService = require('../services/userService.js');


exports.authenticateSession = async (req, res, next) => {
    var token = req.body.token || req.params.token || req.headers['x-access-token'] || req.headers['authorization'];
    if (token) {
        console.log('TOKEN-FOUND');
        next();
        try {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            if (req.body.userId) {
            console.log(req.body.userId);
            savedToken = await userService.getTokenById(req.body.userId);
            console.log(savedToken);
            if (savedToken) {
            console.log(savedToken);
            if (String(token) === String(savedToken.uniqueToken)) {
                req.decoded = decoded;
                next();
                } else {
                    return res.send({
                        status_code: 408,
                        success: false,
                        message: 'Invalid session.'
                        });
                    }
                } else {
                    return res.status(408).send({
                        status_code: 408,
                        success: false,
                        message: 'Invalid session.'
                    });
                }
            }
        } catch (error) {
            console.log('TOKEN-AUTHENTICATE-ERROR');
        }
    } else {
        console.log('TOKEN-NOT-FOUND');
        return res.send({
            status_code: 403,
            success: false,
            message: 'No token provided.'
        });

    }
}