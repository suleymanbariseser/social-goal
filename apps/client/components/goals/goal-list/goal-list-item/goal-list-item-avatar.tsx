import { Avatar } from '@/components/ui/avatar';

type Props = {
  onPress?: () => void;
  image: string;
};

export const GoalListItemAvatar = ({ onPress, image }: Props) => (
  <Avatar onPress={onPress} src={image} />
);
