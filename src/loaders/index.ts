import express from 'express';
import expressLoader from './expressLoader';

export default async (expressApp: express.Application): Promise<void> => 
{
    await expressLoader(expressApp);
};
