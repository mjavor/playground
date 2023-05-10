import { randomUUID } from 'crypto';

export type User = {
  id: string;
  username: string;
  pin: string;
  createdAt: Date;
};
let userStore: Record<string, User> = {}
userStore[123] = {
  id: '123',
  username: 'awdjawdawd',
  pin: '1234',
  createdAt: new Date(),
};

export const isUsernameAvailable = (username: string) => {
  const users = Object.values(userStore);
  return !users.some((user) => user.username === username);
}

export const createUser = (username: string,pin: string) => {
  const id = randomUUID();

  if (!isUsernameAvailable(username)) {
    throw new Error(`Username '${username}' is already taken`);
    }

  userStore[id] = {
    id,
    username,
    pin,
    createdAt: new Date(),
  };
};


export const getUsers = () => {
  return Object.values(userStore);
}

export const getUserById = (userId: string) => {
  return userStore[userId];
}

export const deleteUserById = (userId: string) => {
  if (userStore[userId]) {
    delete userStore[userId];
  }
}

