import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User', 
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('ADMIN123',10),
        IsAdmin: true,
    },
    {
        name: 'Ethan Doherty', 
        email: 'ethan@gmail.com',
        password: bcrypt.hashSync('Ethan123',10),
        IsAdmin: false,
    },
    {
        name: 'Eoin Doherty', 
        email: 'eoin@gmail.com',
        password: bcrypt.hashSync('Eoin123',10),
        IsAdmin: false,
    }
];

export default users;