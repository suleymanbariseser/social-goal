import express from 'express';
import { User, Goal, combineUserAndGoal } from '@social-goal/shared';

const app = express();

app.get('/', (_, res) => {
  const user: User = {
    createdAt: new Date(),
    updatedAt: new Date(),
    email: 'suleymanbariseser@gmail.com',
    id: 1,
    name: 'hello world',
    password: 'HelloWorld1_',
  };

  const goal: Goal = {
    title: 'hello world',
  };

  res.send(combineUserAndGoal(user, goal));
});

app.listen(8000, () => {
  console.log('App is running at PORT=8000');
});
