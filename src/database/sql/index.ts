import { IQueryFileOptions, QueryFile } from 'pg-promise';
import { join as joinPath } from 'path';

function sql(file: string): QueryFile 
{
    const fullPath = joinPath(__dirname, file);

    const options: IQueryFileOptions = {

        // minifying the SQL is always advised;
        // see also option 'compress' in the API;
        minify: true

        // See also property 'params' for two-step template formatting
    };

    const qf: QueryFile = new QueryFile(fullPath, options);

    if (qf.error)
    {
        // Something is wrong with our query file :(
        // Testing all files through queries can be cumbersome,
        // so we also report it here, while loading the module:
        console.error(qf.error);
    }

    return qf;
}

export const users = {
    empty: sql('users/empty.sql'),
    delete: sql('users/delete.sql'),
    all: sql('common/all.sql'),
    count: sql('common/count.sql'),
    exists: sql('common/exists.sql'),
    find: sql('common/find.sql')
};