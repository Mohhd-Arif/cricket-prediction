const { Client } = require("pg");
const logger = require("./logger");
const config = require(__dirname + '/../config/config.json')['createDB'];

let createDB = async ()=>{
    const client = new Client(config);
    client.connect();

    client.query(`CREATE DATABASE ${config.db}`, (err, res) => {
    logger.debug(err.message);
    client.end();
    });
}

module.exports = {
    createDB
}