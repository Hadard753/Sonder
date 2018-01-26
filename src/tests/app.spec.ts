import { expect } from 'chai';
import * as mocha from 'mocha';
import * as request from 'supertest';

import app from '../app';
import { UserModel } from '../models/user.model';

// beforeEach((done) => {
//     UserModel.remove({}).then(() => {
//         done();
//     }).catch((e) => done(e));
// });

describe('POST /auth/register', () => {
   it('Should create a new user', (done) => {
        var user = { 
            username: "wonder_woman",
            email: "hadar753@gmail.com",
            password: "1234" 
        }

        request(app.express)
            .post('/auth/register')
            .send({user})
            .expect(200)
            .expect((res) => {
                expect(res.body.email).to.equal(user.email);
            })
            .end((err, res) => {
                if(err) return done(err);
                UserModel.find().then((users) => {
                    expect(users.length).to.equal(1);
                    expect(users[0].email).to.equal(user.email);
                    done();
                }).catch((error) => done(error));
            });
   }); 
});