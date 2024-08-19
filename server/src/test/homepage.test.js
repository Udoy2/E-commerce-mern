const request = require('supertest');
const {app} = require('../app');

describe('homepage',()=>{
    it('welcomes the user',(done)=>{
        request(app).get("/")
        .expect(200)
        .expect(/welcome getta/,done)
    })
})