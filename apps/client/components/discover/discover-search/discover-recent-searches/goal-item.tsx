import type { RecentSearchItem } from '@app/server/src/routes/discover/controller';
import { X } from '@tamagui/lucide-icons';

import { GoalListItem } from '@/components/goals/goal-list/goal-list-item';
import { IconButton } from '@/components/ui/icon-button';

type Props = RecentSearchItem;

export const GoalItem = ({ goal }: Props) => (
  <GoalListItem onPress={console.log}>
    <GoalListItem.Avatar onPress={console.log} image={goal.creator.image} />
    <GoalListItem.Content title={goal.title} creator={{ fullName: goal.creator.fullName }} />
    <GoalListItem.Actions>
      <IconButton variant="text" icon={X} onPress={console.log} />
    </GoalListItem.Actions>
  </GoalListItem>
);
