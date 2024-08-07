import { zodResolver } from '@hookform/resolvers/zod';
import { useToastController } from '@tamagui/toast';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Stack } from 'tamagui';

import { CreateActivityFormSchema, createActivityFormSchema } from './create-activity-form-schema';
import { CreateGoal } from './create-goal';
import { CreateTools } from './create-tools';
import { Button } from '../ui/button';
import { Input } from '../ui/form/input';
import { Select } from '../ui/form/select';

import { useGoalList } from '@/hooks/goal/use-goal-list';
import { useAuth } from '@/hooks/use-auth';
import { trpc } from '@/lib/trpc';

export const CreateActivityForm = () => {
  const router = useRouter();
  const utils = trpc.useUtils();
  const auth = useAuth();
  const toast = useToastController();

  const { goals, refetch } = useGoalList({
    filters: {
      userId: auth.user.id,
      limit: 100,
    },
  });

  const { mutate: createActivity } = trpc.activity.create.useMutation();

  const [selectGoalOpen, setSelectGoalOpen] = useState(false);
  const [createGoalOpen, setCreateGoalOpen] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateActivityFormSchema>({
    resolver: zodResolver(createActivityFormSchema),
  });

  const handePressCreate = () => {
    setSelectGoalOpen(false);
    setCreateGoalOpen(true);
  };

  const handleSave = async (goal: { id: number }) => {
    await refetch();
    setValue('goalId', goal.id);
  };

  const onSubmit = (data: CreateActivityFormSchema) => {
    const input = {
      ...data,
      assets: data.assets.map((a) => a.uri),
    };

    createActivity(input, {
      onSuccess: () => {
        utils.activity.list.invalidate();
        router.replace('/');
      },
      onError: (error) => {
        toast.show(error.message, {
          variant: 'error',
        });
      },
    });
  };

  const assetError = errors.assets?.[0];

  return (
    <Stack f={1} px="$6" gap="$6">
      <Stack f={1} gap="$4">
        <Select
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
            value: goal.id,
            name: goal.title,
          }))}
          error={!!errors.goalId}
          helperText={errors.goalId?.message}
        />
        <Input
          control={control}
          name="content"
          placeholder="Write Something..."
          error={!!errors.content}
          helperText={errors.content?.message}
          rows={5}
          multiline
          mih="$12"
        />
        <CreateTools
          name="assets"
          control={control}
          error={!!assetError}
          helperText={assetError?.loading?.message || assetError?.failed?.message}
        />
      </Stack>
      <Button onPress={handleSubmit(onSubmit)}>Create</Button>
      <CreateGoal open={createGoalOpen} onOpenChange={setCreateGoalOpen} onSave={handleSave} />
    </Stack>
  );
};
