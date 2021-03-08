import { UsersRepo } from './users';

// Database Interface Extensions:
interface IExtensions
{
    users: UsersRepo;
}

export { IExtensions, UsersRepo };
