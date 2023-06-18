import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { mockDeep, mockReset } from 'jest-mock-extended';

export const migrateMock = jest.fn();

jest.mock('drizzle-orm/postgres-js/migrator', () => ({
  migrate: migrateMock,
}));

export const dbMock = mockDeep<PostgresJsDatabase<Record<string, any>>>();

jest.mock('@/lib/db', () => ({
  db: dbMock,
}));

beforeEach(() => {
  mockReset(dbMock);
});
