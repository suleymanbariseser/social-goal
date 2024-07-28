import { Button, ButtonProps } from '../../button';

type Props = ButtonProps & {
  children?: React.ReactNode;
};

export const SelectAction = ({ children, ...props }: Props) => (
  <Button variant="text" py="$0" px="$0" {...props}>
    {children}
  </Button>
);
