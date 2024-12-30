const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../models/user');

chai.use(chaiHttp);
const { expect } = chai;

describe('Auth Routes', () => {
    before(async () => {
        await User.deleteMany({});
    });

    describe('POST /auth/register', () => {
        it('should register a new user', (done) => {
            chai.request(app)
                .post('/auth/register')
                .send({ username: 'testuser', password: 'testpassword' })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('message', 'User registered successfully');
                    done();
                });
        });

        it('should not register a user with an existing username', (done) => {
            chai.request(app)
                .post('/auth/register')
                .send({ username: 'testuser', password: 'testpassword' })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error', 'Error registering user');
                    done();
                });
        });
    });

    describe('POST /auth/login', () => {
        it('should login an existing user', (done) => {
            chai.request(app)
                .post('/auth/login')
                .send({ username: 'testuser', password: 'testpassword' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message', 'Login successful');
                    done();
                });
        });

        it('should not login a user with incorrect password', (done) => {
            chai.request(app)
                .post('/auth/login')
                .send({ username: 'testuser', password: 'wrongpassword' })
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('error', 'Invalid username or password');
                    done();
                });
        });
    });
});
