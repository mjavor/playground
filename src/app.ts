import * as http from 'http';
import express, { Application } from 'express';
import cors from 'cors';

import { installRoutes } from './framework/function';

import pingController from './controllers/ping.controller';
import userController from './controllers/user.controller';
import gameController from "./controllers/game.controller";

export interface App {
  app: Application;
  start: (port: number) => Promise<void>;
  stop: () => Promise<void>;
}

export const createApp = (): App => {
  const app = express();


  app.use(express.json());
  app.use(cors());

  installRoutes(app, pingController);
  installRoutes(app, userController);
  installRoutes(app, gameController);


  let server: http.Server;
  module.exports = app;
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


