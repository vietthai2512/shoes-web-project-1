import dotenv from 'dotenv';
import { Algorithm } from 'jsonwebtoken';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error)
{
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export const PORT = parseInt(process.env.PORT!, 10);

export const PG_CONNECTION = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

export const JWT_ACCESS = {
    SECRET: process.env.ACCESS_TOKEN_SECRET as string,
    EXP: parseInt(process.env.ACCESS_TOKEN_EXP!, 10),
    ALGORITHM: process.env.JWT_ALGORITHM as Algorithm
};

export const JWT_REFRESH = {
    SECRET: process.env.REFRESH_TOKEN_SECRET as string,
    EXP: parseInt(process.env.REFRESH_TOKEN_EXP!, 10),
    ALGORITHM: process.env.JWT_ALGORITHM as Algorithm
};