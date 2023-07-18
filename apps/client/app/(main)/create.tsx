import { ScrollView, Sheet, Stack } from 'tamagui';

import ImageIcon from '@/assets/icons/image.svg';
import LinkIcon from '@/assets/icons/link.svg';
import { IconButton } from '@/components/ui/icon-button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

const Home = () => {
  return (
    <ScrollView>
      <Stack f={1} px="$6" gap="$4">
        <Select
          header={
            <Select.Header>
              <Select.Title>Your Goals</Select.Title>
              <Select.Action onPress={console.log}>Create</Select.Action>
            </Select.Header>
          }
          placeholder="Select a category"
          items={[
            {
              name: 'Balkan Tour',
            },
            {
              name: 'Create Social Goal',
            },
            {
              name: 'Move to new house',
            },
          ]}
        />
        <Input placeholder="Write Something..." rows={5} multiline mih="$12" />
      </Stack>
      <Sheet snapPoints={[10]} defaultOpen modal disableDrag>
        <Sheet.Frame p="$6" fd="row" gap="$3">
          <IconButton icon={ImageIcon} variant="text" />
          <IconButton icon={LinkIcon} variant="text" />
        </Sheet.Frame>
      </Sheet>
    </ScrollView>
  );
};

export default Home;
