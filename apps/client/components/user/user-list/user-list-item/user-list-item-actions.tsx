import { XStack } from 'tamagui';

type Props = {
  children: React.ReactNode;
};

export const UserListItemActions = ({ children }: Props) => <XStack gap="$2">{children}</XStack>;
