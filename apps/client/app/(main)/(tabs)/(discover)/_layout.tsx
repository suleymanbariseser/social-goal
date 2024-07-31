import { Stack } from 'expo-router';

import { DiscoverHeaderTitle } from '@/components/discover/discover-header/discover-header-title';
import { DiscoverLocalSearchParams } from '@/components/discover/types';
import { Header } from '@/components/header';
import { getCommonContentOptions } from '@/utils/navigation';

export default function DiscoverLayout() {
  return (
    <Stack
      screenOptions={{
        ...getCommonContentOptions(),
        header: (props) => (
          <Header
            {...props}
            title={<DiscoverHeaderTitle {...(props.route.params as DiscoverLocalSearchParams)} />}
          />
        ),
      }}
    />
  );
}
