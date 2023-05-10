import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import { Action } from '../framework/type';
import { createUser, isUsernameAvailable } from '../service/users.service';
import { listUsers } from "../service/users.service";
import { deleteUser } from "../service/users.service";
import { giveUserById } from "../service/users.service";
import { z } from "zod";

const createUserSchema = z.object({
  username: z.string().min(3).max(25),
  plainPassword: z.string().min(5).max(20),
  age: z.number(),
  acceptTermOfUse: z.boolean(),
})

const createUserAction: Action = {
  path: '/user',
  method: 'post',
  action: (request: Request, response: Response) => {
      const result = createUserSchema.safeParse(request.body);
      const newUsername = request.body.username;

    if (!isUsernameAvailable(newUsername)) {
      return response.status(HttpStatusCode.BadRequest).send({
        error: `Username '${newUsername}' is already taken`,
      });
    }

      if(!result.success) {
        return response.status(HttpStatusCode.BadRequest).json(result.error);
      }


    // @ts-ignore
    createUser(result.data);
    response.status(HttpStatusCode.Ok).send();
  },
};

const listUsersAction: Action = {
  path: '/user',
  method: 'get',
  action: (request: Request, response: Response) => {
    const users = listUsers();

    return response.json(users)
  },
};

const deleteUserAction: Action = {
  path: '/user/:userId',
  method: 'delete',
  action: (request: Request, response: Response) => {
    const userId = request.params.userId;
    deleteUser(userId);

    response.status(HttpStatusCode.Ok).send();
  },
};

const getUserByIdAction: Action = {
  path: '/user/:userId',
  method: 'get',
  action: (request: Request, response: Response) => {
    const userId = request.params.userId;

    return response.json(giveUserById(userId));
  },
};
export default [createUserAction,listUsersAction,deleteUserAction,getUserByIdAction];


