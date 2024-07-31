import { User } from '@tamagui/lucide-icons';
import { SizeTokens, Avatar as UIAvatar, AvatarImageProps as UIAvatarImageProps } from 'tamagui';

type Props = {
  /**
   * @default "$10"
   */
  size?: SizeTokens;
} & UIAvatarImageProps;

export const Avatar = ({ size = '$10', onPress, ...props }: Props) => (
  <UIAvatar circular size={size} onPress={onPress}>
    <UIAvatar.Image {...props} />
    <UIAvatar.Fallback backgroundColor="$blue10" ai="center" jc="center">
      <User size={size} />
    </UIAvatar.Fallback>
  </UIAvatar>
);
