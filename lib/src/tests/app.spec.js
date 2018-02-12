"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const request = require("supertest");
const user_1 = require("../schemas/user");
describe('POST /auth/register', () => {
    it('Should create a new user', (done) => {
        var user = {
            email: "hadar@gmail.com",
            password: "1234"
        };
        request('http://localhost:3000')
            .post('/auth/register')
            .send({ user })
            .expect(200)
            .expect((res) => {
            chai_1.expect(res.body.email).to.equal(user.email);
        })
            .end((err, res) => {
            if (err)
                return done('Here' + err);
            return user_1.UserModel.find().then((users) => {
                chai_1.expect(users.length).to.equal(1);
                chai_1.expect(users[0].email).to.equal(user.email);
                done();
            }).catch((error) => done('there' + error));
        });
    });
});
// import { expect } from 'chai';
// import 'mocha';
// export const hello = () => 'Hello world!';
// describe('Hello function', () => {
//   it('should return hello world', () => {
//     const result = hello();
//     expect(result).to.equal('Hello world!');
//   });
// }); 
