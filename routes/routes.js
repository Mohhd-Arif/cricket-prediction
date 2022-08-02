const express = require('express');
var app = express();
const router = express.Router();

//Middlewares & Controllers
const auth = require('../middlewares/auth');

const userController = require('../controllers/customerController');
const ueController = require('../controllers/ueController');
//const ueController = require('../controllers/ueController');


//Token auth
// router.use(auth.authenticateSession);

//User related api's
router.post('/register', userController.createUser);
router.post('/login', userController.adminLogin);

//UE related APIS
router.post('/ue', ueController.addEqp);

router.get('/ueEquipment',ueController.getEqp);



app.use('/api/v1/', router);
module.exports = app;

