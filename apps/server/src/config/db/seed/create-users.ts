import { faker } from '@faker-js/faker';
import { User, users } from '../schema';
import { hashSync } from 'bcrypt';
import { db } from '../index';

type FakeUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
const FAKE_PASSWORD = 'Qwerty123!';

export const createFakeUsers = async () => {
  const fakeUsers: FakeUser[] = Array.from({ length: 10 }, () => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: hashSync(FAKE_PASSWORD, 10),
    image: faker.image.avatar(),
    description: faker.person.bio(),
  }));

  return db.insert(users).values(fakeUsers).returning();
};
