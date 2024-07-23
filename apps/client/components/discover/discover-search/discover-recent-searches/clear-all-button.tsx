import { XStack } from 'tamagui';

import { Button } from '@/components/ui/button';
import { useClearRecentSearch } from '@/hooks/discover/use-clear-recent-searches';

export const ClearAllButton = () => {
  const handleClear = useClearRecentSearch();

  return (
    <XStack jc="flex-end">
      <Button variant="text" size="small" onPress={handleClear}>
        Clear
      </Button>
    </XStack>
  );
};
