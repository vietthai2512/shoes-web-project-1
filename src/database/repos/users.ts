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

    // Insert a new user, and return the new object
    async insert(newUser: object): Promise<User>
    {
        return this.db.one(this.pgp.helpers.insert(newUser, cs.insert) + 'RETURNING id');
    }

    // Remove all records from the table
    async empty(): Promise<null>
    {
        return this.db.none(usersSQL.empty);
    }

    // Delete an user by ID, return that ID
    async delete(userID: string): Promise<string>
    {
        return this.db.one(usersSQL.delete, userID);
    }

    // Get all user records
    async all(): Promise<User[]>
    {
        return this.db.any(usersSQL.all, { table: 'users' });
    }

    // Count the total number of users
    async count(): Promise<number>
    {
        return this.db.one(usersSQL.count, { table: 'users' }, a => +a.count);
    }

    // Update user's infomation 
    async update(userUpdate: object): Promise<User>
    {
        const query = this.pgp.helpers.update(userUpdate, cs.insert) + this.pgp.as.format(' WHERE id = ${id} RETURNING *', userUpdate);
        return this.db.one(query);
    }

    // Check if an email is already registered
    async existsEmail(email: string): Promise<boolean>
    {
        return this.db.one(usersSQL.exists, { column: 'email', table: 'users', columnData: email }).then(result => result.exists);
    }

    // Find an user by email
    async findByEmail(email: string): Promise<User | null>
    {
        return this.db.oneOrNone(usersSQL.find, { table: 'users', column: 'email', columnData: email });
    }

    async findByID(id: string): Promise<User | null>
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