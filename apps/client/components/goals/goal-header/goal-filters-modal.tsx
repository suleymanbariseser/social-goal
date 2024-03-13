import { useForm } from 'react-hook-form';
import { Sheet, Stack, XStack } from 'tamagui';

import { DatePicker } from '@/components/ui/form/date-picker';
import { Text } from '@/components/ui/text';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const GoalFiltersModal = ({ open, setOpen }: Props) => {
  const {
    control,
    formState: { errors },
  } = useForm<{ startDate: Date | undefined; endDate: Date | undefined }>({
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
    },
  });

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
      native
      modal
      dismissOnSnapToBottom
      snapPoints={[60]}
      zIndex={9999999}>
      <Sheet.Frame p="$6" gap="$6" br="$8">
        <Stack>
          <Text variant="subtitle1">Filters</Text>
        </Stack>
        <Sheet.ScrollView>
          <XStack ai="center" jc="space-between" gap="$3">
            <Stack f={1}>
              <DatePicker
                control={control}
                name="startDate"
                placeholder="Start Date"
                error={!!errors.startDate}
                resetable
              />
            </Stack>
            <Stack f={1}>
              <DatePicker
                control={control}
                name="endDate"
                placeholder="End Date"
                error={!!errors.endDate}
                resetable
              />
            </Stack>
          </XStack>
        </Sheet.ScrollView>
      </Sheet.Frame>
      <Sheet.Overlay />
    </Sheet>
  );
};
