import { Settings2 } from '@tamagui/lucide-icons';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Sheet, Stack } from 'tamagui';

import { Button } from '@/components/ui/button';
import { IconButton } from '@/components/ui/icon-button';
import { useAuth } from '@/hooks/use-auth';
import { ProfileScreenParams } from '@/types/profile';

const SheetContent = () => {
  const auth = useAuth();

  const handleLogout = () => {
    auth.logout();
  };

  return (
    <Sheet.Frame p="$4" gap="$2">
      <Button onPress={handleLogout}>Logout</Button>
    </Sheet.Frame>
  );
};

export const ProfileSettings = () => {
  const { user } = useAuth();
  const params = useLocalSearchParams<ProfileScreenParams>();
  const [open, setOpen] = useState(false);

  if (user?.id !== +params.id) {
    return null;
  }

  return (
    <Stack>
      <IconButton icon={Settings2} onPress={() => setOpen(true)} />
      <Sheet modal disableDrag snapPointsMode="fit" open={open} onOpenChange={setOpen}>
        <SheetContent />
        <Sheet.Overlay />
      </Sheet>
    </Stack>
  );
};
