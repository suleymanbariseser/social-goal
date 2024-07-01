import { useRouter } from 'expo-router';

import { Button } from '@/components/ui/button';

type Props = {
  userId: number;
};

export const ProfileEditButton = ({ userId }: Props) => {
  const router = useRouter();

  const handlePress = () => {
    router.navigate(`/profile/${userId}/edit`);
  };

  return (
    <Button onPress={handlePress} variant="outlined">
      Edit
    </Button>
  );
};
