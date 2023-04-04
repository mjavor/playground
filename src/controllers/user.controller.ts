import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import { Action } from '../framework/type';
import { createUser } from '../service/users.service';

const isValidUsername = (value: any) => {
  return typeof value === 'string' && value.length >= 5 && value.length < 20;
}

const createUserAction: Action = {
  method: 'post',
  path: '/user',
  action: (request: Request, response: Response) => {
    const newUsername = request.body.username;
    if (!isValidUsername(newUsername)) {
      return response.status(HttpStatusCode.BadRequest).send({
        error: `'${ newUsername }' is not valid username`,
      });
    }

    createUser(newUsername);

    response.status(201).send();
  },
};

export default [createUserAction];
