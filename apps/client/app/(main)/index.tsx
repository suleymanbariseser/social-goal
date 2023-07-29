import { FlatList } from 'react-native';
import { Stack } from 'tamagui';

import HomeCard from '@/components/home/home-card';
import HomeTabs from '@/components/home/home-tabs';
import { trpc } from '@/lib/trpc';

const Home = () => {
  const [data] = trpc.activity.networkList.useSuspenseQuery();

  return (
    <Stack pos="relative" f={1} px="$2">
      <FlatList
        data={data}
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
