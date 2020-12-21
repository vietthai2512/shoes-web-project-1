const dotenv = require('dotenv');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error)
{
    // This error should crash whole process

    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports =
{
    PORT: parseInt(process.env.PORT, 10),
    PG_CONNECTION:
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
};