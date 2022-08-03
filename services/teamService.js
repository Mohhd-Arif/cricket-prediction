const models = require('../models');
const Op = models.Sequelize.Op;

exports.createTeam = async (teamData) => {
    return await models.Team.create(teamData);
}

exports.updateData = async (UserData) => {
    return await User.findOneAndUpdate({emailId:UserData.emailId},{ $set: UserData }, { new: true }).lean();
}

