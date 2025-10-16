import { expect } from "chai";
import supertest from "supertest";
import bcrypt from "bcryptjs";

const requester = supertest("http://localhost:8080")

describe('Probando todas las rutas de adoption', () => { 
    describe("Casos de exito de adoptions", function () {
        it("Endpoint para crear una adopcion", async function() {
            const hashedPassword = await bcrypt.hash("coder123", 10);
            const user = {
                first_name: "Juan",
                last_name: "Perez",
                email: "juan.perez@gmail.com",
                password: hashedPassword
            }
            
            const userReq = await requester.post('/api/users').send(user)
            expect(userReq.body).to.have.property('payload');
            expect(userReq.body.payload).to.have.property('_id');
            const userId = userReq.body.payload._id;

            const pet = {
                name: "Salami",
                specie: "Tortuga",
                birthDate: "2020-05-15"
            }

            const petReq = await requester.post('/api/pets').send(pet)
            expect(petReq.body).to.have.property('payload');
            expect(petReq.body.payload).to.have.property('_id');
            const petId = petReq.body.payload._id;

            const response = await requester.post(`/api/adoptions/${userId}/${petId}`)
            expect(response.body.status).to.be.equal('success')
            expect(response.body.message).to.be.equal('Pet adopted')
        })
        
        it("Endpoint para traer todas las adoption", async function() {
            const response = await requester.get(`/api/adoptions`)
            
            expect(response.body).to.have.property('status')
            expect(response.body).to.have.property('payload')
            expect(response.body.status).to.be.equal('success')
            expect(response.body.payload).to.be.an('array')
        })

        it("Endpoint para traer adoption por id", async function() {
            const hashedPassword = await bcrypt.hash("coder123", 10);
            const user = {
                first_name: "Enrique",
                last_name: "Figueroa",
                email: "enrique.f@gmail.com",
                password: hashedPassword
            }
            
            const userReq = await requester.post('/api/users').send(user)
            expect(userReq.body).to.have.property('payload');
            expect(userReq.body.payload).to.have.property('_id');
            const userId = userReq.body.payload._id;
    
            const pet = {
                name: "Mishi",
                specie: "Gato",
                birthDate: "2020-05-15"
            }
    
            const petReq = await requester.post('/api/pets').send(pet)
            expect(petReq.body).to.have.property('payload');
            expect(petReq.body.payload).to.have.property('_id');
            const petId = petReq.body.payload._id;
    
            const createdAdoption = await requester.post(`/api/adoptions/${userId}/${petId}`)
            expect(createdAdoption.body.status).to.be.equal('success')
            expect(createdAdoption.body.message).to.be.equal('Pet adopted')
            const createdAdoptionId = createdAdoption.body.payload._id
    
            const response = await requester.get(`/api/adoptions/${createdAdoptionId}`)
            
            expect(response.body).to.have.property('status')
            expect(response.body).to.have.property('payload')
            expect(response.body.status).to.be.equal('success')
            expect(response.body.payload).to.be.an('object')
        })
    })    

    describe('Casos de fracaso de adoption', function(){
        it("Error al crear adopción con usuario inexistente", async function() {
            const fakeUserId = "000000000000000000000000";
            const pet = {
                name: "Ghost",
                specie: "Perro",
                birthDate: "2020-05-15"
            }
            const petReq = await requester.post('/api/pets').send(pet)
            const petId = petReq.body.payload._id;

            const response = await requester.post(`/api/adoptions/${fakeUserId}/${petId}`)
            expect(response.body.status).to.be.equal('error')
            expect(response.body).to.have.property('error')
            expect(response.body.error).to.be.equal('user Not found')
        });

        it("Error al crear adopción con mascota inexistente", async function() {
            const hashedPassword = await bcrypt.hash("coder123", 10);
            const user = {
                first_name: "Ana",
                last_name: "Lopez",
                email: `ana.lopez${Date.now()}@gmail.com`,
                password: hashedPassword
            }
            const userReq = await requester.post('/api/users').send(user)
            const userId = userReq.body.payload._id;

            const fakePetId = "000000000000000000000000";
            const response = await requester.post(`/api/adoptions/${userId}/${fakePetId}`)
            expect(response.body.status).to.be.equal('error')
            expect(response.body).to.have.property('error')
            expect(response.body.error).to.be.equal('Pet not found')
        });

        it("Error al crear adopción con mascota ya adoptada", async function() {
            const hashedPassword = await bcrypt.hash("coder123", 10);
            const user1 = {
                first_name: "Luis",
                last_name: "Martinez",
                email: `luis.martinez${Date.now()}@gmail.com`,
                password: hashedPassword
            }
            const userReq1 = await requester.post('/api/users').send(user1)
            const userId1 = userReq1.body.payload._id;

            const pet = {
                name: "Rocky",
                specie: "Perro",
                birthDate: "2020-05-15"
            }
            const petReq = await requester.post('/api/pets').send(pet)
            const petId = petReq.body.payload._id;

            await requester.post(`/api/adoptions/${userId1}/${petId}`)

            const user2 = {
                first_name: "Maria",
                last_name: "Gomez",
                email: `maria.gomez${Date.now()}@gmail.com`,
                password: hashedPassword
            }
            const userReq2 = await requester.post('/api/users').send(user2)
            const userId2 = userReq2.body.payload._id;

            const response = await requester.post(`/api/adoptions/${userId2}/${petId}`)
            expect(response.body.status).to.be.equal('error')
            expect(response.body).to.have.property('error')
            expect(response.body.error).to.be.equal('Pet is already adopted')
        });
        
        it("Error al traer adopción por id inexistente", async function() {
            const fakeAdoptionId = "000000000000000000000000";
            const response = await requester.get(`/api/adoptions/${fakeAdoptionId}`)
            expect(response.body.status).to.be.equal('error')
            expect(response.body).to.have.property('error')
            expect(response.body.error).to.be.equal('Adoption not found')
        });
    })

})