import { Settings } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { Stack } from 'tamagui';

import { GoalFiltersModal } from './goal-filters-modal';

import { IconButton } from '@/components/ui/icon-button';

export const GoalHeaderActions = () => {
  const [open, setOpen] = useState(false);

  return (
    <Stack>
      <IconButton icon={Settings} onPress={() => setOpen(true)} />
      <GoalFiltersModal open={open} setOpen={setOpen} />
    </Stack>
  );
};
