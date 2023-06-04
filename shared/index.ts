export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Goal {
  title: string;
}

export const combineUserAndGoal = (user:User, goal: Goal) => {
  return {
    user,
    goal
  }
}
