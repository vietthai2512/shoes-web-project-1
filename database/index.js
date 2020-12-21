const pgPromise = require('pg-promise');
const config = require('../config');
const { Users } = require('./repos');

const initOptions =
{
    capSQL: true,
    extend(obj, dc)
    {
        obj.users = new Users(obj, pgp);
    }
}

const pgp = pgPromise(initOptions);
const db = pgp(config.PG_CONNECTION);

module.exports = { db, pgp };