import { RecentSearchItem } from '@app/server/src/routes/discover/recentSearches/controller';
import { X } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';

import { GoalListItem } from '@/components/goals/goal-list/goal-list-item';
import { IconButton } from '@/components/ui/icon-button';

type Props = RecentSearchItem;

export const GoalItem = ({ goal }: Props) => {
  const router = useRouter();

  const handleGoalPress = () => {
    router.navigate(`/goal/${goal.id}`);
  };

  const handleAvatarPress = () => {
    router.navigate(`/profile/${goal.creator.id}`);
  };

  return (
    <GoalListItem onPress={handleGoalPress} px="$4" py="$2">
      <GoalListItem.Avatar onPress={handleAvatarPress} image={goal.creator.image} />
      <GoalListItem.Content title={goal.title} creator={{ fullName: goal.creator.fullName }} />
      <GoalListItem.Actions>
        <IconButton variant="text" icon={X} onPress={console.log} />
      </GoalListItem.Actions>
    </GoalListItem>
  );
};
