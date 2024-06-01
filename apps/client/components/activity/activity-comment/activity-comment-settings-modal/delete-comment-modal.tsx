import { Sheet, SheetProps, Spinner, Stack } from 'tamagui';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useDeleteComment } from '@/hooks/activity/comment/use-delete-comment';

type Props = SheetProps & {
  commentId: number;
  onDelete: (id: number) => void;
};

export const DeleteCommentModal = ({ commentId, onDelete, ...props }: Props) => {
  const [deleteComment, { isLoading }] = useDeleteComment();

  const handleDelete = () => {
    deleteComment(commentId, {
      onSuccess: () => {
        onDelete(commentId);
      },
      onSettled: () => {
        props.onOpenChange(false);
      },
    });
  };

  return (
    <Sheet modal disableDrag snapPoints={[30]} {...props}>
      <Sheet.Frame p="$4" gap="$6">
        <Stack gap="$2">
          <Text variant="subtitle1">Delete Comment</Text>
          <Text variant="body2" color="$textSecondary">
            Are you sure you want to delete this comment? This action cannot be undone.
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
