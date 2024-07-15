import { XStack } from 'tamagui';

import { GoalListItemActions } from './goal-list-item-actions';
import { GoalListItemAvatar } from './goal-list-item-avatar';
import { GoalListItemContent } from './goal-list-item-content';

type Props = {
  onPress?: () => void;
  children: React.ReactNode;
};

export const GoalListItem = ({ onPress, children }: Props) => (
  <XStack gap="$2" onPress={onPress}>
    {children}
  </XStack>
);

GoalListItem.Avatar = GoalListItemAvatar;
GoalListItem.Content = GoalListItemContent;
GoalListItem.Actions = GoalListItemActions;
