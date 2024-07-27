import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import type {
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from '@react-navigation/material-top-tabs';
import type { ParamListBase, TabNavigationState } from '@react-navigation/native';
import { withLayoutContext } from 'expo-router';
import { getTokens } from 'tamagui';

const { Navigator } = createMaterialTopTabNavigator();

export const TopTabComponent = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export type TopTabProps = React.ComponentProps<typeof TopTabComponent>;

export const TopTab = (props: TopTabProps) => (
  <TopTabComponent
    {...props}
    screenOptions={{
      tabBarStyle: {
        backgroundColor: 'transparent',
      },
      tabBarLabelStyle: {
        color: getTokens().color.$textPrimary.val,
      },
      tabBarIndicatorStyle: {
        backgroundColor: getTokens().color.$primaryDark.val,
      },
    }}
    sceneContainerStyle={{
      backgroundColor: 'transparent',
    }}
  />
);

TopTab.Screen = TopTabComponent.Screen;
