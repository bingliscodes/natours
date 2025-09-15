/* eslint-disable */

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server');

// CREATE new user
describe('POST /api/v1/users', () => {
  const newUserData = {
    name: 'Cannoli Garcia',
    email: 'cannolitest@gmail.com',
    password: 'test1234',
    passwordConfirm: 'test1234',
    role: 'guide',
  };

  it('responds with 201', async () => {
    const res = await request(app)
      .post('/api/v1/users/signup')
      .send(newUserData);

    expect(res.status).toBe(201);
  }, 10000);
});

// Sign in
describe('POST /api/v1/users/login', () => {
  const userData = {
    email: 'admin@natours.io',
    password: 'test1234',
  };

  it('responds with 200', async () => {
    const res = await request(app).post('/api/v1/users/login').send(userData);

    expect(res.status).toBe(200);
  }, 10000);
});

// DELETE created user
