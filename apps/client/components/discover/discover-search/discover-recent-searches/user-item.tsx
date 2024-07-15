import type { RecentSearchItem } from '@app/server/src/routes/discover/controller';
import { X } from '@tamagui/lucide-icons';

import { IconButton } from '@/components/ui/icon-button';
import { UserListItem } from '@/components/user/user-list/user-list-item';

type Props = RecentSearchItem;
export const UserItem = ({ user }: Props) => {
  return (
    <UserListItem onPress={() => console.log('navigate to user profile')}>
      <UserListItem.Content image={user.image} fullName={user.firstName} />
      <UserListItem.Actions>
        <IconButton variant="text" icon={X} onPress={console.log} />
      </UserListItem.Actions>
    </UserListItem>
  );
};
