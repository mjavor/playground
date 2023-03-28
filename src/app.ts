import express, { Application } from 'express';
import * as http from 'http';
import { pingAction } from './controllers/ping.controller';

export interface App {
  app: Application;
  start: (port: number) => Promise<void>;
  stop: () => Promise<void>;
}

export const createApp = (): App => {
  const app = express();

  app.get('/ping', pingAction);

  let server: http.Server;
  return {
    app,
    start: async (port: number): Promise<void> => new Promise(resolve => {
      server = app.listen(port, () => {
        resolve();
      });
    }),
    stop: async (): Promise<void> => new Promise((resolve, reject) => {
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    }),
  }
};
