import { Text, TextProps } from '../../text';

type Props = TextProps & {
  children?: React.ReactNode;
};

export const SelectTitle = ({ children, ...props }: Props) => (
  <Text variant="subtitle1" {...props}>
    {children}
  </Text>
);
