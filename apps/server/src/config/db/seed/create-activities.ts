import { faker } from '@faker-js/faker';
import { Activity, activities } from '../schema';
import { db } from '../index';

type FakeActivity = Omit<Activity, 'id' | 'createdAt' | 'expiresAt'>;

export const createFakeActivities = (goalUserIds: { id: number; userId: number }[]) => {
  const fakeActivities: FakeActivity[] = goalUserIds.flatMap((goal) =>
    Array.from(
      {
        length: faker.number.int({ min: 5, max: 10 })
      },
      () => ({
        content: faker.lorem.words(10),
        creatorId: goal.userId,
        goalId: goal.id,
      })
    )
  );

  return db.insert(activities).values(fakeActivities).returning();
};
