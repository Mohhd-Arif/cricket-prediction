const Admin = require('../models/Admin');

exports.createAdmin = async (data) => {
    return await Admin.create(data);
}

exports.findByEmail = async (email) => {
    return await Admin.findOne({ 'email': email }).select('_id').lean();
}

exports.findAdminByEmailForLogin = async (email) => {
    return await Admin.findOne({ 'email': email }).select('password').lean();
}

exports.findAdminByEmailForPasswordReset = async (email) => {
    return await Admin.findOne({ 'email': email }).select('_id').lean();
}

exports.findByEmailAndPassword = async (email, password) => {
    return await Admin.findOne({ 'email': email, 'password': password}).lean();
}

exports.updateAdminLoginDetails = async (id, token_session) => {
    return await Admin.findByIdAndUpdate(id, { $set: { 'last_logged_in_date': new Date(), 'token_session': token_session} }, { safe: true, upsert: false, new: false });
}

exports.getAdminProfileDetailsForLogin = async (id) => {
    return await Admin.findOne({ '_id': id })
        .select('_id name email mobile_number city country admin_type profile_image')
        .lean();
}