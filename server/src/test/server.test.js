const request = require('supertest');
const app = require('../app');

describe('RSS Feed Fetching', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/rss/fetch-rss');
    expect(response.statusCode).toBe(200);
  });
  
  test('It should handle errors correctly', async () => {
    const response = await request(app).get('/rss/fetch-rss');
    expect(response.statusCode).toBe(500); 
  });
});
