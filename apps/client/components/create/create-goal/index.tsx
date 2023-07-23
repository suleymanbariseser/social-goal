import { Sheet } from 'tamagui';

import { CreateGoalForm } from './form';

import { Text } from '@/components/ui/text';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function CreateGoal(props: Props) {
  return (
    <Sheet snapPoints={[60]} modal disableDrag {...props}>
      <Sheet.Frame p="$6" gap="$6">
        <Text variant="subtitle1">Create Goal</Text>
        <Sheet.ScrollView showsVerticalScrollIndicator={false}>
          <CreateGoalForm />
        </Sheet.ScrollView>
      </Sheet.Frame>
      <Sheet.Overlay />
    </Sheet>
  );
}
