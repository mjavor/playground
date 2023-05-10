import { randomUUID, createHash } from 'crypto';

export type User = {
  id: string;
  username: string;
  age: number;
  passwordHash: string;
  acceptTermOfUse: boolean;
  createdAt: Date;
};

export  type CreateUserCommand ={
  username: string;
  age: number;
  plainPassword: string;
  acceptTermOfUse: boolean;
}

const userStore: Record<string, User> = {};

export const isUsernameAvailable = (username: string) => {
  const users = Object.values(userStore);
  return !users.some((user) => user.username === username);
}
export const createUser = (payload: CreateUserCommand,username: string) => {
  const id = randomUUID();
  const passwordHash: string =  createHash('sha256',{ encoding: 'utf-8' }).update(payload.plainPassword).digest('base64');

  if (!isUsernameAvailable(username)) {
    throw new Error(`Username '${username}' is already taken`);
  }

  userStore[id] = {
    id,
    passwordHash,
    username: payload.username,
    age: payload.age,
    acceptTermOfUse: payload.acceptTermOfUse,
    createdAt: new Date(),
  };
};

export const listUsers =()=> {
  const userStoreArray=userStore;
  Object.assign([], userStoreArray);
  return userStoreArray;
}

export const deleteUser =(userId: string)=> {
  delete userStore[userId];
}

export const giveUserById =(userId: string)=> {
  return userStore[userId];
}


