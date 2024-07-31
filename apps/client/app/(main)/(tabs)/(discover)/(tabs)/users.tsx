import { useLocalSearchParams } from 'expo-router';
import { Stack } from 'tamagui';

import { SearchUserListEmpty } from '@/components/discover/search/search-user-list-empty';
import { DiscoverLocalSearchParams } from '@/components/discover/types';
import { UserList } from '@/components/user/user-list';

const SearchUsers = () => {
  const { q } = useLocalSearchParams<DiscoverLocalSearchParams>();

  return (
    <Stack fg={1} pt="$4">
      <UserList
        filters={{ q }}
        ListFooterComponent={<Stack h="$18" />}
        ListEmptyComponent={<SearchUserListEmpty />}
      />
    </Stack>
  );
};

export default SearchUsers;
