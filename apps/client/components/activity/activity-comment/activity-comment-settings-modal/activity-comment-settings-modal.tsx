import { useState } from 'react';
import { Sheet } from 'tamagui';

import { DeleteCommentModal } from './delete-comment-modal';
import { ActivitySettingButton } from '../../activity-list/activity-settings/activity-setting-button';

type Props = {
  commentId: number;
  onDelete: (id: number) => void;

  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ActivityCommentSettingsModal = ({
  open,
  onOpenChange,
  onDelete,
  commentId,
}: Props) => {
  const [deleteActivityModalOpen, setDeleteActivityModalOpen] = useState(false);

  const handleDeleteActivity = () => {
    onOpenChange(false);
    setDeleteActivityModalOpen(true);
  };

  return (
    <>
      <Sheet modal disableDrag snapPoints={[30]} open={open} onOpenChange={onOpenChange}>
        <Sheet.Frame p="$4" gap="$2">
          <ActivitySettingButton disabled>Mute user</ActivitySettingButton>
          <ActivitySettingButton disabled>Block user</ActivitySettingButton>
          <ActivitySettingButton onPress={handleDeleteActivity}>
            Delete Activity
          </ActivitySettingButton>
        </Sheet.Frame>
        <Sheet.Overlay />
      </Sheet>
      <DeleteCommentModal
        open={deleteActivityModalOpen}
        onOpenChange={setDeleteActivityModalOpen}
        commentId={commentId}
        onDelete={onDelete}
      />
    </>
  );
};
