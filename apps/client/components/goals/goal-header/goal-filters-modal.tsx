import { useLocalSearchParams } from 'expo-router';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { Sheet, Stack, XStack } from 'tamagui';

import { DatePicker } from '@/components/ui/form/date-picker';
import { Text } from '@/components/ui/text';

type Params = {
  id: string;
  from?: string;
  to?: string;
};

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const GoalFiltersModal = ({ open, setOpen }: Props) => {
  const { from, to } = useLocalSearchParams<Params>();
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<{ startDate: Date | null; endDate: Date | null }>({
    defaultValues: {
      startDate: from ? moment(+from).toDate() : null,
      endDate: to ? moment(+to).toDate() : null,
    },
  });

  const handleStartDateChange = (date: Date | null) => {
    const endDate = getValues('endDate');

    if (date && endDate && moment(date).isAfter(endDate)) {
      setValue('endDate', null);
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    const startDate = getValues('startDate');

    if (date && startDate && moment(date).isBefore(startDate)) {
      setValue('startDate', null);
    }
  };

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
      native
      modal
      dismissOnSnapToBottom
      snapPoints={[20]}
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
                onChange={handleStartDateChange}
                resetable
              />
            </Stack>
            <Stack f={1}>
              <DatePicker
                control={control}
                name="endDate"
                placeholder="End Date"
                error={!!errors.endDate}
                onChange={handleEndDateChange}
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
