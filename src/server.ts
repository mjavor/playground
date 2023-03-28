import { createApp } from './app';

const run = async () => {
  const app = createApp();
  const port = 8000;

  await app.start(port);
};

void run();
