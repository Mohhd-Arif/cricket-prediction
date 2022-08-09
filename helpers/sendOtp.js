const id = "AC8e833a1ebb98566475e0cc7f54aaac8f";
const token = "03cf653548f6f6ef55166a13fc927570";

const twilio = require('twilio');

exports.whatsapp = async (OTP) => {
    const client = twilio(id, token);

    client.messages
        .create({

            // Message to be sent
            body: 'your OTP for cricket prediction is '+OTP,

            // Senders Number (Twilio Sandbox No.)
            from: 'whatsapp:+14155238886',

            // Number receiving the message
            to: 'whatsapp:+918700009237'
        })
        .then(message => console.log("Message sent successfully", message))
        .catch(err => console.log(err))
        .done();

}