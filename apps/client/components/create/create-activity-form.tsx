import { useState } from 'react';
import { Stack } from 'tamagui';

import { CreateGoal } from './create-goal';
import { Input } from '../ui/input';
import { Select } from '../ui/select';

export default function CreateActivityForm() {
  const [selectGoalOpen, setSelectGoalOpen] = useState(false);
  const [createGoalOpen, setCreateGoalOpen] = useState(false);

  const handePressCreate = () => {
    setSelectGoalOpen(false);
    setCreateGoalOpen(true);
  };

  return (
    <Stack f={1} px="$6" gap="$4">
      <Select
        open={selectGoalOpen}
        onOpenChange={setSelectGoalOpen}
        header={
          <Select.Header>
            <Select.Title>Your Goals</Select.Title>
            <Select.Action onPress={handePressCreate}>Create</Select.Action>
          </Select.Header>
        }
        placeholder="Select a category"
        items={[
          {
            name: 'Balkan Tour',
          },
          {
            name: 'Create Social Goal',
          },
          {
            name: 'Move to new house',
          },
        ]}
      />
      <Input placeholder="Write Something..." rows={5} multiline mih="$12" />
      <CreateGoal open={createGoalOpen} onOpenChange={setCreateGoalOpen} />
    </Stack>
  );
}
