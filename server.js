'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const models = require('./models');
const Op = models.Sequelize.Op;
require('dotenv').config({ path: './variables.env' });
app.use(bodyParser.json({ limit: "50mb" ,strict: false }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit:50000 }));
app.use(expressValidator());
app.use(cors());

app.use(express.json({}));

const routes = require('./routes/routes.js');
app.use('/', routes);
app.listen(8000,()=>console.log("listening on port 8000..."));

module.exports = app;
