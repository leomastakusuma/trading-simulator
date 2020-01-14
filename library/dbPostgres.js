var mysql = require("mysql")
import config from "config"

const pgp = require('pg-promise')({
    capSQL: true // capitalize all generated SQL
});

const cn = {
    host: config.dbPostgres.host, // 'localhost' is the default;
    port: 5432, // 5432 is the default;
    database:  config.dbPostgres.dbName,
    user: config.dbPostgres.user,
    password: config.dbPostgres.pass
};
module.exports  = pgp(cn);