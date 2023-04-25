import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import { Action } from '../framework/type';
import { createUser, getAllUsers, getUserById, removeUser } from '../service/users.service';

interface CreateUserRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
}//interfejs

const isValidUsername = (value: any) => {
  return typeof value === 'string' && value.length >= 5 && value.length < 20;
};//walidacja usernamea

const isValidEmail = (value: any) => {
  // uznajemy że poprawny mail to ciag ktory ma malpe i kropkę,rozszerzenie
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof value === 'string' && emailRegex.test(value);
};//walidacja maila

const isValidPassword = (value: any) => {
  return typeof value === 'string' && value.length >= 8;
};//walidacja hasla

const isValidFirstName = (value: any) => {
  return typeof value === 'string' && value.length > 1 && value.length <= 50;
};//walidacja imiona

const isValidLastName = (value: any) => {
  return typeof value === 'string' && value.length > 1 && value.length <= 50;
};//walidacja nazwisla

const isValidAge = (value: any) => {
  return typeof value === 'number' && value >= 13 && value <= 100;
};//walidacja wieku

const createUserAction: Action = {
  method: 'post',
  path: '/user',
  action: async (request: Request, response: Response) => {
    const requestData: CreateUserRequest = request.body;

    if (
        !isValidUsername(requestData.username) ||
        !isValidEmail(requestData.email) ||
        !isValidPassword(requestData.password) ||
        !isValidFirstName(requestData.firstName) ||
        !isValidLastName(requestData.lastName) ||
        !isValidAge(requestData.age)
    ) {
      return response.status(HttpStatusCode.BadRequest).send({
        error: 'Invalid input data',
      });// walidacja pol wejsciowych
    }

    const existingUser = await getUserByUsername(requestData.username);
    if (existingUser) {
      return response.status(HttpStatusCode.Conflict).send({
        error: 'Username already taken',
      });    //czy username jest zajety
    }

    const newUserData = {
      username: requestData.username,
      email: requestData.email,
      password: requestData.password,
      firstName: requestData.firstName,
      lastName: requestData.lastName,
      age: requestData.age,
    };

    const createdUser = await createUser(newUserData);

    response.status(HttpStatusCode.Created).send(createdUser);
  },//zadanie i wywolanie utworzonego userqa
};

const listUsersAction: Action = {
  method: 'get',//metoda http
  path: '/user',//sciezka id
  action: async (request: Request, response: Response) => {
    const allUsers = await getAllUsers();//funkcja

    response.send(allUsers);
  },//lista userow
};

const deleteUserAction: Action = {
  method: 'delete',
  path: '/user/:userId',
  action: async (request: Request, response: Response) => {
    const userId = request.params.userId;

    await removeUser(userId);

    response.status(HttpStatusCode.NoContent).send();
  },//usuwanie usera
};

const getUserByIdAction: Action = {
  method: 'get',
  path: '/user/:userId',
  action: (request: Request, response: Response) => {
    const userId = parseInt(request.params.userId);
    const user = getUserById(userId);
    if (!user) {
      return response.status(HttpStatusCode.NotFound).send({
        error: `User with ID '${userId}' not found`,
      });
    }

    response.status(HttpStatusCode.OK).send(user);
  },//pobiera info o userze z danym id
};

export default [createUserAction, getUsersAction, removeUserAction, getUserByIdAction];