export interface User
{
    id: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    middleName?: string,
    phoneNumber: string,
    joinDate: Date,
    userRoles: string;
}