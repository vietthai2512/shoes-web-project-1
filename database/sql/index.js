const { QueryFile } = require('pg-promise');
const { join: joinPath } = require('path');

function sql(file)
{
    const fullPath = joinPath(__dirname, file);

    const options = {
        minify: true
    };

    const qf = new QueryFile(fullPath, options);

    if (qf.error)
    {
        console.error(qf.error);
    }

    return qf;
}

module.exports =
{
    users: {
        empty: sql('users/empty.sql'),
        delete: sql('users/delete.sql'),
        all: sql('common/all.sql'),
        count: sql('common/count.sql'),
        exists: sql('common/exists.sql'),
        find: sql('common/find.sql')
    }
}