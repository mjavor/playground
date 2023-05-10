import axios, { HttpStatusCode } from 'axios';
import { App, createApp } from '../../app';

describe('ping test', () => {
  let app: App;

  beforeAll(async () => {
    app = createApp();
    await app.start(8000);
  });

  afterAll(async () => {
    await app.stop();
  });

  describe('GET /ping', () => {
    it('should return 200 and \'ok\' message', async () => {
      const { status, data } = await axios.get('http://localhost:8000/ping');

      expect(status).toEqual(HttpStatusCode.Ok);
      expect(data).toStrictEqual({
        status: 'ok',
      });
    });
  });

});

