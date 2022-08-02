require('dotenv').config({ path: './variables.env' });
const mongoose = require('mongoose');
const userPaymentService = require('../services/userPaymentService');
const userService = require('../services/UserServices');
const Razorpay = require('razorpay')
const crypto = require('crypto')
exports.createPayment = async (req, res) => {
    // req.assert('name', 'name cannot be empty.').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return res.send({ status_code: 400, status: 'failure', message: errors })
    } else {
        try {
            const paymentDetails = {
                user_id: req.body?.user_id,
                ammount: req.body.ammount,
                name: req.body.name,
                currency: req.body.currency || "INR",
                receipt: req.body.receipt,
            }
            
            let createPayment = await userPaymentService.createPayment(paymentDetails);
            paymentDetails.payment_id=createPayment._id;
            
            console.log(createPayment);
            let userDetails = await userService.getLoggedInUserDetailsById(req.body.userId);
            paymentDetails.key = process.env.RAZORPAY_KEY;
            paymentDetails.prefill = {
                'contact': userDetails.mobile_number,
                'email': userDetails.emailid
            }
            res.status(200).json({ status_code: 200, status: 'success', message: 'Payment created', paymentDetails});
        } catch (err) {
            console.log({err});
            await debug.addRouteDebug({route_name: "createPayment", debug_details: err.stack });
            res.status(500).json({ status_code: 500, status: 'failure', message: 'Unable to create payment' });
        }
    }
}


exports.getAllPayment = async (req, res) => {
    // req.assert('name', 'name cannot be empty.').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return res.send({ status_code: 400, status: 'failure', message: errors })
    } else {
        try {
            var inputData = req.body;
            let { query, page, size } = inputData;
            let user_id = mongoose.Types.ObjectId(req.decoded?.user_id || "617a9c2d50fc36d096626fc6")
            let queryPayment = {user_id};
            if (query) {
                query = '"' + query.trim() + '"';
                queryPayment['$text'] = { $search: query, $caseSensitive: false };
            }
            let [payment_count, payment_list] = await Promise.all([userPaymentService.getPaymentCount(queryPayment), userPaymentService.getPaymentList(queryPayment, page, size)]);
            res.status(200).json({ status_code: 200, status: 'success', message: 'Payment list & counts', payment_list, payment_count});
        } catch (err) {
            console.log({err});
            await debug.addRouteDebug({route_name: "getPayment", debug_details: err.stack });
            res.status(500).json({ status_code: 500, status: 'failure', message: 'Unable to fetch payments' });
        }
    }
}

exports.updatePayment = async (req, res) => {
    // req.assert('contest_arena_id', 'contest_arena_id cannot be empty.').notEmpty();
    // req.assert('contest_arena_id', 'contest_arena_id is invalid').isMongoId();
    // req.assert('active', 'active cannot be empty.').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return res.send({ status_code: 400, status: 'failure', message: errors });
    } else {
        try {
            var inputData = {
                status:req.query.status
            };
            let paymentDetails = await userPaymentService.getPaymentDetailsById(inputData['payment_id']);
            console.log({paymentDetails},paymentDetails._id);
            const shasum = crypto.createHmac('sha256',process.env.RAZORPAY_SECRET);
            shasum.update(JSON.stringify(req.body));
            let digest = shasum.digest('hex');

            if(digest === req.headers['x-razorpay-signature']){
                let updatePayment = await userPaymentService.updatePayment(paymentDetails._id, inputData.status);
                res.status(200).json({ status_code: 200, status: 'success', message: 'Payment status updated'});
            }
            else{
                res.status(403).json({ status_code: 402, status: 'failed', message: 'Payment status update failed'});
                await debug.addRouteDebug({route_name: "updatePayment", debug_details: JSON.stringify({message:"Payment status update failed","header":{
                    1:req.headers['x-razorpay-signature'],
                    digest
                }}) });

            }
        } catch (err) {
            await debug.addRouteDebug({route_name: "updatePayment", debug_details: err.stack });
            res.status(500).json({ status_code: 500, status: 'failure', message: err.message });
        }
    }
}

exports.getPayment = async (req, res) => {
    // req.assert('name', 'name cannot be empty.').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return res.send({ status_code: 400, status: 'failure', message: errors })
    } else {
        try {
            var inputData = req.body;
            let payment_id = inputData.payment_id;
            let payment_detail = await userPaymentService.getPaymentDetailsById(payment_id);
            res.status(200).json({ status_code: 200, status: 'success', message: 'Payment details', payment_detail});
        } catch (err) {
            console.log({err});
            await debug.addRouteDebug({route_name: "getPayment", debug_details: err.stack });
            res.status(500).json({ status_code: 500, status: 'failure', message: 'Unable to fetch payments' });
        }
    }
}