import { useToastController } from '@tamagui/toast';
import { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Stack } from 'tamagui';

import HomeCard from '@/components/home/home-card';
import HomeTabs from '@/components/home/home-tabs';
import { useActivities } from '@/hooks/activity/use-activities';

const Home = () => {
  const { activities, fetchNextPage, refetch } = useActivities();

  const toast = useToastController();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);

      await refetch();

      setRefreshing(false);
    } catch (error) {
      toast.show(error.message, {
        variant: 'error',
      });
    }
  };

  return (
    <Stack pos="relative" f={1} px="$2">
      <FlatList
        data={activities.flat()}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        refreshControl={
          <RefreshControl tintColor="white" refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReached={() => {
          fetchNextPage();
        }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <HomeCard
            admin={{
              img: item.creator.image,
              name: [item.creator.firstName, item.creator.lastName].join(' '),
            }}
            content={item.content}
            goal={item.goal.title}
          />
        )}
        contentContainerStyle={{
          gap: 16,
        }}
      />
      <HomeTabs />
    </Stack>
  );
};

export default Home;
