import { Request, Response } from 'express';

export const pingAction = (request: Request, response: Response) => {
  response.json({
    status: 'ok',
  }).status(200);
};
