import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

const generateUser = () => {
    const first_name = faker.person.firstName();
    const last_name = faker.person.lastName();
    const salt = bcrypt.genSaltSync(10);
    const passwordHashed = bcrypt.hashSync('coder123', salt);

    return {
        first_name,
        last_name,
        email: faker.internet.email({ firstName: first_name, lastName: last_name }),
        password: passwordHashed,
        role: faker.helpers.arrayElement(['user', 'admin']),
        pets: []
    };
};

export const generateMockUsers = (count) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        users.push(generateUser());
    }
    return users;
};