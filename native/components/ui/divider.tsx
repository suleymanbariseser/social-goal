import { XStack, Stack } from 'tamagui';

interface Props {
  content?: React.ReactNode;
}

export default function Divider({ content }: Props) {
  return (
    <XStack w="100%" ai="center">
      <Stack fg={1} h={1} bg="$textSecondary" />
      {content && <Stack px="$4">{content}</Stack>}
      <Stack fg={1} h={1} bg="$textSecondary" />
    </XStack>
  );
}
