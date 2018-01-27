import { expect } from 'chai';
import * as mocha from 'mocha';
import * as request from 'supertest';

import app from '../app';
import { UserModel } from '../schemas/user';

describe('POST /auth/register', () => {
   it('Should create a new user', (done) => {
        var user = { 
            email: "hadar@gmail.com",
            password: "1234" 
        }

        request('http://localhost:3000')
            .post('/auth/register')
            .send({user})
            .expect(200)
            .expect((res) => {
                expect(res.body.email).to.equal(user.email);
            })
            .end((err, res) => {
                if(err) return done('Here' + err);
                return UserModel.find().then((users) => {
                    expect(users.length).to.equal(1);
                    expect(users[0].email).to.equal(user.email);
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