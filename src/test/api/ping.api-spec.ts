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
});


