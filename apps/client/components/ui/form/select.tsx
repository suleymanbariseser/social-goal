import { ChevronDown } from '@tamagui/lucide-icons';
import { Control, FieldPathValue, Path, useController } from 'react-hook-form';
import { Adapt, Select as TamSelect, SelectProps as TamSelectProps, Sheet, Stack } from 'tamagui';

import { Button, ButtonProps } from '../button';
import { Divider } from '../divider';
import { Text, TextProps } from '../text';

type SelectItem = {
  name: string;
  value: string;
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

interface BaseSelectProps extends TamSelectProps {
  items: SelectItem[];
  placeholder?: string;
  header?: React.ReactNode;

  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  error?: boolean;
  helperText?: string;
}

export function BaseSelect({
  items = [],
  placeholder,
  header,
  helperText,
  error,
  ...props
}: BaseSelectProps) {
  return (
    <Stack w="100%" gap="$2">
      <TamSelect open={false} {...props}>
        <TamSelect.Trigger
          transparent
          br="$6"
          boc={error ? '$errorMain' : '$backgroundBox'}
          px="$4"
          py="$4"
          iconAfter={<ChevronDown size="$5" />}>
          <TamSelect.Value
            placeholder={placeholder ?? 'Select'}
            color={error ? '$errorMain' : !props.value ? '$placeholderColor' : '$textPrimary'}
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
                  <TamSelect.Item index={i} key={item.name} value={item.value} px="$6" py="$4">
                    <TamSelect.ItemText>{item.name}</TamSelect.ItemText>

                    <TamSelect.ItemIndicator marginLeft="auto" />
                  </TamSelect.Item>
                );
              })}
            </TamSelect.Group>
          </TamSelect.Viewport>
        </TamSelect.Content>
      </TamSelect>
      {helperText && (
        <Text variant="body3" col={error ? '$errorMain' : '$textPrimary'}>
          {helperText}
        </Text>
      )}
    </Stack>
  );
}

type SelectProps<T, Context = any> = Omit<BaseSelectProps, 'defaultValue'> & {
  control: Control<T, Context>;
  name: Path<T>;
  defaultValue?: FieldPathValue<T, Path<T>>;
  transform?: (value: string) => any;
};

export const Select = <T extends object, Context = any>({
  control,
  name,
  transform,
  ...rest
}: SelectProps<T, Context>) => {
  const { field } = useController({
    control,
    name,
    defaultValue: rest?.defaultValue ?? undefined,
  });

  return (
    <BaseSelect
      {...rest}
      value={field.value}
      onValueChange={(val) => field.onChange(transform ? transform(val) : val)}
    />
  );
};

Select.Header = SelectHeader;
Select.Title = SelectTitle;
Select.Action = SelectAction;
