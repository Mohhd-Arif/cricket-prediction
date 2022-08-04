require('dotenv').config({ path: './variables.env' });
const crypto = require('../helpers/crypto');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const logger = require('../helpers/logger');

exports.createUser = async (req, res) => {
    req.assert('firstName', 'first name cannot be empty.').notEmpty();
    req.assert('email', 'email cannot be empty.').isEmail().notEmpty();
    req.assert('password', 'password cannot be empty.').notEmpty().isLength({
        min: 6
      })
      .withMessage("Password must contain at least 6 characters")
      .isLength({
        max: 20
      })
      .withMessage("Password can contain max 20 characters");
    var errors = req.validationErrors();
    if (errors) {
        logger.fatal(errors)
        return res.send({ status_code: 400, status: 'failure', message: errors })
    } else {
        try {
            var userDetails = req.body;
            logger.debug('---------user-create-----------');
            let password = userDetails.password;
            let encryptedPassword = crypto.encrypt(password);
            userDetails.password = encryptedPassword;
            await userService.createUser(userDetails);
            res.status(200).json({ status_code: 200, status: 'success', message: 'user added'});
        } catch (err) {
            // await debug.addRouteDebug({route_name: "createAdmin", debug_details: err.stack });
            logger.error(err);
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

// exports.forgotPassword = async (req, res) => {
//     req.assert('email', 'email cannot be empty.').notEmpty();
//     var errors = req.validationErrors();
//     if (errors) {
//         return res.send({ status_code: 400, status: 'failure', message: errors })
//     } else {
//         try {
//             var inputData = req.body;
//             let admin = await adminService.findAdminByEmailForPasswordReset(inputData.email);
//             if (admin) {
//                 res.status(200).json({ status_code: 200, status: 'success', message: 'password reset successful, please check your mail for updated credentials' });
//             } else {
//                 res.status(200).json({ status_code: 405, status: 'failure', message: 'admin not found' });
//             }
//         } catch (err) {
//             await debug.addRouteDebug({route_name: "forgotPassword", debug_details: err.stack });
//             res.status(500).json({ status_code: 500, status: 'failure', message: err.stack });
//         }
//     }
// }

// exports.getSignedFileUrl = async (req, res) => {
//     req.assert('file_name', 'file_name cannot be empty.').notEmpty();
//     var errors = req.validationErrors();
//     if (errors) {
//         return res.send({ status_code: 400, status: 'failure', message: errors })
//     } else {
//         try {
//             var inputData = req.body;
//             let uploadedDetails = await fileUploads.generatePublicS3FileUrl(inputData.file_name);
//             if (uploadedDetails.status == 'Success') {
//                 res.status(200).json({ status_code: 200, status: 'success', message: 'Signed Details', details: uploadedDetails.data });
//             } else {
//                 res.status(200).json({ status_code: 405, status: 'failure', message: 'Signing failed', details: uploadedDetails.data});
//             }
//         } catch (err) {
//             await debug.addRouteDebug({route_name: "getSignedFileUrl", debug_details: err.stack });
//             res.status(500).json({ status_code: 500, status: 'failure', message: err.stack });
//         }
//     }
// }

// exports.findUser = async (req, res) => {
//     try {
//      // logger.debug(req.cookies);
//       userService.getTokenById(12);
//       res.json({data:"success"});
//     } catch (error) {  
//       res.status(500).json({error: error.message});
//     }
//   }