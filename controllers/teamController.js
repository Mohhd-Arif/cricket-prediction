require('dotenv').config({ path: './variables.env' });
const userService = require('../services/userService');
const teamService = require('../services/teamService');
const logger = require('../helpers/logger');

exports.createTeam = async (req, res) => {
    req.assert('name', 'team name cannot be empty.').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return res.send({ status_code: 400, status: 'failure', message: errors })
    } else {
        try {
            var teamDetails = req.body;
            logger.debug('---------team-create-----------');
            await teamService.createTeam(teamDetails);
            res.status(200).json({ status_code: 200, status: 'success', message: 'team added'});
        } catch (err) {
            // await debug.addRouteDebug({route_name: "createAdmin", debug_details: err.stack });
            logger.debug(err);
            res.status(500).json({ status_code: 500, status: 'failure', message: err.message });
        }
    }
}

exports.adminLogin = async (req, res) => {
    req.assert('email', 'email cannot be empty.').notEmpty();
    req.assert('password', 'password cannot be empty.').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return res.send({ status_code: 400, status: 'failure', message: errors })
    } else {
        try {
            var inputData = req.body;
            logger.debug('---------Admin-login-----------');
            let admin = await userService.findUserByEmail(inputData.email);
            if(admin != null){
                if(crypto.decrypt(admin.password) == inputData.password){
                    // let token_session = jwt.sign({ admin_id: admin._id, permissions :{admin_type: "super", read: true, edit: true, delete: true} }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION_TIME });
                    // await adminService.updateAdminLoginDetails(admin._id, token_session);
                    // let admin_details = await adminService.getAdminProfileDetailsForLogin(admin._id);
                    res.status(200).json({ status_code: 200, status: 'success', message: 'all admin details'});
                } else {
                    res.status(405).json({ status_code: 405, status: 'failure', message: 'invalid credentials' });
                }
            } else {
                res.status(200).json({ status_code: 405, status: 'failure', message: 'admin not found' });
            }
        } catch (err) {
            // await debug.addRouteDebug({route_name: "adminLogin", debug_details: err.stack });
            res.status(500).json({ status_code: 500, status: 'failure', message: err.stack });
        }
    }
}