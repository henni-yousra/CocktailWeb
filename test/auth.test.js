import request from 'supertest';
import express from 'express';
import authRoutes from '../backend/src/routes/auth.js';

const app = express();
app.use(express.json());
app.use('/api', authRoutes);

describe('Auth Routes', () => {
    describe('POST /auth/signup', () => {
        it('should signup a user successfully', async () => {
            const res = await request(app)
                .post('/api/auth/signup')
                .send({
                    username: 'testuser',
                    password: 'testpassword'
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('message', 'User created successfully');
        });

        it('should return error for missing fields', async () => {
            const res = await request(app)
                .post('/api/auth/signup')
                .send({
                    username: 'testuser'
                });
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('error', 'Password is required');
        });
    });

    describe('POST /auth/login', () => {
        it('should login a user successfully', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    username: 'testuser',
                    password: 'testpassword'
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
        });

        it('should return error for invalid credentials', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    username: 'testuser',
                    password: 'wrongpassword'
                });
            expect(res.statusCode).toEqual(401);
            expect(res.body).toHaveProperty('error', 'Invalid credentials');
        });
    });
});