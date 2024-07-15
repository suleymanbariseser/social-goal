import { XStack } from 'tamagui';

type Props = {
  children: React.ReactNode;
};

export const GoalListItemActions = ({ children }: Props) => <XStack gap="$2">{children}</XStack>;
