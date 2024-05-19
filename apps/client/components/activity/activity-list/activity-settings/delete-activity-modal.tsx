import { useToastController } from '@tamagui/toast';
import { Sheet, SheetProps, Spinner, Stack } from 'tamagui';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { trpc } from '@/lib/trpc';

type Props = SheetProps & {
  activityId: number;
  onDelete: (id: number) => void;
};

export const DeleteActivityModal = ({ activityId, onDelete, ...props }: Props) => {
  const { mutate: deleteActivity, isLoading } = trpc.activity.delete.useMutation();
  const toast = useToastController();

  const handleDelete = () => {
    deleteActivity(
      {
        id: activityId,
      },
      {
        onSuccess: () => {
          onDelete(activityId);
        },
        onError: (error) => {
          toast.show(error.message, {
            variant: 'error',
          });
        },
        onSettled: () => {
          props.onOpenChange(false);
        },
      }
    );
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
          <Button
            variant="contained"
            onPress={handleDelete}
            disabled={isLoading}
            startAdornment={isLoading && <Spinner />}>
            Delete
          </Button>
          <Button variant="outlined" onPress={() => props.onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
        </Stack>
      </Sheet.Frame>
      <Sheet.Overlay />
    </Sheet>
  );
};
