/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  testMatch: ['**/?(*.)+(api-spec).[jt]s?(x)'],
  preset: 'ts-jest',
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  testEnvironment: 'node',
};
