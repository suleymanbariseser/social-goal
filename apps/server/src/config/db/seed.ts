import 'dotenv/config';
import { faker } from '@faker-js/faker';
import { Activity, Goal, User, activities, goals, users } from './schema';
import { db } from './index';
import { hashSync } from 'bcrypt';

type FakeUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
type FakeGoal = Omit<Goal, 'id' | 'createdAt'>;
type FakeActivity = Omit<Activity, 'id' | 'createdAt' | 'expiresAt'>;

const FAKE_PASSWORD = 'Qwerty123!';

const createUsers = async () => {
  console.log('Creating users');

  const fakeUsers: FakeUser[] = Array.from({ length: 10 }, () => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: hashSync(FAKE_PASSWORD, 10),
    image: faker.image.avatar(),
    description: faker.person.bio(),
  }));

  return db
    .insert(users)
    .values(fakeUsers)
    .returning()
    .finally(() => {
      console.log('Users created');
    });
};

const createGoals = (userIds: number[]) => {
  console.log('Creating goals');

  const fakeGoals: FakeGoal[] = userIds.flatMap((userId) =>
    Array.from({ length: 2 }, () => ({
      title: faker.lorem.words(3),
      description: faker.lorem.words(10),
      startDate: faker.date.past(),
      endDate: faker.date.future(),
      creatorId: userId,
    }))
  );

  return db
    .insert(goals)
    .values(fakeGoals)
    .returning()
    .finally(() => {
      console.log('Goals created');
    });
};

const createActivities = (goalUserIds: { id: number; userId: number }[]) => {
  console.log('Creating activities');

  const fakeActivities: FakeActivity[] = goalUserIds.flatMap((goal) =>
    Array.from(
      {
        length: 10,
      },
      () => ({
        content: faker.lorem.words(10),
        creatorId: goal.userId,
        goalId: goal.id,
      })
    )
  );

  return db
    .insert(activities)
    .values(fakeActivities)
    .returning()
    .finally(() => {
      console.log('Activities created');
    });
};

const seed = async () => {
  const newUsers = await createUsers();
  const newGoals = await createGoals(newUsers.map((user) => user.id));
  await createActivities(newGoals.map((goal) => ({ id: goal.id, userId: goal.creatorId })));
};

seed();
