const id = "AC8e833a1ebb98566475e0cc7f54aaac8f";
const token = "c6fd0bbab9f63e1e08adf93c8af8ac47";
const logger = require('./logger')
const twilio = require('twilio');

exports.whatsapp = async (OTP,phoneNumber) => {
    const client = twilio(id, token);
    logger.debug(OTP,phoneNumber)
    client.messages
        .create({

            // Message to be sent
            body: 'your OTP for cricket prediction is '+OTP,

            // Senders Number (Twilio Sandbox No.)
            from: 'whatsapp:+14155238886',

            // Number receiving the message
            to: 'whatsapp:'+phoneNumber
        })
        .then(message => logger.debug("Message sent successfully", message))
        .catch(err => logger.debug(err))
        .done();

}