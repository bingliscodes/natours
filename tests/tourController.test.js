/* eslint-disable */

const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server');

// The below function makes a GET request to the /api/v1/tours endpoint,
// then expects a 200 status and an array in the res.body.data.tours property
describe('GET /api/v1/tours', () => {
  // Get All Tours
  it('GET api/v1/tours should return an array of all tours', async () => {
    const res = await request(app).get('/api/v1/tours');
    // console.log(res.body.data);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data.tours)).toBe(true);
  });

  // Get One Tour
  it('GET api/v1/tours/:id should return status 200 and the Park Camper tour', async () => {
    const res = await request(app).get(
      '/api/v1/tours/5c88fa8cf4afda39709c2961',
    );
    // console.log(res.body.data.data);
    expect(res.status).toBe(200);
    expect(res.body.data.data.name).toBe('The Park Camper');
  });
});

// Create tour
// Would probably make sense to perform all the protected operations within one async block so I can use the same auth token

let newTourId;
describe('POST /api/v1/tours', () => {
  const newTourData = {
    name: 'New Test Tour',
    duration: 5,
    maxGroupSize: 25,
    difficulty: 'easy',
    price: 21,
    summary: 'Meow',
    imageCover: 'tour-1-cover.jpg',
    startLocation: {
      type: 'Point',
      coordinates: [-80.185942, 25.774772],
      address: '301 Biscayne Blvd, Miami, FL 33132, USA',
      description: 'Miami, USA',
    },
  };

  // Protected route means we need an auth token
  it('responds with 201 status', async () => {
    const userRes = await request(app)
      .post('/api/v1/users/login')
      .send({ email: 'admin@natours.io', password: 'test1234' });

    const { token } = userRes.body;

    const tourRes = await request(app)
      .post('/api/v1/tours')
      .set('Authorization', `Bearer ${token}`)
      .send(newTourData);
    expect(tourRes.body.data.data.name === newTourData.name);
    expect(tourRes.status).toBe(201);
    newTourId = tourRes.body.data.data._id;
    console.log('New tour created: ', newTourId);
  }, 10000);
});

describe('DELETE /api/v1/tours/:id', () => {
  it('responds with 204 status', async () => {
    // Protected route means we need an auth token
    const userRes = await request(app)
      .post('/api/v1/users/login')
      .send({ email: 'admin@natours.io', password: 'test1234' });

    const { token } = userRes.body;

    const tourRes = await request(app)
      .delete(`/api/v1/tours/${newTourId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(tourRes.status).toBe(204);
  }, 10000);
});
