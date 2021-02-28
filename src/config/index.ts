import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error)
{
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    PORT: parseInt(process.env.PORT!, 10),
    PG_CONNECTION:
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    },
    JWT_ACCESS:
    {
        SECRET: process.env.ACCESS_TOKEN_SECRET,
        EXP: process.env.ACCESS_TOKEN_EXP,
        ALGORITHM: process.env.JWT_ALGORITHM
    },
    JWT_REFRESH:
    {
        SECRET: process.env.REFRESH_TOKEN_SECRET,
        EXP: process.env.REFRESH_TOKEN_EXP,
        ALGORITHM: process.env.JWT_ALGORITHM
    }
};