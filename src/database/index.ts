import pgPromise, { IDatabase, IInitOptions, IMain } from 'pg-promise';
import { PG_CONNECTION } from '../config';
import { IExtensions, UsersRepo } from './repos';

type ExtendedProtocol = IDatabase<IExtensions> & IExtensions;

// pg-promise initialization options:
const initOptions: IInitOptions<IExtensions> =
{
    capSQL: true,

    // Extending the database protocol with our custom repositories;
    // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
    extend(obj: ExtendedProtocol, dc: any)
    {
        obj.users = new UsersRepo(obj, pgp);
    }
};

// Initializing the library:
const pgp: IMain = pgPromise(initOptions);

// Creating the database instance with extensions:
const db: ExtendedProtocol = pgp(PG_CONNECTION);

export { db, pgp };