import { randomUUID } from 'crypto';

export type User = {
  id: string;
  username: string;
  createdAt: Date;
};

const userStore: Record<string, User> = {};

export const createUser = (username: string) => {
  const id = randomUUID();

  userStore[id] = {
    id,
    username,
    createdAt: new Date(),
  };
};
