import { ScrollView, Stack, Tabs } from 'tamagui';

import { DiscoverActivityList } from './discover-activity-list';
import { DiscoverUserList } from './discover-user-list';

import { Text } from '@/components/ui/text';

export const DiscoverTabs = () => {
  return (
    <Tabs defaultValue="users" fd="column" f={1}>
      <Stack w="100%">
        <ScrollView fg={1} horizontal showsHorizontalScrollIndicator={false}>
          <Tabs.List>
            <Tabs.Tab value="users">
              <Text variant="subtitle2">Users</Text>
            </Tabs.Tab>
            <Tabs.Tab value="activities">
              <Text variant="subtitle2">Activities</Text>
            </Tabs.Tab>
            <Tabs.Tab value="goals">
              <Text variant="subtitle2">Goals</Text>
            </Tabs.Tab>
          </Tabs.List>
        </ScrollView>
      </Stack>

      <Stack fg={1}>
        <Tabs.Content value="users" fg={1}>
          <DiscoverUserList />
        </Tabs.Content>
        <Tabs.Content value="activities" fg={1}>
          <DiscoverActivityList />
        </Tabs.Content>
        <Tabs.Content value="goals">
          <Text>Goals</Text>
        </Tabs.Content>
      </Stack>
    </Tabs>
  );
};
