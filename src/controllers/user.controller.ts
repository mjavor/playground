import {HttpStatusCode} from 'axios';
import {Request, Response} from 'express';
import {Action} from '../framework/type';
import {createUser, deleteUserById, getUserById, getUsers, isUsernameAvailable} from '../service/users.service';

export const isValidUsername = (value: any) => {
    return typeof value === 'string' && value.length >= 5 && value.length < 20;
}

const createUserAction: Action = {
    method: 'post',
    path: '/user',
    action: (request: Request, response: Response) => {
        const newUsername = request.body.username;

        if (!newUsername) {
            return response.status(HttpStatusCode.BadRequest).send({
                error: `Username is required`,
            });
        }

        if (!isValidUsername(newUsername)) {
            return response.status(HttpStatusCode.BadRequest).send({
                error: `'${newUsername}' is not a valid username`,
            });
        }

        if (!isUsernameAvailable(newUsername)) {
            return response.status(HttpStatusCode.BadRequest).send({
                error: `Username '${newUsername}' is already taken`,
            });
        }

        try {
            createUser(newUsername);
            response.status(201).send();
        } catch (error: unknown) {
            if (error instanceof Error) {
                response.status(HttpStatusCode.InternalServerError).send({
                    error: error.message,
                });
            } else {
                response.status(HttpStatusCode.InternalServerError).send({
                    error: 'Unknown error occurred',
                });
            }
        }
    },
};

const getUsersAction: Action = {
    method: 'get',
    path: '/user',
    action: (request: Request, response: Response) => {
        const users = getUsers();
        return response.json(users);
    }
}

const getUserByIdAction: Action = {
    method: 'get',
    path: '/user/:userId',
    action: (request: Request, response: Response) => {
        const userId = request.params.userId;
        return response.json(getUserById(userId));
    }
}

const deleteUserByIdAction: Action = {
    path: '/user/:userId',
    method: 'delete',
    action: (request: Request, response: Response) => {
        const userId = request.params.userId;
        deleteUserById(userId);

        response.status(HttpStatusCode.Ok).send();
    },
}


export default [createUserAction, getUsersAction, getUserByIdAction, deleteUserByIdAction];
