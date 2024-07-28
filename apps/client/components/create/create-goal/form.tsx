import { CreateGoalInput, createGoalSchema } from '@app/server/src/routes/goal/schema';
import { FocusedInput, START_DATE } from '@datepicker-react/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import { useRef, useState } from 'react';
import { UseFormSetValue, UseFormWatch, useForm } from 'react-hook-form';
import { XStack, Stack, Sheet } from 'tamagui';

import { CategorySelect } from './category-select';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { DatePicker } from '@/components/ui/form/date-picker';
import { Input } from '@/components/ui/form/input';
import { Text } from '@/components/ui/text';

interface DateSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  watch: UseFormWatch<CreateGoalInput>;
  setValue: UseFormSetValue<CreateGoalInput>;
}

function DateSheet(props: DateSheetProps) {
  const currentDate = useRef(moment().toDate()).current;
  const [focusedInput, setFocusedInput] = useState<FocusedInput>(START_DATE);

  return (
    <Sheet modal disableDrag snapPoints={[60]} {...props}>
      <Sheet.Frame>
        <Calendar
          startDate={props.watch('startDate')}
          endDate={props.watch('endDate')}
          focusedInput={focusedInput}
          minBookingDate={currentDate}
          maxBookingDate={moment(currentDate).add(12, 'M').toDate()}
          onDatesChange={(data) => {
            if (!data.focusedInput) {
              setFocusedInput(START_DATE);
            } else {
              setFocusedInput(data.focusedInput);
            }

            props.setValue('startDate', data.startDate);
            props.setValue('endDate', data.endDate);
          }}
        />
      </Sheet.Frame>
      <Sheet.Overlay />
    </Sheet>
  );
}

interface Props {
  onSubmit: (data: CreateGoalInput) => void;
}

export function CreateGoalForm({ onSubmit }: Props) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
    setValue,
  } = useForm<CreateGoalInput>({
    resolver: zodResolver(createGoalSchema),
    defaultValues: {
      title: '',
      startDate: null,
      endDate: null,
      description: '',
    },
  });

  return (
    <Stack gap="$3">
      <Input
        control={control}
        name="title"
        placeholder="Title"
        error={!!errors.title}
        helperText={errors.title?.message}
      />
      <CategorySelect control={control} name="category" />
      <Stack gap="$2">
        <XStack ai="center" jc="space-between" gap="$3">
          <Stack f={1}>
            <DatePicker
              control={control}
              name="startDate"
              placeholder="Start Date"
              error={!!errors.startDate}
              onPress={() => setCalendarOpen(true)}
            />
          </Stack>
          <Stack f={1}>
            <DatePicker
              control={control}
              name="endDate"
              placeholder="End Date"
              error={!!errors.endDate}
              onPress={() => setCalendarOpen(true)}
            />
          </Stack>
        </XStack>
        {!!(errors.startDate || errors.endDate) && (
          <Text variant="body3" col="$errorMain">
            {errors.startDate?.message ?? errors.endDate?.message}
          </Text>
        )}
      </Stack>
      <Input
        control={control}
        name="description"
        placeholder="description"
        error={!!errors.description}
        helperText={errors.description?.message}
        rows={5}
        multiline
        mih="$12"
      />
      <Button onPress={handleSubmit(onSubmit)}>Create</Button>
      <DateSheet
        open={calendarOpen}
        onOpenChange={setCalendarOpen}
        watch={watch}
        setValue={setValue}
      />
    </Stack>
  );
}
