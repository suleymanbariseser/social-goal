import { ChevronDown } from '@tamagui/lucide-icons';
import { Sheet, Stack, useControllableState } from 'tamagui';

import { Box } from '../../Box';
import { Text } from '../../text';

export type SelectItem = {
  name: string;
  value: string;
  left?: React.ReactNode;
};

type MultiProps = {
  multiple?: true;
  value?: string[];
  onChange?: (value: string[]) => void;
};

type SingleProps = {
  multiple?: false;
  value?: string;
  onChange?: (value: string) => void;
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

  const hasValue = multiple ? value.length > 0 : !!value;

  const handleValueChange = (newValue: string) => {
    if (multiple) {
      if (value.includes(newValue)) {
        setValue((value as string[]).filter((v) => v !== newValue));
      } else {
        setValue([...value, newValue]);
      }
    } else {
      setValue(newValue);
    }
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
                .filter((item) => (multiple ? value.includes(item.value) : item.value === value))
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
                bg={
                  multiple
                    ? value.includes(item.value)
                      ? '$backgroundHover'
                      : 'transparent'
                    : item.value === value
                    ? '$backgroundHover'
                    : 'transparent'
                }
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
