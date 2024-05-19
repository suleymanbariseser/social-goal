import { useState } from 'react';
import { Sheet } from 'tamagui';

import { ActivitySettingButton } from './activity-setting-button';
import { DeleteActivityModal } from './delete-activity-modal';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ActivitySettingsModal = ({ open, onOpenChange }: Props) => {
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
      <DeleteActivityModal
        open={deleteActivityModalOpen}
        onOpenChange={setDeleteActivityModalOpen}
      />
    </>
  );
};
