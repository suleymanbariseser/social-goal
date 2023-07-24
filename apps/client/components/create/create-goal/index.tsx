import { Goal } from '@social-goal/server/src/config/db/schema';
import { CreateGoalInput } from '@social-goal/server/src/routes/goal/schema';
import { Sheet } from 'tamagui';

import { CreateGoalForm } from './form';

import { Text } from '@/components/ui/text';
import { trpc } from '@/lib/trpc';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  onSave: (goal: Goal) => void;
}
export function CreateGoal(props: Props) {
  const { mutate } = trpc.goal.create.useMutation();

  const onSubmit = (data: CreateGoalInput) => {
    mutate(data, {
      onSuccess(response) {
        props.onSave(response);

        props.onOpenChange(false);
      },
      onError(error) {
        console.log(error.message);
      },
    });
  };

  return (
    <Sheet snapPoints={[60]} modal disableDrag {...props}>
      <Sheet.Frame p="$6" gap="$6">
        <Text variant="subtitle1">Create Goal</Text>
        <Sheet.ScrollView showsVerticalScrollIndicator={false}>
          <CreateGoalForm onSubmit={onSubmit} />
        </Sheet.ScrollView>
      </Sheet.Frame>
      <Sheet.Overlay />
    </Sheet>
  );
}
