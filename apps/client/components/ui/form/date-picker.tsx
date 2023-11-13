import { OnDatesChangeProps } from '@datepicker-react/hooks';
import Color from 'color';
import moment from 'moment';
import { useState } from 'react';
import { Control, FieldPathValue, Path, useController } from 'react-hook-form';
import { Sheet, Stack, getTokens } from 'tamagui';

import { Calendar } from '../calendar';
import { defaultStyles } from './input';
import { Text } from '../text';

interface BaseDatePickerProps {
  value: Date | null;
  onChange: (date: Date) => void;

  onPress?: () => void;
  disabled?: boolean;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
}
export function BaseDatePicker(props: BaseDatePickerProps) {
  const [open, setOpen] = useState(false);
  const placeholderColor = Color(getTokens().color.$textPrimary.val).alpha(0.7).toString();

  const handleDatesChange = (data: OnDatesChangeProps) => {
    setOpen(false);
    props.onChange?.(data.startDate);
  };

  return (
    <Stack gap="$2" opacity={props.disabled ? 0.5 : 1}>
      <Stack
        {...defaultStyles}
        boc={props.error ? '$errorMain' : defaultStyles.boc}
        onPress={props.onPress ?? (() => setOpen(true))}
        pressStyle={{ opacity: 0.8 }}>
        <Text
          variant="body3"
          col={props.error ? '$errorMain' : props.value ? '$textPrimary' : placeholderColor}>
          {props.value ? moment(props.value).format('DD/MM/YYYY') : props.placeholder}
        </Text>
      </Stack>
      {props.helperText && (
        <Text variant="body3" col={props.error ? '$errorMain' : '$textPrimary'}>
          {props.helperText}
        </Text>
      )}
      <Sheet snapPoints={[60]} modal open={open} onOpenChange={setOpen}>
        <Sheet.Frame>
          <Calendar
            startDate={props.value}
            endDate={props.value}
            numberOfMonths={12}
            onDatesChange={handleDatesChange}
            focusedInput="startDate"
          />
        </Sheet.Frame>
        <Sheet.Overlay />
      </Sheet>
    </Stack>
  );
}

interface DatePickerProps<T, Context = any>
  extends Omit<BaseDatePickerProps, 'value' | 'onChange'> {
  control: Control<T, Context>;
  name: Path<T>;
  defaultValue?: FieldPathValue<T, Path<T>>;
}

export const DatePicker = <T extends object, Context = any>({
  control,
  name,
  ...rest
}: DatePickerProps<T, Context>) => {
  const { field } = useController({
    control,
    name,
    defaultValue: rest?.defaultValue ?? undefined,
  });

  return <BaseDatePicker value={field.value} onChange={field.onChange} {...rest} />;
};