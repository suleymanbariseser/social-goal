import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView, getTokens } from 'tamagui';

import { CreateActivityForm } from '@/components/create/create-activity-form';

const Create = () => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      f={1}
      pb={Math.max(insets.bottom, getTokens().size[4].val)}
      contentContainerStyle={{
        flexGrow: 1,
      }}>
      <CreateActivityForm />
    </ScrollView>
  );
};

export default Create;
