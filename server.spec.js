const request = require('supertest');

const server = require('./server.js');

const superMario = {
    title: 'Super Mario', // required
    genre: 'Arcade', // required
  }

describe('server', () => {

  // open client, make a request and inspect the response
  describe('GET /', () => {
    it('should return 200 OK', () => {
      // we return the promise
      return request(server)
        .get('/')
        .expect(200);
    });

    it('using the squad (async/await)', async () => {
      // use the squad
      const res = await request(server).get('/');
      expect(res.status).toBe(200);
    });

    it('should return JSON using done callback', done => {
      // using the done callback
      request(server)
        .get('/')
        .then(res => {
          expect(res.type).toBe('application/json'); // Content-Type
          done();
        });
    });

    it('should return { greeting: "Welcome!" }', () => {
      const expected = { greeting: 'Welcome!' };
      return request(server)
        .get('/')
        .then(res => {
          expect(res.body).toEqual(expected);
        });
    });
  });

  describe('GET /games', () => {
    it('should return 200 OK', () => {
      // we return the promise
      return request(server)
        .get('/games')
        .expect(200);
    });

    it('using the squad (async/await)', async () => {
      // use the squad
      const res = await request(server).get('/games');
      expect(res.status).toBe(200);
    });

    it('should return JSON using done callback', done => {
      // using the done callback
      request(server)
        .get('/games')
        .then(res => {
          expect(res.type).toBe('application/json'); // Content-Type
          done();
        });
    });

    it('should return a list of game object', () => {
      const expected = [{
        title: 'Pacman', // required
        genre: 'Arcade', // required
        releaseYear: 1980 // not required
    }];
      return request(server)
        .get('/games')
        .then(res => {
          expect(res.body).toEqual(expected);
        });
    });
  });

  describe('POST /games', () => {
    it('should return 422 bad request', () => {
      // we return the promise
      return request(server)
        .post('/games')
        .expect(422)
        .then(res => {
            expect(res.body.error).toBe('Bad Request')
        });
    });

    it('using the squad (async/await)', async () => {
      // use the squad
      const res = await request(server)
      .post('/games')
      .send(superMario);
      expect(res.status).toBe(201);
    });

    it('should return JSON using done callback', done => {
      // using the done callback
      request(server)
        .get('/games')
        .then(res => {
          expect(res.type).toBe('application/json'); // Content-Type
          done();
        });
    });

    it('should return a new list of game object', () => {
      return request(server)
        .get('/games')
        .then(res => {
          expect(res.body).toContainEqual(superMario);
        });
    });
  });
});

