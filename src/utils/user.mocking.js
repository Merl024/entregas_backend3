import { faker } from "@faker-js/faker";
import bcrypt from 'bcryptjs'

const generateUser = () => {
    const salt = bcrypt.genSaltSync(10)
    const passwordHashed = bcrypt.hashSync('coder123', salt)
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    return {
        firstName: firstName,
        lastName: lastName,
        email: faker.internet.email({ firstName: firstName , lastName: lastName }),
        age: faker.number.int({min: 18, max: 85}),
        password:passwordHashed,
        pets: [],
        role: faker.helpers.arrayElement(['user', 'admin'])
    }
}

export const generateMockUsers = (count) => {
    const users = []
    for (let i = 0; i < count; i++){
        users.push(generateUser())
    }

    return users
}