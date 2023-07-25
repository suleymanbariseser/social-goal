import { Goal } from '@social-goal/server/src/config/db/schema';
import { useState } from 'react';
import { Stack } from 'tamagui';

import { CreateGoal } from './create-goal';
import { Input } from '../ui/input';
import { Select } from '../ui/select';

import { trpc } from '@/lib/trpc';

export default function CreateActivityForm() {
  const [goals, { refetch }] = trpc.goal.list.useSuspenseQuery();
  const [selectedGoal, setSelectedGoal] = useState<string>(undefined);

  const [selectGoalOpen, setSelectGoalOpen] = useState(false);
  const [createGoalOpen, setCreateGoalOpen] = useState(false);

  const handePressCreate = () => {
    setSelectGoalOpen(false);
    setCreateGoalOpen(true);
  };

  const handleSave = async (goal: Goal) => {
    await refetch();
    setSelectedGoal(goal.id.toString());
  };

  return (
    <Stack f={1} px="$6" gap="$4">
      <Select
        open={selectGoalOpen}
        onOpenChange={setSelectGoalOpen}
        value={selectedGoal}
        onValueChange={setSelectedGoal}
        header={
          <Select.Header>
            <Select.Title>Your Goals</Select.Title>
            <Select.Action onPress={handePressCreate}>Create</Select.Action>
          </Select.Header>
        }
        placeholder="Select a category"
        items={goals.map((goal) => ({
          value: goal.id.toString(),
          name: goal.title,
        }))}
      />
      <Input placeholder="Write Something..." rows={5} multiline mih="$12" />
      <CreateGoal open={createGoalOpen} onOpenChange={setCreateGoalOpen} onSave={handleSave} />
    </Stack>
  );
}
