import { GoalItem } from '@app/server/src/routes/goal/controller';
import { FlashList, FlashListProps, ListRenderItemInfo } from '@shopify/flash-list';
import { useToastController } from '@tamagui/toast';
import { useRouter } from 'expo-router';
import { RefreshControl } from 'react-native';
import { Stack } from 'tamagui';

import { GoalListItem } from './goal-list-item';

import { GoalListFilters, useGoalList } from '@/hooks/goal/use-goal-list';

type Props = {
  filters?: GoalListFilters;
} & Omit<
  FlashListProps<GoalItem>,
  'data' | 'renderItem' | 'onEndReached' | 'keyExtractor' | 'estimatedItemSize'
>;

export const GoalList = ({ filters, ...rest }: Props) => {
  const toast = useToastController();
  const router = useRouter();
  const { goals, isRefetching, refetch, fetchNextPage } = useGoalList({ filters });

  const handleRefresh = () => {
    try {
      refetch?.();
    } catch (error) {
      toast.show(error.message, {
        variant: 'error',
      });
    }
  };

  const renderItem = ({ item }: ListRenderItemInfo<GoalItem>) => {
    return (
      <GoalListItem
        onPress={() => router.push(`/goal/${item.id}`)}
        onPressAvatar={() => router.push(`/profile/${item.creator.id}`)}
        goal={item}
      />
    );
  };

  const refreshControl = (
    <RefreshControl tintColor="white" refreshing={isRefetching} onRefresh={handleRefresh} />
  );

  return (
    <FlashList
      {...rest}
      data={goals}
      renderItem={renderItem}
      refreshing={isRefetching}
      onRefresh={handleRefresh}
      refreshControl={refreshControl}
      onEndReached={fetchNextPage}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <Stack py="$2" />}
      estimatedItemSize={40}
    />
  );
};
