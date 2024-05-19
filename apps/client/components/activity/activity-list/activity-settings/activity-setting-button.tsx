import { Button, ButtonProps } from '@/components/ui/button';

type Props = ButtonProps;

export const ActivitySettingButton = ({ ...props }: Props) => {
  return <Button variant="text" {...props} />;
};
