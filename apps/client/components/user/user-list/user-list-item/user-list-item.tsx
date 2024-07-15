import { XStack } from 'tamagui';

import { UserListItemActions } from './user-list-item-actions';
import { UserListItemContent } from './user-list-item-content';
import { UserListItemFollowButton } from './user-list-item-follow-button';

type Props = {
  onPress: () => void;
  children: React.ReactNode;
};

export const UserListItem = ({ onPress, children }: Props) => (
  <XStack ai="center" onPress={onPress}>
    {children}
  </XStack>
);

UserListItem.Content = UserListItemContent;
UserListItem.Actions = UserListItemActions;
UserListItem.FollowButton = UserListItemFollowButton;
