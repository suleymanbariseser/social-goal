import { Stack } from 'tamagui';

import { ProfileAction } from './profile-action';
import { ProfileDescription } from './profile-description';
import { ProfileHeader } from './profile-header';
import { ProfileStatistics } from './profile-statictics';

import { trpc } from '@/lib/trpc';

interface Props {
  userId: number;
}

export const ProfileHero = ({ userId }: Props) => {
  const [profile] = trpc.user.profile.useSuspenseQuery({ id: userId });

  return (
    <Stack w="100%" gap="$3">
      <ProfileHeader
        fullName={[profile.firstName, profile.lastName].join(' ')}
        id={profile.id}
        image={profile.image}
      />
      <ProfileDescription description={profile.description} />
      <ProfileStatistics
        followers={profile.followers}
        following={profile.followings}
        goals={profile.goals}
      />
      <ProfileAction />
    </Stack>
  );
};
