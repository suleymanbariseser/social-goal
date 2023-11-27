import { faker } from '@faker-js/faker';
import { Goal, goals } from '../schema';
import { db } from '../index';

type FakeGoal = Omit<Goal, 'id' | 'createdAt'>;

export const createFakeGoals = async (userIds: number[]) => {
  const fakeGoals: FakeGoal[] = userIds.flatMap((userId) =>
    Array.from({ length: 2 }, () => ({
      title: faker.lorem.words(3),
      description: faker.lorem.words(10),
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      creatorId: userId,
    }))
  );

  return db.insert(goals).values(fakeGoals).returning();
};
