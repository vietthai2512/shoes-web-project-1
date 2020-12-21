const { users: usersSQL } = require('../sql');

const cs = {};

class UsersRepo 
{
    constructor(db, pgp)
    {
        this.db = db;
        this.pgp = pgp;

        createColumnsets(this.pgp);
    }

    async insert(newUser)
    {
        return this.db.one(this.pgp.helpers.insert(newUser, cs.insert) + 'RETURNING id');
    }

    async empty()
    {
        return this.db.none(usersSQL.empty);
    }

    async delete(userID)
    {
        return this.db.one(usersSQL.delete, userID);
    }

    async all()
    {
        return this.db.any(usersSQL.all, { table: 'users' });
    }

    async count()
    {
        return this.db.one(usersSQL.count, { table: 'users' }, a => +a.count);
    }

    async update(userUpdate)
    {
        const query = this.pgp.helpers.update(userUpdate, cs.insert) + this.pgp.as.format(' WHERE id = ${id} RETURNING *', userUpdate);
        return this.db.one(query);
    }

    async existsEmail(email)
    {
        return this.db.one(usersSQL.exists, { column: 'email', table: 'users', columnData: email }).then(result => result.exists);
    }
}

function createColumnsets(pgp)
{
    const optional = (name, mod) =>
    ({
        name: name,
        def: { toPostgres: () => 'DEFAULT', rawType: true },
        mod: mod,
        skip: c => !c.exists
    });

    if (!cs.insert)
    {
        const table = new pgp.helpers.TableName({ table: 'users', schema: 'public' });

        cs.insert = new pgp.helpers.ColumnSet(
            [
                optional('email', null),
                optional('password', null),
                optional('firstname', null),
                optional('middlename', null),
                optional('lastname', null),
                optional('phonenumber', null),
                optional('user_role', null)
            ],
            { table }
        );
        cs.update = cs.insert.extend(['?id']);
    }
    return cs;
}
module.exports = UsersRepo;