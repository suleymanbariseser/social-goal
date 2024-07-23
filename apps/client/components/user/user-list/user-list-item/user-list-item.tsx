import { XStack, XStackProps } from 'tamagui';

import { UserListItemActions } from './user-list-item-actions';
import { UserListItemContent } from './user-list-item-content';
import { UserListItemFollowButton } from './user-list-item-follow-button';

type Props = {
  onPress: () => void;
  children: React.ReactNode;
} & XStackProps;

export const UserListItem = ({ onPress, children, ...props }: Props) => (
  <XStack ai="center" onPress={onPress} {...props}>
    {children}
  </XStack>
);

UserListItem.Content = UserListItemContent;
UserListItem.Actions = UserListItemActions;
UserListItem.FollowButton = UserListItemFollowButton;
