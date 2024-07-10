import { Stack } from 'expo-router';

import { DiscoverHeaderTitle } from '@/components/discover/discover-header/discover-header-title';
import { Header } from '@/components/header';
import { useCommonContentOptions } from '@/utils/navigation';

export default function DiscoverLayout() {
  const commonContentOptions = useCommonContentOptions();

  return (
    <Stack
      screenOptions={{
        ...commonContentOptions,
        header: (props) => <Header {...props} title={<DiscoverHeaderTitle />} />,
      }}
    />
  );
}
