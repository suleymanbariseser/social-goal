import { useState } from 'react';
import { Adapt, Select as TamSelect, SelectProps, Sheet } from 'tamagui';

import ChevronDown from '@/assets/icons/chevron-down.svg';

type SelectItem = {
  name: string;
};

interface Props extends SelectProps {
  items: SelectItem[];
  placeholder?: string;
}

export default function Select({ items = [], placeholder, ...props }: Props) {
  const [value, setValue] = useState(props.defaultValue);

  const handleOnChange = (value: string) => {
    setValue(value);

    props.onValueChange?.(value);
  };

  return (
    <TamSelect onValueChange={handleOnChange} {...props}>
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
        <Sheet native modal dismissOnSnapToBottom snapPoints={[50]} zIndex={9999999}>
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>

          <Sheet.Overlay />
        </Sheet>
      </Adapt>

      <TamSelect.Content>
        <TamSelect.Viewport>
          <TamSelect.Group space="$0" py="$4">
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
