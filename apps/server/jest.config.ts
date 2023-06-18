import { Config } from 'jest';

export default {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./src/__mocks__/db.mock.ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
} satisfies Config;
