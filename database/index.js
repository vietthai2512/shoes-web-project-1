const pgPromise = require('pg-promise');
const { PG_CONNECTION } = require('../config');
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
const db = pgp(PG_CONNECTION);

module.exports = { db, pgp };