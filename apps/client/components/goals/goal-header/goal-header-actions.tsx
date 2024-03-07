import { Settings } from '@tamagui/lucide-icons';

import { IconButton } from '@/components/ui/icon-button';

export const GoalHeaderActions = () => {
  return <IconButton icon={Settings} onPress={console.log} />;
};
