import { Stack } from 'expo-router';

import { DiscoverHeaderTitle } from '@/components/discover/discover-header/discover-header-title';
import { Header } from '@/components/header';
import { getCommonContentOptions } from '@/utils/navigation';

export default function DiscoverLayout() {
  return (
    <Stack
      screenOptions={{
        ...getCommonContentOptions(),
        header: (props) => <Header {...props} title={<DiscoverHeaderTitle />} />,
      }}
    />
  );
}
