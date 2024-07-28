import { ChevronDown } from '@tamagui/lucide-icons';
import { Sheet, Stack, useControllableState } from 'tamagui';

import { Box } from '../../Box';
import { Text } from '../../text';

export type SelectItem = {
  name: string;
  value: string | number;
  left?: React.ReactNode;
};

type MultiProps = {
  multiple?: true;
  value?: (string | number)[];
  onChange?: (value: (string | number)[]) => void;
};

type SingleProps = {
  multiple?: false;
  value?: string | number;
  onChange?: (value: string | number) => void;
};

export type BaseSelectProps = {
  items: SelectItem[];
  placeholder?: string;
  header?: React.ReactNode;

  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  error?: boolean;
  helperText?: string;
} & (MultiProps | SingleProps);

const isMultiple = (props: MultiProps | SingleProps): props is MultiProps => {
  return props.multiple;
};

export function BaseSelect({
  items = [],
  placeholder,
  header,
  helperText,
  error,
  onChange,
  value: valueProp,
  open: openProp,
  onOpenChange,
  multiple,
}: BaseSelectProps) {
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: false,
    onChange: onOpenChange,
  });
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: multiple ? [] : '',
    onChange,
  });

  const control = { multiple, value, onChange: setValue } as MultiProps | SingleProps;

  const hasValue = isMultiple(control) ? control.value.length > 0 : !!value;

  const handleValueChange = (newValue: string | number) => {
    if (isMultiple(control)) {
      if (control.value.includes(newValue)) {
        control.onChange(control.value.filter((v) => v !== newValue));
      } else {
        control.onChange([...control.value, newValue]);
      }
    } else {
      setValue(newValue);
    }
  };

  const isSelected = (itemValue: string | number) => {
    if (isMultiple(control)) {
      return control.value.includes(itemValue);
    }

    return control.value === itemValue;
  };

  return (
    <Stack w="100%" gap="$2">
      <Box
        onPress={() => setOpen(true)}
        boc={error ? '$errorMain' : '$backgroundBox'}
        px="$4"
        py="$3"
        endAdornment={<ChevronDown size="$5" />}>
        <Text
          variant="body2"
          f={1}
          color={error ? '$errorMain' : !hasValue ? '$placeholderColor' : '$textPrimary'}>
          {hasValue
            ? items
                .filter((item) =>
                  isMultiple(control)
                    ? control.value.includes(item.value)
                    : item.value === control.value
                )
                .map((item) => item.name)
                .join(', ')
            : placeholder}
        </Text>
      </Box>

      <Sheet open={open} onOpenChange={setOpen} modal disableDrag snapPoints={[60]}>
        <Sheet.Frame py="$4" br="$8">
          <Stack>{header}</Stack>
          <Sheet.ScrollView
            contentContainerStyle={{
              gap: '$2',
            }}>
            {items.map((item) => (
              <Box
                key={item.name}
                px="$6"
                py="$4"
                gap="$4"
                bg={isSelected(item.value) ? '$backgroundHover' : '$transparent'}
                onPress={() => handleValueChange(item.value)}>
                {item.left && <Stack>{item.left}</Stack>}
                <Text f={1}>{item.name}</Text>
              </Box>
            ))}
          </Sheet.ScrollView>
        </Sheet.Frame>
        <Sheet.Overlay />
      </Sheet>
      {helperText && (
        <Text variant="body3" col={error ? '$errorMain' : '$textPrimary'}>
          {helperText}
        </Text>
      )}
    </Stack>
  );
}
