import { RecentSearchItem } from '@app/server/src/routes/discover/recentSearches/controller';
import { X } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';

import { IconButton } from '@/components/ui/icon-button';
import { UserListItem } from '@/components/user/user-list/user-list-item';
import { useDeleteRecentSearch } from '@/hooks/discover/use-delete-recent-search';

type Props = RecentSearchItem;

export const UserItem = ({ user, id }: Props) => {
  const router = useRouter();
  const handleDeleteRecentSearch = useDeleteRecentSearch();

  const handlePress = () => {
    router.navigate(`/profile/${user.id}`);
  };

  const handleDelete = () => {
    handleDeleteRecentSearch(id);
  };

  return (
    <UserListItem onPress={handlePress} px="$4" py="$2">
      <UserListItem.Content image={user.image} fullName={user.firstName} />
      <UserListItem.Actions>
        <IconButton variant="text" icon={X} onPress={handleDelete} />
      </UserListItem.Actions>
    </UserListItem>
  );
};
