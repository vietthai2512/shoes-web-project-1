import express from 'express';
import expressLoader from './expressLoader';

export default async (expressApp: express.Application) =>
{
    await expressLoader(expressApp);
};