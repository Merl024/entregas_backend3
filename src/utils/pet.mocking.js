import { faker } from "@faker-js/faker"

const generatePet = () => {
    return  {
        name: faker.animal.petName(),
        species: faker.animal.type(),
        birthDate: faker.date.birthdate().toISOString()
    }
}

export const generateMockPets = (count) => {
    const pets = []
    for(let i = 0; i < count; i++){
        pets.push(generatePet())
    }

    return pets
}