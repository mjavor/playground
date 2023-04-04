import { Request, Response } from 'express';
import { Action } from '../framework/type';

const pingAction: Action = {
  path: '/ping',
  method: 'get',
  action: (request: Request, response: Response) => {
    response.json({
      status: 'ok',
    }).status(200);
  }
};

export default [pingAction];
