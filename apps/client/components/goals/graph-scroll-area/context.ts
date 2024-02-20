import { createContext, useContext } from 'react';
import { SharedValue } from 'react-native-reanimated';

type GraphScrollContextType = {
  startX: SharedValue<number>;
};

export const GraphScrollContext = createContext<GraphScrollContextType | null>(null);

export const useGraphScrollContext = () => {
  const context = useContext(GraphScrollContext);

  if (!context) {
    throw new Error('useGraphScrollContext must be used within a GraphScrollContextProvider');
  }

  return context;
};
