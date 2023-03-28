/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  testMatch: ['**/?(*.)+(api-spec).[jt]s?(x)'],
  preset: 'ts-jest',
  testEnvironment: 'node',
};
