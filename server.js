'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const logger = require('./helpers/logger')
const chalk = require('ansi-colors');

//creates db
const DB = require('./helpers/databaseCreater');
(async()=>{
    await DB.createDB();
})();
// const models = require('./models');
// const Op = models.Sequelize.Op;
require('dotenv').config({ path: './variables.env' });
app.use(bodyParser.json({ limit: "50mb" ,strict: false }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit:50000 }));
app.use(expressValidator());
app.use(cors());

app.use(express.json({}));
logger.debug(process.env.JWT_SECRET)
const routes = require('./routes/routes.js');
app.use('/', routes);
app.listen(process.env.PORT,()=>logger.custom(chalk.green.bold(`Listening on port ${process.env.PORT}...`)));

module.exports = app;
