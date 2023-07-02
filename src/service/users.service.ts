import {randomUUID} from 'crypto';

export type User = {
    id: string;
    username: string;
    isPlaying: boolean;
};
let userStore: Record<string, User> = {}

export const isUsernameAvailable = (username: string) => {
    const users = Object.values(userStore);
    return !users.some((user) => user.username === username);
}

export const createUser = (username: string) => {
    const id = randomUUID();

    if (!isUsernameAvailable(username)) {
        throw new Error(`Username '${username}' is already taken`);
    }

    userStore[id] = {
        id,
        username,
        isPlaying: false,
    };
};

export const getUsers = () => {
    return Object.values(userStore);
}

export const getUserById = (userId: string) => {
    return userStore[userId];
}

export const updateUser = (user: User) => {
    userStore[user.id] = user;
}

export const deleteUserById = (userId: string) => {
    if (userStore[userId]) {
        delete userStore[userId];
    }
}

