import { createContext, useContext } from 'react';
import { SharedValue } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/reanimatedWrapper';

type GoalGraphSettings = {
  dayWidth: number;
  goalHeight: number;
  gridWidth: SharedValue<number>;
  gridHeight: SharedValue<number>;
  contentWidth: SharedValue<number>;
  contentHeight: SharedValue<number>;
};

type GoalGraphContextType = {
  settings: GoalGraphSettings;
  startDate: Date;
  endDate: Date;
  id: number;
};

export const GoalGraphContext = createContext<GoalGraphContextType>(null);

export const useGoalGraphContext = () => {
  const context = useContext(GoalGraphContext);

  if (!context) {
    throw new Error('useGoalGraphContext must be used within a GoalGraphProvider');
  }

  return context;
};
