import { users as usersSQL } from '../sql';
import { User } from '../models';
import { IDatabase, IMain, IColumnConfig, FormattingFilter, ColumnSet } from 'pg-promise';

let cs: {
    insert?: ColumnSet,
    update?: ColumnSet;
};

export class UsersRepo 
{
    /**
     * @param db
     * Automated database connection context/interface.
     *
     * If you ever need to access other repositories from this one,
     * you will have to replace type 'IDatabase<any>' with 'any'.
     *
     * @param pgp
     * Library's root, if ever needed, like to access 'helpers'
     * or other namespaces available from the root.
     */
    constructor(private db: IDatabase<any>, private pgp: IMain)
    {
        this.createColumnSets(pgp);
    }

    async insert(newUser: object)
    {
        return this.db.one(this.pgp.helpers.insert(newUser, cs.insert) + 'RETURNING id');
    }

    async empty()
    {
        return this.db.none(usersSQL.empty);
    }

    async delete(userID: string)
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

    async update(userUpdate: object)
    {
        const query = this.pgp.helpers.update(userUpdate, cs.insert) + this.pgp.as.format(' WHERE id = ${id} RETURNING *', userUpdate);
        return this.db.one(query);
    }

    async existsEmail(email: string)
    {
        return this.db.one(usersSQL.exists, { column: 'email', table: 'users', columnData: email }).then(result => result.exists);
    }

    async findByEmail(email: string)
    {
        return this.db.oneOrNone(usersSQL.find, { table: 'users', column: 'email', columnData: email });
    }

    async findByID(id: string)
    {
        return this.db.oneOrNone(usersSQL.find, { table: 'users', column: 'id', columnData: id });
    }

    private createColumnSets(pgp: IMain)
    {
        function optional(name: string, mod?: FormattingFilter): IColumnConfig
        {
            return {
                name: name,
                def: { toPostgres: () => 'DEFAULT', rawType: true },
                mod: mod,
                skip: c => !c.exists
            };
        }

        if (!cs.insert)
        {
            const table = new pgp.helpers.TableName({ table: 'users', schema: 'public' });

            cs.insert = new pgp.helpers.ColumnSet(
                [
                    optional('email'),
                    optional('password'),
                    optional('firstname'),
                    optional('middlename'),
                    optional('lastname'),
                    optional('phonenumber'),
                    optional('user_role')
                ],
                { table }
            );
            cs.update = cs.insert.extend(['?id']);
        }
    }
}