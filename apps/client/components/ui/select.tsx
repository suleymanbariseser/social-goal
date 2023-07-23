import { useState } from 'react';
import { Adapt, Select as TamSelect, SelectProps, Sheet, Stack } from 'tamagui';

import { Button, ButtonProps } from './button';
import { Divider } from './divider';
import { Text, TextProps } from './text';

import ChevronDown from '@/assets/icons/chevron-down.svg';

type SelectItem = {
  name: string;
};

type SelectTitleProps = TextProps & {
  children?: React.ReactNode;
};

const SelectTitle = ({ children, ...props }: SelectTitleProps) => {
  return (
    <Text variant="subtitle1" {...props}>
      {children}
    </Text>
  );
};

type SelectActionProps = ButtonProps & {
  children?: React.ReactNode;
};
const SelectAction = ({ children, ...props }: SelectActionProps) => {
  return (
    <Button variant="text" py="$0" px="$0" {...props}>
      {children}
    </Button>
  );
};

type SelectHeaderProps = {
  children?: React.ReactNode;
};

// bbw={1} bs="solid" bbc="$textSecondary"
const SelectHeader = ({ children }: SelectHeaderProps) => {
  return (
    <Stack px="$6" pb="$4" gap="$4">
      <Stack fd="row" jc="space-between">
        {children}
      </Stack>
      <Divider />
    </Stack>
  );
};

interface Props extends SelectProps {
  items: SelectItem[];
  placeholder?: string;
  header?: React.ReactNode;

  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Select({ items = [], placeholder, header, ...props }: Props) {
  const [value, setValue] = useState(props.defaultValue);

  const handleOnChange = (value: string) => {
    setValue(value);

    props.onValueChange?.(value);
  };

  return (
    <TamSelect onValueChange={handleOnChange} open={false} {...props}>
      <TamSelect.Trigger
        transparent
        br="$6"
        boc="$backgroundBox"
        px="$4"
        py="$4"
        iconAfter={<ChevronDown width={16} />}
        onPress={console.log}>
        <TamSelect.Value
          placeholder={placeholder ?? 'Select'}
          color={!value ? '$placeholderColor' : '$textPrimary'}
        />
      </TamSelect.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet native modal dismissOnSnapToBottom snapPoints={[60]} zIndex={9999999}>
          <Sheet.Frame py="$4" br="$8">
            <Stack>{header}</Stack>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>

          <Sheet.Overlay />
        </Sheet>
      </Adapt>

      <TamSelect.Content>
        <TamSelect.Viewport>
          <TamSelect.Group space="$0">
            {items.map((item, i) => {
              return (
                <TamSelect.Item
                  index={i}
                  key={item.name}
                  value={item.name.toLowerCase()}
                  px="$6"
                  py="$4">
                  <TamSelect.ItemText>{item.name}</TamSelect.ItemText>

                  <TamSelect.ItemIndicator marginLeft="auto" />
                </TamSelect.Item>
              );
            })}
          </TamSelect.Group>
        </TamSelect.Viewport>
      </TamSelect.Content>
    </TamSelect>
  );
}

Select.Header = SelectHeader;
Select.Title = SelectTitle;
Select.Action = SelectAction;
