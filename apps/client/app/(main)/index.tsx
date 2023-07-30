import { useToastController } from '@tamagui/toast';
import { useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Stack } from 'tamagui';

import HomeCard from '@/components/home/home-card';
import HomeTabs from '@/components/home/home-tabs';
import { trpc } from '@/lib/trpc';

const Home = () => {
  const [data, { refetch }] = trpc.activity.networkList.useSuspenseQuery();

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
        data={data}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        refreshControl={
          <RefreshControl tintColor="white" refreshing={refreshing} onRefresh={handleRefresh} />
        }
        renderItem={({ item }) => (
          <HomeCard
            admin={{
              img: 'https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80',
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
