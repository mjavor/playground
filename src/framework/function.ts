import { Application } from 'express';
import { Action } from './type';

export const installRoutes = (app: Application, routes: Action[]): void => {
  for (const route of routes) {
    app[route.method](route.path, route.action);
  }
}