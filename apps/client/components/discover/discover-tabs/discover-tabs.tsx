import { ScrollView, Stack, Tabs } from 'tamagui';

import { DiscoverActivityList } from './discover-activity-list/discover-activity-list';

import { Text } from '@/components/ui/text';

export const DiscoverTabs = () => {
  return (
    <Tabs defaultValue="accounts" fd="column" f={1}>
      <Stack w="100%">
        <ScrollView fg={1} horizontal showsHorizontalScrollIndicator={false}>
          <Tabs.List>
            <Tabs.Tab value="accounts">
              <Text variant="subtitle2">Accounts</Text>
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
        <Tabs.Content value="accounts" fg={1}>
          <Text>Accounts</Text>
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
