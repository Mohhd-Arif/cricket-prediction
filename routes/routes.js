const express = require('express');
var app = express();
const router = express.Router();

//Middlewares & Controllers
const auth = require('../middlewares/auth');

const userController = require('../controllers/userController');
const teamController = require('../controllers/teamController');
//const ueController = require('../controllers/ueController');


//Token auth
// router.use(auth.authenticateSession);

//User related api's
router.post('/register', userController.createUser);
router.post('/login', userController.userLogin);
router.put('/otp', userController.getOtp);
router.post('/otp', userController.verifyOtp);

//team related API's
router.post('/team',auth.authenticateSession, teamController.createTeam);
router.post('/teamsession', teamController.createTeamSession);


app.use('/api/v1/', router);
module.exports = app;

