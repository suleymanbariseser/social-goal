import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'tamagui';

import { DiscoverUserListEmpty } from './discover-user-list-empty';
import { DiscoverLocalSearchParams } from '../../types';

import { UserList } from '@/components/user/user-list';

export const DiscoverUserList = () => {
  const { q } = useLocalSearchParams<DiscoverLocalSearchParams>();

  return (
    <Stack fg={1} pt="$4">
      <UserList
        filters={{ q }}
        ListFooterComponent={<Stack h="$18" />}
        ListEmptyComponent={<DiscoverUserListEmpty />}
      />
    </Stack>
  );
};
