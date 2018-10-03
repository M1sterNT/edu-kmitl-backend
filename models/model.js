import {Sequelize as Seq} from "sequelize";
const envd  = process.env.NODE_ENV || 'development';
const configd    = require('./../config/config.json')[envd];
const config    = require('./../config/config.json')[configd.env];

const Model = new Seq(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

});



export default Model
export const Sequelize = Seq;
