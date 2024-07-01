import { ProfileEditButton } from './profile-edit-button';
import { ProfileFollowButton } from './profile-follow-button';

import { trpc } from '@/lib/trpc';

type Props = {
  userId: number;
};

export const ProfileAction = ({ userId }: Props) => {
  const [user] = trpc.user.info.useSuspenseQuery();

  if (user.id === userId) return <ProfileEditButton userId={userId} />;

  return <ProfileFollowButton userId={userId} />;
};
