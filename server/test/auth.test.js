const request = require('supertest');
const { app } = require('../src/app'); // Uncomment this line to import the app
const mongoose = require('mongoose');
const { connectDB } = require('../src/config/db');
let accessToken;
let refreshToken;
jest.setTimeout(20000); // Set global timeout
beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await mongoose.connection.close();
});

const agent = request.agent(app)
describe('login', function () {

    test('it tries to login', async () => {
        const response = await agent.post("/api/auth/login").send({
            email:"udoy@gmail.com",
            password:"password123@"
        })
        expect(response.statusCode).toBe(200);
        accessToken = response.headers['set-cookie'][0].split(';')[0];
        refreshToken = response.headers['set-cookie'][1].split(';')[0];
    });
    test('logout', async () => {
        const response = await agent.post("/api/auth/logout").set("Cookie",[accessToken,refreshToken])
        expect(response.statusCode).toBe(200);
        
    });
});
