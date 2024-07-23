import { RecentSearchItem } from '@app/server/src/routes/discover/recentSearches/controller';
import { X } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';

import { GoalListItem } from '@/components/goals/goal-list/goal-list-item';
import { IconButton } from '@/components/ui/icon-button';
import { useDeleteRecentSearch } from '@/hooks/discover/use-delete-recent-search';

type Props = RecentSearchItem;

export const GoalItem = ({ goal, id }: Props) => {
  const router = useRouter();
  const handleDeleteRecentSearch = useDeleteRecentSearch();

  const handleGoalPress = () => {
    router.navigate(`/goal/${goal.id}`);
  };

  const handleAvatarPress = () => {
    router.navigate(`/profile/${goal.creator.id}`);
  };

  const handleDelete = () => {
    handleDeleteRecentSearch(id);
  };

  return (
    <GoalListItem onPress={handleGoalPress} px="$4" py="$2">
      <GoalListItem.Avatar onPress={handleAvatarPress} image={goal.creator.image} />
      <GoalListItem.Content title={goal.title} creator={{ fullName: goal.creator.fullName }} />
      <GoalListItem.Actions>
        <IconButton variant="text" icon={X} onPress={handleDelete} />
      </GoalListItem.Actions>
    </GoalListItem>
  );
};
