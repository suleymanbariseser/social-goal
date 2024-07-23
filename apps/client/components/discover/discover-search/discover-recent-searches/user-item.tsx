import { RecentSearchItem } from '@app/server/src/routes/discover/recentSearches/controller';
import { X } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';

import { IconButton } from '@/components/ui/icon-button';
import { UserListItem } from '@/components/user/user-list/user-list-item';

type Props = RecentSearchItem;

export const UserItem = ({ user }: Props) => {
  const router = useRouter();

  const handlePress = () => {
    router.navigate(`/profile/${user.id}`);
  };

  return (
    <UserListItem onPress={handlePress} px="$4" py="$2">
      <UserListItem.Content image={user.image} fullName={user.firstName} />
      <UserListItem.Actions>
        <IconButton variant="text" icon={X} onPress={console.log} />
      </UserListItem.Actions>
    </UserListItem>
  );
};
