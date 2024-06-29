import { User } from '@tamagui/lucide-icons';
import { SizeTokens, Avatar as UIAvatar, AvatarImageProps as UIAvatarImageProps } from 'tamagui';

type Props = {
  /**
   * @default "$10"
   */
  size?: SizeTokens;
} & UIAvatarImageProps;

export const Avatar = ({ size = '$10', ...props }: Props) => (
  <UIAvatar circular size={size}>
    <UIAvatar.Image {...props} />
    <UIAvatar.Fallback backgroundColor="$blue10" ai="center" jc="center">
      <User size={size} />
    </UIAvatar.Fallback>
  </UIAvatar>
);
