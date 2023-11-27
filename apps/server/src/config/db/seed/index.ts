import 'dotenv/config';
import { createFakeUsers } from './create-users';
import { createFakeGoals } from './create-goals';
import { createFakeActivities } from './create-activities';
import { createFakeComments } from './create-comments';

const seed = async () => {
  const newUsers = await createFakeUsers();
  const newGoals = await createFakeGoals(newUsers.map((user) => user.id));
  const newActivities = await createFakeActivities(
    newGoals.map((goal) => ({ id: goal.id, userId: goal.creatorId }))
  );
  const newComments = await createFakeComments(
    newActivities.map((act) => ({
      activityId: act.id,
      userId: act.creatorId,
    }))
  );
};

seed();
