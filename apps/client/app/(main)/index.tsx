import { FlatList } from 'react-native';
import { Stack } from 'tamagui';

import HomeCard from '@/components/home/home-card';
import HomeTabs from '@/components/home/home-tabs';

const Home = () => {
  return (
    <Stack pos="relative" f={1} px="$2">
      <FlatList
        data={Array(20).fill(1)}
        renderItem={() => (
          <HomeCard
            admin={{
              img: 'https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80',
              name: 'Süleyman Barış Eser',
            }}
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sit amet dui vitae elit sodales egestas. Aenean vulputate eget enim a varius. Aliquam ut odio eu nibh mattis lacinia. Vivamus vel velit eu diam imperdiet eleifend id at tortor. Suspendisse fermentum sodales turpis, ac porta lorem. Sed nibh sapien, tincidunt ac semper in, ultricies vitae erat."
            goal="new-goal"
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
