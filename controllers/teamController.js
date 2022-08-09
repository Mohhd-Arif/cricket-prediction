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
            logger.error(err);
            res.status(500).json({ status_code: 500, status: 'failure', message: err.message });
        }
    }
}

exports.createTeamSession = async (req,res) =>{
    logger.debug("inside create team session",req.body);
    req.assert('teamId', 'team id name cannot be empty.').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        return res.send({ status_code: 400, status: 'failure', message: errors })
    } else {
        try {
            var teamSessionDetails = req.body;
            await teamService.createTeamSession(teamSessionDetails);
            res.status(200).json({ status_code: 200, status: 'success', message: 'team session added'});
        } catch (err) {
            logger.debug(err);
            res.status(500).json({ status_code: 500, status: 'failure', message: err.message });
        }
    }
}