import { faker } from '@faker-js/faker';
import { db } from '../index';
import { InsertActivityComment, activityComments } from '../schema';

export const createFakeComments = (activityUserIds: { activityId: number; userId: number }[]) => {
  const fakeComments: InsertActivityComment[] = activityUserIds.flatMap(({ activityId, userId }) =>
    Array.from({ length: faker.number.int({ min: 2, max: 5 }) }, () => ({
      activityId: activityId,
      userId: userId,
      content: faker.lorem.sentences({ min: 1, max: 5 }),
      createdAt: faker.date.past(),
    }))
  );

  return db.insert(activityComments).values(fakeComments).returning();
};
