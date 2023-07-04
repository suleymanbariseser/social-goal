import { FlatList } from 'react-native';
import { Stack } from 'tamagui';

import HomeTabs from '@/components/home/home-tabs';
import Text from '@/components/ui/text';

const Home = () => {
  return (
    <Stack pos="relative" f={1}>
      <FlatList
        data={Array(20).fill(1)}
        renderItem={() => (
          <Stack py="$4">
            <Text>Feed Item</Text>
          </Stack>
        )}
      />
      <HomeTabs />
    </Stack>
  );
};

export default Home;
