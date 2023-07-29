import { zodResolver } from '@hookform/resolvers/zod';
import { Goal } from '@social-goal/server/src/config/db/schema';
import {
  CreateActivityInput,
  createActivitySchema,
} from '@social-goal/server/src/routes/activity/schema';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Stack } from 'tamagui';

import { CreateGoal } from './create-goal';
import CreateTools from './create-tools';
import { Button } from '../ui/button';
import { ControlledInput } from '../ui/input';
import { ControlledSelect, Select } from '../ui/select';

import { trpc } from '@/lib/trpc';

export default function CreateActivityForm() {
  const [goals, { refetch }] = trpc.goal.list.useSuspenseQuery();
  const { mutate: createActivity } = trpc.activity.create.useMutation();

  const [selectGoalOpen, setSelectGoalOpen] = useState(false);
  const [createGoalOpen, setCreateGoalOpen] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateActivityInput>({
    resolver: zodResolver(createActivitySchema),
  });

  const handePressCreate = () => {
    setSelectGoalOpen(false);
    setCreateGoalOpen(true);
  };

  const handleSave = async (goal: Goal) => {
    await refetch();
    setValue('goalId', goal.id);
  };

  const onSubmit = (data: CreateActivityInput) => {
    createActivity(data, {
      onSuccess: () => {
        router.replace('/');
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <Stack f={1} px="$6" gap="$6">
      <Stack f={1} gap="$4">
        <ControlledSelect
          open={selectGoalOpen}
          onOpenChange={setSelectGoalOpen}
          control={control}
          name="goalId"
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
          error={!!errors.goalId}
          helperText={errors.goalId?.message}
          transform={(val) => +val}
        />
        <ControlledInput
          control={control}
          name="content"
          placeholder="Write Something..."
          error={!!errors.content}
          helperText={errors.content?.message}
          rows={5}
          multiline
          mih="$12"
        />
        <CreateTools />
      </Stack>
      <Button onPress={handleSubmit(onSubmit)}>Create</Button>
      <CreateGoal open={createGoalOpen} onOpenChange={setCreateGoalOpen} onSave={handleSave} />
    </Stack>
  );
}
