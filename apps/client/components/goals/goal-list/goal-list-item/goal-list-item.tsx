import { XStack, XStackProps } from 'tamagui';

import { GoalListItemActions } from './goal-list-item-actions';
import { GoalListItemAvatar } from './goal-list-item-avatar';
import { GoalListItemContent } from './goal-list-item-content';

type Props = {
  onPress?: () => void;
  children: React.ReactNode;
} & XStackProps;

export const GoalListItem = ({ onPress, children, ...props }: Props) => (
  <XStack gap="$2" onPress={onPress} {...props}>
    {children}
  </XStack>
);

GoalListItem.Avatar = GoalListItemAvatar;
GoalListItem.Content = GoalListItemContent;
GoalListItem.Actions = GoalListItemActions;
