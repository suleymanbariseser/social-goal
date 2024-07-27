import { TopTab } from '@/components/top-tab';

const SearchTabs = () => {
  return (
    <TopTab>
      <TopTab.Screen name="users" />
      <TopTab.Screen name="activities" />
      <TopTab.Screen name="goals" />
    </TopTab>
  );
};

export default SearchTabs;
