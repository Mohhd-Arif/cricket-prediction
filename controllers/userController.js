require('dotenv').config({ path: './variables.env' });
const crypto = require('../helpers/crypto');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const auth = require('../middlewares/auth')
const helper = require('../helpers/functions')
const sendOtp = require('../helpers/sendOtp')
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
            logger.error(err);
            res.status(500).json({ status_code: 500, status: 'failure', message: err.message });
        }
    }
}

exports.userLogin = async (req, res) => {
    logger.info("inside user login")
    req.assert('email', 'email cannot be empty.').notEmpty();
    req.assert('password', 'password cannot be empty.').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return res.send({ status_code: 400, status: 'failure', message: errors })
    } else {
        try {
            var inputData = req.body;
            let user = await userService.findUserByEmail(inputData.email);
            if(user != null){
                if(crypto.decrypt(user.password) == inputData.password){
                    let token =await auth.createToken(user);
                    res.status(200).json({ status_code: 200, status: 'success', message: 'all user details',data:{token}});
                } else {
                    res.status(405).json({ status_code: 405, status: 'failure', message: 'invalid credentials' });
                }
            } else {
                res.status(200).json({ status_code: 405, status: 'failure', message: 'user not found' });
            }
        } catch (err) {
            logger.error(err)
            res.status(500).json({ status_code: 500, status: 'failure', message: err.message });
        }
    }
}

let isVerifiedUser = async (verified=false)=>{
    if(verified)
        throw new Error("user is already verified!!!")
    else
        return false
}

let isOtpExpired = async (otpTime)=>{
    let currentTime = Date.now();
    // logger.debug(currentTime,otpTime,currentTime-otpTime,(currentTime-otpTime)>1000*60*3)
    if((currentTime-otpTime)>1000*60*3)
        throw new Error("otp expired, try again requesting new otp!!!")
    else
        return false
}


exports.verifyUser = async (req, res) => {
    logger.debug("inside verify user");
    req.assert('OTP', 'OTP cannot be empty.').notEmpty();
    req.assert('email', 'Email cannot be empty.').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return res.send({ status_code: 400, status: 'failure', message: errors })
    } else {
        try {
            var inputData = req.body;
            let user = await userService.findUserByEmail(inputData.email);
            await isVerifiedUser(user.verified);
            await isOtpExpired(user.otpSentTime);
            if(user != null){
                if(user.otp == inputData.OTP){
                    await userService.findByIdAndUpdate(user.id,{otp:null,verified:true})
                    res.status(200).json({ status_code: 200, status: 'success', message: 'user verified successfully'});
                } else {
                    res.status(405).json({ status_code: 405, status: 'failure', message: 'invalid otp' });
                }
            } else {
                res.status(200).json({ status_code: 404, status: 'failure', message: 'user not found' });
            }
        } catch (err) {
            res.status(500).json({ status_code: 500, status: 'failure', message: err.message });
        }
    }
}

exports.getOtp = async (req, res) => {
    logger.debug("inside get OTP",req.body);
    req.assert('email', 'Email cannot be empty.').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return res.send({ status_code: 400, status: 'failure', message: errors })
    } else {
        try {
            var inputData = req.body;
            let user = await userService.findUserByEmail(inputData.email);
            await isVerifiedUser(user.verified);
            if(user != null ){
                let otp = await helper.generateOtp();
                await userService.findByIdAndUpdate(user.id,{otp,otpSentTime:Date.now()})
                await sendOtp.whatsapp(otp);
                res.status(200).json({ status_code: 200, status: 'success', message: 'Otp sent successfully'});
            } else {
                res.status(404).json({ status_code: 405, status: 'failure', message: 'user not found' });
            }
        } catch (err) {
            logger.error(err)
            res.status(500).json({ status_code: 500, status: 'failure', message: err.message });
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
//             let user = await userService.finduserByEmailForPasswordReset(inputData.email);
//             if (user) {
//                 res.status(200).json({ status_code: 200, status: 'success', message: 'password reset successful, please check your mail for updated credentials' });
//             } else {
//                 res.status(200).json({ status_code: 405, status: 'failure', message: 'user not found' });
//             }
//         } catch (err) {
//             await debug.addRouteDebug({route_name: "forgotPassword", debug_details: err.message });
//             res.status(500).json({ status_code: 500, status: 'failure', message: err.message });
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
//             await debug.addRouteDebug({route_name: "getSignedFileUrl", debug_details: err.message });
//             res.status(500).json({ status_code: 500, status: 'failure', message: err.message });
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