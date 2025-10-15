import { faker } from "@faker-js/faker"

const generatePet = () => {
    return  {
        name: faker.animal.petName(),
        specie: faker.animal.type(),
        birthDate: faker.date.birthdate()
    }
}

export const generateMockPets = (count) => {
    const pets = []
    for(let i = 0; i < count; i++){
        pets.push(generatePet())
    }

    return pets
}