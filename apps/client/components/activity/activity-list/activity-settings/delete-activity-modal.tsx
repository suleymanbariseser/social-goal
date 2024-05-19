import { Sheet, SheetProps, Stack } from 'tamagui';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';

type Props = SheetProps & object;

export const DeleteActivityModal = ({ ...props }: Props) => {
  const handleDelete = () => {
    console.log('Delete activity');
    props.onOpenChange(false);
  };

  return (
    <Sheet modal disableDrag snapPoints={[30]} {...props}>
      <Sheet.Frame p="$4" gap="$6">
        <Stack gap="$2">
          <Text variant="subtitle1">Delete Activity</Text>
          <Text variant="body2" color="$textSecondary">
            Are you sure you want to delete this activity? This action cannot be undone.
          </Text>
        </Stack>
        <Stack gap="$2">
          <Button variant="contained" onPress={handleDelete}>
            Delete
          </Button>
          <Button variant="outlined" onPress={() => props.onOpenChange(false)}>
            Cancel
          </Button>
        </Stack>
      </Sheet.Frame>
      <Sheet.Overlay />
    </Sheet>
  );
};
